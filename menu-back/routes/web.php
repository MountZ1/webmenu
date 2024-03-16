<?php

use App\Events\NewOrders;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    // NewOrders::dispatch('Hello');
    return view('welcome');
});
// Route::get('/product', [ProductController::class, 'index']);
// Route::put('/product/{product}', [ProductController::class, 'update']);
