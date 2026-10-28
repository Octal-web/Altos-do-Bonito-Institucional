<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;

use App\Models\Produto;
use App\Models\ProdutoIdioma;

use App\Models\Categoria;
use App\Models\Arquivo;

use App\Models\Idioma;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Manager\PostProductRequest;
use App\Services\ImageCompressor;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;

use DeepCopy\DeepCopy;

class ProdutosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $idioma = inertia()->getShared('idioma');

        $produtos = Produto::query()
            ->where([
                'excluido' => NULL
            ])
            ->with([
                'produtosIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma)
                            ->orWhere('padrao', true);
                    })
                        ->orderBy('idioma_id', 'DESC');
                }
            ])
            ->get()
            ->map(function ($produto) {
                return [
                    'id' => $produto->id,
                    'visivel' => $produto->visivel,
                    'imagem' => rafator('content/products/items/' . $produto->imagem),
                    'nome' => $produto->produtosIdiomas->isNotEmpty() ? $produto->produtosIdiomas[0]->nome : null,
                ];
            });

        $categorias = Categoria::query()
            ->where([
                'excluido' => NULL
            ])
            ->with([
                'categoriasIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma)
                            ->orWhere('padrao', true);
                    })
                        ->orderBy('idioma_id', 'DESC');
                }
            ])
            ->get()
            ->map(function ($produto) {
                return [
                    'id' => $produto->id,
                    'visivel' => $produto->visivel,
                    'nome' => $produto->categoriasIdiomas->isNotEmpty() ? $produto->categoriasIdiomas[0]->nome : null,
                ];
            });

        return Inertia::render('Manager/Produtos/index', [
            'produtos' => $produtos,
            'categorias' => $categorias
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function adicionar()
    {

        $idioma = request('lang');

        $categorias = Categoria::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true
            ])
            ->with([
                'categoriasIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma)
                            ->orWhere('padrao', true);
                    })
                        ->orderBy('idioma_id', 'DESC');
                }
            ])
            ->get()
            ->map(function ($categoria) {
                return [
                    'value' => $categoria->id,
                    'label' => $categoria->categoriasIdiomas->isNotEmpty() ? $categoria->categoriasIdiomas[0]->nome : null,
                ];
            });

        return Inertia::render('Manager/Produtos/adicionar', [
            'categorias' => $categorias
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function novo(PostProductRequest $request, ImageCompressor $compressor)
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
                    'msg' => 'Não foi possível identificar o idioma do slide. Verifique o idioma selecionado e o cadastro do idioma padrão.',
                ]);
            }

            $produto = new Produto;
            $produto_idioma = new ProdutoIdioma;

            $slugBase = Str::slug($request['nome']);
            $slug = $slugBase;

            $count = 1;

            while (Produto::where('slug', $slug)->exists()) {
                $slug = $slugBase . '-' . $count;
                $count++;
            }

            $produto->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img')->extension());
            $produto->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_alternativa')->extension());
            $produto->imagem_destaque = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_destaque')->extension());

            $produto->imagem_primaria = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_primaria')->extension());
            $produto->imagem_secundaria = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_secundaria')->extension());
            $produto->imagem_terciaria = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_terciaria')->extension());

            $produto->slug = $slug;
            $produto->link_loja = $request->link_loja;
            $produto->categoria_id = $request->categoria_id;

            $response = $produto->save();

            $produto_idioma->nome = $request->nome;
            $produto_idioma->subtitulo = $request->subtitulo;
            $produto_idioma->descricao = $request->descricao;

            $produto_idioma->historia_subtitulo = $request->historia_subtitulo;
            $produto_idioma->historia_titulo = $request->historia_titulo;
            $produto_idioma->historia_descricao = $request->historia_descricao;

            $produto_idioma->origem_titulo = $request->origem_titulo;
            $produto_idioma->origem_descricao = $request->origem_descricao;

            $produto_idioma->processo_titulo = $request->processo_titulo;
            $produto_idioma->processo_descricao = $request->processo_descricao;

            $produto_idioma->ficha_tecnica = $request->ficha_tecnica;

            $produto_idioma->titulo_pagina = $request->titulo_pagina;
            $produto_idioma->descricao_pagina = $request->descricao_pagina;

            $produto_idioma->produto_id = $produto->id;
            $produto_idioma->idioma_id = $idioma->id;

            $response = $produto_idioma->save();

            if ($response) {
                $compressor->compressOrFallback($request->file('img')->getRealPath(), public_path('content/products/items/' . $produto->imagem));
                $compressor->compressOrFallback($request->file('alternativa')->getRealPath(), public_path('content/products/items/' . $produto->imagem_alternativa));
                $compressor->compressOrFallback($request->file('img_destaque')->getRealPath(), public_path('content/products/highlight/' . $produto->imagem_destaque));

                $compressor->compressOrFallback($request->file('img_primaria')->getRealPath(), public_path('content/products/thumbs/' . $produto->imagem_primaria));
                $compressor->compressOrFallback($request->file('img_secundaria')->getRealPath(), public_path('content/products/thumbs/' . $produto->imagem_secundaria));
                $compressor->compressOrFallback($request->file('img_terciaria')->getRealPath(), public_path('content/products/thumbs/' . $produto->imagem_terciaria));

                return to_route('Manager.Produtos.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
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
            return Inertia::location(route('Manager.Produtos.index'));
        }

        $idiomas = Idioma::query()
            ->orderBy('padrao', 'DESC')
            ->orderBy('id', 'DESC')
            ->get();

        $idioma = request('lang');

        $produto = Produto::query()
            ->where([
                'excluido' => null,
                'id' => $id
            ])
            ->with([
                'produtosIdiomas' => function ($q) use ($idioma) {
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
                },
                'categoria' => function ($q) {
                    $q->where([
                        'excluido' => null,
                        'visivel' => true
                    ])
                        ->orderBy('ordem', 'DESC')
                        ->orderBy('id', 'DESC');
                },

            ])
            ->first();

        if (!$produto) {
            return Inertia::location(route('Manager.Produtos.index'));
        }

        $categorias = Categoria::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true
            ])
            ->with([
                'categoriasIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma)
                            ->orWhere('padrao', true);
                    })
                        ->orderBy('idioma_id', 'DESC');
                }
            ])
            ->get()
            ->map(function ($categoria) {
                return [
                    'value' => $categoria->id,
                    'label' => $categoria->categoriasIdiomas->isNotEmpty() ? $categoria->categoriasIdiomas[0]->nome : null,
                ];
            });

        $idioma = inertia()->getShared('idioma');

        $produtoData = [
            'id' => $produto->id,
            'imagem' => rafator('content/products/items/' . $produto->imagem),
            'imagem_alternativa' => rafator('content/products/items/' . $produto->imagem_alternativa),
            'imagem_primaria' => rafator('content/products/thumbs/' . $produto->imagem_primaria),
            'imagem_secundaria' => rafator('content/products/thumbs/' . $produto->imagem_secundaria),
            'imagem_terciaria' => rafator('content/products/thumbs/' . $produto->imagem_terciaria),
            'imagem_destaque' => rafator('content/products/highlight/' . $produto->imagem_destaque),
            'link_loja' => $produto->link_loja,
            'categoria_id' => $produto->categoria_id,

            'subtitulo' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->subtitulo : null,
            'nome' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->nome : null,
            'descricao' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->descricao : null,

            'historia_subtitulo' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->historia_subtitulo : null,
            'historia_titulo' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->historia_titulo : null,
            'historia_descricao' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->historia_descricao : null,

            'origem_titulo' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->origem_titulo : null,
            'origem_descricao' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->origem_descricao : null,


            'processo_titulo' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->processo_titulo : null,
            'processo_descricao' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->processo_descricao : null,

            'ficha_tecnica' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->ficha_tecnica : null,

            'titulo_pagina' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->titulo_pagina : null,
            'descricao_pagina' => count($produto->produtosIdiomas) ? $produto->produtosIdiomas[0]->descricao_pagina : null,
        ];

        return Inertia::render('Manager/Produtos/editar', [
            'idiomas' => $idiomas,
            'idioma' => $idioma,
            'produto' => $produtoData,
            'categorias' => $categorias
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function atualizar(PostProductRequest $request, $id, ImageCompressor $compressor)
    {
        if ($request->ajax()) {
            $produto = Produto::query()
                ->where([
                    'excluido' => null,
                    'id' => $id
                ])
                ->first();

            $idioma = $request->query('lang');

            $produto_idioma = ProdutoIdioma::query()
                ->where([
                    'excluido' => null,
                    'produto_id' => $produto->id
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

            if (!$produto) {
                return to_route('Manager.Produtos.index')->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar as informações. Tente novamente mais tarde.']);
            }

            $idioma = $this->getLanguages($produto, 'produtosIdiomas', $idioma);

            if (!$idioma) {
                if ($request->ajax()) {
                    return to_route('Manager.Produtos.index')->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar as informações. Tente novamente mais tarde.']);
                }
                return Inertia::location(route('Manager.Produtos.index'));
            }

            if (!$produto_idioma) {
                $produto_idioma = new ProdutoIdioma;

                $produto_idioma->produto_id = $produto->id;
                $produto_idioma->idioma_id = $idioma;
            } else {
                $copier = new DeepCopy();
                $produtoOriginal = $copier->copy($produto);
            }

            $slug = $produto->slug;

            if (!$request->query('lang')) {
                if ($request['nome'] !== $produto_idioma->nome) {
                    $slugBase = Str::slug($request['nome']);
                    $slug = $slugBase;
                    $count = 1;

                    while (Produto::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                        $slug = $slugBase . '-' . $count;
                        $count++;
                    }
                }
            }

            $produto->slug = $slug;
            $produto->link_loja = $request->link_loja;
            $produto->categoria_id = $request->categoria_id;

            if ($request->file('img') && $request->file('img')->getError() == 0) {
                $produto->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img')->extension());
            }

            if ($request->file('img_alternativa') && $request->file('img_alternativa')->getError() == 0) {
                $produto->imagem_alternativa = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_alternativa')->extension());
            }

            if ($request->file('img_destaque') && $request->file('img_destaque')->getError() == 0) {
                $produto->imagem_destaque = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_destaque')->extension());
            }

            if ($request->file('img_primaria') && $request->file('img_primaria')->getError() == 0) {
                $produto->imagem_primaria = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_primaria')->extension());
            }

            if ($request->file('img_secundaria') && $request->file('img_secundaria')->getError() == 0) {
                $produto->imagem_secundaria = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_secundaria')->extension());
            }

            if ($request->file('img_terciaria') && $request->file('img_terciaria')->getError() == 0) {
                $produto->imagem_terciaria = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_terciaria')->extension());
            }

            $produto_idioma->nome = $request->nome;
            $produto_idioma->subtitulo = $request->subtitulo;
            $produto_idioma->descricao = $request->descricao;

            $produto_idioma->historia_subtitulo = $request->historia_subtitulo;
            $produto_idioma->historia_titulo = $request->historia_titulo;
            $produto_idioma->historia_descricao = $request->historia_descricao;

            $produto_idioma->origem_titulo = $request->origem_titulo;
            $produto_idioma->origem_descricao = $request->origem_descricao;

            $produto_idioma->processo_titulo = $request->processo_titulo;
            $produto_idioma->processo_descricao = $request->processo_descricao;

            $produto_idioma->ficha_tecnica = $request->ficha_tecnica;

            $produto_idioma->titulo_pagina = $request->titulo_pagina;
            $produto_idioma->descricao_pagina = $request->descricao_pagina;

            $response = $produto->save();
            $response = $produto_idioma->save();


            if ($response) {
                if ($request->file('img') && $request->file('img')->getError() == 0) {
                    if ($produto->imagem && isset($produtoOriginal) && File::exists('content/products/items/' . $produtoOriginal->imagem)) {
                        File::delete('content/products/items/' . $produtoOriginal->imagem);
                    }

                    $compressor->compressOrFallback($request->file('img')->getRealPath(), public_path('content/products/items/' . $produto->imagem));
                }

                if ($request->file('img_alternativa') && $request->file('img_alternativa')->getError() == 0) {
                    if ($produto->imagem_alternativa && isset($produtoOriginal) && File::exists('content/products/items/' . $produtoOriginal->imagem_alternativa)) {
                        File::delete('content/products/items/' . $produtoOriginal->imagem_alternativa);
                    }

                    $compressor->compressOrFallback($request->file('img_alternativa')->getRealPath(), public_path('content/products/items/' . $produto->imagem_alternativa));
                }

                if ($request->file('img_destaque') && $request->file('img_destaque')->getError() == 0) {
                    if ($produto->imagem_destaque && isset($produtoOriginal) && File::exists('content/products/highlight/' . $produtoOriginal->imagem_destaque)) {
                        File::delete('content/products/highlight/' . $produtoOriginal->imagem_destaque);
                    }

                    $compressor->compressOrFallback($request->file('img_destaque')->getRealPath(), public_path('content/products/highlight/' . $produto->imagem_destaque));
                }

                if ($request->file('img_primaria') && $request->file('img_primaria')->getError() == 0) {
                    if ($produto->imagem_primaria && isset($produtoOriginal) && File::exists('content/products/thumbs/' . $produtoOriginal->imagem_primaria)) {
                        File::delete('content/products/thumbs/' . $produtoOriginal->imagem_primaria);
                    }
                    $compressor->compressOrFallback($request->file('img_primaria')->getRealPath(), public_path('content/products/thumbs/' . $produto->imagem_primaria));
                }

                if ($request->file('img_secundaria') && $request->file('img_secundaria')->getError() == 0) {
                    if ($produto->imagem_secundaria && isset($produtoOriginal) && File::exists('content/products/thumbs/' . $produtoOriginal->imagem_secundaria)) {
                        File::delete('content/products/thumbs/' . $produtoOriginal->imagem_secundaria);
                    }

                    $compressor->compressOrFallback($request->file('img_secundaria')->getRealPath(), public_path('content/products/thumbs/' . $produto->imagem_secundaria));
                }

                if ($request->file('img_terciaria') && $request->file('img_terciaria')->getError() == 0) {
                    if ($produto->imagem_terciaria && isset($produtoOriginal) && File::exists('content/products/thumbs/' . $produtoOriginal->imagem_terciaria)) {
                        File::delete('content/products/thumbs/' . $produtoOriginal->imagem_terciaria);
                    }

                    $compressor->compressOrFallback($request->file('img_terciaria')->getRealPath(), public_path('content/products/thumbs/' . $produto->imagem_terciaria));
                }

                return to_route('Manager.Produtos.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
            }
        }

        return to_route('Manager.Produtos.index')->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar as informações. Tente novamente mais tarde.']);
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

            $exclusao = Produto::query()
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

            $response = Produto::query()
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
                    $registro = Produto::query()
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

    /**
     * Download the file of the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function baixarArquivo($produto, $id)
    {
        if (!$produto || !$id) {
            return redirect()->route('Manager.Produtos.index');
        }

        $idioma = inertia()->getShared('idioma');

        $arquivo = Arquivo::query()
            ->where([
                'id' => $id,
                'excluido' => NULL,
            ])
            ->whereHas('produto', function ($q) use ($produto) {
                $q->where('id', $produto);
            })
            ->with([
                'arquivosIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma)
                            ->orWhere('padrao', true);
                    })
                        ->orderBy('idioma_id', 'DESC');
                }
            ])
            ->first();

        if (!$arquivo) {
            return redirect()->route('Manager.Produtos.index');
        }

        $caminho = public_path('content/products/files/' . $arquivo->arquivo);

        $extensao = pathinfo($caminho)['extension'];

        if (!File::exists($caminho)) {
            return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Não foi possível encontrar o arquivo!']);
        }

        return response()->download($caminho, $arquivo->arquivosIdiomas[0]->titulo . '.' . $extensao);
    }
};
