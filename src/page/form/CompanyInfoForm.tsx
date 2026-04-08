import { useState } from 'react';
import ScrollableSelect from './ScrollableSelect';
import Button from '../Button';


const KATEGORI_OPTIONS = [
    'Pilih kategori check up',
    'Kategori A',
    'Kategori B',
    'Kategori C',
];

//CompanyInfoForm masih belom ke edit
function CompanyInfoForm() {
    const [formData, setFormData] = useState({
        namaUmkm: '',
        produkUtama: '',
        alamat: '',
        kotaKabupaten: '',
        kategoriCheckUp: '',
        industri: '',
        provinsi: '',
        namaKontak: '',
        jabatan: '',
        email: '',
        nomorTelepon: '',
        website: '',
        ukuranPerusahaan: '',
        tantanganBisnis: '',
        tujuanBisnis: '',
    });


    const subsectionTitle = `text-base font-semibold text-slate-900 mb-4 border-b-3 border-teal-600`
    const formFW = `flex flex-col gap-1 sm:col-span-2`
    const inputForm = `px-3 py-2 text-sm border rounded-lg bg-white text-slate-900`
    const labelForm = `text-sm font-medium text-black`
    const fieldForm = `flex flex-col gap-1`

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleBlur = () => { };

    return (
        <div className="min-h-screen bg-slate-100">

            <header className="px-6 py-4 bg-white border-b border-slate-200">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-[15px] font-medium text-slate-600 hover:text-slate-900"
                >
                    <span className="text-lg">←</span> Kembali ke Beranda
                </a>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8">
                <div className="bg-white rounded-xl shadow-sm p-8">

                    {/* Title */}
                    <h1 className="text-[28px] font-bold text-slate-900 mb-1">
                        Informasi Perusahaan
                    </h1>
                    <p className="text-[15px] text-slate-500 mb-8">
                        Lengkapi data perusahaan Anda sebelum memulai assessment
                    </p>

                    <form onSubmit={(e) => e.preventDefault()} noValidate>

                        {/* Data Usaha */}
                        <section className="mb-8">
                            <h2 className={subsectionTitle}>
                                Company Identity ( Identitas Perusahaan )
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                <div className={formFW}>
                                    <label className={labelForm}>
                                        Company Name ( Nama UMKM )
                                    </label>
                                    <input className={inputForm} placeholder='example. PT Maju Sukses Teknik'
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className={labelForm}>
                                        Legal Entity Type ( Jenis Entitas Hukum )
                                    </label>
                                    <ScrollableSelect
                                        id="kategoriCheckUp"
                                        value={formData.kategoriCheckUp}
                                        options={KATEGORI_OPTIONS}
                                        onChange={(val) => handleChange('kategoriCheckUp', val)}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className={labelForm}>
                                        Establishment Year ( Tahun Berdiri )
                                    </label>
                                    <input className={inputForm} placeholder='example. 2011 ,2001 ,2004' />
                                </div>

                                <div className={formFW}>
                                    <label className={labelForm}>
                                        Business Maturity Stage ( Tahap Kematangan Bisnis )
                                    </label>
                                    <ScrollableSelect
                                        id="kategoriCheckUp"
                                        value={formData.kategoriCheckUp}
                                        options={KATEGORI_OPTIONS}
                                        onChange={(val) => handleChange('kategoriCheckUp', val)}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className={subsectionTitle}>
                                Business Classification ( Klasifikasi Usaha )
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                <div className={formFW}>
                                    <label className={labelForm}>
                                        Business Sector ( Sektor Bisnis )
                                    </label>
                                    <ScrollableSelect
                                        id="kategoriCheckUp"
                                        value={formData.kategoriCheckUp}
                                        options={KATEGORI_OPTIONS}
                                        onChange={(val) => handleChange('kategoriCheckUp', val)}
                                        onBlur={handleBlur}
                                    />

                                </div>

                                <div className={formFW}>
                                    <label className={labelForm}>
                                        Business Sub-Sector ( Sub-Sektor Bisnis )
                                    </label>
                                    <input className={inputForm} placeholder='example. Wooden Handicraft, Psychologist' />
                                </div>

                                <div className={formFW}>
                                    <label className={labelForm}>
                                        KBLI Code ( Kode KBLI ) <span className='text-xs text-slate-700'>( optional )</span>
                                    </label>
                                    <input className={inputForm} placeholder='example. 31001 ( Manufacture of furniture )' />
                                    <div className={labelForm}>
                                        <span className='italic'>Klasifikasi Baku Lapangan Usaha Indonesia.  </span>
                                        <a href='https://kbli.info/' className='text-blue-600 underline hover:text-blue-700'>Click Here for Info</a>
                                    </div>
                                </div>

                                <div className={formFW}>
                                    <label className={labelForm}>
                                        Main Product / Service ( Produk / Jasa Utama )
                                    </label>
                                    <input className={inputForm} placeholder='example. Wooden Shelf, Therapy Session' />
                                </div>

                                <div className={formFW}>
                                    <label className={labelForm}>
                                        Industry Type ( Jenis Industri )
                                    </label>
                                    <ScrollableSelect
                                        id="kategoriCheckUp"
                                        value={formData.kategoriCheckUp}
                                        options={KATEGORI_OPTIONS}
                                        onChange={(val) => handleChange('kategoriCheckUp', val)}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className={subsectionTitle}>
                                Business Location ( Lokasi Usaha )
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">

                                <div className="flex flex-col gap-1 sm:col-span-3">
                                    <label className={labelForm}>
                                        Street Address ( Alamat Lengkap )
                                    </label>
                                    <input
                                        className={inputForm}
                                        placeholder="example. BNA Tower 67th Floor"
                                    />
                                </div>

                                <div className={fieldForm}>
                                    <label className={labelForm}>
                                        City / Regency ( Kota / Kabupaten )
                                    </label>
                                    <input
                                        className={inputForm}
                                        placeholder="example. Tangerang"
                                    />
                                </div>

                                <div className={fieldForm}>
                                    <label className={labelForm}>
                                        Province ( Provinsi )
                                    </label>
                                    <ScrollableSelect
                                        id="kategoriCheckUp"
                                        value={formData.kategoriCheckUp}
                                        options={KATEGORI_OPTIONS}
                                        onChange={(val) => handleChange('kategoriCheckUp', val)}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className={fieldForm}>
                                    <label className={labelForm}>
                                        Postal Code ( Kode Pos )
                                    </label>
                                    <input
                                        className={inputForm}
                                        placeholder="example. 126301"
                                    />
                                </div>

                            </div>
                        </section>

                        <section className='mb-8'>
                            <h2 className={subsectionTitle}>
                                Contact Information ( Informasi Kontak )
                            </h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4'>
                                <div className={fieldForm}>
                                    <label className={labelForm}>
                                        Contact Person Name ( Nama Kontak )
                                    </label>
                                    <input className={inputForm} placeholder='Fullname' />
                                </div>

                                <div className={fieldForm}>
                                    <label className={labelForm}>
                                        Position / Title ( Jabatan )
                                    </label>
                                    <input className={inputForm} placeholder='example. Owner, Worker, Manager' />
                                </div>

                                <div className={fieldForm}>
                                    <label className={labelForm}>
                                        Email Address <span className='text-xs text-red-500'>Hasil Assesment akan dikirim kesini</span>
                                    </label>
                                    <input className={inputForm} placeholder='youremail@mail.com' />
                                </div>

                                <div className={fieldForm}>
                                    <label className={labelForm}>
                                        Phone Number ( Nomor Telpon )
                                    </label>
                                    <input className={inputForm} placeholder='+62 812 8211 0911' />
                                </div>

                                <div className='flex flex-col gap-1 sm:col-span-2'>
                                    <label className={labelForm}>
                                        Company Website ( Website Perusahaan ) <span className='text-xs text-slate-700'>( optional ) </span>
                                    </label>
                                    <input className={inputForm} placeholder='https://www.yourcompany.com' />
                                </div>
                            </div>
                        </section>

                        <section className='mb-8'>
                            <h2 className={subsectionTitle}>
                                Company Scale & Resources ( Skala & Sumber Daya )
                            </h2>
                            <div className={formFW}>
                                <label className={labelForm}>
                                    Company Size Category ( Kategori Ukuran )
                                </label>
                                <ScrollableSelect
                                    id="kategoriCheckUp"
                                    value={formData.kategoriCheckUp}
                                    options={KATEGORI_OPTIONS}
                                    onChange={(val) => handleChange('kategoriCheckUp', val)}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </section>

                        <section className='mb-8'>
                            <h2 className={subsectionTitle}>
                                Financial Information ( Informasi Keuangan )
                            </h2>
                            <div className={formFW}>
                                <label className={labelForm}>
                                    Annual Revenue Range ( Pendapatan Tahunan )
                                </label>
                                <ScrollableSelect
                                    id="kategoriCheckUp"
                                    value={formData.kategoriCheckUp}
                                    options={KATEGORI_OPTIONS}
                                    onChange={(val) => handleChange('kategoriCheckUp', val)}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </section>

                        <section className='mb-8'>
                            <h2 className={subsectionTitle}>
                                Market Position & Competition ( Posisi Pasar & Kompetisi )
                            </h2>
                            <div className='flex flex-col gap-4'>
                                <div className={formFW}>
                                    <label className={labelForm}>
                                        Market Scope ( Cakupan Pasar )
                                    </label>
                                    <ScrollableSelect
                                        id="kategoriCheckUp"
                                        value={formData.kategoriCheckUp}
                                        options={KATEGORI_OPTIONS}
                                        onChange={(val) => handleChange('kategoriCheckUp', val)}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className={formFW}>
                                    <label className={labelForm}>
                                        Main Competitors ( Kompetitor Utama ) <span className='text-xs text-slate-700'>( optional ) </span>
                                    </label>
                                    <textarea className={inputForm} placeholder='List your competitors ( example. Nusantara Jaya, Win Berjaya Teknik )' />
                                </div>
                            </div>
                        </section>

                        <section className='mb-8'>
                            <h2 className={subsectionTitle}>
                                Business Licenses & Certifications ( Izin Usaha & Sertifikasi )
                            </h2>

                            <div className={formFW}>
                                <label className={labelForm}>
                                    Certifications ( Sertifikasi yang dimiliki ) <span className='text-xs text-slate-700'>( optional ) </span>
                                </label>
                                <textarea className={inputForm} placeholder='List all certifications ( example. ISO 9001, SNI, Halal )' />
                            </div>
                        </section>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-slate-200">

                            <Button
                                type="button"
                                className="px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400"
                            >
                                Batal
                            </Button>

                            <Button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                            >
                                Lanjutkan ke Assessment
                            </Button>

                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
}

export default CompanyInfoForm;