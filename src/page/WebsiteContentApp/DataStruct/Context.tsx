import React, { createContext, useContext, useState, useEffect } from "react"
import type { AllDataType } from "./ContextType"

export type ContextType = {
    contextData: AllDataType
    setContextData: React.Dispatch<React.SetStateAction<AllDataType>>
}

// 1. Buat Context
export const Context = createContext<ContextType | null>(null)

// 2. Buat Hook
export const useData = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error("useData must be used inside DataProvider")
    }
    return context
}

// 3. Buat Provider (Tangki Air & Fetch Data)
const defaultData: AllDataType = {
    title_en: "", title_id: "",
    description_en: "", description_id: "",
    backgroundImage: "", components: [], solutions: [], people: [],
    about_en: "", about_id: "",
    statistic: { businesses: 0, provinces: 0, areas: 0, satisfaction: 0 },
    contact: { email: "", phone: "", address: "" },
    prefooter: { title1_en: "", title1_id: "", title2_en: "", title2_id: "", description_en: "", description_id: "", backgroundImage: "", buttonLink: "" },
    social: []
}

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [contextData, setContextData] = useState<AllDataType>(defaultData)

    useEffect(() => {
        const fetchCMS = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/cms/public/landing"); 
                const result = await res.json();
                
                if (result.success) {
                    const dbSettings = result.data.settings || {};
                    const dbSolutions = result.data.solutions || [];
                    const dbTeam = result.data.team || [];

                    setContextData({
                        title_en: dbSettings.hero_title_en || "",
                        title_id: dbSettings.hero_title_id || "",
                        description_en: dbSettings.hero_desc_en || "",
                        description_id: dbSettings.hero_desc_id || "",
                        backgroundImage: dbSettings.hero_bg_image || "",
                        components: typeof dbSettings.hero_components === "string" ? JSON.parse(dbSettings.hero_components) : (dbSettings.hero_components || []),
                        
                        about_en: dbSettings.about_content_en || "",
                        about_id: dbSettings.about_content_id || "",
                        
                        prefooter: {
                            title1_en: dbSettings.preFooter_title1_en || "", title1_id: dbSettings.preFooter_title1_id || "",
                            title2_en: dbSettings.preFooter_title2_en || "", title2_id: dbSettings.preFooter_title2_id || "",
                            description_en: dbSettings.preFooter_desc_en || "", description_id: dbSettings.preFooter_desc_id || "",
                            backgroundImage: dbSettings.preFooter_bg || "", buttonLink: dbSettings.preFooter_btn_link || ""
                        },
                        
                        solutions: dbSolutions.map((sol: any) => ({
                            id: sol.id, title_en: sol.title_en || "", title_id: sol.title_id || "",
                            description_en: sol.description_en || "", description_id: sol.description_id || "", icon: sol.icon || ""
                        })),
                        
                        people: dbTeam.map((p: any) => ({
                            id: p.id, name: p.name || "", labelName: p.label || "",
                            title_en: p.title_en || "", title_id: p.title_id || "",
                            description_en: p.description_en || "", description_id: p.description_id || "",
                            image: p.image_url || ""
                        })),
                        
                        statistic: {
                            businesses: Number(dbSettings.statistic_businesses) || 0, provinces: Number(dbSettings.statistic_provinces) || 0,
                            areas: Number(dbSettings.statistic_areas) || 0, satisfaction: Number(dbSettings.statistic_satisfaction) || 0,
                        },
                        contact: { email: dbSettings.contact_email || "", phone: dbSettings.contact_phone || "", address: dbSettings.contact_address || "" },
                        social: typeof dbSettings.social_links === "string" ? JSON.parse(dbSettings.social_links) : (dbSettings.social_links || [])
                    });
                }
            } catch (err) {
                console.error("Gagal ambil data CMS dari Database:", err);
            }
        }

        fetchCMS();
    }, []);

    return (
        <Context.Provider value={{ contextData, setContextData }}>
            {children}
        </Context.Provider>
    )
}