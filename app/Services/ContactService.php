<?php

namespace App\Services;

use App\Models\Contato;
use Illuminate\Support\Facades\DB;

class ContactService
{
    public function create(array $data): Contato
    {
        return DB::transaction(function () use ($data) {
            $contactData = collect($data)
                ->except(['politica'])
                ->toArray();

            $contact = Contato::create($contactData);

            // $this->sendEmail($data);

            return $contact;
        });
    }

    // protected function sendEmail(array $data): void
    // {

    //     Mail::send('emails.contact', $data, function ($message) {
    //         $message->from('naoresponder@pousadacastellobenvenutti.com.br', 'Pousada Castello Benvenutti')
    //                 ->to('atendimento@pousadacastellobenvenutti.com.br')
    //                 ->bcc(['rafael@8poroito.com.br'])
    //                 ->subject('Um novo contato foi enviado através do site!');
    //     });
    // }
}
