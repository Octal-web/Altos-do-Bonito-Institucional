<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;

class PostValueRequest extends FormRequest
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
            'titulo'  => 'required|string|max:100',
            'texto'  => 'required|string|max:400',

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

            'texto.required' => 'Por favor, informe a descrição.',
            'texto.string'   => 'A descrição deve ser um texto válido.',
            'texto.max'      => 'A descrição deve ter no máximo :max caracteres.',

            'img.required' => 'Por favor, selecione uma imagem.',
            'img.image'    => 'O arquivo enviado deve ser uma imagem válida.',
            'img.mimes'    => 'A imagem deve estar no formato PNG ou JPG.',
            'img.max'      => 'A imagem deve ter no máximo 4 MB.',

        ];
    }
}
