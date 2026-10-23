<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ValorIdioma extends Model
{
    protected $table = 'valores_idiomas';

    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    public function valor()
    {
        return $this->belongsTo(Valor::class);
    }

    public function idiomas()
    {
        return $this->belongsTo(Idioma::class, 'idioma_id');
    }
}
