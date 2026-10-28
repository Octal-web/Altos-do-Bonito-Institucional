<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
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
        $valores = Valor::query()
            ->where([
                'excluido' => NULL
            ])
            ->with([
                'valoresIdiomas' => function ($q) {
                    $q->whereHas('idiomas', function ($r) {
                        $r->Where('padrao', true);
                    })
                        ->orderBy('idioma_id', 'DESC');
                }
            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function ($valor) {
                return [
                    'id' => $valor->id,
                    'visivel' => $valor->visivel,
                    'titulo' => $valor->valoresIdiomas[0]->titulo,
                    'imagem' => rafator('content/values/' . $valor->imagem),
                ];
            });

        $profissionais = Profissional::query()
            ->where([
                'excluido' => NULL
            ])
            ->with([
                'profissionaisIdiomas' => function ($q) {
                    $q->whereHas('idiomas', function ($r) {
                        $r->Where('padrao', true);
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
                    'visivel' => $item->visivel,
                    'nome' => $item->profissionaisIdiomas[0]->nome,
                    'imagem' => rafator('content/professionals/' . $item->imagem),
                ];
            });

        $acontecimentos = Acontecimento::query()
            ->where([
                'excluido' => NULL
            ])
            ->with([
                'acontecimentosIdiomas' => function ($q) {
                    $q->whereHas('idiomas', function ($r) {
                        $r->Where('padrao', true);
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
                    'visivel' => $item->visivel,
                    'titulo' => $item->acontecimentosIdiomas[0]->titulo . ' - ' . $item->ano
                ];
            });

        return Inertia::render('Manager/Institucional/index', [
            'valores' => $valores,
            'profissionais' => $profissionais,
            'acontecimentos' => $acontecimentos
        ]);
    }
};
