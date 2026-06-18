import { useData } from "../DataStruct/Context"
import StatisticsSection from "../component/StatisticsSection"
import { useState, forwardRef, useImperativeHandle } from "react"

const AboutForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()
    const [errors, setErrors] = useState<Record<string, string>>({})
    
    const validateAbout = () => {
        const newErrors: Record<string, string> = {}
        let firstErrorKey: string | null = null

        const setFirst = (key: string) => {
            if (!firstErrorKey) firstErrorKey = key
        }

        // Validasi Bilingual Lurus
        if (!contextData.about_en?.trim()) {
            newErrors["about-en"] = "EN About content is required"
            setFirst("about-en")
        }
        if (!contextData.about_id?.trim()) {
            newErrors["about-id"] = "ID About content is required"
            setFirst("about-id")
        }

        setErrors(newErrors)

        if (firstErrorKey) {
            const element = document.querySelector(
                `[data-error="${firstErrorKey}"]`
            )
            element?.scrollIntoView({ behavior: "smooth", block: "center" })
        }

        return Object.keys(newErrors).length === 0
    }

    useImperativeHandle(ref, () => ({
        validate: validateAbout,
    }))

    return (
        <>
            <div className="bg-white rounded-2xl p-6 mt-6 border mb-6">
                <h2 className="font-semibold mb-6">About Section</h2>

                {/* BILINGUAL: ABOUT CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    
                    {/* ENGLISH */}
                    <div data-error="about-en">
                        <label className="block font-semibold mb-2 text-sm text-gray-700">
                            Content (EN) 🇬🇧
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Write about your company in English..."
                            value={contextData.about_en || ""}
                            onChange={(e) => {
                                const value = e.target.value
                                setContextData({ ...contextData, about_en: value })

                                if (value.trim()) {
                                    setErrors(prev => {
                                        if (!prev["about-en"]) return prev
                                        const updated = { ...prev }
                                        delete updated["about-en"]
                                        return updated
                                    })
                                }
                            }}
                            className={`w-full bg-gray-100 rounded-xl p-4 resize-none text-sm border 
                            ${errors["about-en"] 
                                ? "border-red-500 focus:ring-red-500" 
                                : "border-gray-300 focus:ring-teal-500"} 
                            focus:outline-none focus:ring-2`}
                        />
                        {errors["about-en"] && (
                            <p className="text-red-500 text-xs mt-2">{errors["about-en"]}</p>
                        )}
                    </div>

                    {/* INDONESIAN */}
                    <div data-error="about-id">
                        <label className="block font-semibold mb-2 text-sm text-gray-700">
                            Content (ID) 🇮🇩
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Tulis tentang perusahaan Anda dalam Bahasa Indonesia..."
                            value={contextData.about_id || ""}
                            onChange={(e) => {
                                const value = e.target.value
                                setContextData({ ...contextData, about_id: value })

                                if (value.trim()) {
                                    setErrors(prev => {
                                        if (!prev["about-id"]) return prev
                                        const updated = { ...prev }
                                        delete updated["about-id"]
                                        return updated
                                    })
                                }
                            }}
                            className={`w-full bg-gray-100 rounded-xl p-4 resize-none text-sm border 
                            ${errors["about-id"] 
                                ? "border-red-500 focus:ring-red-500" 
                                : "border-gray-300 focus:ring-teal-500"} 
                            focus:outline-none focus:ring-2`}
                        />
                        {errors["about-id"] && (
                            <p className="text-red-500 text-xs mt-2">{errors["about-id"]}</p>
                        )}
                    </div>

                </div>

                <p className="text-gray-500 text-sm">
                    Rich text editor would go here in production
                </p>
            </div>

            {/* Komponen statistik di bawahnya tetap aman tidak tersentuh */}
            <StatisticsSection />
        </>
    )
})

export default AboutForm