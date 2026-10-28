<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Pagina;
use App\Models\Produto;
use Inertia\Inertia;


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

        $categoria = null;
        $categoriaId = request('categoria') ?: Categoria::query()
            ->whereNull('excluido')
            ->where('visivel', true)
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->value('id');

        if ($categoriaId) {
            $categoria = Categoria::query()
                ->where([
                    'excluido' => NULL,
                    'visivel' => true,
                    'id' => $categoriaId
                ])
                ->with([
                    'categoriasIdiomas' => function ($q) use ($idioma) {
                        $q->whereHas('idiomas', function ($r) use ($idioma) {
                            $r->where('codigo', $idioma)
                                ->orWhere('padrao', true);
                        })
                            ->orderBy('idioma_id', 'DESC');
                    },
                    'produtos' => function ($query) use ($idioma) {
                        $query->where([
                            'excluido' => NULL,
                            'visivel' => true
                        ])
                            ->with([
                                'categoria.categoriasIdiomas' => function ($q) use ($idioma) {
                                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                                        $r->where('codigo', $idioma)->orWhere('padrao', true);
                                    })->orderBy('idioma_id', 'DESC');
                                },
                                'produtosIdiomas' => function ($q) use ($idioma) {
                                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                                        $r->where('codigo', $idioma)
                                            ->orWhere('padrao', true);
                                    })
                                        ->orderBy('idioma_id', 'DESC');
                                },
                            ])
                            ->orderBy('ordem', 'ASC')
                            ->orderBy('id', 'DESC');
                    }
                ])
                ->orderBy('ordem', 'ASC')
                ->orderBy('id', 'DESC')
                ->first();

            if ($categoria) {
                $categoria = [
                    'id' => $categoria->id,
                    'nome' => $categoria->categoriasIdiomas->isNotEmpty() ? $categoria->categoriasIdiomas[0]->nome : null,
                    'produtos' => $categoria->produtos
                        ->groupBy(function ($produto) use ($idioma) {
                            $categoriaIdioma = $produto->categoria->categoriasIdiomas->first();

                            if (!$categoriaIdioma) {
                                return 'Sem Categoria';
                            }

                            $tipo = $categoriaIdioma->tipo;
                            $nome = $categoriaIdioma->nome;

                            return $idioma === 'en'
                                ? strtoupper($nome . ' ' . $tipo)
                                : strtoupper($tipo . ' ' . $nome);
                        })
                        ->map(function ($produtos) {
                            return [
                                'produtos' => $produtos->map(function ($produto) {
                                    return [
                                        'id' => $produto->id,
                                        'slug' => $produto->slug,
                                        'imagem' => rafator('content/products/items/' . $produto->imagem),
                                        'imagem_alt' => rafator('content/products/items/alt/' . $produto->imagem_alternativa),
                                        'nome' => $produto->produtosIdiomas->isNotEmpty() ? $produto->produtosIdiomas[0]->nome : null,
                                    ];
                                }),
                            ];
                        })
                        ->values(),
                ];
            }
        };

        $categoriasMenu = Categoria::query()
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
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function ($categoriaMenu) use ($idioma) {
                $categoria = $categoriaMenu->categoriasIdiomas->first();

                if (!$categoria) {
                    return [
                        'id' => $categoriaMenu->id,
                        'nome' => null
                    ];
                }

                $nome = $categoria->nome;
                $tipo = $categoria->tipo;

                if (!$nome) {
                    $texto = $tipo;
                } else {
                    $texto = $idioma === 'en'
                        ? $nome . ' ' . $tipo
                        : $tipo . ' ' . $nome;
                }

                return [
                    'id' => $categoriaMenu->id,
                    'nome' => $texto
                ];
            });

        return Inertia::render('Produtos/index', [
            'categoria' => $categoria,
            'categoriasMenu' => $categoriasMenu
        ]);
    }

    public function produto(string $slug)
    {
        $idioma = inertia()->getShared('idioma');

        $produto = Produto::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true,
                'slug' => $slug
            ])
            ->with([
                'produtosIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma)
                            ->orWhere('padrao', true);
                    })
                        ->orderBy('idioma_id', 'DESC');
                },
                'produtosImagens' => function ($q) {
                    $q->where([
                        'excluido' => NULL,
                        'visivel' => true,
                    ]);
                },

            ])
            ->first();

        if (!$produto) {
            return Inertia::location(route('Produtos.index'));
        }

        $pagina = new Pagina();

        $pagina->titulo = $produto->produtosIdiomas[0]->titulo_pagina . ' - Pizzato';
        $pagina->descricao = $produto->produtosIdiomas[0]->descricao_pagina . ' - Pizzato';
        $pagina->titulo_compartilhamento = $produto->produtosIdiomas[0]->titulo_pagina . ' - Pizzato';
        $pagina->descricao_compartilhamento = $produto->produtosIdiomas[0]->descricao_pagina . ' - Pizzato';

        list($width, $height, $type, $attr) = getimagesize(public_path('/content/products/items/' . $produto->imagem));

        $pagina->imagem = [
            'endereco' => '/content/products/items/' . $produto->imagem,
            'tipo' => image_type_to_mime_type($type),
            'largura' => $width,
            'altura' => $height,
        ];

        $produto = [
            'id' => $produto->id,
            'nome' => $produto->produtosIdiomas[0]->nome,
            'subtitulo' => $produto->produtosIdiomas[0]->subtitulo,
            'link_loja' => $produto->link_loja,
            'descricao' => $produto->produtosIdiomas[0]->descricao,

            'imagem_primaria' => rafator('content/products/thumbs/' . $produto->imagem_primaria),
            'historia_subtitulo' => $produto->produtosIdiomas[0]->historia_subtitulo,
            'historia_titulo' => $produto->produtosIdiomas[0]->historia_titulo,
            'historia_descricao' => $produto->produtosIdiomas[0]->historia_descricao,

            'imagem_secundaria' => rafator('content/products/thumbs/' . $produto->imagem_secundaria),
            'origem_titulo' => $produto->produtosIdiomas[0]->origem_titulo,
            'origem_descricao' => $produto->produtosIdiomas[0]->origem_descricao,

            'imagem_terciaria' => rafator('content/products/thumbs/' . $produto->imagem_terciaria),
            'processo_titulo' => $produto->produtosIdiomas[0]->processo_titulo,
            'processo_descricao' => $produto->produtosIdiomas[0]->processo_descricao,
            'ficha_tecnica' => $produto->produtosIdiomas[0]->ficha_tecnica,

            'galeria' => $produto->produtosImagens->map(function ($item) {
                return [
                    'id' => $item->id,
                    'imagem' => rafator('content/products/gallery/' . $item->imagem),
                ];
            }),
        ];

        return Inertia::render('Produtos/produto', [
            'pagina' => $pagina,
            'produto' => $produto
        ]);
    }
};
