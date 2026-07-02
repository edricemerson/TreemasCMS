import React, { createContext, useContext, useState, useEffect } from "react";
import type { AllDataType } from "./ContextType"; // Sesuaikan path jika berbeda

// 1. Inisialisasi State Kosong (Sudah rata/flat)
const defaultData: AllDataType = {
    title_en: "",
    title_id: "",
    description_en: "",
    description_id: "",
    backgroundImage: "",
    components: [],
    solutions: [],
    people: [],
    about_en: "",
    about_id: "",
    statistic: { businesses: 0, provinces: 0, areas: 0, satisfaction: 0 },
    contact: { email: "", phone: "", address: "" },
    prefooter: { 
        title1_en: "", title1_id: "", 
        title2_en: "", title2_id: "", 
        description_en: "", description_id: "", 
        backgroundImage: "", buttonLink: "" 
    },
    social: []
};

type ContextProps = {
    contextData: AllDataType;
    setContextData: React.Dispatch<React.SetStateAction<AllDataType>>;
    refreshData: () => Promise<void>;
};

const DataContext = createContext<ContextProps | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [contextData, setContextData] = useState<AllDataType>(defaultData);

    const refreshData = async () => {
        try {
            // Sesuaikan URL endpoint ini dengan routing backend kamu
            const response = await fetch("http://localhost:5000/api/cms/landing");
            const result = await response.json();

            if (result.success) {
                const dbSettings = result.data.settings || {};
                const dbSolutions = result.data.solutions || [];
                const dbTeam = result.data.team || [];

                // 2. Mapping Langsung Lurus dari Database ke State
                setContextData({
                    // HERO SETTINGS
                    title_en: dbSettings.hero_title_en || "",
                    title_id: dbSettings.hero_title_id || "",
                    description_en: dbSettings.hero_desc_en || "",
                    description_id: dbSettings.hero_desc_id || "",
                    backgroundImage: dbSettings.hero_bg_image || "",
                    components: typeof dbSettings.hero_components === "string" 
                        ? JSON.parse(dbSettings.hero_components) 
                        : (dbSettings.hero_components || []),

                    // ABOUT SETTINGS
                    about_en: dbSettings.about_content_en || "",
                    about_id: dbSettings.about_content_id || "",

                    // PREFOOTER SETTINGS
                    prefooter: {
                        title1_en: dbSettings.preFooter_title1_en || "",
                        title1_id: dbSettings.preFooter_title1_id || "",
                        title2_en: dbSettings.preFooter_title2_en || "",
                        title2_id: dbSettings.preFooter_title2_id || "",
                        description_en: dbSettings.preFooter_desc_en || "",
                        description_id: dbSettings.preFooter_desc_id || "",
                        backgroundImage: dbSettings.preFooter_bg || "",
                        buttonLink: dbSettings.preFooter_btn_link || ""
                    },

                    // SOLUTIONS TABLE
                    solutions: dbSolutions.map((sol: any) => ({
                        id: sol.id,
                        title_en: sol.title_en || "",
                        title_id: sol.title_id || "",
                        description_en: sol.description_en || "",
                        description_id: sol.description_id || "",
                        icon: sol.icon || ""
                    })),

                    // TEAM TABLE (Sesuai ERD, jabatannya pakai 'title')
                    people: dbTeam.map((p: any) => ({
                        id: p.id,
                        name: p.name || "",
                        labelName: p.label || "", // DB pakai 'label'
                        title_en: p.title_en || "",
                        title_id: p.title_id || "",
                        description_en: p.description_en || "",
                        description_id: p.description_id || "",
                        image: p.image_url || "" // DB pakai 'image_url', Context pakai 'image'
                    })),

                    // STATS, CONTACT, SOCIAL (Tetap sama)
                    statistic: {
                        businesses: Number(dbSettings.statistic_businesses) || 0,
                        provinces: Number(dbSettings.statistic_provinces) || 0,
                        areas: Number(dbSettings.statistic_areas) || 0,
                        satisfaction: Number(dbSettings.statistic_satisfaction) || 0,
                    },
                    contact: {
                        email: dbSettings.contact_email || "",
                        phone: dbSettings.contact_phone || "",
                        address: dbSettings.contact_address || "",
                    },
                    social: typeof dbSettings.social_links === "string" 
                        ? JSON.parse(dbSettings.social_links) 
                        : (dbSettings.social_links || [])
                });
            }
        } catch (error) {
            console.error("Gagal mengambil data CMS dari Database:", error);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <DataContext.Provider value={{ contextData, setContextData, refreshData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a ContextProvider");
    }
    return context;
};