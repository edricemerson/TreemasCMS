import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Button from "../../Button";

type Group = {
    id?: number;
    name: string;
    description: string;
    subgroups: { id?: number; text: string; categories?: any[] }[];
};

type Question = {
    id?: number;
    title: string;
    answers: { id?: number; text: string; score: number }[];
};

type Props = {
    groups: Group[];
    groupQuestions: Question[][];
    onEditGroup: (index: number, group: Group) => void;
    onDeleteGroup: (index: number) => void;
    onAddQuestion: (groupIndex: number, question: Question) => void;
    onDeleteQuestion: (groupIndex: number, questionIndex: number) => void;
    onRefresh?: () => void;
};

function GroupCard({ groups, onEditGroup, onDeleteGroup, onRefresh }: Props) {
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
        onEditGroup(selectedIndex, {
            name: groupName,
            description: groupDesc,
            subgroups: subgroups,
        });
        closeModal();
    };

    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [animateQuestionModal, setAnimateQuestionModal] = useState(false);
    const [questionTitle, setQuestionTitle] = useState("");
    const [answers, setAnswers] = useState<{ id?: number; text: string; score: number }[]>([
        { text: "", score: 0 },
        { text: "", score: 0 },
    ]);

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [animateCategoryModal, setAnimateCategoryModal] = useState(false);
    const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);
    const [categoryLabel, setCategoryLabel] = useState("");
    const [categories, setCategories] = useState<{ [key: string]: { id?: number; label: string }[] }>({});
    const [activeSubgroupKey, setActiveSubgroupKey] = useState<string | null>(null);
    const [subgroupQuestionsMap, setSubgroupQuestionsMap] = useState<{ [key: string]: Question[] }>({});

    // SINKRONISASI DATABASE KE STATE ASLI
useEffect(() => {
        const newCategories: any = {};
        const newSubgroupMap: any = {};
        groups.forEach((g, gIdx) => {
            g.subgroups?.forEach((sub, sIdx) => {
                const subKey = `${gIdx}-${sIdx}`;
                newCategories[subKey] = sub.categories?.map(c => ({ id: c.id, label: c.name })) || [];
                sub.categories?.forEach((cat, cIdx) => {
                    const catKey = `${subKey}-${cIdx}`;
                    newSubgroupMap[catKey] = cat.questions?.map((q:any) => ({
                        id: q.id, 
                        title: q.text,
                        answers: q.options?.map((o:any) => ({ 
                            id: o.id, 
                            text: o.label, 
                            score: parseFloat(o.points) || 0,
                            type: o.type || "" 
                        })) || []
                    })) || [];
                });
            });
        });
        setCategories(newCategories);
        setSubgroupQuestionsMap(newSubgroupMap);
    }, [groups]);
    const handleSaveCategory = async () => {
        if (!categoryLabel.trim() || !activeSubgroupKey) return;
        const [gIdx, sIdx] = activeSubgroupKey.split('-');
        const subId = groups[Number(gIdx)].subgroups[Number(sIdx)].id;

        await fetch(`http://localhost:3000/api/assessment/categories`, {
            method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ subgroup_id: subId, name: categoryLabel })
        });
        closeCategoryModal();
        if(onRefresh) onRefresh();
    };

    const closeCategoryModal = () => {
        setAnimateCategoryModal(false);
        setTimeout(() => { setShowCategoryModal(false); setCategoryLabel(""); }, 200);
    };

    const handleAddAnswer = () => {
        if (answers.length >= 5) return;
        setAnswers((prev) => [...prev, { text: "", score: 0 }]);
    };

    const handleDeleteAnswer = (i: number) => {
        setAnswers((prev) => prev.filter((_, idx) => idx !== i));
    };

    const handleAnswerChange = (i: number, field: "text" | "score", value: string) => {
        setAnswers((prev) => prev.map((a, idx) => idx === i ? { ...a, [field]: field === "score" ? Number(value) : value } : a));
    };

    const handleSaveQuestion = async () => {
        if (!activeCategoryKey || !questionTitle.trim()) return;
        const [gIdx, sIdx, cIdx] = activeCategoryKey.split('-');
        const catId = categories[`${gIdx}-${sIdx}`]?.[Number(cIdx)]?.id;

        const token = localStorage.getItem("token") || "";
        const res = await fetch(`http://localhost:3000/api/assessment/questions`, {
            method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ category_id: catId, question_text: questionTitle })
        });
        const qData = await res.json();
        
        await Promise.all(answers.map((ans, idx) => 
            fetch(`http://localhost:3000/api/assessment/options`, {
                method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ question_id: qData.data.id, option_text: ans.text, points: ans.score, sequence: idx + 1 })
            })
        ));

        closeQuestionModal();
        if(onRefresh) onRefresh();
    };

    const closeQuestionModal = () => {
        setAnimateQuestionModal(false);
        setTimeout(() => { setShowQuestionModal(false); setQuestionTitle(""); setAnswers([{ text: "", score: 0 }, { text: "", score: 0 }]); }, 200);
    };

