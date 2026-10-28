<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;

class PostEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        $isNovo = $this->routeIs('Manager.Valores.novo');

        return [
            'titulo'  => 'required|string|max:255',
            'descricao'  => 'required|string',
            'ano' => 'required|integer|digits:4',

            'img' => $isNovo
                ? 'required|image|mimes:png,jpg|max:4096'
                : 'nullable|image|mimes:png,jpg|max:4096',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'titulo.required' => 'Por favor, informe o título.',
            'titulo.string'   => 'O título deve ser um texto válido.',
            'titulo.max'      => 'O título deve ter no máximo :max caracteres.',

            'descricao.required' => 'Por favor, informe a descrição.',
            'descricao.string'   => 'A descrição deve ser um texto válido.',

            'ano.required' => 'Por favor, informe o ano.',
            'ano.integer'  => 'O ano deve ser um número inteiro.',
            'ano.digits'   => 'O ano deve conter exatamente 4 dígitos.',

            'img.required' => 'Por favor, selecione uma imagem.',
            'img.image'    => 'O arquivo enviado deve ser uma imagem válida.',
            'img.mimes'    => 'A imagem deve estar no formato PNG ou JPG.',
            'img.max'      => 'A imagem deve ter no máximo 4 MB.',

        ];
    }
}
