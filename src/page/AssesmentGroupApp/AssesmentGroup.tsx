import { useState } from "react";
import TitleAddButton from "./AssesmentGroupPage/TitleAddButton";
import GroupCard from "./AssesmentGroupPage/GroupCard";

type Group = {
    name: string;
    description: string;
};

type Question = {
    title: string;
    answers: { text: string; score: number }[];
};

function AssesmentGroup() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupQuestions, setGroupQuestions] = useState<Question[][]>([]);

    const handleAddGroup = (group: Group) => {
        setGroups(prev => [...prev, group]);
        setGroupQuestions(prev => [...prev, []]);
    };

    const handleEditGroup = (index: number, updatedGroup: Group) => {
        setGroups(prev => prev.map((g, i) => (i === index ? updatedGroup : g)));
    };

    const handleDeleteGroup = (index: number) => {
        setGroups(prev => prev.filter((_, i) => i !== index));
        setGroupQuestions(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddQuestion = (groupIndex: number, question: Question) => {
        setGroupQuestions(prev => {
            const updated = [...prev];
            updated[groupIndex] = [...(updated[groupIndex] ?? []), question];
            return updated;
        });
    };

    const handleDeleteQuestion = (groupIndex: number, questionIndex: number) => {
        setGroupQuestions(prev => {
            const updated = [...prev];

            updated[groupIndex] = updated[groupIndex].filter(
                (_, i) => i !== questionIndex
            );

            return updated;
        });
    };

    return (
        <div className="ml-64 p-6">
            <TitleAddButton onAddGroup={handleAddGroup} />
            <GroupCard groups={groups} groupQuestions={groupQuestions}
                onEditGroup={handleEditGroup} onDeleteGroup={handleDeleteGroup}
                onAddQuestion={handleAddQuestion} onDeleteQuestion={handleDeleteQuestion} />
        </div>
    );
}

export default AssesmentGroup;