const handleUpdateQuestion = async (categoryKey: string, questionIndex: number, updatedQuestion: Question) => {
        const questionId = updatedQuestion.id;
        if(!questionId) return;
        const token = localStorage.getItem("token") || "";

        // 1. Update teks pertanyaan
        await fetch(`http://localhost:3000/api/assessment/questions/${questionId}`, {
            method: "PUT", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ question_text: updatedQuestion.title })
        });

        // 2. Looping untuk menyimpan jawaban beserta tipe checkbox-nya
        for (let i = 0; i < updatedQuestion.answers.length; i++) {
            const ans: { id?: number; text: string; score: number; type?: string } = updatedQuestion.answers[i];
            if (ans.id) {
                await fetch(`http://localhost:3000/api/assessment/options/${ans.id}`, {
                    method: "PUT", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    // 🔴 PERUBAHAN DISINI: Tambahkan option_type
                    body: JSON.stringify({ option_text: ans.text, points: ans.score, option_type: ans.type || "" })
                });
            } else {
                await fetch(`http://localhost:3000/api/assessment/options`, {
                    method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                    body: JSON.stringify({ question_id: questionId, option_text: ans.text, points: ans.score, sequence: i + 1, option_type: ans.type || "" })
                });
            }
        }
        if(onRefresh) onRefresh();
    };
    const handleDeleteQuestion = async (categoryKey: string, questionIndex: number) => {
        const qId = subgroupQuestionsMap[categoryKey][questionIndex].id;
        if(qId) {
            await fetch(`http://localhost:3000/api/assessment/questions/${qId}`, {
                method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });
            if(onRefresh) onRefresh();
        }
    };

    const [subgroups, setSubgroups] = useState<{ id?: number; text: string }[]>([]);

    const handleAddSubgroup = () => { setSubgroups((prev) => [...prev, { text: "" }]); };
    const handleDeleteSubgroup = (index: number) => { setSubgroups((prev) => prev.filter((_, i) => i !== index)); };
    const handleSubgroupChange = (index: number, value: string) => { const updated = [...subgroups]; updated[index].text = value; setSubgroups(updated); };

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
                                <Button
                                    className="border p-1 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out"
                                    onClick={() => {
                                        setSelectedIndex(index);
                                        setGroupName(group.name);
                                        setGroupDesc(group.description);
                                        setSubgroups(group.subgroups || []);
                                        setShowModal(true);
                                        setTimeout(() => setAnimateModal(true), 10);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" id="Edit--Streamline-Tabler" height="24" width="24">
                                        <desc>Edit Streamline Icon: https://streamlinehq.com</desc>
                                        <path d="M7 7H6a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" strokeWidth="2"></path>
                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97L9 12v3h3l8.385 -8.415z" strokeWidth="2"></path>
                                        <path d="m16 5 3 3" strokeWidth="2"></path>
                                    </svg>
                                </Button>
                            </div>
                            <div className="px-2">
                                <Button
                                    className="border p-1 hover:bg-gray-300 rounded-lg transition-colors duration-300 ease-in-out"
                                    onClick={() => onDeleteGroup(index)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 space-y-4">
                        {group.subgroups.map((sub, subIndex) => {
                            const subgroupKey = `${index}-${subIndex}`;
                            const subgroupQuestionCount = (categories[subgroupKey] || []).reduce((total, _, categoryIndex) => {
                                    const categoryKey = `${subgroupKey}-${categoryIndex}`;
                                    return total + (subgroupQuestionsMap[categoryKey]?.length || 0);
                                }, 0);

                            return (
                                <div key={subIndex} className="border rounded-xl p-4">
                                    <div className="flex items-center mb-3">
                                        <div className="flex-1">
                                            <p className="font-semibold text-lg">{sub.text || `Subgroup ${subIndex + 1}`}</p>
                                        </div>

                                        <div className="flex-1 items-center gap-4">
                                            <p className="font-semibold text-lg">Questions ({subgroupQuestionCount})</p>
                                        </div>

                                        <Button onClick={() => { setActiveSubgroupKey(subgroupKey); setShowCategoryModal(true); setTimeout(() => setAnimateCategoryModal(true), 10); }}
                                            className="px-4 py-2 rounded-xl text-white bg-black flex items-center gap-2">
                                            + Add Category
                                        </Button>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        {(categories[`${index}-${subIndex}`] || []).map(
                                            (category, categoryIndex) => (
                                                <div key={categoryIndex} className="border rounded-xl px-4 py-3 bg-gray-50">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-semibold text-sm">
                                                                {categoryIndex + 1}
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="font-semibold text-base">{category.label}</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <Button onClick={() => { setActiveCategoryKey(`${index}-${subIndex}-${categoryIndex}`); setShowQuestionModal(true); setTimeout(() => { setAnimateQuestionModal(true); }, 10); }}
                                                                className="px-3 py-1 rounded-xl text-white bg-black flex items-center gap-2 text-sm">
                                                                + Add Question
                                                            </Button>

                                                            <Button onClick={() => {
                                                                    const catId = category.id;
                                                                    if(catId) {
                                                                        fetch(`http://localhost:3000/api/assessment/categories/${catId}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }).then(() => { if(onRefresh) onRefresh(); });
                                                                    }
                                                                }}
                                                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4">
                                                        <QuestionCard
                                                            questions={subgroupQuestionsMap[`${subgroupKey}-${categoryIndex}`] || []}
                                                            onUpdateQuestion={(questionIndex, updatedQuestion) => handleUpdateQuestion(`${subgroupKey}-${categoryIndex}`, questionIndex, updatedQuestion)}
                                                            onDeleteQuestion={(questionIndex) => handleDeleteQuestion(`${subgroupKey}-${categoryIndex}`, questionIndex)}
                                                        />
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* Modal Add Category */}
            {showCategoryModal && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${animateCategoryModal ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}`}>
                    <div className={`bg-white rounded-2xl shadow-lg w-180 p-6 transform transition-all duration-200 ${animateCategoryModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-semibold">Add Category</h2>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Category Label</label>
                            <input type="text" value={categoryLabel} onChange={(e) => setCategoryLabel(e.target.value)} placeholder="Enter category label" className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-50" />
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <Button onClick={closeCategoryModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancel</Button>
                            <Button onClick={handleSaveCategory} className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800">Save Category</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Edit Group */}
            {showModal && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${animateModal ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}`}>
                    <div className={`bg-white rounded-2xl shadow-lg w-180 p-6 transform transition-all duration-200 ${animateModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <h2 className="text-xl font-semibold mb-4">Edit Group</h2>
                        <form>
                            <label className="text-sm font-medium">Group Name</label>
                            <input value={groupName} onChange={(e) => setGroupName(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4" />
                            <label className="text-sm font-medium">Group Description</label>
                            <input value={groupDesc} onChange={(e) => setGroupDesc(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4" />
                            <div className="flex justify-between items-center mb-3 mt-3">
                                <p className="font-semibold">Subgroup</p>
                                <Button onClick={(e) => { e.preventDefault(); handleAddSubgroup(); }} disabled={subgroups.length >= 7} className="flex items-center gap-1 border px-3 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                    + Add Subgroup
                                </Button>
                            </div>
                        </form>
                        <div className="space-y-3 max-h-64 overflow-y-auto mb-3">
                            {subgroups.map((subgroup, i) => (
                                <div key={i} className="border rounded-xl p-3">
                                    <p className="text-sm font-medium mb-2">Subgroup {i + 1}</p>
                                    <div className="flex items-center gap-3">
                                        <input value={subgroup.text} onChange={(e) => handleSubgroupChange(i, e.target.value)} placeholder="Subgroup name" className="flex-1 border rounded-lg px-3 py-2 bg-gray-50" />
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
                            <Button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">Save</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Add Question */}
            {showQuestionModal && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${animateQuestionModal ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}`}>
                    <div className={`bg-white rounded-2xl shadow-lg w-180 p-6 transform transition-all duration-200 ${animateQuestionModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Add Question</h2></div>
                        <label className="text-sm font-medium">Question Text</label>
                        <textarea value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} placeholder="Enter your question" className="w-full border rounded-lg px-3 py-2 mt-1 mb-4 resize-none h-24 bg-gray-50" />
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
                                        <input value={answer.text} onChange={(e) => handleAnswerChange(i, "text", e.target.value)} placeholder="Answer text" className="flex-1 border rounded-lg px-3 py-2 bg-gray-50" />
                                        <div className="flex flex-col w-24">
                                            <p className="text-xs text-gray-500 mb-1">Score</p>
                                            <input type="number" value={answer.score} onChange={(e) => handleAnswerChange(i, "score", e.target.value)} className="border rounded-lg px-2 py-2 text-center bg-gray-50" />
                                        </div>
                                        <Button onClick={() => handleDeleteAnswer(i)} className="text-red-500 hover:bg-red-50 self-end p-2 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <Button onClick={closeQuestionModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancel</Button>
                            <Button type="button" onClick={handleSaveQuestion} className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800">Save Question</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupCard;