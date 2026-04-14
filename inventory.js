/* ====================================================================
   AutoCaya — inventory.js
   Fail JavaScript khusus untuk halaman Inventori Kereta.

   FUNGSI UTAMA:
   1. Simpan semua data kereta (termasuk gambar custom)
   2. Menapis kereta berdasarkan pilihan pengguna
   3. Menyusun kereta mengikut harga / tahun / ansuran
   4. Memaparkan kereta dalam bentuk kad dengan GAMBAR SEBENAR
   5. Paginasi — membahagi keputusan kepada beberapa halaman
   6. Modal laporan pemeriksaan
   7. Pengurusan tag penapis aktif

   SEMUA KOMEN DITULIS DALAM BAHASA MALAYSIA.
==================================================================== */


/* ====================================================================
   ╔══════════════════════════════════════════════════════════════════╗
   ║            PANDUAN LETAK GAMBAR KERETA CUSTOM                  ║
   ╠══════════════════════════════════════════════════════════════════╣
   ║                                                                  ║
   ║  LANGKAH 1: Buat folder 'images' dalam folder website anda      ║
   ║             (sama tempat dengan inventory.html)                  ║
   ║                                                                  ║
   ║  LANGKAH 2: Salin gambar kereta ke dalam folder 'images'        ║
   ║                                                                  ║
   ║  LANGKAH 3: Dalam array semuaKereta di bawah, cari kereta        ║
   ║             yang betul (ikut nombor id) dan isikan:              ║
   ║                                                                  ║
   ║             gambar: "images/nama-fail-anda.jpg"                 ║
   ║                                                                  ║
   ║  FORMAT GAMBAR YANG DISOKONG: .jpg  .jpeg  .png  .webp          ║
   ║                                                                  ║
   ║  SAIZ YANG DISYORKAN: 800 × 500 px, bawah 500KB                ║
   ║                                                                  ║
   ║  JIKA GAMBAR TIDAK ADA / PATH SALAH:                            ║
   ║    Sistem secara automatik paparkan EMOJI sebagai pengganti     ║
   ║    (tiada ralat, laman tetap berfungsi normal)                  ║
   ║                                                                  ║
   ║  CONTOH STRUKTUR FOLDER:                                         ║
   ║    📁 AutoCaya/                                                  ║
   ║       📄 index.html                                             ║
   ║       📄 inventory.html                                         ║
   ║       📄 inventory.js          ← fail ini                       ║
   ║       📄 style.css                                              ║
   ║       📄 main.js                                                ║
   ║       📁 images/              ← BUAT FOLDER INI                 ║
   ║           🖼️ myvi-2022.jpg   ← letak gambar di sini            ║
   ║           🖼️ x50-2022.jpg                                      ║
   ║           🖼️ honda-city.jpg                                     ║
   ║           🖼️ (tambah lebih...)                                  ║
   ╚══════════════════════════════════════════════════════════════════╝
==================================================================== */


