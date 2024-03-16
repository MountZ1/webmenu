'use client'
import { useEffect, useReducer, useState } from "react";
import { Modal } from "@/components/modal";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Cart() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const router = useRouter();

    useEffect(() => {
      const keranjang = JSON.parse(localStorage.getItem("cart"));
      setData(keranjang);
    },[])

    const findIndex = (id) => {
      const cekIndex = data.findIndex((pd) => pd.id === id)
      return cekIndex;
    }

    const handleJumlah = (index, value) => {
      const cekIndex = findIndex(index)
      if (cekIndex !== -1) {
        const curentQuantitiy = data[cekIndex].jumlah;
        const newQuantity = curentQuantitiy + value;
        if (newQuantity < 1) {
          data[cekIndex].jumlah = 1;
        } else {
          data[cekIndex].jumlah = newQuantity;
        }
        setData([...data]);
        localStorage.setItem("cart", JSON.stringify(data));
      }
    }

    const totalHarga = () => {
      return data.reduce((total, item) => total + item.harga * item.jumlah, 0);
    }
    // console.log(data);
    const initialState = {
      nama: "",
      notelp: "",
      alamat: "",
      // total: 0,
      // order: [],
    }
    // console.log(totalHarga());
    const getFullDate = () => {
      const date = new Date();
      const fulldate = date.getDate().toString() + (date.getMonth() + 1).toString() + date.getFullYear().toString();
      return fulldate;
    }
    const random = Math.floor(Math.random() * 10000).toString();
    const formReducer = (state, event) => {
      return {
        ...state,
        invoice: "INV-" + getFullDate() + random.padStart(5, '0'),
        [event.name]: event.value,
        total: totalHarga(),
        order: data,
      }
    }
    const [storeState, dispatch] = useReducer(formReducer, initialState)
    const handleSubmit = (e) => {
      
      dispatch({
        name: e.target.name,
        value: e.target.value,
      })
      e.preventDefault();
      // await console.log(storeState);

     fetch('http://10.0.0.127:8000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'allowed_origins': '*',
            // 'allowed_origins': 'http://localhost:8100',
            'allowed_headers': '*',
            'Accept': 'application/json, text/plain, multipart/form-data',
            'setContentType': 'multipart/form-data',
        },
        body: JSON.stringify(storeState),
      }).then((response) => {
        return response.json()
      })
      
      const orderid = storeState.order;
      const storageData = JSON.parse(localStorage.getItem("cart") || '[]'); // Default to empty array
      const updatedStorageData = storageData.filter(item => !orderid.some(o => o.id === item.id));

      localStorage.setItem("cart", JSON.stringify(updatedStorageData));

      router.push('/')
    }

    const handleDelete = (index) => {
      const cekIndex = findIndex(index)
      // console.log(updateKeranjang)
      if (cekIndex !== -1) {
        data.splice(cekIndex, 1);
        setData([...data]);
        localStorage.setItem("cart", JSON.stringify(data));
      }
    }
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-16">
        <div className="h-auto w-2/3 box-content rounded-md shadow-xl bg-white">
          <h1 className="text-center text-4xl pt-4">Keranjang</h1>
          <br/>
          <div className="flex flex-col justify-center">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className=" w-full divide-y divide-gray-200 dark:divide-gray-700 px-4">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nama</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Harga</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Value</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 text-start uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() =>{
                        const row = [];
                        data.forEach(dt => {
                        row.push(    
                          <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800" key={dt.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{dt.nama}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{dt.harga}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{dt.jumlah}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                              <div className="border border-green-300 px-4 py-1 rounded-lg space-x-8">
                                <button type="button" className="inline-flex items-center gap-x-2 text-2xl font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => handleJumlah(dt.id, 1)}>+</button>
                                <button type="button" className="inline-flex items-center gap-x-2 text-2xl font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => handleJumlah(dt.id, - 1)}>-</button>
                              </div>
                              <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => handleDelete(dt.id)}>Delete</button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{dt.jumlah * dt.harga}</td>
                          </tr>
                        );
                      });
                      return row;
                      })()}
                    </tbody>
                  </table>
                  <hr/>
                  <div className="px-4">
                    <p className="text-end font-bold text-gray-800 dark:text-gray-200 pr-8">Total : {totalHarga()}</p>
                    <br/>
                    <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-8 rounded float-right" onClick={() => setOpen(true)}>Pesan</button>

                    <Modal open={open} onClose={() => setOpen(false)}>
                      <div className="text-center w-2/3">
                        <div className="mx-auto my-4 w-60">
                          <h3 className="text-lg font-black text-gray-800 pt-0">Confirm Order</h3>
                          <form onSubmit={handleSubmit}>
                            <input 
                            type="text" 
                            name="nama" 
                            placeholder="Nama Pemesan" 
                            className="my-2" 
                            value={storeState.nama} 
                            onChange={(e) => dispatch({ name: e.target.name, value: e.target.value })} 
                            required/>
                            <input 
                            type="text" 
                            name="notelp" 
                            placeholder="No. Telp" 
                            className="my-2" 
                            value={storeState.notelp} 
                            onChange={(e) => dispatch({ name: e.target.name, value: e.target.value })} 
                            required/>
                            <input 
                            type="text" 
                            name="alamat" 
                            placeholder="Alamat" 
                            className="my-2" 
                            value={storeState.alamat} 
                            onChange={(e) => dispatch({ name: e.target.name, value: e.target.value })} 
                            required/>
                            <input 
                            type="text" 
                            name="totals" 
                            readOnly 
                            value={"Total: " + totalHarga()} 
                            className="my-2" />
                        <div className="flex gap-4">
                          <button className="btn btn-danger w-full" type="submit">Pesan</button>
                          <button
                            className="btn btn-light w-full"
                            onClick={() => setOpen(false)}
                          >
                            Close
                          </button>
                        </div>
                          </form>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br/>
        </div>
      </main>
    );
}