<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPembelian extends Model
{
    protected $fillable = [
        'invoice',
        'idproduct',
        'jml_pembelian',
        'total_harga'
    ];
    use HasFactory;

    public function Order(){
        return $this->belongsTo(Order::class, 'invoice', 'invoice');
    }
    public function Product(){
        return $this->hasMany(Product::class, 'id', 'idproduct');
    }
}
