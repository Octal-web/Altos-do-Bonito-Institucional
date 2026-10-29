<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;

use Inertia\Inertia;
use App\Http\Requests\Manager\PostGeneralDataRequest;
use App\Models\DadosGerais;
use App\Models\Slide;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $idioma = inertia()->getShared('idioma');

        // $dadosGerais = DadosGerais::first();

        $slides = Slide::query()
            ->where([
                'excluido' => NULL
            ])
            ->with([
                'slidesIdiomas' => function ($q) {
                    $q->whereHas('idiomas', function ($r) {
                        $r->Where('padrao', true);
                    })
                        ->orderBy('idioma_id', 'DESC');
                }
            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function ($slide) {
                return [
                    'id' => $slide->id,
                    'visivel' => $slide->visivel,
                    'titulo' => (($slide->slidesIdiomas->isNotEmpty() ? $slide->slidesIdiomas[0]->titulo : null) . ' - ' . ($slide->tipo == 'imagem' ? 'Imagem' : 'Vídeo')),
                ];
            });

        return Inertia::render('Manager/Home/index', [
            // 'dadosGerais' => $dadosGerais,
            'slides' => $slides
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function atualizarInfo(PostGeneralDataRequest $request)
    {
        if ($request->ajax()) {
            $dados_gerais = DadosGerais::first();

            $dados_gerais->endereco = $request->endereco;
            $dados_gerais->cep = $request->cep;
            $dados_gerais->instagram = $request->instagram;
            $dados_gerais->telefone = $request->telefone;
            $dados_gerais->whatsapp = $request->whatsapp;
            $dados_gerais->email = $request->email;
            $dados_gerais->como_chegar = $request->como_chegar;
            $dados_gerais->horario_atendimento = $request->horario_atendimento;
            $dados_gerais->link_mapa = $request->link_mapa;
            $dados_gerais->link_loja = $request->link_loja;
            $dados_gerais->latitude = $request->latitude;
            $dados_gerais->longitude = $request->longitude;

            $response = $dados_gerais->save();

            if ($response) {
                return to_route('Manager.Home.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
            }
        }
    }
};
