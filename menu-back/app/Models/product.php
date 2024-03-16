<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    protected $fillable = [
        'nama',
        'kategori',
        'harga',
        'gambar',
        'status', 
    ];

    use HasFactory;
}
