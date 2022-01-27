# project final backend API covid
> izzudin - 0110220077 - STT Nurul Fikri

> **Gunakan Extensi Mardown preview untuk melihat** 

**CARA MENJALANKAN FILE :**

1. Jalankan NPM install setelah clone repository, di dalam folder project.
```
npm install
```

2. file **.env** akan dikirim secara terpisah, setelah mendapatkan file **.env**,
silahkan set database URL seperti di bawah ini : 
```
mysql://DBUSER:DBPASSWORD@HOST:PORT/project_covid2
```
contoh :
```
mysql://root:root@localhost:3306/project_covid2
```

3. Jalankan **Prisma Migration** dengan cara :
```
npx prisma migrate dev --name init
```

4. Jalankan development server dengan cara,
```
npm run dev
```

5.File Postman akan dikirimkan terpisah.

6. File Postman terdiri dari 2 folder yaitu **AUTH** DAN **PATIENTS**, folder auth berisi API untuk authentifikasi,
silahkan hit */auth* untuk mendapatkan token, dan masukkan ke *authorization field* pada postman dan pilih, _Bearer Token_

7. API pada folder *PATIENTS* siapa digunakan.

> AUTHOR : IZZUDIN ALQOSAM
>DEPOK,27 JANUARI 2022



