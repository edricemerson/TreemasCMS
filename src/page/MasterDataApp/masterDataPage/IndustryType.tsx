import Searchbar from "../component/Searchbar";
import { useState, useEffect } from "react";

function IndustryType (){
    const [industryTypes, setIndustryTypes] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);

    const [formKode, setFormKode] = useState("");
    const [formName, setFormName] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchIndustryTypes = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/master-data/industries");
            const result = await response.json();
            if (result.success) {
                setIndustryTypes(result.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    useEffect(() => {
        fetchIndustryTypes();
    }, []);

    const handleEdit = (item: any) => {
        setEditingId(item.id);
        setFormKode(item.code || ""); 
        setFormName(item.name);
        setFormDescription(item.description || "");

        setShowModal(true);
        setTimeout(() => setAnimateModal(true), 10);
    };

    const handleSave = async () => {
            if(!formKode.trim() || !formName.trim()){
            alert("Code and Name Must be Filled!");
            return;
        }
        const payload = { code: formKode, name: formName, description: formDescription };

        try {
            if (editingId) {
                await fetch(`http://localhost:3000/api/master-data/industries/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            } else {
                await fetch("http://localhost:3000/api/master-data/industries", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }
            fetchIndustryTypes();
            closeModal();
        } catch (error) {
            console.error("Fail saving data: ", error);
        }
    };

    const closeModal = () => {
        setAnimateModal(false);
        setTimeout(() => setShowModal(false), 200);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this industry type?")) return;
        try {
            await fetch(`http://localhost:3000/api/master-data/industries/${id}`, { method: "DELETE" });
            fetchIndustryTypes();
        } catch (error) {
            console.error("Fail deleting data: ", error);
        }
    };

    return(
        <>
            <div className="bg-white mt-6 px-4 py-3 border rounded-2xl">
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl">Industry Type</p>
                    <button onClick={() => {setEditingId(null); setFormKode(""); setFormName(""); 
                    setFormDescription(""); setShowModal(true); setTimeout(() => setAnimateModal(true), 10);}}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium text-base hover:bg-gray-800 transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg> Add New
                    </button>
                </div>

                <div className="mt-10 mb-10">
                    <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="max-h-80 overflow-y-auto mt-4 mb-4">
                    <table className="w-full text-left">
                        <thead className="border-b font-semibold text-gray-400 sticky top-0 bg-white">
                            <tr>
                                <th className="pl-4 py-3 text-black">ID</th>
                                <th className="py-3 text-black">Kode</th>
                                <th className="py-3 text-black">Name</th>
                                <th className="py-3 text-black">Description</th>
                                <th className="text-right py-3 text-black pr-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-gray-400">
                            {industryTypes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-100 transition-colors duration-300 ease-in-out">
                                    <td className="py-3 pl-5 font-semibold text-black">{index + 1}</td>
                                    <td className="py-3 text-black">{item.code || "-"}</td>
                                    <td className="py-3 text-black">{item.name}</td>
                                    <td className="py-3 text-black">{item.description || "-"}</td>
                                    <td className="py-3 text-right">
                                        <div className="flex justify-end gap-4 pr-1">
                                            <button onClick={() => handleEdit(item)} className="p-1 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" height="24" width="24">
                                                    <path d="M7 7H6a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" strokeWidth="2"></path>
                                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97L9 12v3h3l8.385 -8.415z" strokeWidth="2"></path>
                                                    <path d="m16 5 3 3" strokeWidth="2"></path>
                                                </svg>
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                                                    <path fill="none" stroke="red" strokeMiterlimit="10" strokeWidth="3" d="M19.5,11.5V10c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5v1.5"></path>
                                                    <line x1="8.5" x2="39.5" y1="11.5" y2="11.5" fill="none" stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"></line>
                                                    <line x1="36.5" x2="36.5" y1="23.5" y2="11.5" fill="none" stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"></line>
                                                    <path fill="none" stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" d="M11.5,18.7v19.8c0,2.2,1.8,4,4,4h17c2.2,0,4-1.8,4-4V31"></path>
                                                    <line x1="20.5" x2="20.5" y1="19.5" y2="34.5" fill="none" stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"></line>
                                                    <line x1="27.5" x2="27.5" y1="19.5" y2="34.5" fill="none" stroke="red" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"></line>
                                                </svg>
                                            </button>
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
                        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Industry Type" : "Add New Industry Type"}</h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-medium">Kode</label>
                                <input type="text" value={formKode} onChange={(e) => setFormKode(e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Name</label>
                                <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Description (Optional)</label>
                                <textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
} 
export default IndustryType;