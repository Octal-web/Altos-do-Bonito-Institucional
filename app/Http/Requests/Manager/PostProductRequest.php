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
            'conteudos' => 'required',

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

            'conteudos.required' => 'Por favor, informe os conteúdos da página.',

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
        ];
    }
}
