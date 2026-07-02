import { useState, useEffect } from 'react';
import ScrollableSelect from './ScrollableSelect';
import Button from '../Button';

function CompanyInfoForm() {
    // 1. STATE FORM: 11 Variabel persis sesuai list
    const [formData, setFormData] = useState({
        namaUmkm: '',
        howFarAlong: '',
        tipeBisnis: '',
        produkUtama: '',
        lokasi: '',
        namaKontak: '',
        jabatan: '',
        email: '',
        nomorTelepon: '',
        teamSize: '',
        annualRevenue: ''
    });

    // 2. STATE DROPDOWN: 5 master data pilihan
    const [howFarAlongOptions, setHowFarAlongOptions] = useState<string[]>(['Pilih Tahap Perjalanan Bisnis']);
    const [businessTypeOptions, setBusinessTypeOptions] = useState<string[]>(['Pilih Tipe Bisnis']);
    const [locationOptions, setLocationOptions] = useState<string[]>(['Pilih Lokasi (Provinsi)']);
    const [teamSizeOptions, setTeamSizeOptions] = useState<string[]>(['Pilih Ukuran Tim']);
    const [revenueOptions, setRevenueOptions] = useState<string[]>(['Pilih Rentang Pendapatan']);

    // 3. FETCHING MASTER DATA
    useEffect(() => {
        const fetchMasterData = async () => {
            const fetchData = async (endpoint: string, defaultOption: string) => {
                try {
                    const res = await fetch(`http://localhost:3000/api/master-data/${endpoint}`);
                    const result = await res.json();
                    
                    if (result.success && result.data) {
                        return [defaultOption, ...result.data.map((item: any) => item.name)];
                    }
                } catch (error) {
                    console.error(`Gagal menarik data ${endpoint}:`, error);
                }
                return [defaultOption];
            };

            setHowFarAlongOptions(await fetchData('business-maturity', 'Pilih Tahap Perjalanan Bisnis'));
            setBusinessTypeOptions(await fetchData('business-type', 'Pilih Tipe Bisnis'));
            setLocationOptions(await fetchData('province', 'Pilih Lokasi (Provinsi)'));
            setTeamSizeOptions(await fetchData('company-size', 'Pilih Ukuran Tim'));
            setRevenueOptions(await fetchData('annual-revenue', 'Pilih Rentang Pendapatan'));
        };

        fetchMasterData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.email || !formData.namaUmkm) {
            alert("Nama Bisnis dan Email wajib diisi!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/profile/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert("Data profil berhasil disimpan! Memulai Assessment...");
                // Nanti tambahkan redirect ke halaman soal assessment di sini
                // window.location.href = `/assessment/${result.data.id}`;
            } else {
                alert("Gagal menyimpan data: " + result.message);
            }
        } catch (error) {
            console.error("Gagal mengirim data:", error);
            alert("Terjadi kesalahan koneksi ke server.");
        }
    };

    // Styling
    const subsectionTitle = `text-base font-semibold text-slate-900 mb-4 border-b-3 border-teal-600`
    const formFW = `flex flex-col gap-1 sm:col-span-2`
    const inputForm = `px-3 py-2 text-sm border rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500`
    const labelForm = `text-sm font-medium text-black`
    const fieldForm = `flex flex-col gap-1`

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="px-6 py-4 bg-white border-b border-slate-200">
                <a href="/" className="inline-flex items-center gap-2 text-[15px] font-medium text-slate-600 hover:text-slate-900">
                    <span className="text-lg">←</span> Kembali ke Beranda
                </a>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <h1 className="text-[28px] font-bold text-slate-900 mb-1">Informasi Perusahaan</h1>
                    <p className="text-[15px] text-slate-500 mb-8">Lengkapi profil singkat bisnis Anda sebelum memulai assessment</p>

                    <form onSubmit={handleSubmit} noValidate>
                        
                        {/* --- 1. COMPANY IDENTITY --- */}
                        <section className="mb-8">
                            <h2 className={subsectionTitle}>Company Identity</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                                <div className={formFW}>
                                    <label className={labelForm}>Business Name ( Nama Bisnis )</label>
                                    <input className={inputForm} placeholder='example. PT Maju Sukses' value={formData.namaUmkm} onChange={(e) => handleChange('namaUmkm', e.target.value)} />
                                </div>
                                <div className={fieldForm}>
                                    <label className={labelForm}>How far along? ( Tahap Bisnis )</label>
                                    <ScrollableSelect id="howFarAlong" value={formData.howFarAlong} options={howFarAlongOptions} onChange={(val) => handleChange('howFarAlong', val)} onBlur={() => {}} />
                                </div>
                            </div>
                        </section>

                        {/* --- 2. BUSINESS CLASSIFICATION --- */}
                        <section className="mb-8">
                            <h2 className={subsectionTitle}>Business Classification</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                                <div className={fieldForm}>
                                    <label className={labelForm}>Business Type ( Tipe Bisnis )</label>
                                    <ScrollableSelect id="tipeBisnis" value={formData.tipeBisnis} options={businessTypeOptions} onChange={(val) => handleChange('tipeBisnis', val)} onBlur={() => {}} />
                                </div>
                                <div className={fieldForm}>
                                    <label className={labelForm}>Main Product/Service ( Jual Apa? )</label>
                                    <input className={inputForm} placeholder='example. Software ERP' value={formData.produkUtama} onChange={(e) => handleChange('produkUtama', e.target.value)} />
                                </div>
                            </div>
                        </section>

                        {/* --- 3. BUSINESS LOCATION --- */}
                        <section className="mb-8">
                            <h2 className={subsectionTitle}>Business Location</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                                <div className={fieldForm}>
                                    <label className={labelForm}>Location ( Lokasi Provinsi )</label>
                                    <ScrollableSelect id="lokasi" value={formData.lokasi} options={locationOptions} onChange={(val) => handleChange('lokasi', val)} onBlur={() => {}} />
                                </div>
                            </div>
                        </section>

                        {/* --- 4. CONTACT INFORMATION --- */}
                        <section className='mb-8'>
                            <h2 className={subsectionTitle}>Contact Information</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5'>
                                <div className={fieldForm}>
                                    <label className={labelForm}>Your Name ( Nama Pengisi )</label>
                                    <input className={inputForm} placeholder='Fullname' value={formData.namaKontak} onChange={(e) => handleChange('namaKontak', e.target.value)} />
                                </div>
                                <div className={fieldForm}>
                                    <label className={labelForm}>Your Role ( Jabatan )</label>
                                    <input className={inputForm} placeholder='example. Owner, Manager' value={formData.jabatan} onChange={(e) => handleChange('jabatan', e.target.value)} />
                                </div>
                                <div className={fieldForm}>
                                    <label className={labelForm}>Email Address</label>
                                    <input type="email" className={inputForm} placeholder='youremail@mail.com' value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                                </div>
                                <div className={fieldForm}>
                                    <label className={labelForm}>Phone Number</label>
                                    <input type="tel" className={inputForm} placeholder='+62 812 8211 0911' value={formData.nomorTelepon} onChange={(e) => handleChange('nomorTelepon', e.target.value)} />
                                </div>
                            </div>
                        </section>

                        {/* --- 5. COMPANY SCALE & RESOURCES --- */}
                        <section className='mb-8'>
                            <h2 className={subsectionTitle}>Company Scale & Resources</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                                <div className={fieldForm}>
                                    <label className={labelForm}>Team Size ( Ukuran Tim )</label>
                                    <ScrollableSelect id="teamSize" value={formData.teamSize} options={teamSizeOptions} onChange={(val) => handleChange('teamSize', val)} onBlur={() => {}} />
                                </div>
                            </div>
                        </section>

                        {/* --- 6. FINANCIAL INFORMATION --- */}
                        <section className='mb-8'>
                            <h2 className={subsectionTitle}>Financial Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                                <div className={fieldForm}>
                                    <label className={labelForm}>Annual Revenue ( Pendapatan Tahunan )</label>
                                    <ScrollableSelect id="annualRevenue" value={formData.annualRevenue} options={revenueOptions} onChange={(val) => handleChange('annualRevenue', val)} onBlur={() => {}} />
                                </div>
                            </div>
                        </section>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
                            <Button type="button" className="px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400">
                                Batal
                            </Button>
                            <Button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700">
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