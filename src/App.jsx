//import { useState } from 'react'

import { useState, useEffect } from "react";

const item = [
  {
    id_: 1,
    namaProduk: "Tomat segar",
    satuan: "Kg", //selain kg ada satuan  seperti liter dan lainnya. value dari satuan boleh dikosongkan jika produk memang ingin dijual per unit bukan per satuan
    hargaSatuUnit: "17.000", //harga per unit atau per satuan
    urlGambarProduk: "/tomat.png",
    deskripsi: "Tomat segar untuk bahan masakan anda",
    diskon: "", //masukkan harga setelah diskon misal harga awal 17.000 diskon menjadi 12.000 jika tidak ada diskon boleh dikosongkan
  },
  {
    id_: 2,
    namaProduk: "Kunci Nomor 24/27",
    satuan: "",
    hargaSatuUnit: "35.000",
    urlGambarProduk: "/wrench2.png",
    deskripsi: "lorem ipsum",
    diskon: "",
  },
  {
    id_: 3,
    namaProduk: "Samsung J2 Prime",
    satuan: "",
    hargaSatuUnit: "520.000",
    urlGambarProduk: "/j2prime.png",
    deskripsi:
      "Samsung Galaxy J2 Prime adalah smartphone yang dirilis pada tahun 2016. Smartphone ini memiliki layar 5 inci, kamera belakang 8 MP, dan kamera depan 5 MP",
    diskon: "480.000",
  },
  {
    id_: 4,
    namaProduk: "Kaos",
    satuan: "",
    hargaSatuUnit: "45.000",
    urlGambarProduk: "/kaos abu.png",
    deskripsi:
      "Kaos ini terbuat dari bahan katun asli yang lembut, nyaman dipakai, dan ringan",
    diskon: "",
  },
];

export default function App() {
  const [cart, setCart] = useState([""]);

  useEffect(() => {
    const ambilDataLocal = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')):[]
    console.log(cart);
    console.log(ambilDataLocal);
   setCart(ambilDataLocal);
  }, []);
  return (
    <>
      <Navbar cart={cart} setCart={setCart} />
      <section className="xs:mt-7 p-4 lg:mt-4">
        <div className="bg-[url(/Amimoy/hero-bg-4.jpg)] rounded-xl w-full xs:h-52 md:h-90 bg-cover relative flex text-center  flex-wrap lg:h-100 ">
          <h1 className="text-white xs:text-xl md:text-3xl font-semibold w-124 px-4 h-17 text-center tracking-[12px] mt-12 font-oswald w-full">
            AYO BELANJA DISINI{" "}
          </h1>
          <h2 className="font-p2 text-white mb-32 xs:text-xs  text-center w-full md:text-xl ">
            Mulai dari Rp10.000
          </h2>
        </div>
        <div className="flex justify-between mt-3 px-2 " id="menu">
          <div className="flex justify-center flex-wrap w-27 text-center hover:cursor-pointer">
            <img
              src="/Amimoy/vegetable.png"
              alt="veget"
              className="w-15 h-15 lg:w-25 lg:h-25"
            />
            <p>Bahan Makanan</p>
          </div>
          <div className="flex justify-center flex-wrap w-27 text-center hover:cursor-pointer">
            <img
              src="/tool.png"
              alt="tool"
              className="w-15 h-15  lg:w-25 lg:h-25"
            />
            <p className="pb-6">Peralatan</p>
          </div>
          <div className="flex justify-center flex-wrap w-27 text-center hover:cursor-pointer">
            <img
              src="/electronics.png"
              alt="electro"
              className="w-15 h-15 lg:w-25 lg:h-25"
              />
            <p className="pb-6">Elektronik</p>
          </div>
          <div className="flex justify-center flex-wrap w-27 text-center hover:cursor-pointer">
            <img
              src="/laundry.png"
              alt="clothes"
              className="w-15 h-15 lg:w-25 lg:h-25"
            />
            <p className="pb-6">Pakaian</p>
          </div>
        </div>
      </section>
      <Card cart={cart} setCart={setCart} />
    </>
  );
}

