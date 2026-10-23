<?php

namespace App\Http\Controllers;

use App\Models\Acontecimento;
use App\Models\Profissional;
use App\Models\Valor;
use Inertia\Inertia;

class InstitucionalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $idioma = inertia()->getShared('idioma');

        $acontecimentos = Acontecimento::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true
            ])
            ->with([
                'acontecimentosIdiomas' => function ($q) use ($idioma) {
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
            ->map(function ($acontecimento) {
                return [
                    'id' => $acontecimento->id,
                    'ano' => $acontecimento->ano,
                    'imagem' => rafator('content/timeline/' . $acontecimento->imagem),
                    'titulo' => $acontecimento->acontecimentosIdiomas->isNotEmpty() ? $acontecimento->acontecimentosIdiomas[0]->titulo : null,
                    'descricao' => $acontecimento->acontecimentosIdiomas->isNotEmpty() ? $acontecimento->acontecimentosIdiomas[0]->descricao : null,
                ];
            });

        $profissionais = Profissional::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true
            ])
            ->with([
                'profissionaisIdiomas' => function ($q) use ($idioma) {
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
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'imagem' => rafator('content/professionals/' . $item->imagem),
                    'nome' => $item->profissionaisIdiomas->isNotEmpty() ? $item->profissionaisIdiomas[0]->nome : null,
                    'descricao' => $item->profissionaisIdiomas->isNotEmpty() ? $item->profissionaisIdiomas[0]->descricao : null,
                ];
            });

        $valores = Valor::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true
            ])
            ->with([
                'valoresIdiomas' => function ($q) use ($idioma) {
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
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'imagem' => rafator('content/values/' . $item->imagem),
                    'texto' => $item->valoresIdiomas->isNotEmpty() ? $item->valoresIdiomas[0]->texto : null,
                    'titulo' => $item->valoresIdiomas->isNotEmpty() ? $item->valoresIdiomas[0]->titulo : null,
                ];
            });

        return Inertia::render('Institucional/index', [
            'acontecimentos' => $acontecimentos,
            'valores' => $valores,
            'profissionais' => $profissionais
        ]);
    }
};
