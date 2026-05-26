import { useState, useEffect } from "react" 
import { Context } from "./Context"
import type { AllDataType } from "./ContextType"
import { useLocation } from "react-router-dom"

export const parseLocalized = (val: any): { en: string; id: string } => {
    if (typeof val === 'object' && val !== null) return { en: val.en || "", id: val.id || "" };
    try {
        const parsed = JSON.parse(val);
        if (parsed.en !== undefined || parsed.id !== undefined) return parsed;
        return { en: val || "", id: "" }; 
    } catch {
        return { en: val || "", id: "" }; 
    }
};
export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    
   
    const [contextData, setContextData] = useState<AllDataType>({
        title: "",
        description: "",
        backgroundImage: "",
        components: [
            { id: "comp1", label: "", icon: "" },
            { id: "comp2", label: "", icon: "" },
            { id: "comp3", label: "", icon: "" },
            { id: "comp4", label: "", icon: "" },
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
        prefooter: {
            title1: "",
            title2: "",
            description: "",
            backgroundImage: "",
            buttonLink: "",
        },
        social: [], // Sudah jadi array dinamis
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
                    
                    const loadedSocial = Array.isArray(dbSettings.social_links)
                        ? dbSettings.social_links
                        : [
                            { platform: "linkedin", url: dbSettings.social_linkedin || "", icon: "linkedin" },
                            { platform: "instagram", url: dbSettings.social_instagram || "", icon: "instagram" },
                            { platform: "x", url: dbSettings.social_x || "", icon: "x" }
                          ].filter(item => item.url && item.url.trim() !== ""); 

                    setContextData((prev) => ({
                        ...prev,
                        title: dbSettings.hero_title || prev.title,
                        description: dbSettings.hero_desc || prev.description,
                        backgroundImage: dbSettings.hero_bg_image || prev.backgroundImage,
                        
                        components: Array.isArray(dbSettings.hero_components) ? dbSettings.hero_components : prev.components,
                        
                        about: dbSettings.about_content || prev.about,
                        prefooter: {
                            title1: dbSettings.preFooter_title1 || prev.prefooter.title1,
                            title2: dbSettings.preFooter_title2 || prev.prefooter.title2,
                            description: dbSettings.preFooter_desc || prev.prefooter.description,
                            backgroundImage: dbSettings.preFooter_bg || prev.prefooter.backgroundImage,
                            buttonLink: dbSettings.preFooter_btn_link || prev.prefooter.buttonLink,
                        },

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
                        
                        
                        social: loadedSocial, 

                        solutions: solutionsData.success && solutionsData.data.length > 0
                            ? solutionsData.data.map((s: any) => ({
                                id: s.id.toString(),
                                title: s.title,
                                description: s.description,
                                image: s.image_url,
                                icon: s.icon || "" 
                            }))
                            : prev.solutions,

                        people: teamData.success && teamData.data.length > 0
                            ? teamData.data.map((t: any) => ({
                                id: t.id.toString(),
                                name: t.name,
                                labelName: t.label || "",       
                                position: t.title || "", 
                                description: t.description || "", 
                                image: t.image_url || ""
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