function Navbar({ cart, setCart }) {
  const [isHidden, setIsHidden] = useState(true);
  
  function keranjang(element) {
    setIsHidden(!isHidden);
    
  }
  
  //fungsi pilih semua di cart
  function pilihSemua(){
    
    const toChecked = cart.map((itm)=>{
      return {...itm,checked:true}
    })
    
    setCart(toChecked)
  }
  

  function pilihSalahSatu(id,index){


    
const ubahCheck = cart.map((itm,ind)=>{
  if(ind == index){
    return {...itm,checked:!itm.checked}
  }
  return itm
  
})



setCart(ubahCheck)
}



//hapus product dalam keranjang
function deleteProductCart(){
  const produkHapus = cart.filter((itm)=>{
    return itm.checked !== true
  })
  localStorage.setItem('cart', JSON.stringify(produkHapus))
  setCart(produkHapus);
}




return (
  <nav className="p-5 flex justify-between w-full relative overflow-x-clip">
      <div className="flex">
        <img src="/icon.png" alt="ikon" className="w-8 h-8" />
        <h1 className="text-2xl font-oswald tracking-widest">Amimoy</h1>
      </div>
      <div className="w-60 mr-3  flex justify-end">
     
        <div id="cart"
          className="w-12 h-10 ml-3  hover:bg-slate-100 hover:cursor-pointer  relative "
          onClick={(e)=>keranjang(e)}
          >
          <img
            src="/cart.png"
            alt="cart"
            className="w-12 h-12  hover:opacity-80"
            />
          <span className={`bg-red-400 text-white rounded-full ${cart.length?'block':'hidden'} w-4 h-4 text-center text-xs absolute top-0 -right-1`}>{cart.length}</span>
        </div>
      </div>
      <div
        className={`bg-white shadow-xl w-100 top-15  right-0  absolute duration-300 z-999  pt-4 pb-1 rounded-md ${isHidden ? "translate-x-110" : ""}`}
      >
        <ul className={`bg-white overflow-y-scroll h-90 even:bg-slate-200 ${cart[0] == ''|| cart.length == 0? 'flex justify-center items-center ' :""  }`}>

          {cart[0] == ''|| cart.length == 0? <div className="flex flex-wrap justify-center">
            <img src="/pngegg.png" alt="halo" className="w-25 h-25 opacity-80 "/> 
            <h2 className="w-full text-center font-inter text-gray-500  ">Keranjang Kosong</h2>
          </div>
          :
          
          cart.map((itmCart, index) => {
            return(

            <li className={`flex items-center justify-between py-4 px-2 ${(index+1) % 2 !== 0 ? "bg-stone-100":"bg-white"}`} key={itmCart.id}>
              <img src={itmCart.url} alt="product" className="w-12 h-12" />
              <p className="font-inter  ">{itmCart.nama}</p>
              <span className="font-inter">{itmCart.harga}</span>
              <input type="checkbox" name="checkout" className="w-5 h-5" checked={itmCart.checked} onChange={(e)=>pilihSalahSatu(itmCart.id,index)} />
            </li>
            )
          })
          }
        </ul>
        <div className="w-full p-4 shadow-2xl flex justify-around">
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md w-1/2 hover:cursor-pointer hover:bg-blue-700 hover:text-slate-200">
            Checkout
          </button>
          <button className="  hover:text-red-400  hover:cursor-pointer  rounded-md px-3 1/4 " onClick={pilihSemua}>
            Pilih Semua
          </button>
          <button className="hover:cursor-pointer text-red-600 active:text-red-400" onClick={deleteProductCart}>
            Hapus
          </button>
        </div>
      </div>
    </nav>
  );
}













