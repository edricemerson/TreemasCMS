import { useState } from "react";
import Button from "../../Button";

type Question = {
    id?: number;
    title: string;
    answers: { id?: number; text: string; score: number }[];
};

type Props = {
    questions: Question[];
    onUpdateQuestion: (questionIndex: number, question: Question) => void;
    onDeleteQuestion: (questionIndex: number) => void;
};

function QuestionCard({ questions, onUpdateQuestion, onDeleteQuestion }: Props) {
    const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});

    const toggleDropdown = (questionIndex: number) => {
        const key = `${questionIndex}`;
        setExpandedQuestions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const [questionTitle, setQuestionTitle] = useState("");
    const [answers, setAnswers] = useState<{ id?: number; text: string; score: number }[]>([]);

    const handleSave = () => {
        if (editingIndex === null) return;
        onUpdateQuestion(editingIndex, {
            id: questions[editingIndex].id,
            title: questionTitle,
            answers,
        });
        closeModal();
    };

    const handleAddAnswer = () => {
        if (answers.length >= 5) return;
        setAnswers(prev => [...prev, { text: "", score: 0 }]);
    };

    const handleDeleteAnswer = (i: number) => {
        setAnswers(prev => prev.filter((_, idx) => idx !== i));
    };

    const handleAnswerChange = (i: number, field: "text" | "score", value: string) => {
        setAnswers(prev => prev.map((a, idx) => idx === i ? { ...a, [field]: field === "score" ? Number(value) : value } : a));
    };

    const closeModal = () => {
        setAnimateModal(false);
        setTimeout(() => { setShowModal(false); setEditingIndex(null); }, 200);
    };

    return (
        <div className="mt-3 space-y-2">
            {questions.map((question, questionIndex) => {
                const key = `${questionIndex}`;
                const isOpen = expandedQuestions[key] ?? false;

                return (
                    <div key={questionIndex} className="border rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                            <div className="flex items-center text-lg">
                                <span className="font-semibold text-black w-6 text-center">
                                    Q{questionIndex + 1}:
                                </span>
                                <p className="font-semibold ml-2">{question.title}</p>
                            </div>
                            <Button onClick={() => toggleDropdown(questionIndex)} className="p-1 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </Button>
                        </div>

                        {isOpen && (
                            <div className="px-4 py-3 space-y-2">
                                <div className="flex justify-between items-center mb-5">
                                    <p className="text-lg font-semibold">Answers & Scores</p>
                                    <div className="flex gap-8">
                                        <Button onClick={() => { setEditingIndex(questionIndex); setQuestionTitle(question.title); setAnswers(question.answers); setShowModal(true); setTimeout(() => setAnimateModal(true), 10); }} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" id="Edit--Streamline-Tabler" className="w-7">
                                                <desc>Edit Streamline Icon: https://streamlinehq.com</desc>
                                                <path d="M7 7H6a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" strokeWidth="2"></path>
                                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97L9 12v3h3l8.385 -8.415z" strokeWidth="2"></path>
                                                <path d="m16 5 3 3" strokeWidth="2"></path>
                                            </svg>
                                            <p className="font-semibold">Edit</p>
                                        </Button>

                                        <Button onClick={() => onDeleteQuestion(questionIndex)} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 text-red-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <p className="font-semibold">Delete</p>
                                        </Button>
                                    </div>
                                </div>

                                {question.answers.map((answer, i) => (
                                    <div key={i} className="flex justify-between items-center bg-gray-200 rounded-lg px-3 py-2">
                                        <span className="text-black text-lg flex items-center">
                                            <span className="w-8 h-6 flex items-center justify-center text-gray-500 text-base font-semibold mr-3">{String.fromCharCode(65 + i)}.</span>
                                            {answer.text || "No answer text"}
                                        </span>
                                        <span className="font-semibold text-blue-500 text-lg">
                                            {answer.score} <span className="font-normal text-gray-500">points</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            {showModal && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${animateModal ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}`}>
                    <div className={`bg-white rounded-2xl shadow-lg w-180 p-6 transform transition-all duration-200 ${animateModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Edit Question</h2></div>
                        <label className="text-sm font-medium">Question Text</label>
                        <textarea value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1 mb-4 resize-none h-24 bg-gray-50"/>

                        <div className="flex justify-between items-center mb-3">
                            <p className="font-semibold">Answers & Scores</p>
                            <Button onClick={handleAddAnswer} disabled={answers.length >= 5} className="flex items-center gap-1 border px-3 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg> Add Answer
                            </Button>
                        </div>

                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {answers.map((answer, i) => (
                                <div key={i} className="border rounded-xl p-3">
                                    <p className="text-sm font-medium mb-2">Answer {i + 1}</p>
                                    <div className="flex items-end gap-3">
                                        <input value={answer.text} onChange={(e) => handleAnswerChange(i, "text", e.target.value)} placeholder="Answer text" className="flex-1 border rounded-lg px-3 py-2 bg-gray-50"/>
                                        <div className="flex flex-col w-24">
                                            <p className="text-xs text-gray-500 mb-1">Score</p>
                                            <input type="number" value={answer.score} onChange={(e) => handleAnswerChange(i, "score", e.target.value)} className="border rounded-lg px-2 py-2 text-center bg-gray-50"/>
                                        </div>
                                        <Button onClick={() => handleDeleteAnswer(i)} className="text-red-500 hover:bg-red-50 p-2 self-end rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancel</Button>
                            <Button type="button" onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800">Save Question</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuestionCard;