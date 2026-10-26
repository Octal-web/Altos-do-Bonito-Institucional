<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProdutoImagem extends Model
{
    protected $table = 'produtos_imagens';

    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';

    public function produto()
    {
        return $this->belongsTo(Produto::class);
    }
}
