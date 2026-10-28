<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;

class PostProfessionalRequest extends FormRequest
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
        $isNovo = $this->routeIs('Manager.Profissionais.novo');

        return [
            'nome'  => 'required|string|max:255',
            'descricao'  => 'required|string|max:100',

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
            'nome.required' => 'Por favor, informe o título.',
            'nome.string'   => 'O título deve ser um texto válido.',
            'nome.max'      => 'O título deve ter no máximo :max caracteres.',

            'descricao.required' => 'Por favor, informe a descrição.',
            'descricao.string'   => 'A descrição deve ser um texto válido.',
            'descricao.max'      => 'A descrição deve ter no máximo :max caracteres.',

            'img.required' => 'Por favor, selecione uma imagem.',
            'img.image'    => 'O arquivo enviado deve ser uma imagem válida.',
            'img.mimes'    => 'A imagem deve estar no formato PNG ou JPG.',
            'img.max'      => 'A imagem deve ter no máximo 4 MB.',

        ];
    }
}
