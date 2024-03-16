<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        product::create([
            'nama' => 'Mie Ayam',
            'kategori' => 'mie',
            'harga' => 15000,
            'gambar' => 'mie-ayam.png'
        ]);
        product::create([
            'nama' => 'coba',
            'kategori' => 'coba',
            'harga' => 15000,
            'gambar' => 'perahu_kertas.jpg'
        ]);
    }
}
