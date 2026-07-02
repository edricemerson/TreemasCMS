export const SURVEY_VERSION = '1.0';

export const surveyData = [
  {
    id: 'strategic',
    order: 1,
    weight: 1,
    group: 'strategic',
    name: 'Strategic Value',
    fullName: 'Strategic Value',
    subsections: [
      {
        id: 'strategic-1',
        order: 1,
        name: 'Kapasitas Founder dan Top Management',
        questions: [
          { id: 'str-1-1', order: 1, enabled: true,  text: 'Sudah berapa lama pengelola menjalankan usaha ini atau usaha sejenis?', options: [{ value: 4, label: '> 5 tahun' }, { value: 3, label: '3–5 tahun' }, { value: 2, label: '1–3 tahun' }, { value: 1, label: '< 1 tahun' }] },
          { id: 'str-1-2', order: 2, enabled: false, text: 'Apakah pengelola pernah ikut pelatihan usaha (UMKM, keuangan, pemasaran, dll)?', options: [{ value: 4, label: 'Sering & relevan' }, { value: 3, label: 'Pernah beberapa kali' }, { value: 2, label: 'Pernah 1 kali' }, { value: 1, label: 'Belum pernah' }] },
          { id: 'str-1-3', order: 3, enabled: true,  text: 'Siapa yang biasanya mengambil keputusan penting usaha (harga, produk, investasi)?', options: [{ value: 4, label: 'Pengelola utama, terencana' }, { value: 3, label: 'Pengelola utama, spontan' }, { value: 2, label: 'Campur aduk' }, { value: 1, label: 'Tidak jelas' }] },
          { id: 'str-1-4', order: 4, enabled: false, text: 'Apakah tugas harian (produksi, jualan, keuangan) sudah dibagi jelas?', options: [{ value: 4, label: 'Jelas & berjalan' }, { value: 3, label: 'Cukup jelas' }, { value: 2, label: 'Sering tumpang tindih' }, { value: 1, label: 'Semua dikerjakan sendiri' }] },
          { id: 'str-1-5', order: 5, enabled: false, text: 'Apakah pengelola aktif mencari relasi (pelanggan, supplier, komunitas)?', options: [{ value: 4, label: 'Sangat aktif' }, { value: 3, label: 'Cukup aktif' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'strategic-2',
        order: 2,
        name: 'Visi, Misi, dan Value Perusahaan',
        questions: [
          { id: 'str-2-1', order: 1, enabled: true,  text: 'Apakah pengelola punya gambaran jelas usaha ini mau dibawa ke mana?', options: [{ value: 4, label: 'Sangat jelas' }, { value: 3, label: 'Cukup jelas' }, { value: 2, label: 'Masih samar' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'str-2-2', order: 2, enabled: true,  text: 'Apakah tujuan usaha hanya untuk bertahan atau ingin berkembang?', options: [{ value: 4, label: 'Ingin tumbuh jelas' }, { value: 3, label: 'Ingin tumbuh tapi belum terencana' }, { value: 2, label: 'Fokus bertahan' }, { value: 1, label: 'Tidak dipikirkan' }] },
          { id: 'str-2-3', order: 3, enabled: false, text: 'Apakah arah usaha dipahami oleh orang yang membantu (keluarga/karyawan)?', options: [{ value: 4, label: 'Dipahami semua' }, { value: 3, label: 'Dipahami sebagian' }, { value: 2, label: 'Jarang dibahas' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'str-2-4', order: 4, enabled: false, text: 'Apakah ada prinsip usaha (jujur, kualitas, layanan, dll)?', options: [{ value: 4, label: 'Diterapkan konsisten' }, { value: 3, label: 'Diterapkan sebagian' }, { value: 2, label: 'Sekadar niat' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'str-2-5', order: 5, enabled: false, text: 'Apakah arah usaha bisa menyesuaikan jika kondisi pasar berubah?', options: [{ value: 4, label: 'Sangat fleksibel' }, { value: 3, label: 'Cukup fleksibel' }, { value: 2, label: 'Sulit berubah' }, { value: 1, label: 'Tidak mau berubah' }] },
        ]
      },
      {
        id: 'strategic-3',
        order: 3,
        name: 'Kekuatan Ide dan Daya Saing Produk',
        questions: [
          { id: 'str-3-1', order: 1, enabled: true,  text: 'Apakah produk Anda punya kelebihan dibanding pesaing?', options: [{ value: 4, label: 'Jelas & kuat' }, { value: 3, label: 'Ada tapi kecil' }, { value: 2, label: 'Hampir sama' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'str-3-2', order: 2, enabled: true,  text: 'Apakah pelanggan punya alasan khusus membeli produk Anda?', options: [{ value: 4, label: 'Sering disebut pelanggan' }, { value: 3, label: 'Kadang disebut' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'str-3-3', order: 3, enabled: false, text: 'Apakah produk mudah ditiru oleh pesaing?', options: [{ value: 4, label: 'Sulit ditiru' }, { value: 3, label: 'Bisa ditiru' }, { value: 2, label: 'Mudah ditiru' }, { value: 1, label: 'Sudah banyak tiruan' }] },
          { id: 'str-3-4', order: 4, enabled: false, text: 'Apakah produk rutin diperbaiki/dikembangkan?', options: [{ value: 4, label: 'Rutin' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'str-3-5', order: 5, enabled: false, text: 'Apakah harga produk sesuai nilai yang dirasakan pelanggan?', options: [{ value: 4, label: 'Sangat sesuai' }, { value: 3, label: 'Cukup sesuai' }, { value: 2, label: 'Kurang sesuai' }, { value: 1, label: 'Tidak jelas' }] },
        ]
      },
      {
        id: 'strategic-4',
        order: 4,
        name: 'Potensi Pasar',
        questions: [
          { id: 'str-4-1', order: 1, enabled: true,  text: 'Apakah pembeli produk Anda terus bertambah?', options: [{ value: 4, label: 'Bertambah cepat' }, { value: 3, label: 'Bertambah perlahan' }, { value: 2, label: 'Tetap' }, { value: 1, label: 'Menurun' }] },
          { id: 'str-4-2', order: 2, enabled: false, text: 'Apakah pasar produk ini masih banyak peluang?', options: [{ value: 4, label: 'Sangat besar' }, { value: 3, label: 'Cukup besar' }, { value: 2, label: 'Terbatas' }, { value: 1, label: 'Hampir habis' }] },
          { id: 'str-4-3', order: 3, enabled: true,  text: 'Apakah usaha bergantung pada 1–2 pelanggan saja?', options: [{ value: 4, label: 'Tidak bergantung' }, { value: 3, label: 'Agak bergantung' }, { value: 2, label: 'Sangat bergantung' }, { value: 1, label: 'Hanya 1 pelanggan' }] },
          { id: 'str-4-4', order: 4, enabled: false, text: 'Apakah ada peluang jual ke wilayah/segmen lain?', options: [{ value: 4, label: 'Banyak peluang' }, { value: 3, label: 'Ada peluang' }, { value: 2, label: 'Sulit' }, { value: 1, label: 'Tidak mungkin' }] },
          { id: 'str-4-5', order: 5, enabled: false, text: 'Apakah tren pasar mendukung produk ini?', options: [{ value: 4, label: 'Sangat mendukung' }, { value: 3, label: 'Cukup mendukung' }, { value: 2, label: 'Netral' }, { value: 1, label: 'Menghambat' }] },
        ]
      },
      {
        id: 'strategic-5',
        order: 5,
        name: 'Business Plan',
        questions: [
          { id: 'str-5-1', order: 1, enabled: true,  text: 'Apakah usaha punya rencana usaha ke depan (tertulis/lisan)?', options: [{ value: 4, label: 'Jelas & tertulis' }, { value: 3, label: 'Jelas tapi lisan' }, { value: 2, label: 'Masih kasar' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'str-5-2', order: 2, enabled: false, text: 'Apakah pengelola tahu target penjualan atau omzet?', options: [{ value: 4, label: 'Jelas & realistis' }, { value: 3, label: 'Ada target kasar' }, { value: 2, label: 'Kadang dipikirkan' }, { value: 1, label: 'Tidak tahu' }] },
          { id: 'str-5-3', order: 3, enabled: true,  text: 'Apakah pengelola memperkirakan biaya & keuntungan?', options: [{ value: 4, label: 'Rutin dihitung' }, { value: 3, label: 'Kadang dihitung' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'str-5-4', order: 4, enabled: false, text: 'Apakah ada rencana menambah produk/pasar?', options: [{ value: 4, label: 'Jelas & terencana' }, { value: 3, label: 'Ada rencana' }, { value: 2, label: 'Masih wacana' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'str-5-5', order: 5, enabled: false, text: 'Apakah pengelola memikirkan risiko usaha?', options: [{ value: 4, label: 'Sudah dipikirkan' }, { value: 3, label: 'Pernah dipikirkan' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'strategic-6',
        order: 6,
        name: 'Implementasi Business Plan',
        questions: [
          { id: 'str-6-1', order: 1, enabled: true,  text: 'Apakah rencana usaha benar-benar dijalankan?', options: [{ value: 4, label: 'Hampir semua dijalankan' }, { value: 3, label: 'Sebagian dijalankan' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak dijalankan' }] },
          { id: 'str-6-2', order: 2, enabled: false, text: 'Apakah pengelola mengecek hasil usaha secara rutin?', options: [{ value: 4, label: 'Rutin' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'str-6-3', order: 3, enabled: true,  text: 'Apakah pengelola memperbaiki strategi jika hasil tidak sesuai?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'str-6-4', order: 4, enabled: false, text: 'Apakah ada pembagian waktu/biaya sesuai rencana?', options: [{ value: 4, label: 'Sangat sesuai' }, { value: 3, label: 'Cukup sesuai' }, { value: 2, label: 'Kurang sesuai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'str-6-5', order: 5, enabled: false, text: 'Apakah rencana usaha diperbarui jika kondisi berubah?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      }
    ]
  },
  {
    id: 'financial',
    order: 2,
    weight: 1,
    group: 'financial',
    name: 'Financial Health',
    fullName: 'Financial Health',
    subsections: [
      {
        id: 'financial-1',
        order: 1,
        name: 'Revenue Generation',
        questions: [
          { id: 'fin-1-1', order: 1, enabled: true,  text: 'Bagaimana kondisi penjualan usaha dari bulan ke bulan?', options: [{ value: 4, label: 'Stabil / meningkat' }, { value: 3, label: 'Kadang naik turun' }, { value: 2, label: 'Sering turun' }, { value: 1, label: 'Sangat tidak stabil' }] },
          { id: 'fin-1-2', order: 2, enabled: true,  text: 'Dalam 1 tahun terakhir, bagaimana perkembangan penjualan usaha Anda?', options: [{ value: 4, label: 'Tumbuh jelas & konsisten' }, { value: 3, label: 'Tumbuh pelan' }, { value: 2, label: 'Stagnan' }, { value: 1, label: 'Menurun' }] },
          { id: 'fin-1-3', order: 3, enabled: false, text: 'Apakah aset usaha (alat, mesin, tempat) aktif digunakan untuk menghasilkan penjualan?', options: [{ value: 4, label: 'Hampir semua aktif' }, { value: 3, label: 'Sebagian besar aktif' }, { value: 2, label: 'Banyak jarang dipakai' }, { value: 1, label: 'Banyak menganggur' }] },
          { id: 'fin-1-4', order: 4, enabled: false, text: 'Apakah alat/mesin utama membantu meningkatkan kapasitas dan penjualan?', options: [{ value: 4, label: 'Sangat membantu' }, { value: 3, label: 'Cukup membantu' }, { value: 2, label: 'Kurang membantu' }, { value: 1, label: 'Tidak membantu' }] },
        ]
      },
      {
        id: 'financial-2',
        order: 2,
        name: 'Profitabilitas',
        questions: [
          { id: 'fin-2-1', order: 1, enabled: false, text: 'Setelah dikurangi biaya bahan/produksi, apakah masih ada sisa keuntungan?', options: [{ value: 4, label: 'Sisa besar & konsisten' }, { value: 3, label: 'Ada sisa tipis' }, { value: 2, label: 'Sangat tipis' }, { value: 1, label: 'Hampir tidak ada' }] },
          { id: 'fin-2-2', order: 2, enabled: false, text: 'Setelah membayar biaya usaha (sewa, listrik, gaji), bagaimana hasilnya?', options: [{ value: 4, label: 'Untung nyaman' }, { value: 3, label: 'Untung tipis' }, { value: 2, label: 'Hampir impas' }, { value: 1, label: 'Rugi' }] },
          { id: 'fin-2-3', order: 3, enabled: true,  text: 'Setelah semua biaya dibayar, bagaimana kondisi keuangan usaha?', options: [{ value: 4, label: 'Untung jelas' }, { value: 3, label: 'Untung kecil' }, { value: 2, label: 'Hampir tidak untung' }, { value: 1, label: 'Rugi' }] },
          { id: 'fin-2-4', order: 4, enabled: true,  text: 'Dari penjualan, apakah usaha menghasilkan uang tunai yang cukup untuk operasional?', options: [{ value: 4, label: 'Selalu cukup' }, { value: 3, label: 'Biasanya cukup' }, { value: 2, label: 'Sering kurang' }, { value: 1, label: 'Selalu kurang' }] },
          { id: 'fin-2-5', order: 5, enabled: false, text: 'Apakah hasil usaha sepadan dengan modal yang Anda tanamkan?', options: [{ value: 4, label: 'Sangat sepadan' }, { value: 3, label: 'Cukup sepadan' }, { value: 2, label: 'Kurang sepadan' }, { value: 1, label: 'Tidak sepadan' }] },
          { id: 'fin-2-6', order: 6, enabled: false, text: 'Apakah aset usaha memberikan hasil yang maksimal?', options: [{ value: 4, label: 'Sangat maksimal' }, { value: 3, label: 'Cukup maksimal' }, { value: 2, label: 'Kurang maksimal' }, { value: 1, label: 'Tidak maksimal' }] },
        ]
      },
      {
        id: 'financial-3',
        order: 3,
        name: 'Likuiditas',
        questions: [
          { id: 'fin-3-1', order: 1, enabled: true,  text: 'Saat waktunya belanja bahan atau bayar kewajiban, bagaimana kondisi keuangan usaha?', options: [{ value: 4, label: 'Selalu mudah membayar' }, { value: 3, label: 'Kadang perlu atur ulang' }, { value: 2, label: 'Sering cari dana' }, { value: 1, label: 'Selalu kesulitan' }] },
          { id: 'fin-3-2', order: 2, enabled: true,  text: 'Jika ada kebutuhan mendadak, apakah tersedia dana cepat dipakai?', options: [{ value: 4, label: 'Selalu ada' }, { value: 3, label: 'Biasanya ada' }, { value: 2, label: 'Jarang ada' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'fin-3-3', order: 3, enabled: false, text: 'Apakah usaha memiliki cadangan uang tunai?', options: [{ value: 4, label: 'Aman & cukup' }, { value: 3, label: 'Ada tapi terbatas' }, { value: 2, label: 'Hampir tidak ada' }, { value: 1, label: 'Tidak ada sama sekali' }] },
          { id: 'fin-3-4', order: 4, enabled: false, text: 'Apakah hasil penjualan benar-benar menjadi uang yang bisa dipakai?', options: [{ value: 4, label: 'Hampir semua jadi kas' }, { value: 3, label: 'Sebagian besar jadi kas' }, { value: 2, label: 'Banyak tertahan' }, { value: 1, label: 'Hampir tidak jadi kas' }] },
        ]
      },
      {
        id: 'financial-4',
        order: 4,
        name: 'Leverage',
        questions: [
          { id: 'fin-4-1', order: 1, enabled: false, text: 'Bagaimana porsi utang dibandingkan modal sendiri?', options: [{ value: 4, label: 'Sangat terkendali' }, { value: 3, label: 'Masih aman' }, { value: 2, label: 'Cukup berat' }, { value: 1, label: 'Sangat berat' }] },
          { id: 'fin-4-2', order: 2, enabled: false, text: 'Apakah cicilan jangka panjang memberatkan usaha?', options: [{ value: 4, label: 'Tidak memberatkan' }, { value: 3, label: 'Masih aman' }, { value: 2, label: 'Cukup berat' }, { value: 1, label: 'Sangat berat' }] },
          { id: 'fin-4-3', order: 3, enabled: true,  text: 'Apakah cicilan usaha bisa dibayar dari hasil usaha?', options: [{ value: 4, label: 'Selalu lancar' }, { value: 3, label: 'Kadang terlambat' }, { value: 2, label: 'Sering terlambat' }, { value: 1, label: 'Sering gagal' }] },
          { id: 'fin-4-4', order: 4, enabled: false, text: 'Apakah bunga pinjaman membebani usaha?', options: [{ value: 4, label: 'Tidak membebani' }, { value: 3, label: 'Sedikit membebani' }, { value: 2, label: 'Cukup membebani' }, { value: 1, label: 'Sangat membebani' }] },
          { id: 'fin-4-5', order: 5, enabled: true,  text: 'Jika penjualan turun, bagaimana kondisi keuangan usaha?', options: [{ value: 4, label: 'Masih aman' }, { value: 3, label: 'Agak tertekan' }, { value: 2, label: 'Sangat tertekan' }, { value: 1, label: 'Terancam tutup' }] },
        ]
      },
      {
        id: 'financial-5',
        order: 5,
        name: 'Modal Kerja',
        questions: [
          { id: 'fin-5-1', order: 1, enabled: true,  text: 'Apakah stok barang cepat terjual?', options: [{ value: 4, label: 'Sangat cepat' }, { value: 3, label: 'Cukup cepat' }, { value: 2, label: 'Lama menumpuk' }, { value: 1, label: 'Sangat lama' }] },
          { id: 'fin-5-2', order: 2, enabled: true,  text: 'Apakah pelanggan biasanya membayar tepat waktu?', options: [{ value: 4, label: 'Selalu tepat waktu' }, { value: 3, label: 'Kadang terlambat' }, { value: 2, label: 'Sering terlambat' }, { value: 1, label: 'Banyak tidak tertagih' }] },
          { id: 'fin-5-3', order: 3, enabled: false, text: 'Apakah pembayaran ke supplier berjalan lancar?', options: [{ value: 4, label: 'Selalu lancar' }, { value: 3, label: 'Kadang mundur' }, { value: 2, label: 'Sering mundur' }, { value: 1, label: 'Bermasalah' }] },
          { id: 'fin-5-4', order: 4, enabled: false, text: 'Seberapa cepat uang keluar kembali menjadi uang masuk?', options: [{ value: 4, label: 'Sangat cepat' }, { value: 3, label: 'Cukup cepat' }, { value: 2, label: 'Lama' }, { value: 1, label: 'Sangat lama' }] },
        ]
      }
    ]
  },
  {
    id: 'ant',
    order: 3,
    weight: 1,
    group: 'core',
    name: 'Accounting & Tax',
    fullName: 'Accounting & Tax',
    subsections: [
      {
        id: 'ant-1',
        order: 1,
        name: 'Kapabilitas Tim Akuntansi',
        questions: [
          { id: 'ant-1-1', order: 1, enabled: false, text: 'Siapa yang mengelola pencatatan keuangan usaha?', options: [{ value: 4, label: 'Orang khusus / ahli' }, { value: 3, label: 'Orang khusus tapi non-ahli' }, { value: 2, label: 'Dirangkap pemilik' }, { value: 1, label: 'Tidak jelas' }] },
          { id: 'ant-1-2', order: 2, enabled: true,  text: 'Apakah pengelola keuangan memahami pemasukan & pengeluaran usaha?', options: [{ value: 4, label: 'Sangat paham' }, { value: 3, label: 'Cukup paham' }, { value: 2, label: 'Kurang paham' }, { value: 1, label: 'Tidak paham' }] },
          { id: 'ant-1-3', order: 3, enabled: true,  text: 'Apakah pencatatan keuangan bisa dilakukan secara rutin oleh pengelola?', options: [{ value: 4, label: 'Setiap hari' }, { value: 3, label: 'Mingguan' }, { value: 2, label: 'Tidak rutin' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'ant-1-4', order: 4, enabled: false, text: 'Apakah pemilik bisa membaca kondisi keuangan dari catatan tersebut?', options: [{ value: 4, label: 'Sangat bisa' }, { value: 3, label: 'Cukup bisa' }, { value: 2, label: 'Sulit' }, { value: 1, label: 'Tidak bisa' }] },
          { id: 'ant-1-5', order: 5, enabled: false, text: 'Apakah usaha pernah mengikuti pelatihan pencatatan keuangan/pajak?', options: [{ value: 4, label: 'Pernah & diterapkan' }, { value: 3, label: 'Pernah' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'ant-2',
        order: 2,
        name: 'Struktur dan Pedoman Akuntansi',
        questions: [
          { id: 'ant-2-1', order: 1, enabled: true,  text: 'Apakah pemasukan dan pengeluaran dicatat terpisah dan rapi?', options: [{ value: 4, label: 'Selalu rapi' }, { value: 3, label: 'Cukup rapi' }, { value: 2, label: 'Kadang tercampur' }, { value: 1, label: 'Tidak dicatat' }] },
          { id: 'ant-2-2', order: 2, enabled: false, text: 'Apakah aset usaha (alat, mesin, stok) dicatat?', options: [{ value: 4, label: 'Lengkap' }, { value: 3, label: 'Sebagian' }, { value: 2, label: 'Sangat terbatas' }, { value: 1, label: 'Tidak dicatat' }] },
          { id: 'ant-2-3', order: 3, enabled: false, text: 'Apakah utang dan piutang dicatat dengan jelas?', options: [{ value: 4, label: 'Lengkap & terkontrol' }, { value: 3, label: 'Dicatat tapi tidak rutin' }, { value: 2, label: 'Kadang lupa' }, { value: 1, label: 'Tidak dicatat' }] },
          { id: 'ant-2-4', order: 4, enabled: true,  text: 'Apakah catatan usaha terpisah dari keuangan pribadi?', options: [{ value: 4, label: 'Terpisah jelas' }, { value: 3, label: 'Sebagian terpisah' }, { value: 2, label: 'Sering tercampur' }, { value: 1, label: 'Tidak terpisah' }] },
          { id: 'ant-2-5', order: 5, enabled: false, text: 'Apakah usaha memiliki format catatan yang konsisten?', options: [{ value: 4, label: 'Konsisten' }, { value: 3, label: 'Hampir konsisten' }, { value: 2, label: 'Berubah-ubah' }, { value: 1, label: 'Tidak ada format' }] },
        ]
      },
      {
        id: 'ant-3',
        order: 3,
        name: 'Desain SOP',
        questions: [
          { id: 'ant-3-1', order: 1, enabled: true,  text: 'Apakah ada kebiasaan tetap dalam mencatat transaksi usaha?', options: [{ value: 4, label: 'Sangat disiplin' }, { value: 3, label: 'Cukup disiplin' }, { value: 2, label: 'Tidak konsisten' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ant-3-2', order: 2, enabled: true,  text: 'Apakah setiap transaksi ada bukti (nota, catatan, transfer)?', options: [{ value: 4, label: 'Selalu ada' }, { value: 3, label: 'Sebagian besar' }, { value: 2, label: 'Sedikit' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ant-3-3', order: 3, enabled: false, text: 'Apakah ada aturan sederhana soal uang masuk & keluar?', options: [{ value: 4, label: 'Jelas & dijalankan' }, { value: 3, label: 'Ada tapi tidak konsisten' }, { value: 2, label: 'Tidak jelas' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ant-3-4', order: 4, enabled: false, text: 'Apakah ada kebiasaan menutup catatan (harian/mingguan)?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Sering' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'ant-3-5', order: 5, enabled: false, text: 'Apakah kebiasaan pencatatan sesuai dengan kondisi usaha saat ini?', options: [{ value: 4, label: 'Sangat sesuai' }, { value: 3, label: 'Cukup sesuai' }, { value: 2, label: 'Kurang sesuai' }, { value: 1, label: 'Tidak sesuai' }] },
        ]
      },
      {
        id: 'ant-4',
        order: 4,
        name: 'Implementasi SOP',
        questions: [
          { id: 'ant-4-1', order: 1, enabled: true,  text: 'Apakah pencatatan benar-benar dilakukan sesuai kebiasaan yang disepakati?', options: [{ value: 4, label: 'Selalu dijalankan' }, { value: 3, label: 'Kadang terlambat' }, { value: 2, label: 'Sering terlewat' }, { value: 1, label: 'Tidak dijalankan' }] },
          { id: 'ant-4-2', order: 2, enabled: false, text: 'Apakah data keuangan mudah dicari saat dibutuhkan?', options: [{ value: 4, label: 'Sangat mudah' }, { value: 3, label: 'Cukup mudah' }, { value: 2, label: 'Sulit' }, { value: 1, label: 'Tidak bisa' }] },
          { id: 'ant-4-3', order: 3, enabled: true,  text: 'Apakah catatan keuangan digunakan untuk mengambil keputusan?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'ant-4-4', order: 4, enabled: false, text: 'Apakah ada evaluasi catatan keuangan secara rutin?', options: [{ value: 4, label: 'Rutin' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'ant-4-5', order: 5, enabled: false, text: 'Apakah kesalahan pencatatan diperbaiki?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'ant-5',
        order: 5,
        name: 'Integrasi Laporan dan IT',
        questions: [
          { id: 'ant-5-1', order: 1, enabled: true,  text: 'Apa alat utama pencatatan keuangan usaha?', options: [{ value: 4, label: 'Aplikasi akuntansi' }, { value: 3, label: 'Aplikasi sederhana' }, { value: 2, label: 'Excel / buku' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ant-5-2', order: 2, enabled: true,  text: 'Apakah pencatatan dilakukan secara digital?', options: [{ value: 4, label: 'Sepenuhnya' }, { value: 3, label: 'Sebagian' }, { value: 2, label: 'Sangat terbatas' }, { value: 1, label: 'Tidak' }] },
          { id: 'ant-5-3', order: 3, enabled: false, text: 'Apakah laporan keuangan bisa dilihat dengan cepat?', options: [{ value: 4, label: 'Real-time' }, { value: 3, label: '< 3 hari' }, { value: 2, label: '> 1 minggu' }, { value: 1, label: 'Tidak bisa' }] },
          { id: 'ant-5-4', order: 4, enabled: false, text: 'Apakah data keuangan aman & tersimpan rapi?', options: [{ value: 4, label: 'Sangat aman' }, { value: 3, label: 'Cukup aman' }, { value: 2, label: 'Rentan hilang' }, { value: 1, label: 'Sering hilang' }] },
          { id: 'ant-5-5', order: 5, enabled: false, text: 'Apakah pemilik nyaman menggunakan alat pencatatan saat ini?', options: [{ value: 4, label: 'Sangat nyaman' }, { value: 3, label: 'Cukup nyaman' }, { value: 2, label: 'Kurang nyaman' }, { value: 1, label: 'Tidak nyaman' }] },
        ]
      },
      {
        id: 'ant-6',
        order: 6,
        name: 'Pelaporan dan Perencanaan Pajak',
        questions: [
          { id: 'ant-6-1', order: 1, enabled: true,  text: 'Apakah usaha memiliki NPWP dan legalitas pajak dasar?', options: [{ value: 4, label: 'Lengkap' }, { value: 3, label: 'Ada tapi belum aktif' }, { value: 2, label: 'Ada tapi bingung' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ant-6-2', order: 2, enabled: false, text: 'Apakah usaha melaporkan pajak secara rutin?', options: [{ value: 4, label: 'Tepat waktu' }, { value: 3, label: 'Kadang terlambat' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'ant-6-3', order: 3, enabled: false, text: 'Apakah usaha membayar pajak sesuai ketentuan?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'ant-6-4', order: 4, enabled: true,  text: 'Apakah pemilik memahami kewajiban pajak usahanya?', options: [{ value: 4, label: 'Paham' }, { value: 3, label: 'Cukup paham' }, { value: 2, label: 'Kurang paham' }, { value: 1, label: 'Tidak paham' }] },
          { id: 'ant-6-5', order: 5, enabled: false, text: 'Apakah usaha pernah dibantu konsultan/petugas pajak?', options: [{ value: 4, label: 'Pernah & aktif' }, { value: 3, label: 'Pernah' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      }
    ]
  },
  {
    id: 'finance',
    order: 4,
    weight: 1,
    group: 'core',
    name: 'Finance',
    fullName: 'Finance Business Process',
    subsections: [
      {
        id: 'finance-1',
        order: 1,
        name: 'Kapabilitas dan Struktur Tim Finance',
        questions: [
          { id: 'fnc-1-1', order: 1, enabled: false, text: 'Siapa yang mengatur keuangan usaha sehari-hari?', options: [{ value: 4, label: 'Orang khusus & paham' }, { value: 3, label: 'Orang khusus tapi terbatas' }, { value: 2, label: 'Dirangkap pemilik' }, { value: 1, label: 'Tidak jelas' }] },
          { id: 'fnc-1-2', order: 2, enabled: true,  text: 'Apakah pemilik/pengelola memahami kondisi uang masuk & keluar?', options: [{ value: 4, label: 'Sangat paham' }, { value: 3, label: 'Cukup paham' }, { value: 2, label: 'Kurang paham' }, { value: 1, label: 'Tidak paham' }] },
          { id: 'fnc-1-3', order: 3, enabled: false, text: 'Apakah usaha pernah membuat rencana keuangan sederhana?', options: [{ value: 4, label: 'Rutin dibuat' }, { value: 3, label: 'Pernah dibuat' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'fnc-1-4', order: 4, enabled: true,  text: 'Apakah pemilik bisa memperkirakan kebutuhan uang ke depan?', options: [{ value: 4, label: 'Sangat bisa' }, { value: 3, label: 'Cukup bisa' }, { value: 2, label: 'Sulit' }, { value: 1, label: 'Tidak bisa' }] },
          { id: 'fnc-1-5', order: 5, enabled: false, text: 'Apakah keuangan dilibatkan saat mengambil keputusan penting usaha?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Sering' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'finance-2',
        order: 2,
        name: 'Pengelolaan Arus Kas dan Modal Kerja',
        questions: [
          { id: 'fnc-2-1', order: 1, enabled: false, text: 'Apakah usaha punya gambaran kas mingguan/bulanan?', options: [{ value: 4, label: 'Jelas & dipakai' }, { value: 3, label: 'Ada tapi jarang' }, { value: 2, label: 'Hanya saat darurat' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'fnc-2-2', order: 2, enabled: true,  text: 'Saat jatuh tempo pembayaran, bagaimana kondisi kas usaha?', options: [{ value: 4, label: 'Selalu aman' }, { value: 3, label: 'Kadang ketat' }, { value: 2, label: 'Sering kurang' }, { value: 1, label: 'Sering kritis' }] },
          { id: 'fnc-2-3', order: 3, enabled: true,  text: 'Perbandingan uang masuk dan keluar biasanya bagaimana?', options: [{ value: 4, label: 'Seimbang / surplus' }, { value: 3, label: 'Kadang minus kecil' }, { value: 2, label: 'Sering minus' }, { value: 1, label: 'Tidak dikontrol' }] },
          { id: 'fnc-2-4', order: 4, enabled: false, text: 'Bagaimana pengelolaan piutang pelanggan?', options: [{ value: 4, label: 'Tertib & lancar' }, { value: 3, label: 'Ada tapi kurang disiplin' }, { value: 2, label: 'Banyak tertunda' }, { value: 1, label: 'Tidak dikontrol' }] },
          { id: 'fnc-2-5', order: 5, enabled: false, text: 'Stok, utang, dan kas dikelola bersama?', options: [{ value: 4, label: 'Seimbang' }, { value: 3, label: 'Umumnya seimbang' }, { value: 2, label: 'Sering bermasalah' }, { value: 1, label: 'Tidak terkelola' }] },
        ]
      },
      {
        id: 'finance-3',
        order: 3,
        name: 'Penganggaran dan Forecasting',
        questions: [
          { id: 'fnc-3-1', order: 1, enabled: true,  text: 'Apakah usaha punya rencana penggunaan uang ke depan?', options: [{ value: 4, label: 'Jelas & tertulis' }, { value: 3, label: 'Ada tapi sederhana' }, { value: 2, label: 'Ada tapi tidak dipakai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'fnc-3-2', order: 2, enabled: false, text: 'Apakah rencana keuangan sesuai dengan rencana usaha?', options: [{ value: 4, label: 'Selaras' }, { value: 3, label: 'Cukup selaras' }, { value: 2, label: 'Kurang selaras' }, { value: 1, label: 'Tidak selaras' }] },
          { id: 'fnc-3-3', order: 3, enabled: true,  text: 'Apakah pengeluaran direncanakan atau spontan?', options: [{ value: 4, label: 'Terencana' }, { value: 3, label: 'Sebagian' }, { value: 2, label: 'Sering spontan' }, { value: 1, label: 'Selalu spontan' }] },
          { id: 'fnc-3-4', order: 4, enabled: false, text: 'Apakah hasil keuangan dibandingkan dengan rencana?', options: [{ value: 4, label: 'Rutin' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'fnc-3-5', order: 5, enabled: false, text: 'Jika kondisi berubah, apakah rencana keuangan disesuaikan?', options: [{ value: 4, label: 'Cepat disesuaikan' }, { value: 3, label: 'Lambat' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'finance-4',
        order: 4,
        name: 'Analisis Keuangan dan Profitabilitas',
        questions: [
          { id: 'fnc-4-1', order: 1, enabled: true,  text: 'Apakah pemilik tahu produk/usaha mana yang paling untung?', options: [{ value: 4, label: 'Sangat tahu' }, { value: 3, label: 'Cukup tahu' }, { value: 2, label: 'Perkiraan' }, { value: 1, label: 'Tidak tahu' }] },
          { id: 'fnc-4-2', order: 2, enabled: true,  text: 'Apakah biaya usaha dipantau dan dikendalikan?', options: [{ value: 4, label: 'Sangat ketat' }, { value: 3, label: 'Cukup' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak dipantau' }] },
          { id: 'fnc-4-3', order: 3, enabled: false, text: 'Apakah usaha tahu titik minimal penjualan agar tidak rugi?', options: [{ value: 4, label: 'Sangat paham' }, { value: 3, label: 'Cukup paham' }, { value: 2, label: 'Pernah dengar' }, { value: 1, label: 'Tidak tahu' }] },
          { id: 'fnc-4-4', order: 4, enabled: false, text: 'Apakah keuntungan usaha dianalisis dari waktu ke waktu?', options: [{ value: 4, label: 'Rutin' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'fnc-4-5', order: 5, enabled: false, text: 'Apakah hasil usaha dievaluasi untuk perbaikan ke depan?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Sering' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'finance-5',
        order: 5,
        name: 'Pengambilan Keputusan Keuangan dan Investasi',
        questions: [
          { id: 'fnc-5-1', order: 1, enabled: true,  text: 'Sebelum beli aset besar, apakah dihitung dulu dampaknya ke keuangan?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'fnc-5-2', order: 2, enabled: false, text: 'Apakah pengeluaran besar punya batasan tertentu?', options: [{ value: 4, label: 'Ada & ditaati' }, { value: 3, label: 'Ada tapi longgar' }, { value: 2, label: 'Tidak jelas' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'fnc-5-3', order: 3, enabled: true,  text: 'Apakah keputusan keuangan berdasarkan prioritas usaha?', options: [{ value: 4, label: 'Sangat jelas' }, { value: 3, label: 'Cukup jelas' }, { value: 2, label: 'Kadang impulsif' }, { value: 1, label: 'Tidak ada prioritas' }] },
          { id: 'fnc-5-4', order: 4, enabled: false, text: 'Apakah hasil keputusan keuangan dievaluasi?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'fnc-5-5', order: 5, enabled: false, text: 'Jika keputusan salah, apakah dilakukan perbaikan?', options: [{ value: 4, label: 'Cepat diperbaiki' }, { value: 3, label: 'Lama diperbaiki' }, { value: 2, label: 'Sering dibiarkan' }, { value: 1, label: 'Tidak diperbaiki' }] },
        ]
      },
      {
        id: 'finance-6',
        order: 6,
        name: 'Integrasi Fungsi Keuangan dengan Fungsi Lain',
        questions: [
          { id: 'fnc-6-1', order: 1, enabled: false, text: 'Apakah keuangan berkoordinasi dengan penjualan & operasional?', options: [{ value: 4, label: 'Sangat aktif' }, { value: 3, label: 'Cukup aktif' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'fnc-6-2', order: 2, enabled: true,  text: 'Apakah data keuangan dipakai untuk mengatur usaha?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'fnc-6-3', order: 3, enabled: true,  text: 'Apakah rencana usaha disesuaikan dengan kemampuan keuangan?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'fnc-6-4', order: 4, enabled: false, text: 'Apakah keuangan memberi peringatan jika ada masalah?', options: [{ value: 4, label: 'Proaktif' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Terlambat' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'fnc-6-5', order: 5, enabled: false, text: 'Apakah laporan keuangan mudah dipahami oleh pengelola usaha?', options: [{ value: 4, label: 'Sangat mudah' }, { value: 3, label: 'Cukup mudah' }, { value: 2, label: 'Sulit' }, { value: 1, label: 'Tidak dipahami' }] },
        ]
      }
    ]
  },
  {
    id: 'marketing',
    order: 5,
    weight: 1,
    group: 'core',
    name: 'Marketing',
    fullName: 'Marketing Business Process',
    subsections: [
      {
        id: 'marketing-1',
        order: 1,
        name: 'Kapabilitas dan Struktur Tim Marketing',
        questions: [
          { id: 'mkt-1-1', order: 1, enabled: false, text: 'Siapa yang mengurus pemasaran (promosi & penjualan) di usaha ini?', options: [{ value: 4, label: 'Ada orang khusus & paham' }, { value: 3, label: 'Ada orang khusus tapi terbatas' }, { value: 2, label: 'Dirangkap pemilik' }, { value: 1, label: 'Tidak ada yang jelas' }] },
          { id: 'mkt-1-2', order: 2, enabled: true,  text: 'Seberapa paham pengelola pemasaran tentang cara menarik pelanggan?', options: [{ value: 4, label: 'Sangat paham' }, { value: 3, label: 'Cukup paham' }, { value: 2, label: 'Kurang paham' }, { value: 1, label: 'Tidak paham' }] },
          { id: 'mkt-1-3', order: 3, enabled: false, text: 'Apakah pernah ikut pelatihan pemasaran (online/offline)?', options: [{ value: 4, label: 'Sering & diterapkan' }, { value: 3, label: 'Pernah beberapa kali' }, { value: 2, label: 'Pernah 1 kali' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'mkt-1-4', order: 4, enabled: true,  text: 'Seberapa sering kesulitan menentukan target pelanggan?', options: [{ value: 4, label: 'Hampir tidak pernah' }, { value: 3, label: 'Jarang' }, { value: 2, label: 'Kadang-kadang' }, { value: 1, label: 'Sering' }] },
          { id: 'mkt-1-5', order: 5, enabled: false, text: 'Seberapa sering kesulitan membuat ide promosi/kampanye?', options: [{ value: 4, label: 'Hampir tidak pernah' }, { value: 3, label: 'Jarang' }, { value: 2, label: 'Kadang-kadang' }, { value: 1, label: 'Sering' }] },
          { id: 'mkt-1-6', order: 6, enabled: false, text: 'Seberapa sering kesulitan menjalankan promosi (konten, posting, event)?', options: [{ value: 4, label: 'Hampir tidak pernah' }, { value: 3, label: 'Jarang' }, { value: 2, label: 'Kadang-kadang' }, { value: 1, label: 'Sering' }] },
        ]
      },
      {
        id: 'marketing-2',
        order: 2,
        name: 'Marketing Strategy dan Marketing Plan',
        questions: [
          { id: 'mkt-2-1', order: 1, enabled: true,  text: 'Apakah Anda tahu siapa pelanggan utama usaha ini? (segmen/target)', options: [{ value: 4, label: 'Sangat jelas & spesifik' }, { value: 3, label: 'Cukup jelas' }, { value: 2, label: 'Masih umum' }, { value: 1, label: 'Tidak tahu' }] },
          { id: 'mkt-2-2', order: 2, enabled: false, text: 'Apakah Anda punya gambaran "profil pembeli ideal" (umur, kebutuhan, daya beli)?', options: [{ value: 4, label: 'Jelas & dipakai' }, { value: 3, label: 'Ada tapi belum konsisten' }, { value: 2, label: 'Masih kira-kira' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'mkt-2-3', order: 3, enabled: true,  text: 'Apakah Anda punya alasan utama kenapa pelanggan memilih produk Anda? (pembeda/USP)', options: [{ value: 4, label: 'Sangat jelas' }, { value: 3, label: 'Cukup jelas' }, { value: 2, label: 'Lemah' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'mkt-2-4', order: 4, enabled: false, text: 'Apakah harga ditetapkan dengan pertimbangan pasar & pesaing?', options: [{ value: 4, label: 'Berdasarkan info pasar' }, { value: 3, label: 'Ada pertimbangan sederhana' }, { value: 2, label: 'Mostly feeling' }, { value: 1, label: 'Tidak dipikirkan' }] },
          { id: 'mkt-2-5', order: 5, enabled: false, text: 'Apakah Anda punya rencana promosi (mingguan/bulanan) yang jelas?', options: [{ value: 4, label: 'Ada & dijalankan' }, { value: 3, label: 'Ada tapi kadang jalan' }, { value: 2, label: 'Ada tapi jarang dipakai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'mkt-2-6', order: 6, enabled: false, text: 'Apakah cara jualan/distribusi sudah jelas? (toko, online, reseller, titip jual)', options: [{ value: 4, label: 'Banyak channel & efektif' }, { value: 3, label: 'Ada beberapa channel' }, { value: 2, label: '1 channel saja' }, { value: 1, label: 'Tidak jelas' }] },
          { id: 'mkt-2-7', order: 7, enabled: false, text: 'Apakah brand/identitas visual (nama, logo, kemasan) konsisten?', options: [{ value: 4, label: 'Konsisten & rapi' }, { value: 3, label: 'Cukup konsisten' }, { value: 2, label: 'Tidak konsisten' }, { value: 1, label: 'Tidak ada' }] },
        ]
      },
      {
        id: 'marketing-3',
        order: 3,
        name: 'SOP Marketing',
        questions: [
          { id: 'mkt-3-1', order: 1, enabled: true,  text: 'Apakah ada cara kerja tetap untuk promosi (jadwal posting, template, katalog)?', options: [{ value: 4, label: 'Ada & jelas' }, { value: 3, label: 'Ada tapi belum rapi' }, { value: 2, label: 'Ada tapi sering berubah' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'mkt-3-2', order: 2, enabled: false, text: 'Apakah ada langkah standar sebelum promosi (tujuan, target, anggaran kecil)?', options: [{ value: 4, label: 'Selalu ada' }, { value: 3, label: 'Kadang ada' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'mkt-3-3', order: 3, enabled: false, text: 'Apakah ada cara standar melayani calon pembeli (respon chat, follow up)?', options: [{ value: 4, label: 'Ada & konsisten' }, { value: 3, label: 'Ada tapi belum konsisten' }, { value: 2, label: 'Kadang-kadang' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'mkt-3-4', order: 4, enabled: false, text: 'Apakah ada cara standar menangani komplain & menjaga pelanggan?', options: [{ value: 4, label: 'Ada & dijalankan' }, { value: 3, label: 'Ada tapi lemah' }, { value: 2, label: 'Jarang dipakai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'mkt-3-5', order: 5, enabled: true,  text: 'Apakah aktivitas pemasaran dicatat (konten, promo, biaya, hasil)?', options: [{ value: 4, label: 'Dicatat rapi' }, { value: 3, label: 'Dicatat sederhana' }, { value: 2, label: 'Jarang dicatat' }, { value: 1, label: 'Tidak dicatat' }] },
        ]
      },
      {
        id: 'marketing-4',
        order: 4,
        name: 'Implementasi Marketing Strategy dan Marketing Plan',
        questions: [
          { id: 'mkt-4-1', order: 1, enabled: false, text: 'Apakah promosi benar-benar menyasar pelanggan yang ditargetkan?', options: [{ value: 4, label: 'Sangat sesuai' }, { value: 3, label: 'Cukup sesuai' }, { value: 2, label: 'Kurang sesuai' }, { value: 1, label: 'Tidak sesuai' }] },
          { id: 'mkt-4-2', order: 2, enabled: false, text: 'Apakah pesan promosi mencerminkan keunggulan produk (USP/positioning)?', options: [{ value: 4, label: 'Konsisten & jelas' }, { value: 3, label: 'Cukup jelas' }, { value: 2, label: 'Kadang tidak nyambung' }, { value: 1, label: 'Tidak jelas' }] },
          { id: 'mkt-4-3', order: 3, enabled: true,  text: 'Apakah rencana promosi dijalankan sesuai jadwal?', options: [{ value: 4, label: 'Konsisten' }, { value: 3, label: 'Cukup konsisten' }, { value: 2, label: 'Sering molor' }, { value: 1, label: 'Tidak dijalankan' }] },
          { id: 'mkt-4-4', order: 4, enabled: false, text: 'Apakah strategi harga dijalankan (diskon, bundling, paket) sesuai tujuan?', options: [{ value: 4, label: 'Sesuai & terukur' }, { value: 3, label: 'Ada tapi belum rapi' }, { value: 2, label: 'Sering acak' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'mkt-4-5', order: 5, enabled: false, text: 'Apakah distribusi/kanal penjualan dimaksimalkan?', options: [{ value: 4, label: 'Optimal' }, { value: 3, label: 'Cukup' }, { value: 2, label: 'Kurang' }, { value: 1, label: 'Tidak dikelola' }] },
          { id: 'mkt-4-6', order: 6, enabled: true,  text: 'Apakah Anda mengevaluasi hasil promosi (mana yang efektif)?', options: [{ value: 4, label: 'Rutin & dipakai' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'marketing-5',
        order: 5,
        name: 'Implementasi SOP Marketing',
        questions: [
          { id: 'mkt-5-1', order: 1, enabled: false, text: 'Apakah SOP/kebiasaan promosi dijalankan konsisten?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Sering' }, { value: 2, label: 'Kadang' }, { value: 1, label: 'Tidak' }] },
          { id: 'mkt-5-2', order: 2, enabled: false, text: 'Apakah sebelum promosi selalu ada persiapan minimal (target, penawaran, materi)?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Sering' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'mkt-5-3', order: 3, enabled: true,  text: 'Apakah respon calon pembeli cepat dan ada follow-up?', options: [{ value: 4, label: 'Sangat cepat & rapi' }, { value: 3, label: 'Cukup cepat' }, { value: 2, label: 'Lambat' }, { value: 1, label: 'Tidak ada follow-up' }] },
          { id: 'mkt-5-4', order: 4, enabled: false, text: 'Apakah data pelanggan/lead disimpan (WA list, database sederhana)?', options: [{ value: 4, label: 'Rapi & dipakai' }, { value: 3, label: 'Ada tapi belum rapi' }, { value: 2, label: 'Ada tapi jarang dipakai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'mkt-5-5', order: 5, enabled: true,  text: 'Apakah ada catatan hasil promosi (penjualan naik/turun, biaya promo)?', options: [{ value: 4, label: 'Rutin dicatat' }, { value: 3, label: 'Kadang dicatat' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak dicatat' }] },
          { id: 'mkt-5-6', order: 6, enabled: false, text: 'Apakah pembelajaran dari promosi sebelumnya dipakai untuk promosi berikutnya?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'marketing-6',
        order: 6,
        name: 'Integrasi Marketing dengan Digital & Teknologi',
        questions: [
          { id: 'mkt-6-1', order: 1, enabled: true,  text: 'Apakah usaha aktif promosi di kanal digital (IG/WA/TikTok/marketplace)?', options: [{ value: 4, label: 'Aktif di beberapa kanal' }, { value: 3, label: 'Aktif di 1–2 kanal' }, { value: 2, label: 'Kadang-kadang' }, { value: 1, label: 'Tidak aktif' }] },
          { id: 'mkt-6-2', order: 2, enabled: false, text: 'Apakah usaha punya "etalase digital" (Google Business/Marketplace/Website sederhana)?', options: [{ value: 4, label: 'Lengkap & terawat' }, { value: 3, label: 'Ada tapi kurang terawat' }, { value: 2, label: 'Ada tapi jarang dipakai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'mkt-6-3', order: 3, enabled: false, text: 'Apakah ada pencatatan pelanggan/CRM sederhana (label WA, spreadsheet, tools)?', options: [{ value: 4, label: 'Ada & dipakai rutin' }, { value: 3, label: 'Ada tapi belum rutin' }, { value: 2, label: 'Ada tapi minim' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'mkt-6-4', order: 4, enabled: false, text: 'Apakah iklan digital pernah digunakan (ads, endorse, boost)?', options: [{ value: 4, label: 'Rutin & terukur' }, { value: 3, label: 'Pernah beberapa kali' }, { value: 2, label: 'Pernah sekali' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'mkt-6-5', order: 5, enabled: true,  text: 'Apakah usaha mengecek insight sederhana (view, reach, chat masuk, order)?', options: [{ value: 4, label: 'Rutin dipantau' }, { value: 3, label: 'Kadang dipantau' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'mkt-6-6', order: 6, enabled: false, text: 'Apakah ada penggunaan tools bantu (Canva, scheduler, chatbot sederhana)?', options: [{ value: 4, label: 'Banyak & efektif' }, { value: 3, label: 'Ada beberapa' }, { value: 2, label: 'Satu dua saja' }, { value: 1, label: 'Tidak ada' }] },
        ]
      }
    ]
  },
  {
    id: 'sales',
    order: 6,
    weight: 1,
    group: 'core',
    name: 'Sales',
    fullName: 'Sales Business Process',
    subsections: [
      {
        id: 'sales-1',
        order: 1,
        name: 'Kapabilitas dan Struktur Tim Sales',
        questions: [
          { id: 'sls-1-1', order: 1, enabled: false, text: 'Siapa yang menjalankan aktivitas penjualan usaha?', options: [{ value: 4, label: 'Ada tim/orang khusus & paham' }, { value: 3, label: 'Ada orang khusus tapi terbatas' }, { value: 2, label: 'Dirangkap pemilik' }, { value: 1, label: 'Tidak jelas' }] },
          { id: 'sls-1-2', order: 2, enabled: true,  text: 'Seberapa paham penjual terhadap produk dan kebutuhan pelanggan?', options: [{ value: 4, label: 'Sangat paham & komunikatif' }, { value: 3, label: 'Cukup paham' }, { value: 2, label: 'Kurang paham' }, { value: 1, label: 'Tidak paham' }] },
          { id: 'sls-1-3', order: 3, enabled: false, text: 'Apakah tim sales pernah mendapat pelatihan (produk / cara jual)?', options: [{ value: 4, label: 'Rutin & diterapkan' }, { value: 3, label: 'Pernah beberapa kali' }, { value: 2, label: 'Pernah sekali' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'sls-1-4', order: 4, enabled: true,  text: 'Apakah ada insentif/bonus untuk penjualan yang baik?', options: [{ value: 4, label: 'Jelas & memotivasi' }, { value: 3, label: 'Ada tapi belum konsisten' }, { value: 2, label: 'Tidak jelas' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sls-1-5', order: 5, enabled: false, text: 'Apakah penjual terbiasa menggunakan alat bantu digital (WA Business, marketplace, dsb.)?', options: [{ value: 4, label: 'Digunakan aktif' }, { value: 3, label: 'Digunakan sebagian' }, { value: 2, label: 'Jarang digunakan' }, { value: 1, label: 'Tidak digunakan' }] },
        ]
      },
      {
        id: 'sales-2',
        order: 2,
        name: 'Strategi dan Target Penjualan',
        questions: [
          { id: 'sls-2-1', order: 1, enabled: true,  text: 'Apakah usaha punya cara jualan yang jelas?', options: [{ value: 4, label: 'Sangat jelas & dijalankan' }, { value: 3, label: 'Ada tapi belum rapi' }, { value: 2, label: 'Ada tapi tidak konsisten' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sls-2-2', order: 2, enabled: false, text: 'Apakah ada target penjualan (harian/mingguan/bulanan)?', options: [{ value: 4, label: 'Jelas & realistis' }, { value: 3, label: 'Ada tapi umum' }, { value: 2, label: 'Kurang jelas' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sls-2-3', order: 3, enabled: false, text: 'Apakah pendekatan penjualan dibedakan per jenis pelanggan?', options: [{ value: 4, label: 'Jelas & efektif' }, { value: 3, label: 'Ada tapi belum konsisten' }, { value: 2, label: 'Hampir sama semua' }, { value: 1, label: 'Tidak dibedakan' }] },
          { id: 'sls-2-4', order: 4, enabled: false, text: 'Apakah strategi harga/diskon mendukung penjualan?', options: [{ value: 4, label: 'Terencana & terukur' }, { value: 3, label: 'Ada tapi sederhana' }, { value: 2, label: 'Sering spontan' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sls-2-5', order: 5, enabled: true,  text: 'Apakah ada upaya menjaga pelanggan lama (repeat order)?', options: [{ value: 4, label: 'Aktif & terencana' }, { value: 3, label: 'Ada tapi belum rutin' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak ada' }] },
        ]
      },
      {
        id: 'sales-3',
        order: 3,
        name: 'SOP dan Sistem Penjualan',
        questions: [
          { id: 'sls-3-1', order: 1, enabled: true,  text: 'Apakah ada alur penjualan yang jelas (dari calon sampai transaksi)?', options: [{ value: 4, label: 'Jelas & dijalankan' }, { value: 3, label: 'Ada tapi belum rapi' }, { value: 2, label: 'Ada tapi jarang dipakai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sls-3-2', order: 2, enabled: false, text: 'Apakah ada cara standar menangani calon pembeli (respon chat, penawaran)?', options: [{ value: 4, label: 'Ada & konsisten' }, { value: 3, label: 'Ada tapi belum konsisten' }, { value: 2, label: 'Kadang-kadang' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sls-3-3', order: 3, enabled: false, text: 'Apakah ada kebiasaan follow-up calon pelanggan?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Sering' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'sls-3-4', order: 4, enabled: true,  text: 'Apakah aktivitas penjualan dicatat (order, pelanggan, omzet)?', options: [{ value: 4, label: 'Dicatat rapi' }, { value: 3, label: 'Dicatat sederhana' }, { value: 2, label: 'Jarang dicatat' }, { value: 1, label: 'Tidak dicatat' }] },
          { id: 'sls-3-5', order: 5, enabled: false, text: 'Apakah ada koordinasi antar penjual jika pelanggan berpindah?', options: [{ value: 4, label: 'Rapi & jelas' }, { value: 3, label: 'Ada tapi belum rapi' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak ada' }] },
        ]
      },
      {
        id: 'sales-4',
        order: 4,
        name: 'Implementasi SOP Penjualan',
        questions: [
          { id: 'sls-4-1', order: 1, enabled: false, text: 'Apakah cara kerja penjualan dijalankan konsisten?', options: [{ value: 4, label: 'Selalu konsisten' }, { value: 3, label: 'Sering' }, { value: 2, label: 'Kadang' }, { value: 1, label: 'Tidak' }] },
          { id: 'sls-4-2', order: 2, enabled: true,  text: 'Apakah prospek benar-benar ditindaklanjuti sampai jelas hasilnya?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Sering' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'sls-4-3', order: 3, enabled: true,  text: 'Apakah data penjualan diperbarui secara rutin?', options: [{ value: 4, label: 'Real-time / harian' }, { value: 3, label: 'Mingguan' }, { value: 2, label: 'Tidak rutin' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'sls-4-4', order: 4, enabled: false, text: 'Apakah penjualan terkoordinasi dengan bagian lain (produksi/stok)?', options: [{ value: 4, label: 'Sangat baik' }, { value: 3, label: 'Cukup' }, { value: 2, label: 'Kurang' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sls-4-5', order: 5, enabled: false, text: 'Apakah SOP dipakai untuk menilai kinerja penjualan?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'sales-5',
        order: 5,
        name: 'Monitoring dan Evaluasi Penjualan',
        questions: [
          { id: 'sls-5-1', order: 1, enabled: false, text: 'Apakah penjualan dibandingkan dengan target?', options: [{ value: 4, label: 'Rutin & jelas' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'sls-5-2', order: 2, enabled: false, text: 'Apakah kinerja penjualan dievaluasi secara berkala?', options: [{ value: 4, label: 'Rutin & berdampak' }, { value: 3, label: 'Sesekali' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'sls-5-3', order: 3, enabled: true,  text: 'Apakah tingkat keberhasilan closing diperhatikan?', options: [{ value: 4, label: 'Selalu dianalisis' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak' }] },
          { id: 'sls-5-4', order: 4, enabled: false, text: 'Apakah efektivitas kanal penjualan (offline/online) dipantau?', options: [{ value: 4, label: 'Rutin' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak' }] },
          { id: 'sls-5-5', order: 5, enabled: true,  text: 'Apakah hasil evaluasi dipakai untuk perbaikan cara jualan?', options: [{ value: 4, label: 'Selalu' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'sales-6',
        order: 6,
        name: 'Integrasi dengan Digital dan CRM',
        questions: [
          { id: 'sls-6-1', order: 1, enabled: true,  text: 'Apakah data pelanggan disimpan dengan rapi (WA Business, buku, spreadsheet)?', options: [{ value: 4, label: 'Rapi & aktif dipakai' }, { value: 3, label: 'Ada tapi belum rapi' }, { value: 2, label: 'Ada tapi jarang dipakai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sls-6-2', order: 2, enabled: false, text: 'Apakah ada alat bantu untuk memantau penjualan (dashboard sederhana)?', options: [{ value: 4, label: 'Ada & dipakai' }, { value: 3, label: 'Ada tapi jarang' }, { value: 2, label: 'Ada tapi tidak aktif' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sls-6-3', order: 3, enabled: false, text: 'Apakah calon pelanggan dari online ditangani secara sistematis?', options: [{ value: 4, label: 'Sangat rapi' }, { value: 3, label: 'Cukup rapi' }, { value: 2, label: 'Tidak konsisten' }, { value: 1, label: 'Tidak ditangani' }] },
          { id: 'sls-6-4', order: 4, enabled: true,  text: 'Apakah follow-up digital dilakukan teratur?', options: [{ value: 4, label: 'Terjadwal' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Acak' }, { value: 1, label: 'Tidak' }] },
          { id: 'sls-6-5', order: 5, enabled: false, text: 'Apakah marketing dan sales saling berbagi data pelanggan?', options: [{ value: 4, label: 'Selalu sinkron' }, { value: 3, label: 'Kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      }
    ]
  },
  {
    id: 'operation',
    order: 7,
    weight: 1,
    group: 'core',
    name: 'Operation',
    fullName: 'Operation Business Process',
    subsections: [
      {
        id: 'operation-1',
        order: 1,
        name: 'Kapabilitas dan Struktur Tim Operasional',
        questions: [
          { id: 'ops-1-1', order: 1, enabled: true,  text: 'Apakah tim operasional menguasai pekerjaan sehari-hari dengan baik?', options: [{ value: 4, label: 'Hampir semua sangat menguasai' }, { value: 3, label: 'Sebagian besar menguasai' }, { value: 2, label: 'Banyak yang masih belajar' }, { value: 1, label: 'Banyak tidak menguasai' }] },
          { id: 'ops-1-2', order: 2, enabled: true,  text: 'Apakah pembagian tugas kerja jelas?', options: [{ value: 4, label: 'Sangat jelas & tidak tumpang tindih' }, { value: 3, label: 'Cukup jelas' }, { value: 2, label: 'Sering tumpang tindih' }, { value: 1, label: 'Tidak jelas sama sekali' }] },
          { id: 'ops-1-3', order: 3, enabled: false, text: 'Apakah tim sudah berpengalaman di pekerjaan operasional?', options: [{ value: 4, label: 'Mayoritas sudah lama & berpengalaman' }, { value: 3, label: 'Sebagian berpengalaman' }, { value: 2, label: 'Hanya sedikit yang berpengalaman' }, { value: 1, label: 'Hampir semua baru' }] },
          { id: 'ops-1-4', order: 4, enabled: false, text: 'Apakah ada orang yang mengawasi/mengoordinasi pekerjaan harian?', options: [{ value: 4, label: 'Ada & aktif mengawasi' }, { value: 3, label: 'Ada tapi belum optimal' }, { value: 2, label: 'Ada tapi jarang aktif' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ops-1-5', order: 5, enabled: false, text: 'Apakah ada pelatihan atau pembelajaran kerja?', options: [{ value: 4, label: 'Rutin & sesuai kebutuhan' }, { value: 3, label: 'Kadang-kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'operation-2',
        order: 2,
        name: 'Desain Proses & SOP Operasional',
        questions: [
          { id: 'ops-2-1', order: 1, enabled: true,  text: 'Apakah cara kerja sudah punya panduan/SOP?', options: [{ value: 4, label: 'Ada & dipahami semua' }, { value: 3, label: 'Ada tapi belum lengkap' }, { value: 2, label: 'Ada tapi jarang dipakai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ops-2-2', order: 2, enabled: false, text: 'Apakah SOP sesuai dengan kondisi usaha saat ini?', options: [{ value: 4, label: 'Sangat sesuai & fleksibel' }, { value: 3, label: 'Cukup sesuai' }, { value: 2, label: 'Perlu banyak penyesuaian' }, { value: 1, label: 'Sudah tidak cocok' }] },
          { id: 'ops-2-3', order: 3, enabled: true,  text: 'Apakah seluruh proses kerja utama sudah diatur?', options: [{ value: 4, label: 'Semua proses utama' }, { value: 3, label: 'Sebagian besar' }, { value: 2, label: 'Hanya sebagian kecil' }, { value: 1, label: 'Tidak diatur' }] },
          { id: 'ops-2-4', order: 4, enabled: false, text: 'Apakah alur kerja digambarkan (flow sederhana)?', options: [{ value: 4, label: 'Ada & digunakan' }, { value: 3, label: 'Ada tapi tidak lengkap' }, { value: 2, label: 'Hanya penjelasan lisan' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ops-2-5', order: 5, enabled: false, text: 'Apakah ada patokan waktu kerja (misalnya waktu produksi/layanan)?', options: [{ value: 4, label: 'Ada untuk semua proses' }, { value: 3, label: 'Ada untuk sebagian' }, { value: 2, label: 'Ada tapi tidak jelas' }, { value: 1, label: 'Tidak ada sama sekali' }] },
        ]
      },
      {
        id: 'operation-3',
        order: 3,
        name: 'Implementasi SOP Operasional',
        questions: [
          { id: 'ops-3-1', order: 1, enabled: true,  text: 'Apakah SOP benar-benar dijalankan di lapangan?', options: [{ value: 4, label: 'Selalu dijalankan disiplin' }, { value: 3, label: 'Sebagian besar dijalankan' }, { value: 2, label: 'Banyak dilanggar' }, { value: 1, label: 'Tidak dijalankan' }] },
          { id: 'ops-3-2', order: 2, enabled: false, text: 'Apakah pelaksanaan kerja pernah dicek/diawasi?', options: [{ value: 4, label: 'Dicek rutin' }, { value: 3, label: 'Dicek tapi tidak rutin' }, { value: 2, label: 'Jarang dicek' }, { value: 1, label: 'Tidak pernah dicek' }] },
          { id: 'ops-3-3', order: 3, enabled: true,  text: 'Apakah kesalahan kerja dilaporkan dan diperbaiki?', options: [{ value: 4, label: 'Selalu dilaporkan & diperbaiki' }, { value: 3, label: 'Dilaporkan tapi tidak semua diperbaiki' }, { value: 2, label: 'Kadang dilaporkan' }, { value: 1, label: 'Tidak pernah dilaporkan' }] },
          { id: 'ops-3-4', order: 4, enabled: false, text: 'Apakah ada briefing/penjelasan rutin soal kerja?', options: [{ value: 4, label: 'Rutin & efektif' }, { value: 3, label: 'Kadang-kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'ops-3-5', order: 5, enabled: false, text: 'Apakah SOP pernah diperbaiki/diperbarui?', options: [{ value: 4, label: 'Rutin diperbarui' }, { value: 3, label: 'Diperbarui jika ada masalah' }, { value: 2, label: 'Hanya darurat' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'operation-4',
        order: 4,
        name: 'Efisiensi dan Produktivitas',
        questions: [
          { id: 'ops-4-1', order: 1, enabled: true,  text: 'Apakah kapasitas kerja sudah dimanfaatkan maksimal?', options: [{ value: 4, label: 'Hampir selalu penuh' }, { value: 3, label: 'Cukup optimal' }, { value: 2, label: 'Sering tidak optimal' }, { value: 1, label: 'Banyak menganggur' }] },
          { id: 'ops-4-2', order: 2, enabled: false, text: 'Apakah ada target hasil kerja (output)?', options: [{ value: 4, label: 'Ada & dipantau rutin' }, { value: 3, label: 'Ada tapi jarang dipantau' }, { value: 2, label: 'Ada tapi tidak realistis' }, { value: 1, label: 'Tidak ada target' }] },
          { id: 'ops-4-3', order: 3, enabled: false, text: 'Apakah ada usaha menghemat waktu, bahan, atau tenaga?', options: [{ value: 4, label: 'Sangat aktif & terencana' }, { value: 3, label: 'Ada tapi tidak konsisten' }, { value: 2, label: 'Sedikit upaya' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ops-4-4', order: 4, enabled: true,  text: 'Seberapa sering pekerjaan terhambat (macet/rusak)?', options: [{ value: 4, label: 'Sangat jarang' }, { value: 3, label: 'Kadang-kadang' }, { value: 2, label: 'Sering' }, { value: 1, label: 'Sangat sering' }] },
          { id: 'ops-4-5', order: 5, enabled: false, text: 'Apakah jadwal kerja/shift tertata?', options: [{ value: 4, label: 'Sangat rapi & efisien' }, { value: 3, label: 'Cukup rapi' }, { value: 2, label: 'Sering berubah' }, { value: 1, label: 'Tidak ada jadwal jelas' }] },
        ]
      },
      {
        id: 'operation-5',
        order: 5,
        name: 'Kontrol Kualitas dan Perbaikan Berkelanjutan',
        questions: [
          { id: 'ops-5-1', order: 1, enabled: false, text: 'Apakah kualitas hasil kerja diawasi?', options: [{ value: 4, label: 'Diawasi khusus & aktif' }, { value: 3, label: 'Diawasi tapi belum maksimal' }, { value: 2, label: 'Kadang diawasi' }, { value: 1, label: 'Tidak diawasi' }] },
          { id: 'ops-5-2', order: 2, enabled: true,  text: 'Seberapa sering produk/jasa bermasalah/retur?', options: [{ value: 4, label: 'Sangat jarang' }, { value: 3, label: 'Jarang' }, { value: 2, label: 'Cukup sering' }, { value: 1, label: 'Sangat sering' }] },
          { id: 'ops-5-3', order: 3, enabled: true,  text: 'Apakah ada pengecekan kualitas sebelum diserahkan?', options: [{ value: 4, label: 'Selalu di setiap tahap' }, { value: 3, label: 'Hanya di akhir' }, { value: 2, label: 'Kadang-kadang' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ops-5-4', order: 4, enabled: false, text: 'Apakah penyebab masalah dicari & diperbaiki?', options: [{ value: 4, label: 'Selalu dicari & dicatat' }, { value: 3, label: 'Dicari jika besar' }, { value: 2, label: 'Kadang dicari' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'ops-5-5', order: 5, enabled: false, text: 'Apakah ada kebiasaan memperbaiki cara kerja?', options: [{ value: 4, label: 'Budaya perbaikan kuat' }, { value: 3, label: 'Ada inisiatif kecil' }, { value: 2, label: 'Masih informal' }, { value: 1, label: 'Tidak ada' }] },
        ]
      },
      {
        id: 'operation-6',
        order: 6,
        name: 'Integrasi Operasional dengan Teknologi & Sistem Informasi',
        questions: [
          { id: 'ops-6-1', order: 1, enabled: true,  text: 'Apakah sudah pakai aplikasi/software operasional?', options: [{ value: 4, label: 'Digunakan & terintegrasi' }, { value: 3, label: 'Digunakan sebagian' }, { value: 2, label: 'Masih banyak manual' }, { value: 1, label: 'Tidak pakai' }] },
          { id: 'ops-6-2', order: 2, enabled: false, text: 'Apakah laporan operasional mudah diakses?', options: [{ value: 4, label: 'Bisa real-time' }, { value: 3, label: 'Ada tapi manual' }, { value: 2, label: 'Ada tapi lambat' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'ops-6-3', order: 3, enabled: false, text: 'Apakah ada otomatisasi alat/mesin/sistem?', options: [{ value: 4, label: 'Sudah digunakan' }, { value: 3, label: 'Dalam rencana awal' }, { value: 2, label: 'Belum ada' }, { value: 1, label: 'Tidak ada rencana' }] },
          { id: 'ops-6-4', order: 4, enabled: true,  text: 'Apakah operasional terhubung dengan sales/keuangan?', options: [{ value: 4, label: 'Terhubung penuh' }, { value: 3, label: 'Terhubung sebagian' }, { value: 2, label: 'Terpisah' }, { value: 1, label: 'Tidak terhubung' }] },
          { id: 'ops-6-5', order: 5, enabled: false, text: 'Apakah ada tampilan ringkas (dashboard) operasional?', options: [{ value: 4, label: 'Ada & dipakai rutin' }, { value: 3, label: 'Ada tapi jarang dipakai' }, { value: 2, label: 'Ada tapi tidak lengkap' }, { value: 1, label: 'Tidak ada' }] },
        ]
      }
    ]
  },
  {
    id: 'sdm',
    order: 8,
    weight: 1,
    group: 'core',
    name: 'SDM',
    fullName: 'Human Resources',
    subsections: [
      {
        id: 'sdm-1',
        order: 1,
        name: 'Kapabilitas dan Struktur Tim SDM',
        questions: [
          { id: 'sdm-1-1', order: 1, enabled: false, text: 'Apakah susunan tim dan peran kerja jelas?', options: [{ value: 4, label: 'Sangat jelas & selalu diperbarui' }, { value: 3, label: 'Ada tapi belum rapi' }, { value: 2, label: 'Tidak lengkap' }, { value: 1, label: 'Tidak ada struktur' }] },
          { id: 'sdm-1-2', order: 2, enabled: true,  text: 'Apakah tiap orang tahu tugas dan tanggung jawabnya?', options: [{ value: 4, label: 'Semua jelas & tertulis' }, { value: 3, label: 'Sebagian besar jelas' }, { value: 2, label: 'Hanya sebagian kecil' }, { value: 1, label: 'Tidak jelas' }] },
          { id: 'sdm-1-3', order: 3, enabled: true,  text: 'Apakah kemampuan karyawan sesuai pekerjaannya?', options: [{ value: 4, label: 'Sangat sesuai' }, { value: 3, label: 'Umumnya sesuai' }, { value: 2, label: 'Banyak tidak cocok' }, { value: 1, label: 'Mayoritas tidak cocok' }] },
          { id: 'sdm-1-4', order: 4, enabled: false, text: 'Apakah ada orang yang mengurus urusan karyawan (HR)?', options: [{ value: 4, label: 'Ada & kompeten' }, { value: 3, label: 'Ada tapi rangkap tugas' }, { value: 2, label: 'Belum khusus' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sdm-1-5', order: 5, enabled: false, text: 'Apakah data karyawan tertata rapi?', options: [{ value: 4, label: 'Rapi & digital' }, { value: 3, label: 'Ada tapi manual' }, { value: 2, label: 'Tidak lengkap' }, { value: 1, label: 'Tidak ada data' }] },
        ]
      },
      {
        id: 'sdm-2',
        order: 2,
        name: 'Sistem Rekrutmen dan Penempatan',
        questions: [
          { id: 'sdm-2-1', order: 1, enabled: true,  text: 'Apakah perekrutan direncanakan sesuai kebutuhan usaha?', options: [{ value: 4, label: 'Direncanakan matang' }, { value: 3, label: 'Ada rencana sederhana' }, { value: 2, label: 'Reaktif saat butuh' }, { value: 1, label: 'Tidak direncanakan' }] },
          { id: 'sdm-2-2', order: 2, enabled: false, text: 'Apakah ada panduan perekrutan & orientasi karyawan baru?', options: [{ value: 4, label: 'Ada & dijalankan' }, { value: 3, label: 'Ada tapi belum lengkap' }, { value: 2, label: 'Jarang dipakai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sdm-2-3', order: 3, enabled: false, text: 'Apakah seleksi karyawan dilakukan dengan cara yang jelas?', options: [{ value: 4, label: 'Terstruktur & objektif' }, { value: 3, label: 'Cukup terarah' }, { value: 2, label: 'Banyak subjektif' }, { value: 1, label: 'Asal terima' }] },
          { id: 'sdm-2-4', order: 4, enabled: false, text: 'Apakah karyawan baru diberi masa pengenalan kerja?', options: [{ value: 4, label: 'Ada & dievaluasi' }, { value: 3, label: 'Ada tapi informal' }, { value: 2, label: 'Singkat & seadanya' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sdm-2-5', order: 5, enabled: true,  text: 'Apakah penempatan kerja sesuai kemampuan karyawan?', options: [{ value: 4, label: 'Sangat sesuai & dipantau' }, { value: 3, label: 'Umumnya sesuai' }, { value: 2, label: 'Banyak salah tempat' }, { value: 1, label: 'Tidak dievaluasi' }] },
        ]
      },
      {
        id: 'sdm-3',
        order: 3,
        name: 'SOP dan Tata Kelola SDM',
        questions: [
          { id: 'sdm-3-1', order: 1, enabled: false, text: 'Apakah ada aturan kerja tertulis untuk karyawan?', options: [{ value: 4, label: 'Lengkap & dijalankan' }, { value: 3, label: 'Ada tapi belum lengkap' }, { value: 2, label: 'Ada tapi jarang dipakai' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sdm-3-2', order: 2, enabled: true,  text: 'Apakah aturan jam kerja, izin, dan cuti jelas?', options: [{ value: 4, label: 'Jelas & dipatuhi' }, { value: 3, label: 'Ada tapi sering dilanggar' }, { value: 2, label: 'Tidak konsisten' }, { value: 1, label: 'Tidak ada aturan' }] },
          { id: 'sdm-3-3', order: 3, enabled: true,  text: 'Apakah aturan disiplin kerja diterapkan?', options: [{ value: 4, label: 'Tegas & konsisten' }, { value: 3, label: 'Ada tapi jarang' }, { value: 2, label: 'Hanya lisan' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sdm-3-4', order: 4, enabled: false, text: 'Apakah keselamatan dan kesehatan kerja diperhatikan?', options: [{ value: 4, label: 'Diperhatikan serius' }, { value: 3, label: 'Ada tapi belum maksimal' }, { value: 2, label: 'Terbatas' }, { value: 1, label: 'Tidak diperhatikan' }] },
          { id: 'sdm-3-5', order: 5, enabled: false, text: 'Apakah masalah/keluhan karyawan ditangani?', options: [{ value: 4, label: 'Ada cara jelas' }, { value: 3, label: 'Ditangani informal' }, { value: 2, label: 'Kadang ditangani' }, { value: 1, label: 'Tidak ditangani' }] },
        ]
      },
      {
        id: 'sdm-4',
        order: 4,
        name: 'Pengembangan SDM dan Retensi',
        questions: [
          { id: 'sdm-4-1', order: 1, enabled: true,  text: 'Apakah karyawan diberi pelatihan atau arahan kerja?', options: [{ value: 4, label: 'Rutin & sesuai kebutuhan' }, { value: 3, label: 'Kadang-kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'sdm-4-2', order: 2, enabled: false, text: 'Apakah ada kesempatan naik peran/jabatan?', options: [{ value: 4, label: 'Jelas & adil' }, { value: 3, label: 'Ada tapi belum tertulis' }, { value: 2, label: 'Tidak konsisten' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sdm-4-3', order: 3, enabled: true,  text: 'Apakah karyawan betah bekerja di usaha ini?', options: [{ value: 4, label: 'Sangat betah' }, { value: 3, label: 'Umumnya betah' }, { value: 2, label: 'Banyak keluar' }, { value: 1, label: 'Sering keluar' }] },
          { id: 'sdm-4-4', order: 4, enabled: false, text: 'Apakah ada kegiatan untuk membangun kebersamaan tim?', options: [{ value: 4, label: 'Rutin & berdampak' }, { value: 3, label: 'Kadang-kadang' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sdm-4-5', order: 5, enabled: false, text: 'Apakah masukan karyawan didengar?', options: [{ value: 4, label: 'Didengar & ditindaklanjuti' }, { value: 3, label: 'Didengar tapi pasif' }, { value: 2, label: 'Hanya lisan' }, { value: 1, label: 'Tidak pernah' }] },
        ]
      },
      {
        id: 'sdm-5',
        order: 5,
        name: 'Evaluasi Kinerja dan Budaya Kerja',
        questions: [
          { id: 'sdm-5-1', order: 1, enabled: true,  text: 'Apakah kinerja karyawan dinilai secara rutin?', options: [{ value: 4, label: 'Rutin & objektif' }, { value: 3, label: 'Ada tapi tidak konsisten' }, { value: 2, label: 'Masih informal' }, { value: 1, label: 'Tidak pernah' }] },
          { id: 'sdm-5-2', order: 2, enabled: false, text: 'Apakah penilaian kerja berdasarkan target/hasil?', options: [{ value: 4, label: 'Jelas & terukur' }, { value: 3, label: 'Ada tapi belum rapi' }, { value: 2, label: 'Tidak jelas' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sdm-5-3', order: 3, enabled: false, text: 'Apakah hasil penilaian digunakan untuk perbaikan/penghargaan?', options: [{ value: 4, label: 'Selalu digunakan' }, { value: 3, label: 'Kadang digunakan' }, { value: 2, label: 'Jarang' }, { value: 1, label: 'Tidak digunakan' }] },
          { id: 'sdm-5-4', order: 4, enabled: true,  text: 'Apakah suasana kerja mendukung kerja sama?', options: [{ value: 4, label: 'Sangat positif' }, { value: 3, label: 'Umumnya baik' }, { value: 2, label: 'Kurang sehat' }, { value: 1, label: 'Tidak kondusif' }] },
          { id: 'sdm-5-5', order: 5, enabled: false, text: 'Apakah nilai kerja/perilaku baik diterapkan?', options: [{ value: 4, label: 'Menjadi kebiasaan' }, { value: 3, label: 'Dikenal tapi lemah' }, { value: 2, label: 'Hanya slogan' }, { value: 1, label: 'Tidak ada nilai' }] },
        ]
      },
      {
        id: 'sdm-6',
        order: 6,
        name: 'Sistem Penggajian, Benefit, dan Administrasi',
        questions: [
          { id: 'sdm-6-1', order: 1, enabled: true,  text: 'Apakah gaji dibayar tepat waktu dan benar?', options: [{ value: 4, label: 'Selalu tepat & rapi' }, { value: 3, label: 'Umumnya tepat' }, { value: 2, label: 'Sering terlambat' }, { value: 1, label: 'Tidak teratur' }] },
          { id: 'sdm-6-2', order: 2, enabled: true,  text: 'Apakah ada fasilitas selain gaji (BPJS, THR, bonus)?', options: [{ value: 4, label: 'Lengkap & jelas' }, { value: 3, label: 'Ada sebagian' }, { value: 2, label: 'Sangat terbatas' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sdm-6-3', order: 3, enabled: false, text: 'Apakah absensi, cuti, dan data karyawan tertata?', options: [{ value: 4, label: 'Digital & efisien' }, { value: 3, label: 'Campuran manual' }, { value: 2, label: 'Manual & lambat' }, { value: 1, label: 'Tidak tertata' }] },
          { id: 'sdm-6-4', order: 4, enabled: false, text: 'Apakah gaji terhubung dengan pencatatan keuangan?', options: [{ value: 4, label: 'Terhubung otomatis' }, { value: 3, label: 'Sebagian terhubung' }, { value: 2, label: 'Manual' }, { value: 1, label: 'Tidak terhubung' }] },
          { id: 'sdm-6-5', order: 5, enabled: false, text: 'Apakah aturan HR mudah diakses karyawan?', options: [{ value: 4, label: 'Lengkap & transparan' }, { value: 3, label: 'Ada tapi tidak rapi' }, { value: 2, label: 'Terpisah-pisah' }, { value: 1, label: 'Tidak ada' }] },
        ]
      },
      {
        id: 'sdm-7',
        order: 7,
        name: 'Integrasi SDM dengan Digital & Teknologi',
        questions: [
          { id: 'sdm-7-1', order: 1, enabled: true,  text: 'Apakah sudah pakai aplikasi/software untuk pengelolaan SDM?', options: [{ value: 4, label: 'Digunakan & terintegrasi' }, { value: 3, label: 'Digunakan sebagian' }, { value: 2, label: 'Masih banyak manual' }, { value: 1, label: 'Tidak pakai' }] },
          { id: 'sdm-7-2', order: 2, enabled: false, text: 'Apakah laporan kinerja SDM mudah diakses?', options: [{ value: 4, label: 'Bisa real-time' }, { value: 3, label: 'Ada tapi manual' }, { value: 2, label: 'Ada tapi lambat' }, { value: 1, label: 'Tidak ada' }] },
          { id: 'sdm-7-3', order: 3, enabled: false, text: 'Apakah ada otomatisasi untuk absen, gaji, dll?', options: [{ value: 4, label: 'Sudah digunakan' }, { value: 3, label: 'Dalam rencana awal' }, { value: 2, label: 'Belum ada' }, { value: 1, label: 'Tidak ada rencana' }] },
          { id: 'sdm-7-4', order: 4, enabled: true,  text: 'Apakah sistem SDM terhubung dengan sistem lainnya?', options: [{ value: 4, label: 'Terhubung penuh' }, { value: 3, label: 'Terhubung sebagian' }, { value: 2, label: 'Terpisah' }, { value: 1, label: 'Tidak terhubung' }] },
          { id: 'sdm-7-5', order: 5, enabled: false, text: 'Apakah ada tampilan ringkas (dashboard) SDM?', options: [{ value: 4, label: 'Ada & dipakai rutin' }, { value: 3, label: 'Ada tapi jarang dipakai' }, { value: 2, label: 'Ada tapi tidak lengkap' }, { value: 1, label: 'Tidak ada' }] },
        ]
      }
    ]
  }
];

// Returns only enabled questions from a section (used for progress counting, validation, etc.)
export const getAllQuestionsFromSection = (section) =>
  section.subsections.flatMap(sub => sub.questions.filter(q => q.enabled));

// Flat list enriched with parent IDs — for building API payloads
export const getFlatResponses = (section) =>
  section.subsections.flatMap(sub =>
    sub.questions
      .filter(q => q.enabled)
      .map(q => ({ sectionId: section.id, subsectionId: sub.id, question: q }))
  );

// Helper function to get total question count
export const getTotalQuestionCount = () =>
  surveyData.reduce((total, section) => total + getAllQuestionsFromSection(section).length, 0);
