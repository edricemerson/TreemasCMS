import { useState, useEffect } from "react";
import TitleAddButton from "./AssesmentGroupPage/TitleAddButton";
import GroupCard from "./AssesmentGroupPage/GroupCard";

export type Group = {
    id?: number;
    name: string;
    description: string;
    subgroups: { id?: number; text: string; categories?: any[] }[];
};

export type Question = {
    id?: number;
    title: string;
    answers: { id?: number; text: string; score: number }[];
};

function AssesmentGroup() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupQuestions, setGroupQuestions] = useState<Question[][]>([]);

    const token = localStorage.getItem("token") || "";

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/assessment/questions", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const json = await res.json();
            if (json.success) {
                const mappedGroups: Group[] = json.data.map((g: any) => ({
                    id: g.id,
                    name: g.name,
                    description: "", // Fallback UI desc
                    subgroups: g.subgroups.map((s: any) => ({
                        id: s.id,
                        text: s.name,
                        categories: s.categories
                    }))
                }));
                setGroups(mappedGroups);
            }
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAddGroup = async (group: Group) => {
        try {
            const res = await fetch("http://localhost:3000/api/assessment/groups", {
                method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ name: group.name, sequence: groups.length + 1 })
            });
            const gData = await res.json();
            
            if (group.subgroups.length > 0) {
                await Promise.all(group.subgroups.map((sg, idx) => 
                    fetch("http://localhost:3000/api/assessment/subgroups", {
                        method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                        body: JSON.stringify({ group_id: gData.data.id, name: sg.text, sequence: idx + 1 })
                    })
                ));
            }
            fetchData();
        } catch (err) { console.error(err); }
    };

    const handleEditGroup = async (index: number, updatedGroup: Group) => {
        const groupId = groups[index].id;
        if(groupId) {
            await fetch(`http://localhost:3000/api/assessment/groups/${groupId}`, {
                method: "PUT", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ name: updatedGroup.name })
            });

            for (let i = 0; i < updatedGroup.subgroups.length; i++) {
                const sg = updatedGroup.subgroups[i];
                if (sg.id) {
                     await fetch(`http://localhost:3000/api/assessment/subgroups/${sg.id}`, {
                        method: "PUT", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                        body: JSON.stringify({ name: sg.text })
                    });
                } else {
                     await fetch(`http://localhost:3000/api/assessment/subgroups`, {
                        method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                        body: JSON.stringify({ group_id: groupId, name: sg.text, sequence: i + 1 })
                    });
                }
            }
            fetchData();
        }
    };

    const handleDeleteGroup = async (index: number) => {
        const groupId = groups[index].id;
        if(groupId) {
            await fetch(`http://localhost:3000/api/assessment/groups/${groupId}`, {
                method: "DELETE", headers: { "Authorization": `Bearer ${token}` }
            });
            fetchData();
        }
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
            updated[groupIndex] = updated[groupIndex].filter((_, i) => i !== questionIndex);
            return updated;
        });
    };

    return (
        <div className="ml-64 p-6">
            <TitleAddButton onAddGroup={handleAddGroup} />
            <GroupCard groups={groups} groupQuestions={groupQuestions}
                onEditGroup={handleEditGroup} onDeleteGroup={handleDeleteGroup}
                onAddQuestion={handleAddQuestion} onDeleteQuestion={handleDeleteQuestion} 
                onRefresh={fetchData} 
            />
        </div>
    );
}

export default AssesmentGroup;