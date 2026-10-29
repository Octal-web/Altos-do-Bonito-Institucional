<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;

use App\Models\Valor;
use App\Models\ValorIdioma;

use App\Models\Idioma;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Manager\PostValueRequest;
use App\Services\ImageCompressor;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;

use DeepCopy\DeepCopy;

class ValoresController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function adicionar()
    {
        return Inertia::render('Manager/Valores/adicionar');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function novo(PostValueRequest $request, ImageCompressor $compressor)
    {
        if ($request->ajax()) {
            $idioma = Idioma::query()
                ->when(
                    $request->filled('lang'),
                    fn($query) => $query->where('codigo', $request->input('lang')),
                    fn($query) => $query->where('padrao', true)
                )
                ->orderByDesc('id')
                ->first();

            if (!$idioma) {
                return back()->withInput()->with('message', [
                    'type' => 'error',
                    'msg' => 'Não foi possível identificar o idioma. Verifique o idioma selecionado e o cadastro do idioma padrão.',
                ]);
            }

            $valor = new Valor;
            $valor_idioma = new ValorIdioma;

            $valor->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img')->extension());

            $response = $valor->save();

            $valor_idioma->titulo = $request->titulo;
            $valor_idioma->texto = $request->texto;

            $valor_idioma->valor_id = $valor->id;
            $valor_idioma->idioma_id = $idioma->id;

            $response = $valor_idioma->save();

            if ($response) {
                $compressor->compressOrFallback($request->file('img')->getRealPath(), public_path('content/values/' . $valor->imagem));

                return to_route('Manager.Institucional.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editar($id)
    {
        if (!$id) {
            return Inertia::location(route('Manager.Institucional.index'));
        }

        $idiomas = Idioma::query()
            ->orderBy('padrao', 'DESC')
            ->orderBy('id', 'DESC')
            ->get();

        $idioma = request('lang');

        $valor = Valor::query()
            ->where([
                'excluido' => null,
                'id' => $id
            ])
            ->with([
                'valoresIdiomas' => function ($q) use ($idioma) {
                    $q->when($idioma, function ($r) use ($idioma) {
                        $r->whereHas('idiomas', function ($query) use ($idioma) {
                            $query->where('codigo', $idioma);
                        });
                    })
                        ->when(!$idioma, function ($r) {
                            $r->whereHas('idiomas', function ($query) {
                                $query->where('padrao', true);
                            });
                        });
                }
            ])
            ->first();

        if (!$valor) {
            return Inertia::location(route('Manager.Institucional.index'));
        }

        $idioma = inertia()->getShared('idioma');

        $valorData = [
            'id' => $valor->id,
            'imagem' => rafator('content/values/' . $valor->imagem),
            'titulo' => count($valor->valoresIdiomas) ? $valor->valoresIdiomas[0]->titulo : null,
            'texto' => count($valor->valoresIdiomas) ? $valor->valoresIdiomas[0]->texto : null,
        ];

        return Inertia::render('Manager/Valores/editar', [
            'idiomas' => $idiomas,
            'idioma' => $idioma,
            'valor' => $valorData
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function atualizar(PostValueRequest $request, $id, ImageCompressor $compressor)
    {
        if ($request->ajax()) {
            $valor = Valor::query()
                ->where([
                    'excluido' => null,
                    'id' => $id
                ])
                ->first();

            $idioma = $request->query('lang');

            $valor_idioma = ValorIdioma::query()
                ->where([
                    'excluido' => null,
                    'valor_id' => $valor->id
                ])
                ->when($idioma, function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($query) use ($idioma) {
                        $query->where('codigo', $idioma);
                    });
                })
                ->when(!$idioma, function ($q) {
                    $q->whereHas('idiomas', function ($query) {
                        $query->where('padrao', true);
                    });
                })
                ->first();

            if (!$valor) {
                return to_route('Manager.Institucional.index')->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar as informações. Tente novamente mais tarde.']);
            }

            $idioma = $this->getLanguages($valor, 'valoresIdiomas', $idioma);

            if (!$idioma) {
                if ($request->ajax()) {
                    return to_route('Manager.Institucional.index')->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar as informações. Tente novamente mais tarde.']);
                }
                return Inertia::location(route('Manager.Institucional.index'));
            }

            if (!$valor_idioma) {
                $valor_idioma = new ValorIdioma;

                $valor_idioma->valor_id = $valor->id;
                $valor_idioma->idioma_id = $idioma;
            } else {
                $copier = new DeepCopy();
                $valorOriginal = $copier->copy($valor);
            }


            if ($request->file('img') && $request->file('img')->getError() == 0) {
                $valor->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img')->extension());
            }

            $valor_idioma->titulo = $request->titulo;
            $valor_idioma->texto = $request->texto;

            $response = $valor->save();
            $response = $valor_idioma->save();

            if ($response) {
                if ($request->file('img') && $request->file('img')->getError() == 0) {
                    if ($valor->imagem && isset($valorOriginal) && File::exists('content/values/' . $valorOriginal->imagem)) {
                        File::delete('content/values/' . $valorOriginal->imagem);
                    }
                    $compressor->compressOrFallback($request->file('img')->getRealPath(), public_path('content/values/' . $valor->imagem));
                }

                return to_route('Manager.Institucional.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
            }
        }

        return to_route('Manager.Institucional.index')->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar as informações. Tente novamente mais tarde.']);
    }

    /**
     * Set the specified resource as deleted.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function excluir(Request $request, $id)
    {
        if ($request->ajax()) {
            if (!$id) {
                return $request->header('referer');
            }

            $exclusao = Valor::query()
                ->where([
                    'excluido' => NULL,
                    'id' => $id
                ])
                ->update([
                    'excluido' => Carbon::now()
                ]);

            if ($exclusao == true) {
                return redirect()->back()->with('message', ['type' => 'alert', 'msg' => 'Registro excluído com sucesso.']);
            } else {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Não foi possível excluir o registro.']);
            }
        }
    }

    /**
     * Set the specified resource to visible/invisible.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function visibilidade(Request $request, $id)
    {
        if ($request->ajax()) {
            if (!$id) {
                return redirect()->back()->with(['type' => 'error', 'message' => 'Registro não encontrado!']);
            }

            $response = Valor::query()
                ->where([
                    'id' => $id,
                    'excluido' => NULL
                ])
                ->first();

            if (!$response) {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registro não encontrado!']);
            }

            $response->visivel = 1 - $response->visivel;
            $response->save();

            if ($response) {
                return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Visibilidade alterada com sucesso!']);
            } else {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Visibilidade não alterada!']);
            }
        }

        return $request->header('referer');
    }

    /**
     * Update the order of the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function ordenar(Request $request)
    {
        if ($request->ajax()) {
            $erros = [];

            if ($request->odr && is_array($request->odr)) {
                foreach ($request->odr as $key => $value) {
                    $registro = Valor::query()
                        ->where([
                            'excluido' => NULL,
                            'id' => $value
                        ])
                        ->update([
                            'ordem' => $key,
                        ]);

                    $errors[] = $registro;
                }
            }

            if (!count($erros)) {
                return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Registros reordenados com sucesso!']);
            } else {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registros não reordenados, tente novamente mais tarde!']);
            }
        }

        return redirect()->back();
    }
};