/* ====================================================================
   BAHAGIAN 1: PANGKALAN DATA KERETA
   Setiap kereta adalah satu objek dalam array ini.
   Untuk tambah kereta baru, salin satu blok {} dan ubah nilainya.

   MEDAN GAMBAR:
     gambar:        "" ← letak path gambar di sini
                       contoh: "images/myvi-merah.jpg"
     emojiFallback: "🚗" ← emoji gantian jika tiada gambar
     warnaBg:       warna latar kad jika gambar tiada (pilihan warna)
==================================================================== */
const semuaKereta = [

  /* ------------------------------------------------------------------
     KERETA #1 — Perodua Myvi 1.5 AV CVT 2022
     GAMBAR: Isikan path gambar anda pada medan 'gambar' di bawah
             Contoh: gambar: "images/myvi-2022.jpg"
  ------------------------------------------------------------------ */
  {
    id: 1,
    nama: "Perodua Myvi 1.5 AV CVT",
    jenama: "Perodua",
    model: "Myvi",
    tahun: 2022,
    km: 18000,
    lokasi: "Selangor",
    harga: 52800,
    ansuran: 680,
    status: "available",
    gambar: "images/myvi.jpg",                 // ← LETAK PATH GAMBAR DI SINI (cth: "images/myvi-2022.jpg")
    emojiFallback: "🚗",        // Emoji gantian jika gambar tiada
    warnaBg: "linear-gradient(135deg,#FFF5F0,#FFE0D0)", // Warna latar kad
    laporan: {
      skor: 92,
      gred: "Cemerlang · Sangat Sesuai Untuk Dibeli",
      items: [
        { lulus: true,  teks: "Enjin & Transmisi CVT" },
        { lulus: true,  teks: "Sistem Brek ABS + EBD" },
        { lulus: true,  teks: "Sistem Elektrik & Lampu LED" },
        { lulus: false, teks: "Cat Badan (calar kecil di pintu belakang) — Kosmetik" },
        { lulus: true,  teks: "Tayar & Rim Aloi" },
        { lulus: true,  teks: "AC & Sistem Hawa Dingin" },
        { lulus: true,  teks: "Airbag 6-titik & Sistem Keselamatan" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: true,  teks: "Rekod Servis Perodua — Lengkap" },
      ],
      nota: "⚠️ Calar kosmetik pada pintu tidak menjejaskan prestasi atau keselamatan kenderaan."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #2 — Proton X50 1.5T Flagship 2022
     GAMBAR: gambar: "images/x50-flagship-2022.jpg"
  ------------------------------------------------------------------ */
  {
    id: 2,
    nama: "Proton X50 1.5T Flagship",
    jenama: "Proton",
    model: "X50",
    tahun: 2022,
    km: 22000,
    lokasi: "Kuala Lumpur",
    harga: 83800,
    ansuran: 1050,
    status: "available",
    gambar: "images/x50.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🚙",
    warnaBg: "linear-gradient(135deg,#e8f4f8,#c9e8f5)",
    laporan: {
      skor: 88,
      gred: "Sangat Baik · Sesuai Untuk Dibeli",
      items: [
        { lulus: true,  teks: "Enjin Turbo 1.5T TGDi" },
        { lulus: true,  teks: "Kotak Gear 7-kelajuan DCT" },
        { lulus: true,  teks: "Sistem Brek Cakera 4-roda" },
        { lulus: true,  teks: "Sistem ADAS (Autonomous Emergency Braking)" },
        { lulus: false, teks: "Tayar hadapan kiri — akan diganti sebelum serahan" },
        { lulus: true,  teks: "AC Dual Zone Climate Control" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: true,  teks: "Rekod Servis — Lengkap" },
      ],
      nota: "⚠️ Tayar baru akan dipasang sebelum kenderaan diserahkan kepada pembeli."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #3 — Honda City 1.5 V Sensing 2020
     GAMBAR: gambar: "images/honda-city-2020.jpg"
  ------------------------------------------------------------------ */
  {
    id: 3,
    nama: "Honda City 1.5 V Sensing",
    jenama: "Honda",
    model: "City",
    tahun: 2020,
    km: 45000,
    lokasi: "Selangor",
    harga: 82000,
    ansuran: 1050,
    status: "reserved",
    gambar: "images/city.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🏎️",
    warnaBg: "linear-gradient(135deg,#fff8e1,#ffe082)",
    laporan: {
      skor: 85,
      gred: "Baik · Sesuai Untuk Dibeli",
      items: [
        { lulus: true,  teks: "Enjin i-VTEC 1.5L" },
        { lulus: true,  teks: "Sistem Brek ABS + VSA" },
        { lulus: false, teks: "AC — servis selesai, kini berfungsi normal (dalam waranti)" },
        { lulus: true,  teks: "Honda Sensing (CMBS, LKAS, ACC)" },
        { lulus: true,  teks: "Tayar & Rim — Baik" },
        { lulus: true,  teks: "Sistem Elektrik — Lulus" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: true,  teks: "Rekod Servis Honda — Lengkap" },
      ],
      nota: "⚠️ Kereta ini telah ditempah. Anda boleh mendaftar senarai menunggu."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #4 — Toyota Vios 1.5 G CVT 2021
     GAMBAR: gambar: "images/toyota-vios-2021.jpg"
  ------------------------------------------------------------------ */
  {
    id: 4,
    nama: "Toyota Vios 1.5 G CVT",
    jenama: "Toyota",
    model: "Vios",
    tahun: 2021,
    km: 38000,
    lokasi: "Johor Bahru",
    harga: 71500,
    ansuran: 920,
    status: "available",
    gambar: "images/vios.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🚘",
    warnaBg: "linear-gradient(135deg,#f3e5f5,#ce93d8)",
    laporan: {
      skor: 90,
      gred: "Cemerlang · Sangat Sesuai Untuk Dibeli",
      items: [
        { lulus: true,  teks: "Enjin Dual VVT-i 1.5L" },
        { lulus: true,  teks: "Kotak Gear CVT Triptonic" },
        { lulus: true,  teks: "Sistem Brek ABS + EBD + BA" },
        { lulus: true,  teks: "Toyota Safety Sense (TSS)" },
        { lulus: true,  teks: "Tayar Bridgestone Ecopia — Baik" },
        { lulus: true,  teks: "AC Auto — Berfungsi Sempurna" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: false, teks: "Cermin belakang kanan (calar nipis) — Kosmetik" },
        { lulus: true,  teks: "Rekod Servis Toyota — Lengkap" },
      ],
      nota: "⚠️ Calar nipis pada cermin adalah kosmetik dan tidak menjejaskan penglihatan."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #5 — Mazda CX-5 2.5 GLS AT 2020
     GAMBAR: gambar: "images/mazda-cx5-2020.jpg"
  ------------------------------------------------------------------ */
  {
    id: 5,
    nama: "Mazda CX-5 2.5 GLS AT",
    jenama: "Mazda",
    model: "CX-5",
    tahun: 2020,
    km: 55000,
    lokasi: "Pulau Pinang",
    harga: 128000,
    ansuran: 1650,
    status: "available",
    gambar: "images/mazda5.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🚐",
    warnaBg: "linear-gradient(135deg,#e8f5e9,#a5d6a7)",
    laporan: {
      skor: 86,
      gred: "Sangat Baik · Sesuai Untuk Dibeli",
      items: [
        { lulus: true,  teks: "Enjin SKYACTIV-G 2.5L" },
        { lulus: true,  teks: "Kotak Gear Automatik 6-kelajuan" },
        { lulus: true,  teks: "Sistem AWD — Berfungsi Normal" },
        { lulus: true,  teks: "Brek Cakera 4-roda + DSC" },
        { lulus: false, teks: "Pengikat bam belakang — diganti semasa pemeriksaan" },
        { lulus: true,  teks: "MRCC + LDWS + HBC" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: true,  teks: "Rekod Servis Mazda — Lengkap" },
      ],
      nota: "⚠️ Pengikat telah diganti dan kenderaan kini dalam kondisi sempurna."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #6 — Perodua Axia 1.0 AV AT 2023
     GAMBAR: gambar: "images/axia-2023.jpg"
  ------------------------------------------------------------------ */
  {
    id: 6,
    nama: "Perodua Axia 1.0 AV AT",
    jenama: "Perodua",
    model: "Axia",
    tahun: 2023,
    km: 8000,
    lokasi: "Selangor",
    harga: 38500,
    ansuran: 510,
    status: "available",
    gambar: "images/axia.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🚗",
    warnaBg: "linear-gradient(135deg,#fce4ec,#f48fb1)",
    laporan: {
      skor: 97,
      gred: "Cemerlang · Hampir Baharu",
      items: [
        { lulus: true,  teks: "Enjin 1.0L VVT-i" },
        { lulus: true,  teks: "Kotak Gear AMT Auto" },
        { lulus: true,  teks: "Sistem Brek ABS + EBD" },
        { lulus: true,  teks: "ASA 3.0 (Auto Safety Assist)" },
        { lulus: true,  teks: "Tayar Baharu — Kurang 8,000km" },
        { lulus: true,  teks: "AC — Sejuk Sempurna" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: true,  teks: "Rekod Servis Perodua — Lengkap" },
      ],
      nota: "✅ Kereta dalam kondisi hampir baharu. Semua sistem lulus tanpa sebarang isu."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #7 — Hyundai Tucson 2.0 Executive 2021
     GAMBAR: gambar: "images/tucson-2021.jpg"
  ------------------------------------------------------------------ */
  {
    id: 7,
    nama: "Hyundai Tucson 2.0 Executive",
    jenama: "Hyundai",
    model: "Tucson",
    tahun: 2021,
    km: 42000,
    lokasi: "Kuala Lumpur",
    harga: 105000,
    ansuran: 1350,
    status: "available",
    gambar: "images/hyundai.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🚙",
    warnaBg: "linear-gradient(135deg,#e3f2fd,#90caf9)",
    laporan: {
      skor: 84,
      gred: "Baik · Sesuai Untuk Dibeli",
      items: [
        { lulus: true,  teks: "Enjin Nu 2.0 MPI" },
        { lulus: true,  teks: "Kotak Gear Automatik 6-kelajuan" },
        { lulus: true,  teks: "Sistem Brek ABS + ESC" },
        { lulus: false, teks: "Lampu hadapan kiri (penggantian LED) — sedang diproses" },
        { lulus: true,  teks: "Tayar Michelin — Baik" },
        { lulus: true,  teks: "Sunroof — Berfungsi Normal" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: true,  teks: "Rekod Servis Hyundai — Lengkap" },
      ],
      nota: "⚠️ Lampu LED akan dipasang sebelum serahan. Kos ditanggung oleh AutoCaya."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #8 — Perodua Bezza 1.3 AV CVT 2021
     GAMBAR: gambar: "images/bezza-2021.jpg"
  ------------------------------------------------------------------ */
  {
    id: 8,
    nama: "Perodua Bezza 1.3 AV CVT",
    jenama: "Perodua",
    model: "Bezza",
    tahun: 2021,
    km: 30000,
    lokasi: "Perak",
    harga: 44800,
    ansuran: 590,
    status: "available",
    gambar: "images/bezza.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🚗",
    warnaBg: "linear-gradient(135deg,#f1f8e9,#c5e1a5)",
    laporan: {
      skor: 91,
      gred: "Cemerlang · Sangat Sesuai Untuk Dibeli",
      items: [
        { lulus: true,  teks: "Enjin 1.3L Dual VVT-i" },
        { lulus: true,  teks: "Kotak Gear CVT" },
        { lulus: true,  teks: "Sistem Brek ABS + EBD" },
        { lulus: true,  teks: "ASA 2.0 (Auto Safety Assist)" },
        { lulus: true,  teks: "Tayar & Rim — Baik" },
        { lulus: true,  teks: "AC — Berfungsi Sempurna" },
        { lulus: false, teks: "Cat bam hadapan (calar kecil) — Kosmetik" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: true,  teks: "Rekod Servis Perodua — Lengkap" },
      ],
      nota: "⚠️ Calar kecil pada bam adalah kosmetik sahaja."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #9 — Honda Jazz 1.5 Hybrid 2019
     GAMBAR: gambar: "images/jazz-hybrid-2019.jpg"
  ------------------------------------------------------------------ */
  {
    id: 9,
    nama: "Honda Jazz 1.5 Hybrid",
    jenama: "Honda",
    model: "Jazz",
    tahun: 2019,
    km: 62000,
    lokasi: "Selangor",
    harga: 67000,
    ansuran: 870,
    status: "available",
    gambar: "images/jazz.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🚗",
    warnaBg: "linear-gradient(135deg,#fff9c4,#fff176)",
    laporan: {
      skor: 79,
      gred: "Baik · Nilai Berbaloi",
      items: [
        { lulus: true,  teks: "Enjin Hybrid i-DCD 1.5L" },
        { lulus: true,  teks: "Bateri Hibrid — Dalam keadaan baik" },
        { lulus: true,  teks: "Sistem Brek Regeneratif" },
        { lulus: false, teks: "AC — servis diperlukan (sudah dilakukan, dalam waranti)" },
        { lulus: true,  teks: "Honda Sensing — Berfungsi Normal" },
        { lulus: false, teks: "Trim dalaman (kesan pemakaian biasa)" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: true,  teks: "Rekod Servis Honda — Lengkap" },
      ],
      nota: "⚠️ Kesan pemakaian biasa pada trim dalaman. Harga mencerminkan kondisi sebenar."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #10 — Proton X70 1.8T Premium 2022
     GAMBAR: gambar: "images/x70-premium-2022.jpg"
  ------------------------------------------------------------------ */
  {
    id: 10,
    nama: "Proton X70 1.8T Premium",
    jenama: "Proton",
    model: "X70",
    tahun: 2022,
    km: 28000,
    lokasi: "Johor Bahru",
    harga: 95000,
    ansuran: 1200,
    status: "reserved",
    gambar: "images/x70.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🚙",
    warnaBg: "linear-gradient(135deg,#ede7f6,#b39ddb)",
    laporan: {
      skor: 89,
      gred: "Sangat Baik · Sesuai Untuk Dibeli",
      items: [
        { lulus: true,  teks: "Enjin Turbo 1.8T TGDi" },
        { lulus: true,  teks: "Kotak Gear 6AT" },
        { lulus: true,  teks: "Sistem AWD Intelligent" },
        { lulus: true,  teks: "Sistem Brek Cakera 4-roda" },
        { lulus: true,  teks: "Panoramic Sunroof — Normal" },
        { lulus: false, teks: "Bumper hadapan (sedikit terkoyak) — Kosmetik" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: true,  teks: "Rekod Servis — Lengkap" },
      ],
      nota: "⚠️ Kereta ini sudah ditempah. Hubungi kami untuk senarai menunggu."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #11 — Toyota Hilux 2.4 G MT 2019
     GAMBAR: gambar: "images/hilux-2019.jpg"
  ------------------------------------------------------------------ */
  {
    id: 11,
    nama: "Toyota Hilux 2.4 G MT",
    jenama: "Toyota",
    model: "Hilux",
    tahun: 2019,
    km: 78000,
    lokasi: "Perak",
    harga: 89000,
    ansuran: 1150,
    status: "available",
    gambar: "images/hilux.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🛻",
    warnaBg: "linear-gradient(135deg,#efebe9,#bcaaa4)",
    laporan: {
      skor: 82,
      gred: "Baik · Sesuai Untuk Diguna",
      items: [
        { lulus: true,  teks: "Enjin Diesel 2.4L 2GD-FTV" },
        { lulus: true,  teks: "Sistem 4WD — Berfungsi Normal" },
        { lulus: true,  teks: "Sistem Brek — Lulus" },
        { lulus: false, teks: "Tayar belakang kiri — akan diganti sebelum serahan" },
        { lulus: true,  teks: "Klima / AC — Berfungsi Baik" },
        { lulus: false, teks: "Cat eksterior (kesan calar kerja lapangan) — Kosmetik" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: true,  teks: "Rekod Servis Toyota — Tersedia" },
      ],
      nota: "⚠️ Kesan pemakaian lazim untuk kenderaan kerja. Enjin dan casis dalam kondisi baik."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #12 — Mazda 3 2.0 High Plus 2021
     GAMBAR: gambar: "images/mazda3-2021.jpg"
  ------------------------------------------------------------------ */
  {
    id: 12,
    nama: "Mazda 3 2.0 High Plus",
    jenama: "Mazda",
    model: "Mazda 3",
    tahun: 2021,
    km: 33000,
    lokasi: "Kuala Lumpur",
    harga: 115000,
    ansuran: 1480,
    status: "available",
    gambar: "images/mazda3.jpg",                 // ← LETAK PATH GAMBAR DI SINI
    emojiFallback: "🏎️",
    warnaBg: "linear-gradient(135deg,#fafafa,#e0e0e0)",
    laporan: {
      skor: 93,
      gred: "Cemerlang · Hampir Baharu",
      items: [
        { lulus: true,  teks: "Enjin SKYACTIV-G 2.0L" },
        { lulus: true,  teks: "Kotak Gear SKYACTIV-Drive 6AT" },
        { lulus: true,  teks: "Brek Cakera 4-roda + DSC" },
        { lulus: true,  teks: "i-ACTIVSENSE Safety Suite" },
        { lulus: true,  teks: "Tayar Bridgestone Potenza — Baik" },
        { lulus: true,  teks: "Head-Up Display — Berfungsi Normal" },
        { lulus: true,  teks: "Sejarah Kemalangan — Tiada Rekod" },
        { lulus: false, teks: "Casis bawah (sedikit karat biasa) — bukan isu struktur" },
        { lulus: true,  teks: "Rekod Servis Mazda — Lengkap" },
      ],
      nota: "⚠️ Karat biasa pada casis bawah adalah normal untuk usia kenderaan ini."
    }
  },

  /* ------------------------------------------------------------------
     KERETA #13 — TEMPLATE UNTUK KERETA BAHARU
     Salin blok ini, tukar nilai, dan tambah gambar anda.
     HAPUS KOMEN INI APABILA DIGUNAKAN.

  {
    id: 13,
    nama: "Nama Penuh Kereta",          // cth: "Honda Civic 1.5 TC 2021"
    jenama: "Jenama",                   // cth: "Honda"
    model: "Model",                     // cth: "Civic"
    tahun: 2021,                        // tahun keluaran
    km: 30000,                          // jarak tempuh dalam km
    lokasi: "Lokasi",                   // cth: "Selangor"
    harga: 100000,                      // harga OTR dalam RM (tanpa tanda koma)
    ansuran: 1200,                      // ansuran bulanan dalam RM
    status: "available",                // "available" atau "reserved"
    gambar: "images/nama-gambar.jpg",   // ← PATH GAMBAR ANDA
    emojiFallback: "🚗",               // emoji gantian
    warnaBg: "linear-gradient(135deg,#FFF5F0,#FFE0D0)", // warna latar
    laporan: {
      skor: 90,
      gred: "Cemerlang · Sangat Sesuai Untuk Dibeli",
      items: [
        { lulus: true,  teks: "Enjin — Lulus" },
        { lulus: true,  teks: "Sistem Brek — Lulus" },
        // Tambah item pemeriksaan lain di sini...
      ],
      nota: "Nota tambahan laporan pemeriksaan."
    }
  },
  ------------------------------------------------------------------ */

];


/* ====================================================================
   BAHAGIAN 2: PEMBOLEH UBAH KEADAAN (STATE VARIABLES)
   Pemboleh ubah ini menyimpan keadaan semasa aplikasi penapis.
==================================================================== */

// Nombor halaman semasa yang dipaparkan
let halamanSemasa = 1;

// Bilangan kereta yang dipaparkan setiap halaman
const keretaPerHalaman = 6;

// Senarai kereta selepas ditapis dan disusun
let keretaTertapis = [...semuaKereta];


/* ====================================================================
   BAHAGIAN 3: RUJUKAN ELEMEN HTML
   Simpan rujukan ke elemen DOM yang kerap digunakan
==================================================================== */
const elGrid        = document.getElementById('invGrid');
const elResultCount = document.getElementById('resultCount');
const elPagination  = document.getElementById('pagination');
const elEmptyState  = document.getElementById('emptyState');
const elActiveTags  = document.getElementById('activeTags');
const elSort        = document.getElementById('sortSelect');
const elSearch      = document.getElementById('searchInput');
const elRange       = document.getElementById('monthlyRange');
const elRangeVal    = document.getElementById('rangeVal');
const elModal       = document.getElementById('reportModal');


/* ====================================================================
   BAHAGIAN 4: FUNGSI PAPARAN GAMBAR
   Menentukan sama ada papar gambar sebenar atau emoji gantian
==================================================================== */

/**
 * buatElemenGambar(kereta)
 * Memulangkan HTML untuk bahagian gambar kad kereta.
 *
 * LOGIK:
 *   - Jika kereta.gambar diisi → papar tag <img> dengan gambar sebenar
 *   - Jika kereta.gambar kosong → papar emoji sebagai gantian
 *
 * Gambar akan auto-tukar ke emoji jika fail tidak dijumpai (onerror).
 */
function buatElemenGambar(kereta) {
  if (kereta.gambar && kereta.gambar.trim() !== '') {
    /* ----------------------------------------------------------------
       GAMBAR SEBENAR — dipapar menggunakan tag <img>
       Atribut onerror: jika gambar gagal dimuatkan (fail tidak ada,
       path salah, dsb.), elemen ini akan digantikan dengan emoji.
    ---------------------------------------------------------------- */
    return `
      <div class="kad-gambar-wrap">
        <img
          src="${kereta.gambar}"
          alt="${kereta.nama}"
          class="kad-gambar-img"
          loading="lazy"
          onerror="this.closest('.kad-gambar-wrap').innerHTML='<div class=\\'kad-emoji-fallback\\'>${kereta.emojiFallback}</div>'"
        />
      </div>
    `;
  } else {
    /* ----------------------------------------------------------------
       TIADA GAMBAR — papar emoji sebagai gantian visual
       Ini akan dipaparkan apabila medan 'gambar' masih kosong ""
    ---------------------------------------------------------------- */
    return `<div class="kad-emoji-fallback">${kereta.emojiFallback}</div>`;
  }
}


/* ====================================================================
   BAHAGIAN 5: FUNGSI PENAPIS (FILTER LOGIC)
==================================================================== */

/**
 * dapatkanPenapis()
 * Membaca semua nilai penapis dari borang dan memulangkan objek
 * yang mengandungi semua kriteria penapis aktif.
 */
function dapatkanPenapis() {
  // Baca carian teks (tukar ke huruf kecil untuk padanan tidak sensitif)
  const teks = elSearch.value.trim().toLowerCase();

  // Baca nilai slider ansuran bulanan maksimum
  const ansuranMaks = parseInt(elRange.value);

  // Kumpul semua checkbox jenama yang ditanda
  const jenama = Array.from(
    document.querySelectorAll('input[data-filter="jenama"]:checked')
  ).map(cb => cb.value);

  // Kumpul semua checkbox lokasi yang ditanda
  const lokasi = Array.from(
    document.querySelectorAll('input[data-filter="lokasi"]:checked')
  ).map(cb => cb.value);

  // Kumpul semua checkbox status yang ditanda
  const status = Array.from(
    document.querySelectorAll('input[data-filter="status"]:checked')
  ).map(cb => cb.value);

  // Kumpul semua checkbox tahun (dalam format "2020-2021")
  const tahun = Array.from(
    document.querySelectorAll('input[data-filter="tahun"]:checked')
  ).map(cb => cb.value);

  return { teks, ansuranMaks, jenama, lokasi, status, tahun };
}


/**
 * tapisKereta(penapis)
 * Menapis array semuaKereta berdasarkan semua syarat penapis.
 * Memulangkan array kereta yang lulus semua syarat.
 */
function tapisKereta(penapis) {
  return semuaKereta.filter(kereta => {

    // Syarat 1: Padanan teks carian (nama, model, atau jenama)
    if (penapis.teks) {
      const padanTeks =
        kereta.nama.toLowerCase().includes(penapis.teks) ||
        kereta.model.toLowerCase().includes(penapis.teks) ||
        kereta.jenama.toLowerCase().includes(penapis.teks);
      if (!padanTeks) return false;
    }

    // Syarat 2: Ansuran bulanan tidak melebihi had slider
    if (penapis.ansuranMaks < 2000) {
      if (kereta.ansuran > penapis.ansuranMaks) return false;
    }

    // Syarat 3: Kereta mesti dari jenama yang dipilih
    if (penapis.jenama.length > 0) {
      if (!penapis.jenama.includes(kereta.jenama)) return false;
    }

    // Syarat 4: Kereta mesti berada di lokasi yang dipilih
    if (penapis.lokasi.length > 0) {
      if (!penapis.lokasi.includes(kereta.lokasi)) return false;
    }

    // Syarat 5: Status stok kereta mesti sepadan
    if (penapis.status.length > 0) {
      if (!penapis.status.includes(kereta.status)) return false;
    }

    // Syarat 6: Tahun kereta mesti dalam julat yang dipilih
    if (penapis.tahun.length > 0) {
      const dalamJulat = penapis.tahun.some(julat => {
        const [min, max] = julat.split('-').map(Number);
        return kereta.tahun >= min && kereta.tahun <= max;
      });
      if (!dalamJulat) return false;
    }

    // Kereta lulus semua syarat
    return true;
  });
}


/**
 * susunKereta(senarai, kaedah)
 * Menyusun senarai kereta mengikut kaedah yang dipilih pengguna.
 */
function susunKereta(senarai, kaedah) {
  const salinan = [...senarai]; // Buat salinan supaya data asal tidak berubah

  switch (kaedah) {
    case 'harga-rendah':
      return salinan.sort((a, b) => a.harga - b.harga);    // Harga terendah dahulu
    case 'harga-tinggi':
      return salinan.sort((a, b) => b.harga - a.harga);    // Harga tertinggi dahulu
    case 'terbaru':
      return salinan.sort((a, b) => b.tahun - a.tahun);    // Tahun terbaru dahulu
    case 'ansuran-rendah':
      return salinan.sort((a, b) => a.ansuran - b.ansuran); // Ansuran terendah dahulu
    default:
      return salinan;
  }
}


/* ====================================================================
   BAHAGIAN 6: FUNGSI RENDER KAD KERETA
==================================================================== */

/**
 * buatKadKereta(kereta)
 * Menjana HTML penuh untuk satu kad kereta dalam grid inventori.
 * Menggunakan buatElemenGambar() untuk paparan gambar atau emoji.
 */
function buatKadKereta(kereta) {
  // Tentukan kelas dan teks badge status stok
  const statusKelas = kereta.status === 'available' ? 'available' : 'reserved';
  const statusTeks  = kereta.status === 'available' ? 'Available' : 'Reserved';

  // Butang beli: aktif untuk kereta available, dilumpuhkan untuk reserved
  const butangBeli = kereta.status === 'available'
    ? `<a href="https://wa.me/60183944261?text=Saya%20berminat%20dengan%20${encodeURIComponent(kereta.nama)}" target="_blank" class="btn btn-primary btn-sm">💬 Tanya Harga</a>`
    : `<button class="btn btn-primary btn-sm" disabled style="opacity:.5;cursor:not-allowed">🔒 Ditempah</button>`;

  // Format harga dan ansuran dengan pemisah ribuan
  const hargaFormat   = 'RM ' + kereta.harga.toLocaleString('ms-MY');
  const ansuranFormat = '~RM ' + kereta.ansuran.toLocaleString('ms-MY') + '/bln';

  // Hasilkan elemen gambar (sebenar atau emoji)
  const elGambar = buatElemenGambar(kereta);

  return `
    <div class="inv-card">

      <!-- ---- BAHAGIAN ATAS: GAMBAR / EMOJI KERETA ---- -->
      <div class="inv-img" style="background:${kereta.warnaBg}; position:relative; overflow:hidden;">

        <!-- Kandungan gambar atau emoji ditentukan oleh buatElemenGambar() -->
        ${elGambar}

        <!-- Badge status stok (Available / Reserved) -->
        <span class="status-badge ${statusKelas}">${statusTeks}</span>

        <!-- Butang tambah ke senarai kegemaran -->
        <button class="wishlist-btn" title="Simpan ke senarai kegemaran" data-id="${kereta.id}">♡</button>
      </div>

      <!-- ---- BAHAGIAN BAWAH: MAKLUMAT KERETA ---- -->
      <div class="inv-body">

        <!-- Nama penuh kereta -->
        <div class="inv-name">${kereta.nama}</div>

        <!-- Maklumat ringkas: tahun, jarak, lokasi -->
        <div class="inv-meta">${kereta.tahun} · ${kereta.km.toLocaleString('ms-MY')} km · ${kereta.lokasi}</div>

        <!-- Harga OTR dan ansuran bulanan -->
        <div class="inv-price-row">
          <span class="inv-price">${hargaFormat}</span>
          <span class="inv-monthly">${ansuranFormat}</span>
        </div>

        <!-- Lencana kualiti dan jaminan -->
        <div class="inv-tags">
          <span class="itag green">175-titik ✓</span>
          <span class="itag blue">Waranti ✓</span>
          <span class="itag gray">OTR Termasuk</span>
        </div>

        <!-- Butang tindakan: Lihat laporan & Tanya harga -->
        <div class="inv-actions">
          <button class="btn btn-outline btn-sm" onclick="bukaModal(${kereta.id})">
            📋 Lihat Laporan
          </button>
          ${butangBeli}
        </div>

      </div>
    </div>
  `;
}


/* ====================================================================
   BAHAGIAN 7: FUNGSI RENDER UTAMA
==================================================================== */

/**
 * renderKereta()
 * Fungsi utama yang menjalankan semua langkah paparan:
 * 1. Baca penapis semasa
 * 2. Tapis kereta
 * 3. Susun kereta
 * 4. Papar dalam grid
 * 5. Kemaskini paginasi dan kiraan keputusan
 */
function renderKereta() {
  // Langkah 1: Baca semua nilai penapis semasa dari borang
  const penapis = dapatkanPenapis();

  // Langkah 2: Tapis kereta mengikut penapis
  const selepasFilter = tapisKereta(penapis);

  // Langkah 3: Susun kereta mengikut pilihan dropdown
  keretaTertapis = susunKereta(selepasFilter, elSort.value);

  // Langkah 4: Kira bilangan kereta dan halaman
  const jumlah        = keretaTertapis.length;
  const jumlahHalaman = Math.ceil(jumlah / keretaPerHalaman);

  // Pastikan halaman semasa tidak melebihi jumlah halaman yang ada
  if (halamanSemasa > jumlahHalaman) halamanSemasa = 1;

  // Potong array untuk halaman semasa sahaja (paginasi)
  const mula       = (halamanSemasa - 1) * keretaPerHalaman;
  const akhir      = mula + keretaPerHalaman;
  const halamanIni = keretaTertapis.slice(mula, akhir);

  // Langkah 5: Papar kereta atau mesej kosong
  if (jumlah === 0) {
    // Tiada kereta sepadan — papar mesej tiada keputusan
    elGrid.innerHTML           = '';
    elEmptyState.style.display = 'block';
    elResultCount.innerHTML    = 'Tiada kereta dijumpai';
    elPagination.innerHTML     = '';
  } else {
    // Ada kereta — jana kad dan masukkan dalam grid
    elEmptyState.style.display = 'none';
    elGrid.innerHTML           = halamanIni.map(k => buatKadKereta(k)).join('');

    // Kemaskini teks bilangan keputusan
    elResultCount.innerHTML =
      `Menunjukkan <strong>${mula + 1}–${Math.min(akhir, jumlah)}</strong> ` +
      `daripada <strong>${jumlah}</strong> kereta`;

    // Jana butang paginasi
    renderPaginasi(jumlahHalaman);
  }

  // Kemaskini paparan tag penapis aktif
  renderTagAktif(penapis);

  // Lekat semula event wishlist (kerana HTML grid dijana semula)
  lekatWishlist();
}


/* ====================================================================
   BAHAGIAN 8: FUNGSI PAGINASI
==================================================================== */

/**
 * renderPaginasi(jumlahHalaman)
 * Menjana butang paginasi di bawah grid kereta.
 */
function renderPaginasi(jumlahHalaman) {
  // Sembunyikan paginasi jika hanya satu halaman
  if (jumlahHalaman <= 1) {
    elPagination.innerHTML = '';
    return;
  }

  let html = '';

  // Butang "Sebelumnya"
  html += `<button class="page-btn" onclick="tukarHalaman(${halamanSemasa - 1})"
             ${halamanSemasa === 1 ? 'disabled' : ''}>← Sebelum</button>`;

  // Butang nombor halaman
  for (let i = 1; i <= jumlahHalaman; i++) {
    html += `<button class="page-btn ${i === halamanSemasa ? 'active' : ''}"
               onclick="tukarHalaman(${i})">${i}</button>`;
  }

  // Butang "Seterusnya"
  html += `<button class="page-btn" onclick="tukarHalaman(${halamanSemasa + 1})"
             ${halamanSemasa === jumlahHalaman ? 'disabled' : ''}>Seterus →</button>`;

  elPagination.innerHTML = html;
}


/**
 * tukarHalaman(nombor)
 * Menukar halaman paginasi dan menatal ke atas bahagian grid.
 */
function tukarHalaman(nombor) {
  const jumlahHalaman = Math.ceil(keretaTertapis.length / keretaPerHalaman);
  if (nombor < 1 || nombor > jumlahHalaman) return;

  halamanSemasa = nombor;
  renderKereta();

  // Tatal ke atas bahagian inventori
  document.querySelector('.inventory-section')
    .scrollIntoView({ behavior: 'smooth', block: 'start' });
}


/* ====================================================================
   BAHAGIAN 9: TAG PENAPIS AKTIF
==================================================================== */

/**
 * renderTagAktif(penapis)
 * Memaparkan tag yang menunjukkan penapis yang sedang digunakan.
 * Setiap tag ada butang "×" untuk membuang penapis itu sahaja.
 */
function renderTagAktif(penapis) {
  let html = '';

  // Tag carian teks
  if (penapis.teks) {
    html += `<span class="filter-tag">🔍 "${penapis.teks}"
               <button onclick="clearSearch()">×</button></span>`;
  }

  // Tag slider ansuran
  if (penapis.ansuranMaks < 2000) {
    html += `<span class="filter-tag">💳 Maks RM ${penapis.ansuranMaks.toLocaleString()}
               <button onclick="resetSlider()">×</button></span>`;
  }

  // Tag jenama
  penapis.jenama.forEach(j => {
    html += `<span class="filter-tag">🚗 ${j}
               <button onclick="buangCheckbox('jenama','${j}')">×</button></span>`;
  });

  // Tag lokasi
  penapis.lokasi.forEach(l => {
    html += `<span class="filter-tag">📍 ${l}
               <button onclick="buangCheckbox('lokasi','${encodeURIComponent(l)}')">×</button></span>`;
  });

  // Tag status
  penapis.status.forEach(s => {
    const label = s === 'available' ? 'Available' : 'Reserved';
    html += `<span class="filter-tag">📦 ${label}
               <button onclick="buangCheckbox('status','${s}')">×</button></span>`;
  });

  // Tag tahun
  penapis.tahun.forEach(t => {
    const [min, max] = t.split('-');
    html += `<span class="filter-tag">📅 ${min}–${max}
               <button onclick="buangCheckbox('tahun','${t}')">×</button></span>`;
  });

  elActiveTags.innerHTML = html;
}


/* ====================================================================
   BAHAGIAN 10: FUNGSI PEMBUANGAN PENAPIS INDIVIDU
==================================================================== */

function clearSearch() {
  elSearch.value = '';
  renderKereta();
}

function resetSlider() {
  elRange.value          = 2000;
  elRangeVal.textContent = 'RM 2,000+';
  renderKereta();
}

function buangCheckbox(jenis, nilai) {
  const nilaiDecoded = decodeURIComponent(nilai);
  const cb = document.querySelector(
    `input[data-filter="${jenis}"][value="${nilaiDecoded}"]`
  );
  if (cb) cb.checked = false;
  renderKereta();
}


/* ====================================================================
   BAHAGIAN 11: MODAL LAPORAN PEMERIKSAAN 175-TITIK
==================================================================== */

/**
 * bukaModal(idKereta)
 * Mencari data kereta berdasarkan ID, kemudian papar modal laporan.
 * Dipanggil apabila butang "Lihat Laporan" diklik pada setiap kad.
 */
function bukaModal(idKereta) {
  // Cari data kereta menggunakan ID
  const kereta = semuaKereta.find(k => k.id === idKereta);
  if (!kereta) return;

  const lap = kereta.laporan;

  // Kemaskini skor dalam lingkaran
  const elSkor = document.getElementById('modalSkor');
  elSkor.innerHTML = `${lap.skor}<span style="font-size:.6em">/100</span>`;

  // Warnakan skor: hijau (≥90), oren (≥80), merah (<80)
  elSkor.style.background =
    lap.skor >= 90 ? '#10b981' :
    lap.skor >= 80 ? '#f59e0b' : '#ef4444';

  // Kemaskini nama kereta dan gred skor
  document.getElementById('modalNamaKereta').textContent = kereta.nama;
  document.getElementById('modalGredSkor').textContent   = lap.gred;

  // Jana HTML item pemeriksaan
  const htmlItems = lap.items.map(item => `
    <div class="report-item ${item.lulus ? 'pass' : 'warn'}">
      ${item.lulus ? '✅' : '⚠️'} ${item.teks}
    </div>
  `).join('');
  document.getElementById('modalLaporan').innerHTML = htmlItems;

  // Kemaskini nota
  document.getElementById('modalNota').textContent = lap.nota;

  // Kemaskini pautan WhatsApp untuk kereta ini
  const pesanWA = encodeURIComponent(
    `Saya ingin tahu lebih lanjut tentang laporan pemeriksaan: ${kereta.nama}`
  );
  document.getElementById('modalWaBtn').href =
    `https://wa.me/60183944261?text=${pesanWA}`;

  // Papar modal dan halang skrol latar
  elModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/** Tutup modal laporan pemeriksaan */
function tutupModal() {
  elModal.classList.remove('active');
  document.body.style.overflow = '';
}


/* ====================================================================
   BAHAGIAN 12: WISHLIST (SENARAI KEGEMARAN)
==================================================================== */

/**
 * lekatWishlist()
 * Lekatkan event klik pada semua butang wishlist dalam grid.
 * Perlu dipanggil semula setiap kali grid dikemas kini kerana
 * HTML grid dijana semula oleh JavaScript.
 */
function lekatWishlist() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      // Toggle ikon hati
      if (this.textContent.trim() === '♡') {
        this.textContent = '♥';
        this.style.color = '#e74c3c';
        this.title       = 'Buang dari senarai kegemaran';
      } else {
        this.textContent = '♡';
        this.style.color = '';
        this.title       = 'Simpan ke senarai kegemaran';
      }
    });
  });
}


/* ====================================================================
   BAHAGIAN 13: FUNGSI RESET SEMUA PENAPIS
==================================================================== */

function resetSemuaPenapis() {
  elSearch.value         = '';
  elRange.value          = 2000;
  elRangeVal.textContent = 'RM 2,000+';

  // Nyah-tanda semua checkbox
  document.querySelectorAll('input[data-filter]').forEach(cb => {
    cb.checked = false;
  });

  halamanSemasa = 1;
  renderKereta();
}


/* ====================================================================
   BAHAGIAN 14: PENDAFTARAN EVENT LISTENER
   Daftarkan semua tindakan pengguna
==================================================================== */

// Butang "Reset" dalam sidebar
document.getElementById('btnReset').addEventListener('click', resetSemuaPenapis);

// Butang "Reset" dalam mesej kosong
document.getElementById('btnResetEmpty').addEventListener('click', resetSemuaPenapis);

// Butang "Guna Penapis" — berguna pada mobile
document.getElementById('btnApply').addEventListener('click', function () {
  halamanSemasa = 1;
  renderKereta();
  // Tutup sidebar pada mobile selepas menapis
  document.getElementById('filterSidebar').classList.remove('open');
});

// Butang mobile untuk buka/tutup sidebar penapis
document.getElementById('btnMobileFilter').addEventListener('click', function () {
  document.getElementById('filterSidebar').classList.toggle('open');
});

// Slider ansuran — kemas kini teks dan re-filter semasa seret
elRange.addEventListener('input', function () {
  const nilai            = parseInt(this.value);
  elRangeVal.textContent = nilai >= 2000 ? 'RM 2,000+' : 'RM ' + nilai.toLocaleString('ms-MY');
  halamanSemasa          = 1;
  renderKereta();
});

// Kotak carian — filter semasa pengguna menaip
elSearch.addEventListener('input', function () {
  halamanSemasa = 1;
  renderKereta();
});

// Dropdown susun atur — susun semula apabila pilihan berubah
elSort.addEventListener('change', function () {
  halamanSemasa = 1;
  renderKereta();
});

// Semua checkbox — filter semula apabila mana-mana checkbox berubah
document.querySelectorAll('input[data-filter]').forEach(cb => {
  cb.addEventListener('change', function () {
    halamanSemasa = 1;
    renderKereta();
  });
});

// Tutup modal apabila klik luar kotak modal (klik overlay gelap)
elModal.addEventListener('click', function (e) {
  if (e.target === elModal) tutupModal();
});

// Butang "✕" tutup modal
document.getElementById('btnTutupModal').addEventListener('click', tutupModal);

// Tekan kekunci Escape untuk tutup modal
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && elModal.classList.contains('active')) {
    tutupModal();
  }
});


/* ====================================================================
   BAHAGIAN 15: PERMULAAN HALAMAN
   Jalankan render pertama apabila halaman selesai dimuatkan
==================================================================== */
renderKereta();