function Card({ cart, setCart }) {
  const [product, setProduct] = useState({
    id_: "",
    namaProduk: "",
    satuan: "",
    hargaSatuUnit: "",
    urlGambarProduk: "/",
    deskripsi: "",
    diskon: "",
  });

  const [isHidden, setIsHidden] = useState("hidden");
  

const [status , setStatus] = useState("hidden")
  


  function tambahKeranjang(id,e) {
  setStatus("")

  const element = document.getElementById(id);
element.classList.remove('hidden')
e.target.classList.add('hidden')

    const [filtered] = item.filter((itm) => itm.id_ == id);
    
   setCart('hidden')
 
setTimeout(()=>{e.target.classList.remove('hidden')
  setStatus('hidden');
  element.classList.add('hidden')
},1000)



    const cartBaru = {
      id: new Date().getTime(),
      url: filtered.urlGambarProduk,
      nama: filtered.namaProduk,
      harga: filtered.diskon ? filtered.diskon : filtered.hargaSatuUnit,
      checked: false,
    };
    //simpan ke localStorage

    const itembaru = cart[0] !== "" ? [...cart, cartBaru] : [cartBaru];
    localStorage.setItem('cart',JSON.stringify(itembaru));

    setCart(itembaru);
    
  }

  function modalProduct(id) {
    setIsHidden("");

    const clickedItem = item.filter((im) => im.id_ == id);

    setProduct(...clickedItem);

    
  }





  
  
  return (
    <>
      <section className="mt-2 p-4 " id="produk">
        <div className="w-full p-2 flex">

        <h2 className="w-2/3 text-center font-inter text-2xl tracking-widest lg:text-4xl">
          Semua Produk
        </h2>
        <input
          type="text"
          className="w-1/3 focus:outline-none rounded-xl px-4 py-1 shadow-2xl bg-slate-200 hover:bg-white ring-1 ring-slate-300 focus:bg-white"
          placeholder="Cari produk...  "
          />
        </div>
        <div className="w-full flex flex-wrap mt-12 justify-around ">
          {item.map((itm) => {
            return (
              <div
                className="w-60 rounded-md  ring-1 ring-slate-300 p-4  mb-5 relative"
                key={itm.id_}
              >
                {itm.diskon ? (
                  <div className="absolute bg-green-500 text-white rounded-sm top-0 left-0">
                    Diskon{" "}
                    {Math.round(
                      ((itm.hargaSatuUnit - itm.diskon) / itm.hargaSatuUnit) *
                        100,
                    )}
                    %
                  </div>
                ) : (
                  ""
                )}

                <img
                  src={itm.urlGambarProduk}
                  alt="tomat"
                  className="h-[160px] w-[208px]"
                />
                <h3
                  className={`font-inter  text-md ml-2 w-1/2  ${itm.diskon ? "line-through italic" : ""}`}
                >
                  Rp{itm.hargaSatuUnit}
                </h3>
                {itm.diskon ? (
                  <span
                    id="hargaDiskon"
                    className="absolute right-10 bottom-28 font-inter text-md"
                  >
                    Rp{itm.diskon}
                  </span>
                ) : (
                  ""
                )}

                <h2 className="text-lg ml-2 tracking-[1px]  font-inter">
                  {itm.namaProduk}
                </h2>
                <div className="flex mt-4 relative">
                  <button
                    className="rounded-2xl border-1 rounded-xl w-full py-1 font-semibold  text-center text-sm  hover:bg-black hover:text-white hover:cursor-pointer "
                    onClick={() => modalProduct(itm.id_)}
                  >
                    Beli Sekarang
                  </button>
               <img
                    src="/cart.png"
                    alt="cartAdd"
                    className="w-13 h-13 hover:cursor-pointer"
                    onClick={(e) => tambahKeranjang(itm.id_,e)}
                
                    />

                 <img src="/check.png" className="w-13 h-13 hidden" id={itm.id_}/>
                </div>
              </div>
            );
          })}
        </div>

     
{/*status*/}

<div className={`${status?status:'fixed'} bg-white rounded-xl z-99999999 top-50 left-1/2 w-40  h-32 ring-1 ring-black -translate-x-11 flex justify-center flex-wrap p-2`}>
<img src="/check.png" alt="check" />
 <p className="text-xs font-inter text-center">Berhasil Ditambahkan Ke Keranjang</p>
</div>


      </section>
      <div
        className={`fixed   w-full p-10   top-10  w-full z-99999999   rounded-lg  duration-400 overflow-y-hidden ${isHidden ? " -translate-y-180" : ""} `}
      >
        <div
          className={`bg-stone-100 w-full h-120 relative rounded-xl duration-400  ${isHidden ? " -translate-y-150" : ""} shadow-2xl p-8`}
          >
          {product.diskon ? (
            <span
            id="hargaDiskon"
              className="absolute right-70 top-31 font-inter text-xl "
            >
              Rp{product.diskon}
            </span>
          ) : (
            ""
          )}
          <span
            className="bg-red-600 rounded-full h-7 w-7 text-white absolute text-center -right-4 -top-4 hover:cursor-pointer "
            onClick={() => setIsHidden("hidden")}
          >
            x
          </span>
          <div className="flex w-full justify-between">
            <div className="w-120 h-120 ">
              <img src={product.urlGambarProduk} alt="item" className="h-100" />
            </div>
            <div className="w-120 h-120 mt-8">
              <h1 className="font-inter text-2xl">
                {product.namaProduk.toUpperCase()}
              </h1>
              <div className="mt-7">
                <h2
                  className={`text-xl ${product.diskon ? "line-through italic" : ""}`}
                >
                  Rp
                  {product.satuan
                    ? product.hargaSatuUnit + "/" + product.satuan
                    : product.hargaSatuUnit}
                </h2>
                <div className="flex mt-4">
                  <button className="rounded-2xl border-1 rounded-xl w-full py-1 font-semibold  text-center text-sm  hover:bg-black hover:text-white hover:cursor-pointer">
                    Checkout
                  </button>
                  <img
                    src="/cart.png"
                    alt="cartAdd"
                    className="w-13 h-13 hover:cursor-pointer "
                    onClick={(e)=>tambahKeranjang(product.id_,e)}
                  />
                </div>
                <p className="font-inter">{product.deskripsi}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
