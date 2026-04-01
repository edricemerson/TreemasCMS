import { useState, useEffect } from "react" // 
import { Context } from "./Context"
import type { AllDataType } from "./ContextType"
import { useLocation } from "react-router-dom"

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const [contextData, setContextData] = useState<AllDataType>({
        title: "",
        description: "",
        backgroundImage: "",
        components: [
            { id: "comp1", label: "", image: "" },
            { id: "comp2", label: "", image: "" },
            { id: "comp3", label: "", image: "" },
            { id: "comp4", label: "", image: "" },
        ],
        solutions: [],
        people: [],
        about: "",
        statistic: {
            businesses: 0,
            provinces: 0,
            areas: 0,
            satisfaction: 0,
        },
        contact: {
            email: "",
            phone: "",
            address: "",
        },
        social: {
            linkedin: "",
            instagram: "",
            twitter: "",
        },
    })

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token || location.pathname === "/home") return;

            try {
            const headers = { "Authorization" : `Bearer ${token}`};
            const [settingsRes, solutionsRes, teamRes] = await Promise.all([
                fetch("http://localhost:3000/api/cms/settings", { headers }),
                fetch("http://localhost:3000/api/cms/solutions", { headers }),
                fetch("http://localhost:3000/api/cms/team", { headers })
            ]); 

                const settingsData = await settingsRes.json();
                const solutionsData = await solutionsRes.json();
                const teamData = await teamRes.json();

                if (settingsData.success) {
                    const dbSettings = settingsData.data;

                    setContextData((prev) => ({
                        ...prev,
                        title: dbSettings.hero_title || prev.title,
                        description: dbSettings.hero_desc || prev.description,
                        backgroundImage: dbSettings.hero_bg_image || prev.backgroundImage,
                        components: dbSettings.hero_components ? JSON.parse(dbSettings.hero_components) : prev.components,
                        about: dbSettings.about_content || prev.about,

                        statistic: {
                            ...prev.statistic,
                            businesses: Number(dbSettings.statistic_businesses) || prev.statistic.businesses,
                            provinces: Number(dbSettings.statistic_provinces) || prev.statistic.provinces,
                            areas: Number(dbSettings.statistic_areas) || prev.statistic.areas,
                            satisfaction: Number(dbSettings.statistic_satisfaction) || prev.statistic.satisfaction,
                        },
                        
                        contact: {
                            ...prev.contact,
                            email: dbSettings.contact_email || prev.contact.email,
                            phone: dbSettings.contact_phone || prev.contact.phone,
                            address: dbSettings.contact_address || prev.contact.address,
                        },
                        
                        social: {
                            ...prev.social,
                            linkedin: dbSettings.social_linkedin || prev.social.linkedin,
                            instagram: dbSettings.social_instagram || prev.social.instagram,
                            twitter: dbSettings.social_x || prev.social.twitter,
                        },

                        solutions: solutionsData.success && solutionsData.data.length > 0
                            ? solutionsData.data.map((s: any) => ({
                                id: s.id.toString(),
                                title: s.title,
                                description: s.description,
                                image: s.image_url
                            }))
                            : prev.solutions,

                        people: teamData.success && teamData.data.length > 0
                            ? teamData.data.map((t: any) => ({
                                id: t.id.toString(),
                                name: t.name,
                                position: t.title, 
                                image: t.image_url
                            }))
                            : prev.people
                    }));
                }
            } catch (error) {
                console.error("Gagal menarik data user:", error);
            }
        };

        fetchUserData();
    }, [location.pathname]);

    return (
        <Context.Provider value={{ contextData, setContextData }}>
            {children}
        </Context.Provider>
    )
}