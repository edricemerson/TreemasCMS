import Button from "../../Button";
import Searchbar from "../component/Searchbar";
import { useState, useEffect } from "react";

function ReferralCode() {
    const [referralCodes, setReferralCodes] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);

    const [formKode, setFormKode] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchReferralCodes = async () => {
        try {
            const response = await fetch("/api/referral");
            const result = await response.json();
            if (result.success) {
                setReferralCodes(result.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    useEffect(() => {
        fetchReferralCodes();
    }, []);

    const handleEdit = (item: any) => {
        setEditingId(item.id);
        setFormKode(item.code || ""); 
        setFormDescription(item.description || "");

        setShowModal(true);
        setTimeout(() => setAnimateModal(true), 10);
    };

    const handleSave = async () => {
        if (!formKode.trim()) {
            alert("Kode Referral wajib diisi!");
            return;
        }
        
        const payload = { code: formKode, description: formDescription };

        try {
            if (editingId) {
                await fetch(`/api/referral/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            } else {
                const response = await fetch("/api/referral", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                
                const result = await response.json();
                if (!result.success) {
                    alert(result.message); 
                    return;
                }
            }
            fetchReferralCodes();
            closeModal();
        } catch (error) {
            console.error("Gagal menyimpan data: ", error);
        }
    };

    const closeModal = () => {
        setAnimateModal(false);
        setTimeout(() => setShowModal(false), 200);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Delete Referral Code?")) return;
        try {
            await fetch(`/api/referral/${id}`, { method: "DELETE" });
            fetchReferralCodes();
        } catch (error) {
            console.error("Gagal menghapus data: ", error);
        }
    };

    return (
        <>
            <div className="bg-white mt-6 px-4 py-3 border rounded-2xl">
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl">Referral Code Master</p>
                    <Button 
                        onClick={() => {
                            setEditingId(null); 
                            setFormKode(""); 
                            setFormDescription(""); 
                            setShowModal(true); 
                            setTimeout(() => setAnimateModal(true), 10);
                        }}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium text-base hover:bg-gray-800 transition-all duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg> Add New
                    </Button>
                </div>

                <div className="mt-10 mb-10">
                    <Searchbar value={search} onChange={(e: any) => setSearch(e.target.value)} />
                </div>

                <div className="max-h-80 overflow-y-auto mt-4 mb-4">
                    <table className="w-full text-left">
                        <thead className="border-b font-semibold text-gray-400 sticky top-0 bg-white">
                            <tr>
                                <th className="pl-4 py-3 text-black">ID</th>
                                <th className="py-3 text-black">Kode Referral</th>
                                <th className="py-3 text-black">Description</th>
                                <th className="text-right py-3 text-black pr-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-gray-400">
                            {referralCodes
                                .filter((item) => item.code.toLowerCase().includes(search.toLowerCase()))
                                .map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-100 transition-colors duration-300 ease-in-out">
                                    <td className="py-3 pl-5 font-semibold text-black">{index + 1}</td>
                                    <td className="py-3 text-black font-medium">{item.code}</td>
                                    <td className="py-3 text-black">{item.description || "-"}</td>
                                    <td className="py-3 text-right">
                                        <div className="flex justify-end gap-4 pr-1">
                                            <Button onClick={() => handleEdit(item)} className="p-1 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
                                                    <path d="M7 7H6a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" strokeWidth="2"></path>
                                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97L9 12v3h3l8.385 -8.415z" strokeWidth="2"></path>
                                                    <path d="m16 5 3 3" strokeWidth="2"></path>
                                                </svg>
                                            </Button>
                                            <Button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                                                    <path fill="none" stroke="red" strokeMiterlimit="10" strokeWidth="3" d="M19.5,11.5V10c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5v1.5"></path>
                                                    <line x1="8.5" x2="39.5" y1="11.5" y2="11.5" fill="none" stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"></line>
                                                    <line x1="36.5" x2="36.5" y1="23.5" y2="11.5" fill="none" stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"></line>
                                                    <path fill="none" stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" d="M11.5,18.7v19.8c0,2.2,1.8,4,4,4h17c2.2,0,4-1.8,4-4V31"></path>
                                                    <line x1="20.5" x2="20.5" y1="19.5" y2="34.5" fill="none" stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"></line>
                                                    <line x1="27.5" x2="27.5" y1="19.5" y2="34.5" fill="none" stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"></line>
                                                </svg>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className={`fixed inset-0 flex items-center z-50 transition-opacity duration-200 justify-center ${animateModal ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}`}>
                    <div className={`bg-white rounded-2xl shadow-lg w-125 p-6 relative transform transition-all duration-200 ${animateModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Referral Code" : "Add New Referral Code"}</h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-medium">Kode Referral</label>
                                <input 
                                    type="text" 
                                    value={formKode} 
                                    onChange={(e) => setFormKode(e.target.value.toUpperCase())} 
                                    placeholder="Contoh: TREEMAS2026"
                                    className="w-full border rounded-lg px-3 py-2 mt-1 uppercase" 
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Description (Optional)</label>
                                <textarea 
                                    value={formDescription} 
                                    onChange={(e) => setFormDescription(e.target.value)} 
                                    placeholder="Catatan untuk kode ini..."
                                    className="w-full border rounded-lg px-3 py-2 mt-1" 
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <Button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancel</Button>
                            <Button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">Save</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ReferralCode;