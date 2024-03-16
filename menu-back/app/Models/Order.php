<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'invoice',
        'nama_customer',
        'no_telp',
        'alamat',
        'status',
        'total',
    ];

    use HasFactory;

    public function detailPembelians(){
        return $this->hasMany(DetailPembelian::class, 'invoice', 'invoice');
    }
}
