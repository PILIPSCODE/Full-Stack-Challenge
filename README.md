# Fullstack Challenge PT RekaDigital Indonesia

### Deskripsi Proyek 
Challenge ini bertujuan untuk menguji kemampuan kandidat dalam
mengembangkan aplikasi web full stack, yang mencakup frontend, backend,
dan database. Kandidat diharapkan mampu mengintegrasikan seluruh
komponen tersebut menjadi satu aplikasi yang fungsional dan responsif.
### Challenge
B. Challenge

Pada desain figma di bawah merupakan tampilan dashboard Admin
dari suatu aplikasi Point of Sale (POS). POS adalah aplikasi yang digunakan
untuk melakukan pencatatan transaksi dan kegiatan bisnis. Salah satu poin
penting dari seorang Full-stack Developer adalah melakukan slicing UI
seakurat mungkin sesuai desain yang sudah dibuat oleh tim Product Design
dan juga tentunya memiliki segi responsif yang baik. Tanggung jawab
Full-stack Developer lainnya adalah memahami project requirement lalu
mengidentifikasi database beserta dengan relasinya.


Pada challenge ini terdapat beberapa objectives yang perlu kandidat lakukan,
yaitu :
1. Melakukan slicing sesuai dengan desain yang sudah disediakan oleh
UI/UX.
2. Membuat skema database beserta relasinya untuk data Transaction,
Product, dan Customer (*identifikasi attributes sesuai kebutuhan pada
setiap tabelnya)
3. Membuat file Migration untuk membuat tabel.
4. Membuat file Seeder untuk data produk.
5. Membuat Restful API untuk mengintegrasikan antara frontend dan
backend.
6. Integrasi antara frontend dan backend.

Berikut ini daftar fitur-fitur yang perlu diimplementasikan :
1. Menambahkan data customer baru.
2. Melihat detail data customer. (*detail customer mencakup data seperti
pada table UI design dan juga semua data produk (nama produk dan
kuantitas) yang pernah dipesan oleh customer tersebut)
3. Menambah dan mengurangi kuantitas produk yang telah dipesan pada
detail customer.
4. Menghapus data customer dari database (*soft delete).
5. Membuat transaksi baru dengan memasukkan produk yang dipilih,
kuantitas produk dan customer yang memesan (*khusus fitur ini cukup
buat API saja tanpa perlu UI).


## 📚 Teknologi yang Digunakan
- Next Js, Redux Toolkit, Axios, Tailwind Css
- Backend: Node Js, Express Js, Sql 

## 🧑‍💻 Cara Installasi dan Penggunaan

- Frontend
1. Clone repositori:
   ```bash
   git clone https://github.com/PILIPSCODE/Full-Stack-Challenge.git
   cd Full-Stack-Challenge
   cd frontend
2. Install Package :
   ```bash
   npm install 
3. Cara menjalankan Code :
   ```bash
   npm run dev
4. langsung Akses Port berikut :
   ```bash
   http://localhost:3000/Admin/customer

hasil:
![Frontend:](https://imgbb.io/ib/HT5PPiUQnxRRNez_1739419565.png)


- Backend

menggunakan xampp
1. Clone repositori:
   ```bash
   git clone https://github.com/PILIPSCODE/Full-Stack-Challenge.git
    cd Full-Stack-Challenge
   cd backend
2. Install Package :
   ```bash
   npm install 
3. Cari File seeder.sql:
   ```bash
   CTRL + A, CTRL + C
4. Install Xampp :
   ```bash
   https://www.apachefriends.org/download.html
5. Buka Xampp :
   ```bash
   Start Apache
    Start Sql
6. Akses DataBase :
   ```bash
   http://localhost/phpmyadmin/
7. Create DataBase :
   ```bash
   Nama DataBase challenge_fullstack
8. Akses Bar Sql :
   ```bash
   Paste semua file seeder.sql

migration
1. Buka terminal atau command prompt dan login ke MySQL:
   ```bash
   mysql -u root -p
2. Eksekusi file SQL dengan menjalankan:
   ```bash
   SOURCE path/to/seeder.sql;
  
Jalankan Backend : npm start

## 📍 ENDPOINT API

**Endpoint** | **Method** | **Payload**  
--- | --- | ---  
`/api/customers` | **GET** | -  
`/api/customers` | **POST** | `{ "name": string, "level": string, "favorite_menu": string, "total_transaction": number }`  
`/api/customers/:id` | **GET** | -  
`/api/customers/:id` | **DELETE** | -  
`/api/products` | **GET** | -  
`/api/transactions` | **GET** | -  
`/api/transactions` | **POST** | `{ "customer_id": number, "products": [{ "product_id": number, "quantity": number }] }`  



Hasil:
![Backend:](https://imgbb.io/ib/9AVAXJAGZcp0cHW_1739419653.png)




   

