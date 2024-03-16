<?php

namespace App\Http\Controllers;

use App\Events\NewOrders;
use App\Models\Order;
use App\Models\DetailPembelian;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\product;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $order = Order::with('detailPembelians.Product')->latest()->get();

        $transformedOrders = $order->map(function ($order) {
            return [
                'id' => $order->id,
                'invoice' => $order->invoice,
                'nama_customer' => $order->nama_customer,
                'no_telp' => $order->no_telp,
                'alamat' => $order->alamat,
                'status' => $order->status,
                'total' => $order->total,
                'detail_pembelians' => $order->detailPembelians->map(function ($detailPembelian) {
                    return [
                        'nama_product' => $detailPembelian->Product->pluck('nama')->implode(', '),
                        'jml_pembelian' => $detailPembelian->jml_pembelian
                    ];
                })
            ];
        });
        // event(new NewOrders($transformedOrders));
        return response()->json($transformedOrders, 200);
        // NewOrders::dispatch($transformedOrders);

        // header('Content-Type: text/event-stream');
        // header('Cache-Control: no-cache');
        // $response = response()->json($transformedOrders, 200);
        // $response->header('Content-Type', 'event-stream');
        // $response->header('Cache-Control', 'no-cache');
        // $response->header('Connection', 'keep-alive');
        // // $response->body('event: message\ndata: ' . json_encode($transformedOrders) . "\n\n");
        // echo "data: " . $response . "\n\n";

        // header('Content-Type: text/event-stream');
        // header('Cache-Control: no-cache');
    
        // // Send SSE data to the client
        // foreach ($transformedOrders as $order) {
        //     echo "data: " . json_encode($order) . "\n\n";
        //     ob_flush();
        //     flush();
        //     sleep(1); // Optional: You can add delay between each event
        // }
        // return response()->stream(function () use ($transformedOrders) {
        //     foreach ($transformedOrders as $order) {
        //         echo "data: " . json_encode($order) . "\n\n";
                
        //         ob_flush();
        //         flush();
        //         if (connection_aborted()){
        //             break;
        //         }
        //         usleep(1000);
        //     }
        // }, 200, [
        //     'Content-Type' => 'text/event-stream',
        //     'Cache-Control' => 'no-cache',
        //     'Connection' => 'keep-alive',
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * 
     */

    public function store(StoreOrderRequest $request)
    {
        try {
            DB::beginTransaction();
            Order::create([
                'invoice' => $request->invoice,
                'nama_customer' => $request->nama,
                'no_telp' => $request->notelp,
                'alamat' => $request->alamat,
                'status' => 'pending',
                'total' => $request->total
            ]);

            foreach ($request->order as $item) {
                DetailPembelian::create([
                    'invoice' => $request->invoice,
                    'idproduct' => $item['id'],
                    'jml_pembelian' => $item['jumlah'],
                ]);
            }
            DB::commit();

            $this->newOrder($request->invoice);

            return response()->json(['message' => 'success add order'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to add order'], 500);
        }
        
    }

    public function newOrder($invoice){
        $newOrder = Order::where('invoice', $invoice)->get();
        $newOrders = $newOrder->map(function ($order) {
            return [
                'id' => $order->id,
                'invoice' => $order->invoice,
                'nama_customer' => $order->nama_customer,
                'no_telp' => $order->no_telp,
                'alamat' => $order->alamat,
                'status' => $order->status,
                'total' => $order->total,
                'detail_pembelians' => $order->detailPembelians->map(function ($detailPembelian) {
                    return [
                        'nama_product' => $detailPembelian->Product->pluck('nama')->implode(', '),
                        'jml_pembelian' => $detailPembelian->jml_pembelian
                    ];
                })
            ];
        });

        NewOrders::dispatch($newOrders);
    }
    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $order->update([
            'status' => $request->status
        ]);
        $this->newOrder($request->invoice);
        return response()->json(['message' => 'success update order'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
