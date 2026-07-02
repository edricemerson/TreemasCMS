import { useState } from "react";
import Button from "../../Button";

type Group = {
    name: string;
    description: string;
    subgroups: Subgroup[]
};

type Props = {
    onAddGroup: (group: Group) => void;
};

type Subgroup = {
    text: string;
};

function TitleAddButton({ onAddGroup }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);

    const closeModal = () => {
        setAnimateModal(false);
        setTimeout(() => setShowModal(false), 200);
    };

    const [groupName, setGroupName] = useState("");
    const [groupDesc, setGroupDesc] = useState("");

    const handleSave = () => {
        if (!groupName.trim()) return;
        onAddGroup({ name: groupName, description: groupDesc, subgroups: subgroups });
        setGroupName(""); setGroupDesc(""); setSubgroups([]);
        closeModal();
    };

    const [subgroups, setSubgroups] = useState<Subgroup[]>([]);

    const handleSubgroupChange = (index: number, value: string) => {
        const updated = [...subgroups];
        updated[index].text = value;
        setSubgroups(updated);
    };

    const handleDeleteSubgroup = (index: number) => {
        setSubgroups((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAddSubgroup = () => {
        setSubgroups((prev) => [...prev, { text: "" }]);
    };

    return (
        <>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-3xl font-semibold pb-2">Assesment Groups</p>
                    <p className="text-gray-600">Manage questionnaire structure and scoring</p>
                </div>
                <Button onClick={() => { setGroupName(""); setGroupDesc(""); setSubgroups([]); setShowModal(true); setTimeout(() => setAnimateModal(true), 10); }}
                    className="px-4 py-2 rounded-xl text-white bg-black flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Create Group
                </Button>
            </div>

            {showModal && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${animateModal ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}`}>
                    <div className={`bg-white rounded-2xl shadow-lg w-180 p-6 transform transition-all duration-200 ${animateModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <h2 className="text-xl font-semibold mb-4">Create Group</h2>
                        <form>
                            <label className="text-sm font-medium">Group Name</label>
                            <input type="text" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4" />

                            <label className="text-sm font-medium">Group Description</label>
                            <input type="text" placeholder="Description About the Group" value={groupDesc} onChange={(e) => setGroupDesc(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4" />

                            <div className="flex justify-between items-center mb-3 mt-3">
                                <p className="font-semibold">Subgroup</p>
                                <Button className="flex items-center gap-1 border px-3 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={(e) => { e.preventDefault(); handleAddSubgroup(); }} disabled={subgroups.length >= 7}>                                
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Subgroup
                                </Button>
                            </div>
                        </form>

                        <div className="space-y-3 max-h-64 overflow-y-auto mb-3">
                            {subgroups.map((subgroup, i) => (
                                <div key={i} className="border rounded-xl p-3">
                                    <p className="text-sm font-medium mb-2">Subgroup {i + 1}</p>
                                    <div className="flex items-center gap-3">
                                        <input value={subgroup.text} onChange={(e) => handleSubgroupChange(i, e.target.value)} placeholder="Subgroup name" className="flex-1 border rounded-lg px-3 py-2 bg-gray-50"/>
                                        <Button onClick={() => handleDeleteSubgroup(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancel</Button>
                            <Button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800" onClick={handleSave}>Save</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TitleAddButton;