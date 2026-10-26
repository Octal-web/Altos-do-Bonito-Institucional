<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categorias';

    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    protected $fillable = ['*'];

    protected $guarded = ['id'];

    public function categoriasIdiomas()
    {
        return $this->hasMany(CategoriaIdioma::class);
    }

    public function produtos()
    {
        return $this->hasMany(Produto::class);
    }
}
