<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Valor;
use Inertia\Inertia;


use Carbon\Carbon;

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

        return Inertia::render('Manager/Institucional/index', [
            'valores' => $valores
        ]);
    }
};
