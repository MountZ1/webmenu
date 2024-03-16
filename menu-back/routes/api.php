<?php

use App\Events\NewOrders;
use App\Http\Controllers\DetailPembelianController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::get('/products', [ProductController::class, 'index']);
Route::resource('/product', ProductController::class);
Route::patch('/product/{product}/status', [ProductController::class, 'updateStatus']);
Route::resource('/order', OrderController::class);
// Route::get('/order/neworder', [OrderController::class, 'newOrder']);
// Route::get('/detailorder', [DetailPembelianController::class, 'index']);

