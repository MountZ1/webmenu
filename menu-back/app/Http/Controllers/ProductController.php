<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreproductRequest;
use App\Http\Requests\UpdateproductRequest;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = product::orderBy(DB::raw("kategori = 'minuman'"), 'asc')->latest()->get();
        // $response = new StreamedResponse(function () {
        //     echo json_encode(product::orderBy('kategori')->get());
        // });
        // $response->headers->set('Content-Type', 'text/event-stream');
        // $response->headers->set('Cache-Control', 'no-cache, no-store, must-revalidate');
        // $response->headers->set('Pragma', 'no-cache');
        // $response->headers->set('Expires', '0');

        // return $response;
        return response()->json($product);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreproductRequest $request)
    {
        // $validate = $request->validated([
        //     'nama' => 'required',
        //     'kategori' => 'required',
        //     'harga' => 'required',
        //     'gambar' => 'image|file|max:5000',
        // ]);

        // if ($request->file('gambar')) {
        //     $validate['gambar'] = $request->file('gambar')->store('images');
        // }

        // product::create($validate);

        $validatedData = $request->validated();

        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('images');
            $validatedData['gambar'] = $gambarPath;
        }
    
        product::create($validatedData);
        return response()->json(['message' => 'success add product'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateproductRequest $request, product $product)
    {
        // if ($request->file('gambar')) {
        //     if($request->oldgambar){
        //         Storage::delete($request->oldgambar);

        //         $gambarPath = $request->file('gambar')->store('images');
        //         $validatedData['gambar'] = $gambarPath;
        //     }
        // }


        // $product->update([
        //     'nama' => $request->nama,
        //     'kategori' => $request->kategori,
        //     'harga' => $request->harga,
        //     'gambar' => $request->gambar,
        //     // 'status' => $request->status
        // ]);

        if ($request->hasFile('gambar')) {
            if ($request->oldgambar) {
                Storage::delete($request->oldgambar);
            }
            
            // Store the image in the storage directory
            $gambarPath = $request->file('gambar')->store('images');
    
            // Generate the public URL of the image
            // $publicUrl = Storage::url($gambarPath);
    
            // Update the product with the public URL
            $product->update([
                'nama' => $request->nama,
                'kategori' => $request->kategori,
                'harga' => $request->harga,
                'gambar' => $gambarPath,
            ]);
        } else {
            // If no new image is uploaded, retain the existing image URL
            $product->update([
                'nama' => $request->nama,
                'kategori' => $request->kategori,
                'harga' => $request->harga,
            ]);
        }

        return response()->json(['message' => 'success update product'], 200);
    }
    public function updateStatus(UpdateproductRequest $request, product $product){
        $product->update([
            'status' => $request->status
        ]);
        return response()->json(['message' => 'success update product'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(product $product)
    {
        if ($product->gambar) {
            Storage::delete($product->gambar);
        }

        product::destroy($product->id);
        return response()->json(['message' => 'success delete product'], 200);
    }
}
