<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;

class PostGeneralDataRequest extends FormRequest
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
        return [
            'endereco'  => 'required',
            'cep'  => 'required|formato_cep',
            'email'  => 'required|email',
            'telefone' => 'required|max:46',
            'instagram' => 'nullable|url',
            'whatsapp' => 'nullable|url',
            'link_mapa' => 'required|url',
            'link_loja' => 'required|url',
            'como_chegar' => 'required|string|max:300',
            'horario_atendimento' => 'required|string|max:255',
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
            'endereco.required' => 'Por favor, informe o endereço.',

            'cep.required' => 'Por favor, informe o CEP.',
            'cep.formato_cep' => 'Por favor, informe um CEP válido.',

            'email.required' => 'Por favor, informe o e-mail.',
            'email.email' => 'Por favor, informe um e-mail válido.',

            'telefone.required' => 'Por favor, informe o telefone.',
            'telefone.max' => 'O telefone deve ter no máximo 46 caracteres.',

            'instagram.url' => 'Por favor, informe um link válido para o Instagram.',

            'whatsapp.url' => 'Por favor, informe um link válido para o WhatsApp.',

            'link_mapa.required' => 'Por favor, informe o link do Google Maps.',
            'link_mapa.url' => 'Por favor, informe um link válido do Google Maps.',

            'link_loja.required' => 'Por favor, informe o link da loja virtual.',
            'link_loja.url' => 'Por favor, informe um link válido para a loja virtual.',

            'como_chegar.required' => 'Por favor, informe como chegar ao local.',
            'como_chegar.string' => 'As instruções de como chegar devem ser um texto válido.',
            'como_chegar.max' => 'As instruções de como chegar devem ter no máximo 300 caracteres.',

            'horario_atendimento.required' => 'Por favor, informe o horário de atendimento.',
            'horario_atendimento.string' => 'O horário de atendimento deve ser um texto válido.',
            'horario_atendimento.max' => 'O horário de atendimento deve ter no máximo 255 caracteres.',
        ];
    }
}
