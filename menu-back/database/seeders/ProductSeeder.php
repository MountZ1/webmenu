<?php

namespace Database\Seeders;

use App\Models\product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        product::create([
            'nama' => 'Mie Ayam',
            'harga' => 15000,
            'gambar' => 'mie-ayam.png'
        ]);
        product::create([
            'nama' => 'coba',
            'harga' => 15000,
            'gambar' => 'perahu_kertas.jpg'
        ]);
    }
}
