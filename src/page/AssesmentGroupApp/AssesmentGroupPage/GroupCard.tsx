import { useState } from "react";
import QuestionCard from "./QuestionCard";
import Button from "../../Button";

type Group = {
    name: string;
    description: string;
};

type Question = {
    title: string;
    answers: { text: string; score: number }[];
};

type Props = {
    groups: Group[];
    groupQuestions: Question[][];
    onEditGroup: (
        index: number,
        group: Group) => void;
    onDeleteGroup: (index: number) => void;
    onAddQuestion: (
        groupIndex: number, 
        question: Question) => void;

    onDeleteQuestion: (
        groupIndex: number, 
        questionIndex: number) => void;
};

function GroupCard({ groups, groupQuestions, onEditGroup, onDeleteGroup, onAddQuestion, onDeleteQuestion }: Props) {

    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);

    const closeModal = () => {
        setAnimateModal(false);
        setTimeout(() => setShowModal(false), 200);
    };

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [groupName, setGroupName] = useState("");
    const [groupDesc, setGroupDesc] = useState("");

    const handleSave = () => {
        if (selectedIndex === null) return;
        onEditGroup(selectedIndex, { name: groupName, description: groupDesc });
        closeModal();
    };

    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [animateQuestionModal, setAnimateQuestionModal] = useState(false);
    const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);
    const [questionTitle, setQuestionTitle] = useState("");
    const [answers, setAnswers] = useState<{ text: string; score: number }[]>([
        { text: "", score: 0 },
        { text: "", score: 0 },
    ]);

    const handleAddAnswer = () => {
        if (answers.length >= 5) return;
        setAnswers(prev => [...prev, { text: "", score: 0 }]);
    };

    const handleDeleteAnswer = (i: number) => {
        setAnswers(prev => prev.filter((_, idx) => idx !== i));
    };

    const handleAnswerChange = (i: number, field: "text" | "score", value: string) => {
        setAnswers(prev => prev.map((a, idx) =>
            idx === i ? { ...a, [field]: field === "score" ? Number(value) : value } : a
        ));
    };

    const handleSaveQuestion = () => {
        if (activeGroupIndex === null || !questionTitle.trim()) return;
        onAddQuestion(activeGroupIndex, { title: questionTitle, answers });
        closeQuestionModal();
    };

    const closeQuestionModal = () => {
        setAnimateQuestionModal(false);
        setTimeout(() => {
            setShowQuestionModal(false);
            setQuestionTitle("");
            setAnswers([{ text: "", score: 0 }, { text: "", score: 0 }]);
        }, 200);
    };

    const handleUpdateQuestion = (groupIndex: number, questionIndex: number, updatedQuestion: Question) => {
        const updated = [...groupQuestions];
        updated[groupIndex][questionIndex] = updatedQuestion;
    };

    const handleDeleteQuestion = (groupIndex: number, questionIndex: number) => {
        onDeleteQuestion(groupIndex, questionIndex);
    };

    return (
        <div className="mt-6 space-y-4">
            {groups.map((group: Group, index: number) => (
                <div key={index} className="border rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <p className="font-semibold text-xl">{group.name}</p>
                            <p className="text-gray-600 text-lg">{group.description}</p>
                        </div>

                        <div className="flex flex-row">
                            <div className="px-2">
                                <Button className="border p-1 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out"
                                    onClick={() => {
                                        setSelectedIndex(index);
                                        setGroupName(group.name);
                                        setGroupDesc(group.description);
                                        setShowModal(true);
                                        setTimeout(() => setAnimateModal(true), 10);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
                                        id="Edit--Streamline-Tabler" height="24" width="24">
                                        <desc>Edit Streamline Icon: https://streamlinehq.com</desc>
                                        <path d="M7 7H6a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" strokeWidth="2"></path>
                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97L9 12v3h3l8.385 -8.415z" strokeWidth="2"></path>
                                        <path d="m16 5 3 3" strokeWidth="2"></path>
                                    </svg>
                                </Button>
                            </div>
                            <div className="px-2">
                                <Button className="border p-1 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out"
                                    onClick={() => onDeleteGroup(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="2" stroke="currentColor" className="w-6 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <p className="font-semibold text-lg">
                            Questions ({groupQuestions[index]?.length ?? 0})
                        </p>
                        <Button className="flex items-center gap-2 border px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                            onClick={() => {
                                setActiveGroupIndex(index);
                                setShowQuestionModal(true);
                                setTimeout(() => setAnimateQuestionModal(true), 10);
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add Question
                        </Button>
                    </div>
                    <QuestionCard questions={groupQuestions[index] ?? []} groupIndex={index} onUpdateQuestion={handleUpdateQuestion} 
                    onDeleteQuestion={handleDeleteQuestion}/>
                </div>
            ))}

            {/* Edit Group Modal */}
            {showModal && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200
                    ${animateModal ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}`}>
                    <div className={`bg-white rounded-2xl shadow-lg w-180 p-6 transform transition-all duration-200
                        ${animateModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <h2 className="text-xl font-semibold mb-4">Edit Group</h2>
                        <form>
                            <label className="text-sm font-medium">Group Name</label>
                            <input value={groupName} onChange={(e) => setGroupName(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 mb-4" />
                            <label className="text-sm font-medium">Group Description</label>
                            <input value={groupDesc} onChange={(e) => setGroupDesc(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 mb-4" />
                        </form>
                        <div className="flex justify-end gap-3">
                            <Button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                                Cancel
                            </Button>
                            <Button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Question Modal */}
            {showQuestionModal && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200
                    ${animateQuestionModal ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}`}>
                    <div className={`bg-white rounded-2xl shadow-lg w-180 p-6 transform transition-all duration-200
                        ${animateQuestionModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add Question</h2>
                        </div>
                        <label className="text-sm font-medium">Question Text</label>
                        <textarea value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)}
                            placeholder="Enter your question"
                            className="w-full border rounded-lg px-3 py-2 mt-1 mb-4 resize-none h-24 bg-gray-50" />
                        <div className="flex justify-between items-center mb-3">
                            <p className="font-semibold">Answers & Scores</p>
                            <Button onClick={handleAddAnswer}
                                disabled={answers.length >= 5}
                                className="flex items-center gap-1 border px-3 py-1 rounded-lg text-sm font-semibold \
                                hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Add Answer
                            </Button>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {answers.map((answer, i) => (
                                <div key={i} className="border rounded-xl p-3">
                                    <p className="text-sm font-medium mb-2">Answer {i + 1}</p>

                                    <div className="flex items-end gap-3">
                                        {/* Answer Text */}
                                        <input
                                            value={answer.text}
                                            onChange={(e) => handleAnswerChange(i, "text", e.target.value)}
                                            placeholder="Answer text"
                                            className="flex-1 border rounded-lg px-3 py-2 bg-gray-50"
                                        />

                                        {/* Score */}
                                        <div className="flex flex-col w-24">
                                            <p className="text-xs text-gray-500 mb-1">Score</p>
                                            <input
                                                type="number"
                                                value={answer.score}
                                                onChange={(e) => handleAnswerChange(i, "score", e.target.value)}
                                                className="border rounded-lg px-2 py-2 text-center bg-gray-50"
                                            />
                                        </div>

                                        {/* Delete */}
                                        <Button
                                            onClick={() => handleDeleteAnswer(i)}
                                            className="text-red-500 hover:bg-red-50 self-end p-2 rounded-lg"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                strokeWidth={2} stroke="currentColor" className="w-7">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <Button onClick={closeQuestionModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                                Cancel
                            </Button>
                            <Button onClick={handleSaveQuestion} className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800">
                                Save Question
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupCard;