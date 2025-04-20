
type Product ={
    id_: number,
    namaProduk:string,
    satuan?:string,
    hargaSatuUnit:string,
    urlGambarProduk:string,
    deskripsi:string,
    diskon?:string,
    jenis:string,

}

const item:Product[] = [
    {
      id_: 1,
      namaProduk: "Tomat segar",
      satuan: "Kg", //selain kg ada satuan  seperti liter dan lainnya. value dari satuan boleh dikosongkan jika produk memang ingin dijual per unit bukan per satuan
      hargaSatuUnit: "17.000", //harga per unit atau per satuan
      urlGambarProduk: "/tomat.png",
      deskripsi: "Tomat segar untuk bahan masakan anda",
      diskon: "", //masukkan harga setelah diskon misal harga awal 17.000 diskon menjadi 12.000 jika tidak ada diskon boleh dikosongkan
      jenis: "bahan makanan", //masukkan jenis barang !!!.  ada 4 jenis yaitu bahan makanan,elektronik,peralatan,pakaian
    },
    {
      id_: 2,
      namaProduk: "Kunci Nomor 24/27",
      satuan: "",
      hargaSatuUnit: "35.000",
      urlGambarProduk: "/wrench2.png",
      deskripsi:
        "Kunci  adalah alat serbaguna yang digunakan untuk mengencangkan atau melepaskan baut, mur, atau sekrup. Kunci inggris dapat disesuaikan ukurannya dengan ukuran baut atau mur , tersedia nomor 24/27",
       
      jenis: "peralatan",
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
      jenis: "elektronik",
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
      jenis: "pakaian",
    },
    {
        id_: 5,
      namaProduk: "Bayam",
      satuan: "Ikat",
      hargaSatuUnit: "10.000",
      urlGambarProduk: "/bayam.png",
      deskripsi: "Bayam segar dari kebunnya langsung",
      diskon: "",
      jenis: "bahan makanan",
    },
    {
      id_: 6,
      namaProduk: "Ayam",
      satuan: "Ekor",
      hargaSatuUnit: "45.000",
      urlGambarProduk: "/ayam.png",
      deskripsi:
        "Ayam mentah segar langsung dari kandangnya , untuk bahan lauk dirumah anda !!! ",
        diskon: "",
        jenis: "bahan makanan",
    },
];

export default  item