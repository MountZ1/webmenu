import Image from "next/image"
export default function Cards(props){
    const { products } = props
    const renderedCard = [];
    function saveData(data){
      let memory = [];
      // let val = {"jumlah" : 1};
      // product.push
      const product = products.find((pd) => pd.id === data)
      const cartData = {
        id: product.id,
        nama: product.nama,
        harga: product.harga,
        jumlah: 1,
      }
      memory = JSON.parse(localStorage.getItem("cart")) || [];
      // const keranjang = JSON.parse(localStorage.getItem("cart"));
      const cekItem = memory.find((item) => item.id === product.id);
      if (cekItem !== undefined) {
        // Item already exists in cart, so increment its quantity
        cekItem.jumlah += 1;
      } else {
        // Item is not in cart, so add it
        memory.push(cartData);
      }

      localStorage.setItem("cart", JSON.stringify(memory));
    }
    // console.log("produknya: " , products);
    products.forEach(prod => {
      const itemStatus = prod.status == 0 || false ? true : false;
      renderedCard.push(
      <div key={prod.id} className="max-w-sm mx-auto bg-white rounded-xl border border-gray-300 overflow-hidden md:max-w-xl m-5 mt-4">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 items-stretch w-full object-fill md:w-48"
              src={`http://10.0.0.127:8000/storage/${prod.gambar}`} // Use prod.gambar for the image source
              alt="Event image"
              width={1080}
              height={1080}
              priority
            />
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{prod.nama}</div>
            <br/>
            <p className="text-gray-700 text-base">Harga: {prod.harga}</p>
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded mt-8" 
            disabled={itemStatus} 
            style={itemStatus ? {cursor: "not-allowed", backgroundColor: "#C7C8CC"} : {cursor: "pointer"}}
            onClick={() => saveData(prod.id)}>{itemStatus ? "Tidak Tersedia" : "Tambah"}</button>
          </div>
        </div>
      </div>
      )
    });
    return (
        <>
          {renderedCard}
        </>
    );
}