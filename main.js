/* ====================================================================
   AutoCaya — main.js
   Fail JavaScript utama yang dikongsi oleh semua halaman website.

   FUNGSI YANG TERDAPAT DI SINI:
   1. Kesan tatal navbar (navbar scroll effect)
   2. Menu hamburger untuk mobile
   3. Animasi masuk elemen (scroll animation)
   4. Borang maklum balas (feedback form)
   5. Penatal lembut (smooth scroll)
   6. Pengiraan nombor beranim (animated counter)

   NOTA: Semua komen ditulis dalam Bahasa Malaysia.
==================================================================== */

/* Tunggu sehingga seluruh dokumen HTML selesai dimuatkan
   sebelum menjalankan sebarang JavaScript */
document.addEventListener('DOMContentLoaded', function () {


  /* ==================================================================
     1. KESAN TATAL NAVBAR
     Apabila pengguna tatal ke bawah melebihi 30px,
     tambahkan kelas 'scrolled' pada navbar untuk memberi
     kesan bayang dan latar kabur yang lebih ketara.
  ================================================================== */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 30) {
        // Pengguna dah tatal jauh — aktifkan gaya scrolled
        navbar.classList.add('scrolled');
      } else {
        // Pengguna kembali ke atas — buang gaya scrolled
        navbar.classList.remove('scrolled');
      }
    });
  }


  /* ==================================================================
     2. MENU HAMBURGER (MOBILE)
     Apabila ikon hamburger diklik, togol kelas 'open'
     pada navbar dan menu navigasi untuk papar/sembunyikan menu.
  ================================================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    // Klik ikon hamburger untuk buka atau tutup menu
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open'); // Animasi ikon ×
      navLinks.classList.toggle('open'); // Papar/sembunyikan menu
    });

    // Tutup menu secara automatik apabila mana-mana pautan diklik
    navLinks.querySelectorAll('a').forEach(function (pautan) {
      pautan.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }


  /* ==================================================================
     3. ANIMASI MASUK ELEMEN (SCROLL ANIMATION)
     Elemen dengan atribut 'data-animate' akan tersembunyi pada
     mulanya. Apabila elemen memasuki viewport (kawasan skrin),
     kelas 'animated' ditambah untuk mencetuskan animasi CSS.
     Elemen dalam grid akan muncul secara berperingkat (stagger).
  ================================================================== */
  const sasaranAnimasi = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window && sasaranAnimasi.length > 0) {
    // Gunakan IntersectionObserver untuk kesan prestasi yang lebih baik
    const pemerhati = new IntersectionObserver(function (entri) {
      entri.forEach(function (entri) {
        if (entri.isIntersecting) {
          // Kira kedudukan elemen dalam kumpulan adik-beradik
          // untuk mencipta kesan muncul berperingkat
          const ibuBapa = entri.target.parentElement;
          const adikBeradik = ibuBapa.querySelectorAll('[data-animate]');
          const indeks = Array.from(adikBeradik).indexOf(entri.target);

          // Tangguhkan animasi berdasarkan kedudukan (80ms setiap elemen)
          setTimeout(function () {
            entri.target.classList.add('animated');
          }, indeks * 80);

          // Berhenti memerhatikan elemen ini selepas animasi dicetuskan
          pemerhati.unobserve(entri.target);
        }
      });
    }, {
      threshold: 0.12,        // Muncul apabila 12% elemen kelihatan
      rootMargin: '0px 0px -40px 0px' // Sedikit sebelum sempadan bawah
    });

    // Daftarkan semua elemen sasaran untuk diperhati
    sasaranAnimasi.forEach(function (el) {
      pemerhati.observe(el);
    });

  } else {
    // Pelayar lama tidak sokong IntersectionObserver
    // Paparkan semua elemen terus tanpa animasi
    sasaranAnimasi.forEach(function (el) {
      el.classList.add('animated');
    });
  }


  /* ==================================================================
     4. BORANG MAKLUM BALAS (FEEDBACK FORM)
     Apabila borang dihantar:
     - Bina pautan mailto dengan maklumat dari borang
     - Buka aplikasi e-mel pengguna secara automatik
     - Paparkan mesej kejayaan
     - Kosongkan borang
  ================================================================== */
  const borangMaklumBalas = document.getElementById('feedbackForm');
  const mesejBerjaya      = document.getElementById('formSuccess');

  if (borangMaklumBalas) {
    borangMaklumBalas.addEventListener('submit', function (e) {
      // Halang tingkah laku hantar borang lalai (supaya tidak muat semula halaman)
      e.preventDefault();

      // Ambil nilai dari setiap medan borang
      const nama   = document.getElementById('fname').value;
      const emel   = document.getElementById('femail').value;
      const jenis  = document.getElementById('ftype').value;
      const mesej  = document.getElementById('fmsg').value;

      // Bina tajuk dan badan e-mel (dikod untuk URL yang selamat)
      const tajuk = encodeURIComponent(
        `[AutoCaya] Maklum Balas: ${jenis} — daripada ${nama}`
      );
      const badan = encodeURIComponent(
        `Nama    : ${nama}\n` +
        `E-mel   : ${emel}\n` +
        `Jenis   : ${jenis}\n\n` +
        `Mesej:\n${mesej}`
      );

      // Buka aplikasi e-mel dengan penerima, tajuk, dan badan yang sudah diisi
      window.location.href =
        `mailto:muhddanial32@gmail.com?subject=${tajuk}&body=${badan}`;

      // Paparkan mesej kejayaan selama 5 saat
      if (mesejBerjaya) {
        mesejBerjaya.classList.add('show');
        setTimeout(function () {
          mesejBerjaya.classList.remove('show');
        }, 5000);
      }

      // Kosongkan semua medan borang
      borangMaklumBalas.reset();
    });
  }


  /* ==================================================================
     5. PENATAL LEMBUT UNTUK PAUTAN SAUH (SMOOTH SCROLL)
     Apabila pautan dengan href bermula '#' diklik,
     tatal ke bahagian berkenaan secara lembut dan lancar.
  ================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (pautan) {
    pautan.addEventListener('click', function (e) {
      const sasar = document.querySelector(this.getAttribute('href'));
      if (sasar) {
        e.preventDefault(); // Halang lompatan serta-merta
        sasar.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ==================================================================
     6. PENGIRAAN NOMBOR BERANIM (ANIMATED COUNTER)
     Nombor dalam blok statistik akan "mengira naik" dari 0
     apabila elemen memasuki viewport.
     Contoh: "2,400" akan dikira dari 0 hingga 2400.
  ================================================================== */

  /**
   * animasiPengira(elemen, sasaran, akhiran)
   * Fungsi dalaman yang mengira nombor dari 0 ke sasaran
   * dalam tempoh kira-kira 1.2 saat.
   */
  function animasiPengira(elemen, sasaran, akhiran) {
    let semasa = 0;
    const langkah  = sasaran / 60; // 60 langkah untuk 1.2 saat @ ~20ms
    const pemasa   = setInterval(function () {
      semasa += langkah;
      if (semasa >= sasaran) {
        semasa = sasaran;
        clearInterval(pemasa); // Hentikan apabila mencapai sasaran
      }
      // Kemaskini teks elemen dengan nombor semasa + akhiran
      elemen.textContent = Math.floor(semasa).toLocaleString('ms-MY') + akhiran;
    }, 20); // Kemas kini setiap 20ms
  }

  // Cari semua elemen nombor statistik
  const elemenStat = document.querySelectorAll('.stat-num');

  if (elemenStat.length > 0 && 'IntersectionObserver' in window) {
    const pemerhatiStat = new IntersectionObserver(function (entri) {
      entri.forEach(function (entri) {
        if (entri.isIntersecting) {
          const teks = entri.target.textContent;

          // Parse nombor dari teks (buang aksara bukan nombor kecuali titik)
          const nombor  = parseFloat(teks.replace(/[^0-9.]/g, ''));
          // Kekalkan akhiran seperti '★', 'K+', '+', dll.
          const akhiran = teks.replace(/[0-9.,]/g, '').trim();

          // Hanya animasi jika nilai lebih besar dari 1
          if (!isNaN(nombor) && nombor > 1) {
            animasiPengira(entri.target, nombor, akhiran);
          }

          // Berhenti memerhatikan selepas animasi dicetuskan
          pemerhatiStat.unobserve(entri.target);
        }
      });
    }, { threshold: 0.5 }); // Cetuskan apabila 50% elemen kelihatan

    elemenStat.forEach(function (el) {
      pemerhatiStat.observe(el);
    });
  }


  /* ==================================================================
     7. ANIMASI BAR PENILAIAN (RATING BARS — Integrity Hub)
     Bar peratusan penilaian akan muncul dengan animasi mengalir
     apabila bahagian tersebut memasuki skrin pengguna.
  ================================================================== */
  const barPenilaian = document.querySelectorAll('.bar-fill');

  if (barPenilaian.length > 0 && 'IntersectionObserver' in window) {
    const pemerhatiBar = new IntersectionObserver(function (entri) {
      entri.forEach(function (entri) {
        if (entri.isIntersecting) {
          // Tambah kelas untuk mencetuskan transisi CSS pada bar
          entri.target.classList.add('bar-animated');
          pemerhatiBar.unobserve(entri.target);
        }
      });
    }, { threshold: 0.5 });

    barPenilaian.forEach(function (bar) {
      pemerhatiBar.observe(bar);
    });
  }


  /* ==================================================================
     8. TETAPAN PAUTAN NAVIGASI AKTIF
     Semak URL halaman semasa dan tandakan pautan navigasi
     yang berkaitan dengan kelas 'active' untuk ditanda sebagai
     halaman yang sedang dilawati.
  ================================================================== */
  const halamanSemasa = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(function (pautan) {
    const href = pautan.getAttribute('href');

    // Padankan href pautan dengan nama fail halaman semasa
    if (href === halamanSemasa) {
      pautan.classList.add('active');
    } else if (halamanSemasa === '' && href === 'index.html') {
      // Kes khas: URL tanpa nama fail (domain sahaja) = laman utama
      pautan.classList.add('active');
    }
  });


}); // Tamat DOMContentLoaded
