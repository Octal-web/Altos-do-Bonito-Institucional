<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Services\ImageCompressor;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class FinderController extends Controller
{
    private const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'pdf'];

    private function basePath()
    {
        $base = public_path('files');

        if (!File::isDirectory($base)) {
            File::makeDirectory($base, 0755, true);
        }

        return $base;
    }

    private function resolve($path = '')
    {
        $base = realpath($this->basePath());
        $path = trim(str_replace('\\', '/', (string) $path), '/');

        if (in_array('..', explode('/', $path), true)) {
            abort(403);
        }

        $target = realpath($base.'/'.$path) ?: rtrim($base.DIRECTORY_SEPARATOR.str_replace('/', DIRECTORY_SEPARATOR, $path), DIRECTORY_SEPARATOR);

        if (!str_starts_with($target, $base)) {
            abort(403);
        }

        return $target;
    }

    private function safeName($name)
    {
        $name = trim((string) $name);

        if ($name === '' || $name === '.' || $name === '..' || preg_match('#[/\\\\]#', $name)) {
            abort(422, 'Nome inválido.');
        }

        return $name;
    }

    private function checkExtension($name)
    {
        if (!in_array(strtolower(pathinfo($name, PATHINFO_EXTENSION)), self::ALLOWED_EXTENSIONS, true)) {
            abort(422, 'Tipo de arquivo não permitido.');
        }
    }

    private function ensureNotExists($path)
    {
        if (File::exists($path)) {
            abort(422, 'Já existe um arquivo ou pasta com esse nome.');
        }
    }

    public function list(Request $request)
    {
        $path = $this->resolve($request->path ?? '');

        if (!File::isDirectory($path)) {
            abort(404);
        }

        $dirs = collect(File::directories($path))->map(fn($d) => [
            'name' => basename($d),
            'isDir' => true
        ]);

        $files = collect(File::files($path))
            ->reject(fn($f) => str_starts_with($f->getFilename(), '.'))
            ->map(fn($f) => [
                'name' => $f->getFilename(),
                'isDir' => false,
                'size' => $f->getSize()
            ]);

        return $dirs->merge($files)->values();
    }

    public function upload(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file|max:10240',
        ]);

        $path = $this->resolve($request->path ?? '');

        $files = $request->file('files');

        foreach ($files as $file) {
            $this->checkExtension($this->safeName($file->getClientOriginalName()));
        }

        foreach ($files as $file) {
            $file->move($path, $file->getClientOriginalName());
        }

        return ['success' => true];
    }

    public function delete(Request $request)
    {
        $path = $this->resolve($request->path);

        if ($path === realpath($this->basePath())) {
            abort(403);
        }

        if (File::isDirectory($path)) {
            File::deleteDirectory($path);
        } else {
            File::delete($path);
        }

        return ['success' => true];
    }

    public function rename(Request $request)
    {
        $old = $this->resolve($request->old);
        $name = $this->safeName($request->new);

        if (!File::isDirectory($old)) {
            $this->checkExtension($name);
        }

        $new = dirname($old).'/'.$name;

        if ($new !== $old) {
            $this->ensureNotExists($new);
        }

        File::move($old, $new);

        return ['success' => true];
    }

    public function createFolder(Request $request)
    {
        $path = $this->resolve($request->path.'/'.$this->safeName($request->name));

        $this->ensureNotExists($path);

        File::makeDirectory($path);

        return ['success' => true];
    }

    public function move(Request $request)
    {
        $from = $this->resolve($request->from);
        $to = $this->resolve($request->to);

        if (!File::isDirectory($from)) {
            $this->checkExtension($to);
        }

        if (str_starts_with($to.DIRECTORY_SEPARATOR, $from.DIRECTORY_SEPARATOR)) {
            abort(422, 'Não é possível mover uma pasta para dentro dela mesma.');
        }

        $this->ensureNotExists($to);

        File::move($from, $to);

        return ['success' => true];
    }

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
