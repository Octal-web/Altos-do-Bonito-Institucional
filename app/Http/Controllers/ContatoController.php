<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use App\Http\Requests\PostContactRequest;
use App\Services\ContactService;

class ContatoController extends Controller
{
    protected $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Contato/index', [
            'googleMapsKey' => config('services.google_maps.api_key'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function enviar(PostContactRequest $request)
    {
        if ($request->post()) {
            $data = $request->validated();

            $contato = $this->contactService->create($data);

            return back()->with('message', [
                'type' => 'success',
                'msg' => 'Contato enviado com sucesso!',
            ]);
        }

        return redirect()->route('Contato.index', [], 301);
    }
};
