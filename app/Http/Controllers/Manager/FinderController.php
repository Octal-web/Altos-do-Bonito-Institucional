<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Services\ImageCompressor;
use Illuminate\Http\Request;

class FinderController extends Controller
{
    public function enviar(Request $request, ImageCompressor $compressor)
    {
        if ($request->ajax()) {
            try {
                $imagefile = $request->file('img');
                $filename = $imagefile->getClientOriginalName();

                $compressor->compressOrFallback($imagefile->getRealPath(), public_path('content/files/' . $filename));

                return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Imagem carregada com sucesso!', 'url' => asset('content/files/' . $filename)]);
            } catch (\Exception $e) {
                \Log::error('Erro no upload de imagem: ' . $e->getMessage());


                return back()->with('message', ['type' => 'error', 'msg' => 'Erro interno do servidor. Tente novamente']);
            }
        }
    }
}
