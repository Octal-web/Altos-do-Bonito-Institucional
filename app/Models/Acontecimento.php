<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Acontecimento extends Model
{
    protected $table = 'acontecimentos';

    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    protected $fillable = ['*'];

    protected $guarded = ['id'];

    public function acontecimentosIdiomas()
    {
        return $this->hasMany(AcontecimentoIdioma::class);
    }
}
