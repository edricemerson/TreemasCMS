import { useRef } from "react"

import TitleDraftPublishButton from "./websiteContentPage/TitleDraftPublishButton"
import HeroForm from "./websiteContentPage/HeroForm"
import SolutionForm from "./websiteContentPage/SolutionForm"
import PeopleForm from "./websiteContentPage/PeopleForm"
import AboutForm from "./websiteContentPage/AboutForm"
import ContactForm from "./websiteContentPage/ContactForm"
import SocialForm from "./websiteContentPage/SocialForm"
import BottomDraftPublishButton from "./websiteContentPage/BottomDraftPublishButton"
import { useData } from "./DataStruct/Context"
import PrefooterForm from "./websiteContentPage/PreFooterForm"

function WebsiteContent() {
    const heroRef = useRef<any>(null)
    const solutionRef = useRef<any>(null)
    const peopleRef = useRef<any>(null)
    const aboutRef = useRef<any>(null)
    const contactRef = useRef<any>(null)
    const prefooterRef = useRef<any>(null)
    const socialRef = useRef<any>(null)
    
    const { contextData } = useData();

    const handleSessionExpired = () => {
        alert("Session expired please relog");
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const handlePublish = async () => {
        const isHeroValid = heroRef.current?.validate()
        const isSolutionValid = solutionRef.current?.validate()
        const isPeopleValid = peopleRef.current?.validate()
        const isAboutValid = aboutRef.current?.validate()
        const isContactValid = contactRef.current?.validate()
        const isPrefooterValid = prefooterRef.current?.validate()
        const isSocialValid = socialRef.current?.validate()

        console.log("Status Validasi:", {
            Hero: isHeroValid,
            Solution: isSolutionValid,
            People: isPeopleValid,
            About: isAboutValid,
            Contact: isContactValid,
            Prefooter: isPrefooterValid,
            Social: isSocialValid
        });

        if (
            isHeroValid &&
            isSolutionValid &&
            isPeopleValid &&
            isAboutValid &&
            isContactValid &&
            isPrefooterValid &&
            isSocialValid
        ) {
            try {
                const headers = { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                };

                // 🔴 PERUBAHAN 1: PAYLOAD TEAM
                const teamPayload = {
                    team: contextData.people.map((person, i) => ({
                        name: person.name || "",
                        // Backend meminta parameter position_en dan position_id
                        position_en: person.title_en || "",    
                        position_id: person.title_id || "", 
                        labelName: person.labelName || "",  
                        description_en: person.description_en || "", 
                        description_id: person.description_id || "", 
                        image_base64: person.image || "",
                        display_order: i + 1
                    }))
                };

                const resTeam = await fetch("http://localhost:3000/api/cms/team/sync", {
                    method: "POST",
                    headers,
                    body: JSON.stringify(teamPayload)
                });
                if (resTeam.status === 401) return handleSessionExpired();

                // 🔴 PERUBAHAN 2: PAYLOAD SOLUTIONS
                const solPayload = {
                    solutions: contextData.solutions.map((sol, i) => ({
                        title_en: sol.title_en || "",
                        title_id: sol.title_id || "",
                        description_en: sol.description_en || "",
                        description_id: sol.description_id || "",
                        display_order: i + 1,
                        icon: sol.icon || ""
                    }))
                };

                const resSol = await fetch("http://localhost:3000/api/cms/solutions/sync", {
                    method: "POST",
                    headers,
                    body: JSON.stringify(solPayload)
                });
                if (resSol.status === 401) return handleSessionExpired();

                // 🔴 PERUBAHAN 3: PAYLOAD SETTINGS
                const settingsPayload = {
                    updates: {
                        // Hero
                        hero_title_en: contextData.title_en,
                        hero_title_id: contextData.title_id,
                        hero_desc_en: contextData.description_en,
                        hero_desc_id: contextData.description_id,
                        hero_bg_image: contextData.backgroundImage,
                        hero_components: JSON.stringify(contextData.components),
                        
                        // Prefooter
                        preFooter_title1_en: contextData.prefooter.title1_en,
                        preFooter_title1_id: contextData.prefooter.title1_id,
                        preFooter_title2_en: contextData.prefooter.title2_en,
                        preFooter_title2_id: contextData.prefooter.title2_id,
                        preFooter_desc_en: contextData.prefooter.description_en,
                        preFooter_desc_id: contextData.prefooter.description_id,
                        preFooter_bg: contextData.prefooter.backgroundImage,
                        preFooter_btn_link: contextData.prefooter.buttonLink,
                       
                        // About
                        about_content_en: contextData.about_en,
                        about_content_id: contextData.about_id,

                        // Statistic
                        statistic_businesses: contextData.statistic.businesses,
                        statistic_provinces: contextData.statistic.provinces,
                        statistic_areas: contextData.statistic.areas,
                        statistic_satisfaction: contextData.statistic.satisfaction,

                        // Contact
                        contact_email: contextData.contact.email,
                        contact_phone: contextData.contact.phone,
                        contact_address: contextData.contact.address,

                        // Social
                        social_links: JSON.stringify(contextData.social)
                    }
                };

                const resSettings = await fetch("http://localhost:3000/api/cms/settings", {
                    method: "PUT",
                    headers,
                    body: JSON.stringify(settingsPayload)
                });
                if (resSettings.status === 401) return handleSessionExpired();

                alert("Data published to DB successfully!");
                window.location.href = "/home"; 

            } catch (error) {
                console.error("failed publishing to db", error);
                alert("Failed saving data to server. Check console.");
            }
        } else {
            alert('failed to publish, form filled incorrectly');
        }
    }

    return (
        <div className="ml-64 bg-gray-50 p-8 min-h-screen">
            <TitleDraftPublishButton onPublish={handlePublish} />

            <HeroForm ref={heroRef} />
            <SolutionForm ref={solutionRef} />
            <PeopleForm ref={peopleRef} />
            <AboutForm ref={aboutRef} />
            <ContactForm ref={contactRef} />
            <PrefooterForm ref={prefooterRef} />
            <SocialForm ref={socialRef} />

            <BottomDraftPublishButton onPublish={handlePublish} />
        </div>
    )
}

export default WebsiteContent