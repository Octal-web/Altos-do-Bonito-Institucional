<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostContactRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefone' => 'required|celular_com_ddd',
            'assunto' => 'required|string|max:120',
            'mensagem' => 'required|string|max:1200',
            'politica' => 'required|accepted',

            'pacote' => 'nullable|string',
            'origem' => 'nullable|string|max:2048',
            'campanha' => 'nullable|string|max:255',
            'grupo' => 'nullable|string|max:255',
            'anuncio' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nome.required' => __('default.nome_required'),
            'email.required' => __('default.email_required'),
            'email.email' => __('default.email_email'),
            'telefone.required' => __('default.telefone_required'),
            'telefone.celular_com_ddd' => __('default.telefone_invalido'),
            'assunto.required' => __('default.assunto_required'),
            'mensagem.required' => __('default.mensagem_required'),
            'politica.required' => __('default.politica_required'),
            'politica.accepted' => __('default.politica_accepted'),
            'string' => __('default.campo_texto'),
            'max' => __('default.campo_maximo'),
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'origem' => $this->input(
                'origem',
                $this->input('origin', $this->input('utm_source')),
            ),
            'campanha' => $this->input(
                'campanha',
                $this->input('campaign', $this->input('utm_campaign')),
            ),
            'grupo' => $this->input(
                'grupo',
                $this->input('group', $this->input('utm_term')),
            ),
            'anuncio' => $this->input(
                'anuncio',
                $this->input('ad', $this->input('utm_content')),
            ),
        ]);
    }
}
