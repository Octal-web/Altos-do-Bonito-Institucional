<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfissionalIdioma extends Model
{
    protected $table = 'profissionais_idiomas';

    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    public function profissional()
    {
        return $this->belongsTo(Profissional::class);
    }

    public function idiomas()
    {
        return $this->belongsTo(Idioma::class, 'idioma_id');
    }
}
