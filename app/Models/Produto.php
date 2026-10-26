<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    protected $table = 'produtos';

    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    public function produtosIdiomas()
    {
        return $this->hasMany(ProdutoIdioma::class);
    }

    public function produtosImagens()
    {
        return $this->hasMany(ProdutoImagem::class);
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
