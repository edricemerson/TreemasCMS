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

function WebsiteContent() {
    const heroRef = useRef<any>(null)
    const solutionRef = useRef<any>(null)
    const peopleRef = useRef<any>(null)
    const aboutRef = useRef<any>(null)
    const contactRef = useRef<any>(null)
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
        const isSocialValid = socialRef.current?.validate()

        if (
            isHeroValid &&
            isSolutionValid &&
            isPeopleValid &&
            isAboutValid &&
            isContactValid &&
            isSocialValid
        ) {
            try {
                const headers = { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                };

                const teamPayload = {
                    team: contextData.people.map((person, i) => ({
                        name: person.name,
                        title: person.position,
                        description: "",
                        image_base64: person.image,
                        display_order: i + 1
                    }))
                };

                const resTeam = await fetch("http://localhost:3000/api/cms/team/sync", {
                    method: "POST",
                    headers,
                    body: JSON.stringify(teamPayload)
                });
                if (resTeam.status === 401) return handleSessionExpired();

                const solPayload = {
                    solutions: contextData.solutions.map((sol, i) => ({
                        title: sol.title || "",
                        description: sol.description || "",
                        image_base64: sol.image || "",
                        display_order: i + 1
                    }))
                };

                const resSol = await fetch("http://localhost:3000/api/cms/solutions/sync", {
                    method: "POST",
                    headers,
                    body: JSON.stringify(solPayload)
                });
                if (resSol.status === 401) return handleSessionExpired();

                const settingsPayload = {
                    updates: {
                        hero_title: contextData.title,
                        hero_desc: contextData.description,
                        hero_bg_image: contextData.backgroundImage,
                        hero_components: JSON.stringify(contextData.components),

                        about_content: contextData.about,

                        statistic_businesses: contextData.statistic.businesses,
                        statistic_provinces: contextData.statistic.provinces,
                        statistic_areas: contextData.statistic.areas,
                        statistic_satisfaction: contextData.statistic.satisfaction,

                        contact_email: contextData.contact.email,
                        contact_phone: contextData.contact.phone,
                        contact_address: contextData.contact.address,

                        social_linkedin: contextData.social.linkedin,
                        social_instagram: contextData.social.instagram,
                        social_x: contextData.social.twitter
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
            <SocialForm ref={socialRef} />

            <BottomDraftPublishButton onPublish={handlePublish} />
        </div>
    )
}

export default WebsiteContent