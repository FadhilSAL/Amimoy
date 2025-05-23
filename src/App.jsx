//import { useState } from 'react'
import item from './product'
import { useState, useEffect } from "react";



export default function App() {
  const [cart, setCart] = useState([""]);
  const [menu, setMenu] = useState(""); //state yang berisi menu pilihan user(bahan makanan,peralatan,dan lainnya )
  useEffect(() => {
    const ambilDataLocal = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    
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
              className="w-15 h-15 lg:w-25 lg:h-25 active:opacity-50"
              onClick={() => setMenu("bahan makanan")}
            />
            <p>Bahan Makanan</p>
          </div>
          <div className="flex justify-center flex-wrap w-27 text-center hover:cursor-pointer">
            <img
              src="/Amimoy/tool.png"
              alt="tool"
              className="w-15 h-15  lg:w-25 lg:h-25 active:opacity-50"
              onClick={() => setMenu("peralatan")}
            />
            <p className="pb-6">Peralatan</p>
          </div>
          <div className="flex justify-center flex-wrap w-27 text-center hover:cursor-pointer">
            <img
              src="/Amimoy/electronics.png"
              alt="electro"
              className="w-15 h-15 lg:w-25 lg:h-25 active:opacity-50"
              onClick={() => setMenu("elektronik")}
            />
            <p className="pb-6">Elektronik</p>
          </div>
          <div className="flex justify-center flex-wrap w-27 text-center hover:cursor-pointer">
            <img
              src="/Amimoy/laundry.png"
              alt="clothes"
              className="w-15 h-15 lg:w-25 lg:h-25 active:opacity-50"
              onClick={() => setMenu("pakaian")}
            />
            <p className="pb-6">Pakaian</p>
          </div>
        </div>
      </section>
      <Card cart={cart} setCart={setCart} menu={menu} setMenu={setMenu} />

    </>
  );
}

function Navbar({ cart, setCart }) {
  const [isHidden, setIsHidden] = useState(true);
const [total,setTotal] = useState('');





  function keranjang() { //ketika keranjang diklik tampilkan sebuah komponen berisi produk yang disimpan ke keranjang
    setIsHidden(!isHidden);
  }

  //fungsi pilih semua di cart
  function pilihSemua() { //checklist semua produk yang ada di keranjang/cart
    const toChecked = cart.map((itm) => {
      return { ...itm, checked: true };
    });
    
    const harga = toChecked.reduce((acc,itm)=>{
      const hargaNumber = parseInt(itm.harga.toString().replace(/\./g,''));
     if(itm.checked){
       return acc + hargaNumber
     }
    else{
    
      return acc + 0
    }
     },0)
  
     setTotal(harga)
    setCart(toChecked);
  }

  function pilihSalahSatu(id, index) {//checklist salahsatu produk yang dipilih
    const ubahCheck = cart.map((itm, ind) => {
      if (ind == index) {
        return { ...itm, checked: !itm.checked };
      }
      return itm;
    });


   const harga = ubahCheck.reduce((acc,itm)=>{
    const hargaNumber = parseInt(itm.harga.toString().replace(/\./g,''));
   if(itm.checked){
     return acc + hargaNumber
   }
  else{
  
    return acc + 0
  }
   },0)

   setTotal(harga)
    setCart(ubahCheck);
  }

  //hapus product dalam keranjang
  function deleteProductCart() { 
    const produkHapus = cart.filter((itm) => {//hapus produk yang dichecklist
      return itm.checked !== true;
    });
    localStorage.setItem("cart", JSON.stringify(produkHapus));//simpan produk yang tersisa ke localstorage
    setCart(produkHapus); 
    setTotal(0);
  }

  return (
    <nav className="p-5 flex justify-between w-full relative overflow-x-clip">
      <div className="flex">
        <img src="/Amimoy/icon.png" alt="ikon" className="w-8 h-8" />
        <h1 className="text-2xl font-oswald tracking-widest">Amimoy</h1>
      </div>
      <div className="w-60 mr-3  flex justify-end">
        <div
          id="cart"
          className="w-12 h-10 ml-3  hover:bg-slate-100 hover:cursor-pointer  relative "
          onClick={(e) => keranjang(e)}
        >
          <img
            src={`/Amimoy/cart.png`}
            alt="cart"
            className="w-12 h-12  hover:opacity-80"
          />
          <span
            className={`bg-red-400 text-white rounded-full ${cart.length ? "block" : "hidden"} w-4 h-4 text-center text-xs absolute top-0 -right-1`}
          >
            {cart.length}
          </span>
        </div>
      </div>
      <div
        className={`bg-white shadow-xl w-100 top-15  right-0  absolute duration-300 z-999  pt-4 pb-1 rounded-md ${isHidden ? "translate-x-110" : ""}`}
      >
        <ul
          className={`bg-white overflow-y-scroll h-90 even:bg-slate-200 ${cart[0] == "" || cart.length == 0 ? "flex justify-center items-center " : ""}`}
        >
          {cart[0] == "" || cart.length == 0 ? (
            <div className="flex flex-wrap justify-center">
              <img
                src="/Amimoy/pngegg.png"
                alt="halo"
                className="w-25 h-25 opacity-80 "
              />
              <h2 className="w-full text-center font-inter text-gray-500  ">
                Keranjang Kosong
              </h2>
            </div>
          ) : (
            cart.map((itmCart, index) => {
              return (
                <li
                  className={`flex items-center justify-between py-4 px-2 ${(index + 1) % 2 !== 0 ? "bg-stone-100" : "bg-white"}`}
                  key={itmCart.id}
                >
                  <img
                    src={"/Amimoy/" + itmCart.url}
                    alt="product"
                    className="w-12 h-12"
                  />
                  <p className="font-inter  ">{itmCart.nama}</p>
                  <span className="font-inter">{itmCart.harga}</span>
                  <input
                    type="checkbox"
                    name="checkout"
                    className="w-5 h-5"
                    checked={itmCart.checked}
                    onChange={(e) => pilihSalahSatu(itmCart.id, index)}
                  />
                </li>
              );
            })
          )}
        </ul>
        <div className="w-full p-3"><h2 className="text-xxl font-inter">Total : {!total? 'Rp.0':'Rp'+total.toLocaleString("id-Id")}</h2></div>
        <div className="w-full p-4 shadow-2xl flex justify-around">
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md w-1/2 hover:cursor-pointer hover:bg-blue-700 hover:text-slate-200">
            Checkout
          </button>
          <button
            className="  hover:text-red-400  hover:cursor-pointer  rounded-md px-3 1/4 "
            onClick={pilihSemua}
          >
            Pilih Semua
          </button>
          <button
            className="hover:cursor-pointer text-red-600 active:text-red-400"
            onClick={deleteProductCart}
          >
            Hapus
          </button>
        </div>
      </div>
    </nav>
  );
}

function Card({ cart, setCart, menu, setMenu }) {
  const [product, setProduct] = useState({ //default produk /item
    id_: "",
    namaProduk: "",
    satuan: "",
    hargaSatuUnit: "",
    urlGambarProduk: "/",
    deskripsi: "",
    diskon: "",
  });
  
  const [filtered, setFiltered] = useState(""); //state  untuk menyimpan kumpulan produk / item yang sudah difilter dan akan ditampilkan 
  const [current, setCurrent] = useState(""); //state untuk menyimpan nyimpan produk sebelum difilter 
  
  const [isHidden, setIsHidden] = useState("hidden");
  
  const [status, setStatus] = useState("hidden");



  useEffect(() => {//dijalankan setiap state menu berubah

    if (menu == "") { //ketika  menu = kosong atau ketika semua produk  ditampilkan 
      setFiltered(item); //set semua item yang ada dalam item atau simpelnya untuk menampilkan semua item
      setCurrent(item); //simpan sebagai produk saat ini
    } else if (menu) {// ketika user memilih salah satu menu misalnya bahan makanan atau lainnya
 
      filtrasiItem(menu);//menjalankan fungsi untuk memfilter produk sesuai dengan menu
    }
  }, [menu]);

  function filtrasiItem(jenis) {//fungsi untuk filter product sesuai dengan jenisnya atau menu yang dipilih user, fungsi ini dijalankan ketika state menu tidak sama dengan ""
    const filt = item.filter((itm, i) => {
      return itm.jenis == jenis;
    });

    setFiltered(filt);//simpan ke state filtered dan akan menampilkan produk yang sudah di filter sesuai dengan jenisnya
    setCurrent(filt);// simpan ke current untuk produk saat ini
  }

  function cariProduk(e) {//fungsi yang dijalankan ketika input cari diisi 
    const filt = item.filter((itm, i) => {//filter produk yang jenisnya sama dengan menu yang dipilih user 
      return itm.jenis == menu;
    });

    if (!e.target.value) {
      setFiltered(current); //jika input kosong
    } 
    else if (filt.length == 0 && e.target.value) { //jika user tidak memilih suatu menu alias ketika semua produk ditampilkan dan e.target.value diisi sesuai dengan 
      const itf = item.filter((itm) => { //filter seluruh item sesuai dengan nama produk
        return itm.namaProduk.toLowerCase() == e.target.value.toLowerCase();
      });
      setFiltered(itf); //set itm yang sudah difilter sesuai dengan nama 
    } else if (filt && e.target.value) {//jika user memilih menu  tertentu dan e.target.value diisi
      const itf = filt.filter((itm) => {//filt berisi produk yang sudah difilter sesuai jenis atau menu yang dipilih user , difilter lagi sesuai dengan nama produk yang diketik user
        return itm.namaProduk.toLowerCase() == e.target.value.toLowerCase();
      });
      setFiltered(itf);//simpan hasil filter
    }
  }


  function tambahKeranjang(id, e) {//tambahkan item ke keranjang sesuai dengan idnya
    setStatus("");//ketika di set menjadi "" maka akan membuat sebuah alert "berhasil ditambahkan ke keranjang "
    
    const element = document.getElementById(id); //ambil element gambar checklist yang sesuai dengan id
    const el2 = ".a" + id; 
    let element2;
    if (!isHidden) {//dijalankan ketika kita mengklik "beli sekarang" lalu kita menglik keranjang
      element2 = document.querySelector(el2); //ambil element yang classnya sesuai dengan el2
      console.log(element2)
      if(e.target.classList.contains('b'+id)){
         document.querySelector('.c'+id).classList.add('hidden')
      }
      if(element){
        element.classList.remove('hidden');
        
        const b2 = document.querySelector('.b'+id);
        console.log(b2)
        if(b2){
          element2.classList.remove('hidden');
          b2.classList.add('hidden');
        
        }
       if(e.target.classList.contains('c'+id)){
        
        e.target.classList.add('hidden');

       }
      }


      else if (element2) { //jika elent  berisi kelas tertentu
        element2.classList.remove("hidden");//hapus classss hidden agar menampilkan gambar checklist di element 2 atau cart yang ada pada modal
        e.target.classList.add("hidden");//sembunyikan cart
      }
    } else {
      element.classList.remove("hidden");//hapus class hidden pada element agar menampilkan checklist
      e.target.classList.add("hidden");//sembunyikan cart
    }

    setTimeout(() => {
      e.target.classList.remove("hidden");//tampilkan cart lagi setelah 1 detik
      setStatus("hidden");//sembunyikan alert "berhasil ditambahkan ke keranjang" setelah 1 detik
      element.classList.add("hidden");// sembunyikan checklist setelah 1 detik
      
      if (!isHidden) {//ketiak modal produk tampil
        
        const elem = document.querySelector('.a'+id)
        if(elem){

          elem.classList.add("hidden"); //sembunyikan element2 alias checklist pada modal produk 
        }
        const b2 = document.querySelector('.b'+id);
        if(b2){

          b2.classList.remove('hidden');
        }
         const crt = document.querySelector('.c'+id);
        if(crt){
          crt.classList.remove('hidden')
        }
    
      }
    }, 1000);


   // console.log(element2);
   // console.log(element);

    const [filtered] = item.filter((itm) => itm.id_ == id); // 

    setCart("hidden");


    const cartBaru = {
      id: new Date().getTime(),
      url: filtered.urlGambarProduk,
      nama: filtered.namaProduk,
      harga: filtered.diskon ? filtered.diskon : filtered.hargaSatuUnit,
      checked: false,
    };
    //simpan ke localStorage

    const itembaru = cart[0] !== "" ? [...cart, cartBaru] : [cartBaru];
    localStorage.setItem("cart", JSON.stringify(itembaru));

    setCart(itembaru);
  }

  function modalProduct(id) {
    setIsHidden("");//ketika di set menjadi "" akan menampilkan sebuah modal yang berisi tentang produk keranjang dan checkout

    const clickedItem = item.filter((im) => im.id_ == id);

    setProduct(...clickedItem);
  }

  function semuaProduk() {
    const element = document.getElementById("redo");

    element.classList.add("-rotate-120");

    setTimeout(() => {
      element.classList.remove("-rotate-120");
      setMenu("");
    }, 500);
  }

  return (
    <>
      <section className="mt-2 p-4 " id="produk">
        <div className="w-full p-2 flex relative">
          {menu ? (
            <img
              src="/Amimoy/return.png "
              alt="return"
              className="w-12 h-12 duration-300 hover:cursor-pointer absolute"
              id="redo"
              onClick={semuaProduk}
            />
          ) : (
            ""
          )}

          <h2 className="w-2/3 text-center font-inter text-2xl tracking-widest lg:text-4xl">
            {menu ? menu.toUpperCase() : "SEMUA PRODUK"}
          </h2>
          <input
            type="text"
            className="w-1/3 focus:outline-none rounded-xl px-4 py-1 shadow-2xl bg-slate-200 hover:bg-white ring-1 ring-slate-300 focus:bg-white"
            placeholder="Cari produk...  "
            onChange={(e) => {
              cariProduk(e);
            }}
          />
        </div>

        <div
          className={`w-full flex flex-wrap mt-12 xs:justify-around  lg:justify-start ${filtered ? "h-70" : "h-150"}`}
        >
          {(filtered ? filtered : item).map((itm) => {
            return (
              <div
                className="w-60 rounded-md  ring-1 ring-slate-300 p-4  mb-5 relative lg:mx-7 "
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
                  src={"/Amimoy" + itm.urlGambarProduk}
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
                    className="rounded-2xl border-1 rounded-xl w-full py-1 font-semibold active:bg-black active:text-white text-center text-sm  hover:bg-black hover:text-white hover:cursor-pointer "
                    onClick={() => modalProduct(itm.id_)}
                  >
                    Beli Sekarang
                  </button>
                  <img
                    src="/Amimoy/cart.png"
                    alt="cartAdd"
                    className={`w-13 h-13 hover:cursor-pointer ${'c'+itm.id_} `}
                    onClick={(e) => tambahKeranjang(itm.id_, e)}
                  />

                  <img
                    src="/Amimoy/check.png"
                    className="w-13 h-13 hidden"
                    id={itm.id_}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/*status*/}

        <div
          className={`${status ? status : "fixed"} bg-white rounded-xl z-99999999999999 md:top-50 xs:top-1/2 left-1/2 w-40  h-32 ring-1 ring-black md:-translate-x-11 xs:-translate-x-20 flex justify-center flex-wrap p-2`}
        >
          <img src="/Amimoy/check.png" alt="check" />
          <p className="text-xs font-inter text-center">
            Berhasil Ditambahkan Ke Keranjang
          </p>
        </div>
      </section>
      <div
        className={`fixed   w-full p-10   top-10  w-full z-99999999   rounded-lg  duration-400  xs:bg-white  md:bg-transparent ${isHidden ? " -translate-y-180" : ""} `}
      >
        <span
          className="bg-red-600 rounded-full h-7 w-7 text-white absolute text-center xs:right-0 xs:-top-4 md:right-2 md:top-6 z-999999999999 md:right-6 hover:cursor-pointer "
          onClick={() => setIsHidden("hidden")}
        >
          x
        </span>
        <div
          className={`md:bg-stone-100  xs:bg-white w-full h-120 h-120 relative rounded-xl duration-400 xs:overflow-y-scroll md:overflow-hidden ${isHidden ? " -translate-y-150" : ""}  p-8`}
        >
          {product.diskon ? (
            <span
              id="hargaDiskon"
              className="absolute xs:right-44 xs:top-91 md:top-31 md:right-30 lg:right-50 top-31 font-inter text-xl "
            >
              Rp{product.diskon}
            </span>
          ) : (
            ""
          )}
          <div className="flex w-full justify-between  xs:flex-wrap md:flex-nowrap overflow-y-scroll ">
            <div className=" md:w-120 md:h-120 xs:w-60 xs:h-60">
              <img
                src={"/Amimoy/" + product.urlGambarProduk}
                alt="item"
                className="md:h-100 xs:h-50 "
              />
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
                  <button className="rounded-2xl border-1 rounded-xl active:text-white w-full py-1 font-semibold active:bg-black  text-center text-sm  hover:bg-black hover:text-white hover:cursor-pointer">
                    Checkout
                  </button>
                  <img
                    src="/Amimoy/cart.png"
                    alt="cartAdd"
                    className={`w-13 h-13 hover:cursor-pointer ${'b'+product.id_}`}
                    onClick={(e) => tambahKeranjang(product.id_, e)}
                  />
                  <img
                    src="/Amimoy/check.png"
                    className={`w-13 h-13 hidden ${"a" + product.id_}`}
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
