import { useState, useEffect, useRef } from "react";
import Diagram from "./Diagramv3";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type ReportData = {
    profile_id: number;
    result_id?: number;
    company_name: string;
    email: string;
    phone: string;
    total_score: number | null;
    status: string;
    sort_date: string;
    assessment_date: string | null;
};

const pdfBtnStyle: React.CSSProperties = {
    background: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    
};

function Reports() {
    const [reports, setReports] = useState<ReportData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
    const [selectedUser, setSelectedUser] = useState<ReportData | null>(null);
    const [insights, setInsights] = useState<string[]>([]);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [profileDetail, setProfileDetail] = useState<any>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem("token") || "";
                const response = await fetch("http://localhost:3000/api/assessment/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const result = await response.json();

                if (result.success) {
                    setReports(result.data);
                } else {
                    console.error("Gagal mengambil data:", result.error);
                }
            } catch (error) {
                console.error("Gagal koneksi ke server:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    // FUNGSI SORTING DATETIME
    const sortedReports = [...reports].sort((a, b) => {
        const dateA = new Date(a.sort_date).getTime();
        const dateB = new Date(b.sort_date).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    const toggleSort = () => {
        setSortOrder(prev => (prev === "desc" ? "asc" : "desc"));
    };

    // FUNGSI FORMAT TANGGAL
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        }).format(date);
    };

    // GET PROFILE DETAIL
    const fetchProfileDetail = async (profileId: number) => {
        try {
            const token = localStorage.getItem("token") || "";
            const response = await fetch(`http://localhost:3000/api/assessment/profile-detail/${profileId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setProfileDetail(result.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    async function downloadPDF() {
            if (!resultsRef.current) return;
            setPdfLoading(true);
            try {
                const canvas = await html2canvas(resultsRef.current, { scale: 2, useCORS: true });
                const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                const pageW = pdf.internal.pageSize.getWidth();
                const pageH = pdf.internal.pageSize.getHeight();
                const imgW = pageW - 20;
                const imgH = (canvas.height * imgW) / canvas.width;
                let remaining = imgH;
                let srcY = 0;
                while (remaining > 0) {
                    const sliceH = Math.min(remaining, pageH - 20);
                    const sliceCanvas = document.createElement('canvas');
                    sliceCanvas.width = canvas.width;
                    sliceCanvas.height = (sliceH / imgH) * canvas.height;
                    const ctx = sliceCanvas.getContext('2d')!;
                    ctx.drawImage(canvas, 0, srcY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);
                    if (srcY > 0) pdf.addPage();
                    pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', 10, 10, imgW, sliceH);
                    srcY += sliceCanvas.height;
                    remaining -= sliceH;
                }
                pdf.save('BHI_Assessment_Report.pdf');
            } finally {
                setPdfLoading(false);
            }
        }
    return (
        <div className="md:p-8 bg-gray-50 min-h-screen overflow-x-hidden box-border ml-64 p-6">

            <div className="mb-6">
                <h1 className="text-3xl font-semibold text-gray-900">Reports</h1>
                <p className="text-gray-500 mt-1">
                    See the scoring of your company and extract insights here
                </p>
            </div>

            <div className="mb-4">
                <p className="font-semibold text-black">View User</p>
            </div>

            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead className="bg-white border-b">
                            <tr>
                                <th className="py-4 px-6 font-bold text-sm text-black">NO</th>
                                <th className="py-4 px-6 font-bold text-sm text-black">COMPANY NAME</th>
                                <th className="py-4 px-6 font-bold text-sm text-black">CONTACT</th>
                                <th className="py-4 px-6 font-bold text-sm text-black cursor-pointer hover:bg-gray-50 transition-colors" onClick={toggleSort}>
                                    <div className="flex items-center gap-2 select-none">
                                        TIMESTAMP
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="py-4 px-6 font-bold text-sm text-black">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-500">Loading data...</td>
                                </tr>
                            ) : sortedReports.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-500 bg-gray-50 m-4 rounded-lg block">NO DATA AVAILABLE</td>
                                </tr>
                            ) : (
                                sortedReports.map((report, index) => (
                                    <tr key={report.profile_id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => { setSelectedUser(report); setInsights([]); fetchProfileDetail(report.profile_id); }}>
                                        <td className="py-4 px-6 text-sm text-gray-900">{index + 1}</td>
                                        <td className="py-4 px-6 text-sm text-gray-900 font-medium">{report.company_name}</td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            <p>{report.email}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{report.phone}</p>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            {formatDate(report.sort_date)}
                                        </td>
                                        <td className="py-4 px-6 text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${report.status === 'Baru Mengisi Form' ? 'bg-yellow-100 text-yellow-800' : 'bg-teal-100 text-teal-800'
                                                }`}>
                                                {report.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-7xl shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex w-full justify-between">
                            <h2 className="text-lg font-bold">User's {selectedUser.company_name} Report</h2>
                            <button
                                type="button"
                                onClick={() => setSelectedUser(null)}
                                className="text-gray-400 hover:text-gray-700 text-xl font-bold transition duration-200"
                            >
                                X
                            </button>
                        </div>

                        <div className="border-b border-gray-300 mb-4" />
                        <div className='flex justify-center'>
                            <div ref={resultsRef}>
                                <Diagram
                                    profilData={{
                                        namaBisnis: profileDetail?.company_name ?? '',
                                        industri: profileDetail?.business_type ?? '',
                                        skalaBisnis: profileDetail?.ideation ?? '',
                                        lokasi: profileDetail?.location ?? '',
                                        jumlahKaryawan: profileDetail?.team_size ?? '',
                                    }}
                                    notesData={insights}
                                />
                            </div>
                        </div>

                        <form className='flex flex-col mt-5'>
                            <div className='flex mb-3'>
                                <div className='flex' style={{marginBottom: 12}}>
                                    <label className='mr-4 font-semibold' style={{fontSize:25}}>
                                        Insights
                                    </label>

                                    <button type='button' disabled={insights.length >= 5}
                                        className={` ${insights.length >= 5 ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                                        :'bg-black'}`} style={pdfBtnStyle}
                                        onClick={() => setInsights(prev => [...prev, ''])}
                                    >
                                        Add Insights
                                    </button >
                                </div>

                                <div className='flex ml-auto'>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12}}>
                                        <button type="button" onClick={downloadPDF} disabled={pdfLoading} style={pdfBtnStyle}>
                                            {pdfLoading ? 'Generating PDF…' : 'Download PDF'}
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {insights.map((value, i) => (
                                <div key={i} className='flex items-center gap-2 my-1'>
                                    <textarea
                                        className='w-full border rounded-lg px-3 py-1 bg-gray-50'
                                        placeholder='Write insights here'
                                        value={value}
                                        onChange={(e) => setInsights(prev => prev.map((v, idx) => idx === i ? e.target.value : v))}
                                    />
                                    <button type='button' className='text-gray-400 font-normal text-lg 
                                        hover:text-red-500 hover:font-bold transition duration-200'
                                        onClick={() => setInsights(prev => prev.filter((_, idx) => idx !== i))}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reports;