<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;

use App\Models\Profissional;
use App\Models\ProfissionalIdioma;

use App\Models\Idioma;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Manager\PostProfessionalRequest;
use App\Services\ImageCompressor;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;

use DeepCopy\DeepCopy;

class ProfissionaisController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function adicionar()
    {
        return Inertia::render('Manager/Profissionais/adicionar');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function novo(PostProfessionalRequest $request, ImageCompressor $compressor)
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

            $profissional = new Profissional;
            $profissional_idioma = new ProfissionalIdioma;

            $profissional->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img')->extension());

            $response = $profissional->save();

            $profissional_idioma->nome = $request->nome;
            $profissional_idioma->descricao = $request->descricao;

            $profissional_idioma->profissional_id = $profissional->id;
            $profissional_idioma->idioma_id = $idioma->id;

            $response = $profissional_idioma->save();

            if ($response) {
                $compressor->compressOrFallback($request->file('img')->getRealPath(), public_path('content/professionals/' . $profissional->imagem));

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

        $profissional = Profissional::query()
            ->where([
                'excluido' => null,
                'id' => $id
            ])
            ->with([
                'profissionaisIdiomas' => function ($q) use ($idioma) {
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

        if (!$profissional) {
            return Inertia::location(route('Manager.Institucional.index'));
        }

        $idioma = inertia()->getShared('idioma');

        $profissionalData = [
            'id' => $profissional->id,
            'imagem' => rafator('content/professionals/' . $profissional->imagem),
            'nome' => count($profissional->profissionaisIdiomas) ? $profissional->profissionaisIdiomas[0]->nome : null,
            'descricao' => count($profissional->profissionaisIdiomas) ? $profissional->profissionaisIdiomas[0]->descricao : null,
        ];

        return Inertia::render('Manager/Profissionais/editar', [
            'idiomas' => $idiomas,
            'idioma' => $idioma,
            'profissional' => $profissionalData
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function atualizar(PostProfessionalRequest $request, $id, ImageCompressor $compressor)
    {
        if ($request->ajax()) {
            $profissional = Profissional::query()
                ->where([
                    'excluido' => null,
                    'id' => $id
                ])
                ->first();

            $idioma = $request->query('lang');

            $profissional_idioma = ProfissionalIdioma::query()
                ->where([
                    'excluido' => null,
                    'profissional_id' => $profissional->id
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

            if (!$profissional) {
                return to_route('Manager.Institucional.index')->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar as informações. Tente novamente mais tarde.']);
            }

            $idioma = $this->getLanguages($profissional, 'profissionaisIdiomas', $idioma);

            if (!$idioma) {
                if ($request->ajax()) {
                    return to_route('Manager.Institucional.index')->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar as informações. Tente novamente mais tarde.']);
                }
                return Inertia::location(route('Manager.Institucional.index'));
            }

            if (!$profissional_idioma) {
                $profissional_idioma = new ProfissionalIdioma;

                $profissional_idioma->profissional_id = $profissional->id;
                $profissional_idioma->idioma_id = $idioma;
            } else {
                $copier = new DeepCopy();
                $profissionalOriginal = $copier->copy($profissional);
            }


            if ($request->file('img') && $request->file('img')->getError() == 0) {
                $profissional->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img')->extension());
            }

            $profissional_idioma->nome = $request->nome;
            $profissional_idioma->descricao = $request->descricao;

            $response = $profissional->save();
            $response = $profissional_idioma->save();

            if ($response) {
                if ($request->file('img') && $request->file('img')->getError() == 0) {
                    if ($profissional->imagem && isset($profissionalOriginal) && File::exists('content/professionals/' . $profissionalOriginal->imagem)) {
                        File::delete('content/professionals/' . $profissionalOriginal->imagem);
                    }

                    $compressor->compressOrFallback($request->file('img')->getRealPath(), public_path('content/professionals/' . $profissional->imagem));
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

            $exclusao = Profissional::query()
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

            $response = Profissional::query()
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
                    $registro = Profissional::query()
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
