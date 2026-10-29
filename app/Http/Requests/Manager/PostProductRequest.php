<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;

class PostProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isNovo = $this->routeIs('Manager.Produtos.novo');

        return [
            'nome' => 'required|string|max:200',
            'subtitulo' => 'required|string|max:100',
            'descricao' => 'required|string',

            'historia_subtitulo' => 'required|string|max:100',
            'historia_titulo' => 'required|string|max:255',
            'historia_descricao' => 'required|string',

            'origem_titulo' => 'required|string|max:255',
            'origem_descricao' => 'required|string',

            'processo_titulo' => 'required|string|max:255',
            'processo_descricao' => 'required|string',

            'ficha_tecnica' => 'required|string',

            'titulo_pagina' => 'required|string|max:255',
            'descricao_pagina' => 'required|string|max:500',

            'link_loja' => 'required|url|max:2048',
            'categoria_id' => 'required|integer',

            'img' => $isNovo
                ? 'required|image|mimes:png,jpg,jpeg|max:4096'
                : 'nullable|image|mimes:png,jpg,jpeg|max:4096',

            'img_alternativa' => $isNovo
                ? 'required|image|mimes:png,jpg,jpeg|max:4096'
                : 'nullable|image|mimes:png,jpg,jpeg|max:4096',

            'img_destaque' => $isNovo
                ? 'required|image|mimes:png,jpg,jpeg|max:4096'
                : 'nullable|image|mimes:png,jpg,jpeg|max:4096',

            'img_primaria' => $isNovo
                ? 'required|image|mimes:png,jpg,jpeg|max:4096'
                : 'nullable|image|mimes:png,jpg,jpeg|max:4096',

            'img_secundaria' => $isNovo
                ? 'required|image|mimes:png,jpg,jpeg|max:4096'
                : 'nullable|image|mimes:png,jpg,jpeg|max:4096',

            'img_terciaria' => $isNovo
                ? 'required|image|mimes:png,jpg,jpeg|max:4096'
                : 'nullable|image|mimes:png,jpg,jpeg|max:4096',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'Por favor, informe o nome do produto.',
            'nome.string' => 'O nome do produto deve ser um texto válido.',
            'nome.max' => 'O nome do produto deve ter no máximo :max caracteres.',

            'subtitulo.required' => 'Por favor, informe o subtítulo.',
            'subtitulo.string' => 'O subtítulo deve ser um texto válido.',
            'subtitulo.max' => 'O subtítulo deve ter no máximo :max caracteres.',

            'descricao.required' => 'Por favor, informe a descrição.',
            'descricao.string' => 'A descrição deve ser um texto válido.',

            'historia_subtitulo.required' => 'Por favor, informe o subtítulo da história.',
            'historia_subtitulo.string' => 'O subtítulo da história deve ser um texto válido.',
            'historia_subtitulo.max' => 'O subtítulo da história deve ter no máximo :max caracteres.',

            'historia_titulo.required' => 'Por favor, informe o título da história.',
            'historia_titulo.string' => 'O título da história deve ser um texto válido.',
            'historia_titulo.max' => 'O título da história deve ter no máximo :max caracteres.',

            'historia_descricao.required' => 'Por favor, informe a descrição da história.',
            'historia_descricao.string' => 'A descrição da história deve ser um texto válido.',

            'origem_titulo.required' => 'Por favor, informe o título da origem.',
            'origem_titulo.string' => 'O título da origem deve ser um texto válido.',
            'origem_titulo.max' => 'O título da origem deve ter no máximo :max caracteres.',

            'origem_descricao.required' => 'Por favor, informe a descrição da origem.',
            'origem_descricao.string' => 'A descrição da origem deve ser um texto válido.',

            'processo_titulo.required' => 'Por favor, informe o título do processo.',
            'processo_titulo.string' => 'O título do processo deve ser um texto válido.',
            'processo_titulo.max' => 'O título do processo deve ter no máximo :max caracteres.',

            'processo_descricao.required' => 'Por favor, informe a descrição do processo.',
            'processo_descricao.string' => 'A descrição do processo deve ser um texto válido.',

            'ficha_tecnica.required' => 'Por favor, informe a ficha técnica.',
            'ficha_tecnica.string' => 'A ficha técnica deve ser um texto válido.',

            'titulo_pagina.required' => 'Por favor, informe o título da página.',
            'titulo_pagina.string' => 'O título da página deve ser um texto válido.',
            'titulo_pagina.max' => 'O título da página deve ter no máximo :max caracteres.',

            'descricao_pagina.required' => 'Por favor, informe a descrição da página.',
            'descricao_pagina.string' => 'A descrição da página deve ser um texto válido.',
            'descricao_pagina.max' => 'A descrição da página deve ter no máximo :max caracteres.',

            'link_loja.required' => 'Informe o link da loja.',
            'link_loja.url' => 'Informe um endereço válido para o link da loja.',
            'link_loja.max' => 'O link da loja deve ter no máximo :max caracteres.',

            'categoria_id.required' => 'Por favor, selecione uma categoria.',
            'categoria_id.integer' => 'Selecione uma categoria válida.',

            'img.required' => 'Por favor, selecione a imagem principal.',
            'img.image' => 'A imagem principal deve ser um arquivo de imagem válido.',
            'img.mimes' => 'A imagem principal deve estar no formato PNG ou JPG.',
            'img.max' => 'A imagem principal deve ter no máximo 4 MB.',

            'img_alternativa.required' => 'Por favor, selecione a imagem alternativa principal.',
            'img_alternativa.image' => 'A imagem alternativa principal deve ser um arquivo de imagem válido.',
            'img_alternativa.mimes' => 'A imagem alternativa principal deve estar no formato PNG ou JPG.',
            'img_alternativa.max' => 'A imagem alternativa principal deve ter no máximo 4 MB.',

            'img_destaque.required' => 'Por favor, selecione a imagem de destaque.',
            'img_destaque.image' => 'A imagem de destaque deve ser um arquivo de imagem válido.',
            'img_destaque.mimes' => 'A imagem de destaque deve estar no formato PNG ou JPG.',
            'img_destaque.max' => 'A imagem de destaque deve ter no máximo 4 MB.',

            'img_primaria.required' => 'Por favor, selecione a miniatura principal.',
            'img_primaria.image' => 'A miniatura principal deve ser um arquivo de imagem válido.',
            'img_primaria.mimes' => 'A miniatura principal deve estar no formato PNG ou JPG.',
            'img_primaria.max' => 'A miniatura principal deve ter no máximo 4 MB.',

            'img_secundaria.required' => 'Por favor, selecione a miniatura secundária.',
            'img_secundaria.image' => 'A imagem secundária deve ser um arquivo de imagem válido.',
            'img_secundaria.mimes' => 'A imagem secundária deve estar no formato PNG ou JPG.',
            'img_secundaria.max' => 'A imagem secundária deve ter no máximo 4 MB.',

            'img_terciaria.required' => 'Por favor, selecione a terceira miniatura.',
            'img_terciaria.image' => 'A terceira miniatura deve ser um arquivo de imagem válido.',
            'img_terciaria.mimes' => 'A terceira miniatura deve estar no formato PNG ou JPG.',
            'img_terciaria.max' => 'A terceira miniatura deve ter no máximo 4 MB.',
        ];
    }
}
