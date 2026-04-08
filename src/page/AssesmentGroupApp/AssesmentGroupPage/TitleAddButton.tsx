import { useState } from "react";
import Button from "../../Button";


type Group = {
    name: string;
    description: string;
};

type Props = {
    onAddGroup: (group: Group) => void;
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

        onAddGroup({
            name: groupName,
            description: groupDesc,
        });

        setGroupName("");
        setGroupDesc("");
        closeModal();
    };

    return (
        <>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-3xl font-semibold pb-2">
                        Assesment Groups
                    </p>
                    <p className="text-gray-600">
                        Manage questionnaire structure and scoring
                    </p>
                </div>

                <Button
                    onClick={() => {
                        setShowModal(true);
                        setTimeout(() => setAnimateModal(true), 10);
                    }}
                    className="px-4 py-2 rounded-xl text-white bg-black flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                        className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 4v16m8-8H4" />
                        </svg>
                    Create Group
                </Button>
            </div>

            {/* MODAL */}
            {showModal && (
                <div
                    className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200
                    ${animateModal ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}`}
                >
                    <div
                        className={`bg-white rounded-2xl shadow-lg w-180 p-6 transform transition-all duration-200
                        ${animateModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                    >
                        <h2 className="text-xl font-semibold mb-4">
                            Create Group
                        </h2>

                        <form>
                            <label className="text-sm font-medium">Group Name</label>
                            <input type="text" placeholder="Group Name"
                                value={groupName} onChange={(e) => setGroupName(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 mb-4" />

                            <label className="text-sm font-medium">Group Description</label>
                            <input type="text" placeholder="Description About the Group"
                                value={groupDesc} onChange={(e) => setGroupDesc(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 mb-4" />
                        </form>


                        <div className="flex justify-end gap-3">
                            <Button
                                onClick={closeModal}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </Button>

                            <Button
                                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TitleAddButton;