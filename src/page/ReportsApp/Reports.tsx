import { useState, useEffect } from "react";

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

function Reports() {
    const [reports, setReports] = useState<ReportData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

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
                                    <tr key={report.profile_id} className="hover:bg-gray-50 transition-colors">
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
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                report.status === 'Baru Mengisi Form' ? 'bg-yellow-100 text-yellow-800' : 'bg-teal-100 text-teal-800'
                                            }`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-bold text-teal-600">
                                            {report.total_score !== null ? report.total_score : "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Reports;