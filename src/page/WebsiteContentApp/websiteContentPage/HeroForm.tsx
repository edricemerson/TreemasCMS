import { useState, forwardRef, useImperativeHandle } from "react"
import { useData } from "../DataStruct/Context"
import Button from "../../Button"
import ImageUploadHero from "../component/ImageUploadSolutionPeople" 

const HeroForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateHero = () => {
        const newErrors: Record<string, string> = {}
        let firstErrorKey: string | null = null

        const setFirst = (key: string) => {
            if (!firstErrorKey) firstErrorKey = key
        }

        // Validasi Hero Utama (Bilingual)
        if (!contextData.title_en?.trim()) {
            newErrors["heroTitle-en"] = "EN Hero title is required"
            setFirst("heroTitle-en")
        }
        if (!contextData.title_id?.trim()) {
            newErrors["heroTitle-id"] = "ID Hero title is required"
            setFirst("heroTitle-id")
        }
        
        if (!contextData.description_en?.trim()) {
            newErrors["heroDesc-en"] = "EN Hero description is required"
            setFirst("heroDesc-en")
        }
        if (!contextData.description_id?.trim()) {
            newErrors["heroDesc-id"] = "ID Hero description is required"
            setFirst("heroDesc-id")
        }

        if (!contextData.backgroundImage) {
            newErrors["heroBg"] = "Hero background image is required"
            setFirst("heroBg")
        }

        // Validasi Hero Components (Bilingual Label + Icon)
        contextData.components.forEach((comp, index) => {
            if (!comp.label_en?.trim()) {
                newErrors[`compLabel-en-${index}`] = "EN Component label is required"
                setFirst(`compLabel-en-${index}`)
            }
            if (!comp.label_id?.trim()) {
                newErrors[`compLabel-id-${index}`] = "ID Component label is required"
                setFirst(`compLabel-id-${index}`)
            }
            if (!comp.icon?.trim()) {
                newErrors[`compIcon-${index}`] = "Component icon is required"
                setFirst(`compIcon-${index}`)
            }
        })

        setErrors(newErrors)

        if (firstErrorKey) {
            const element = document.querySelector(`[data-error="${firstErrorKey}"]`)
            element?.scrollIntoView({ behavior: "smooth", block: "center" })
        }

        return Object.keys(newErrors).length === 0
    }

    useImperativeHandle(ref, () => ({
        validate: validateHero,
    }))

    const handleAddComponent = () => {
        if (contextData.components.length >= 4) return
        setContextData({
            ...contextData,
            components: [
                ...contextData.components,
                // Menggunakan label_en dan label_id
                { id: crypto.randomUUID(), label_en: "", label_id: "", icon: "" }
            ]
        })
    }

    const handleRemoveComponent = (indexToRemove: number) => {
        setContextData({
            ...contextData,
            components: contextData.components.filter((_, idx) => idx !== indexToRemove)
        })
    }

    return (
        <div className="bg-white rounded-2xl p-6 mt-6 border">
            <h2 className="text-base font-semibold mb-6">Hero Section</h2>

            {/* --- HERO MAIN SECTION --- */}
            <div className="flex flex-col gap-4 mb-8 border-b pb-8">
                
                {/* BILINGUAL: TITLE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div data-error="heroTitle-en">
                        <label className="font-semibold block mb-2 text-sm text-gray-700">Hero Title (EN) 🇬🇧</label>
                        <input
                            type="text"
                            value={contextData.title_en || ""}
                            onChange={(e) => {
                                setContextData({ ...contextData, title_en: e.target.value })
                                if (e.target.value.trim()) {
                                    const newErr = { ...errors }
                                    delete newErr["heroTitle-en"]
                                    setErrors(newErr)
                                }
                            }}
                            className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${errors["heroTitle-en"] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}`}
                        />
                        {errors["heroTitle-en"] && <p className="text-red-500 text-xs mt-1">{errors["heroTitle-en"]}</p>}
                    </div>

                    <div data-error="heroTitle-id">
                        <label className="font-semibold block mb-2 text-sm text-gray-700">Hero Title (ID) 🇮🇩</label>
                        <input
                            type="text"
                            value={contextData.title_id || ""}
                            onChange={(e) => {
                                setContextData({ ...contextData, title_id: e.target.value })
                                if (e.target.value.trim()) {
                                    const newErr = { ...errors }
                                    delete newErr["heroTitle-id"]
                                    setErrors(newErr)
                                }
                            }}
                            className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${errors["heroTitle-id"] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}`}
                        />
                        {errors["heroTitle-id"] && <p className="text-red-500 text-xs mt-1">{errors["heroTitle-id"]}</p>}
                    </div>
                </div>

                {/* BILINGUAL: DESCRIPTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div data-error="heroDesc-en">
                        <label className="font-semibold block mb-2 text-sm text-gray-700">Hero Description (EN) 🇬🇧</label>
                        <textarea
                            rows={3}
                            value={contextData.description_en || ""}
                            onChange={(e) => {
                                setContextData({ ...contextData, description_en: e.target.value })
                                if (e.target.value.trim()) {
                                    const newErr = { ...errors }
                                    delete newErr["heroDesc-en"]
                                    setErrors(newErr)
                                }
                            }}
                            className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 ${errors["heroDesc-en"] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}`}
                        />
                        {errors["heroDesc-en"] && <p className="text-red-500 text-xs mt-1">{errors["heroDesc-en"]}</p>}
                    </div>

                    <div data-error="heroDesc-id">
                        <label className="font-semibold block mb-2 text-sm text-gray-700">Hero Description (ID) 🇮🇩</label>
                        <textarea
                            rows={3}
                            value={contextData.description_id || ""}
                            onChange={(e) => {
                                setContextData({ ...contextData, description_id: e.target.value })
                                if (e.target.value.trim()) {
                                    const newErr = { ...errors }
                                    delete newErr["heroDesc-id"]
                                    setErrors(newErr)
                                }
                            }}
                            className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 ${errors["heroDesc-id"] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}`}
                        />
                        {errors["heroDesc-id"] && <p className="text-red-500 text-xs mt-1">{errors["heroDesc-id"]}</p>}
                    </div>
                </div>

                {/* BACKGROUND IMAGE (Tetap 1 kolom) */}
                <div data-error="heroBg">
                    <label className="font-semibold block mb-2 text-sm text-gray-700">Background Image</label>
                    <ImageUploadHero 
                        value={contextData.backgroundImage}
                        onChangeImage={(img) => {
                            setContextData({ ...contextData, backgroundImage: img || "" })
                            if (img) {
                                const newErr = { ...errors }
                                delete newErr["heroBg"]
                                setErrors(newErr)
                            }
                        }}
                    />
                    {errors["heroBg"] && <p className="text-red-500 text-xs mt-1">{errors["heroBg"]}</p>}
                </div>
            </div>

            {/* --- HERO COMPONENTS SECTION --- */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sm text-gray-700">Hero Components</h3>
                <Button
                    type="button"
                    onClick={handleAddComponent}
                    disabled={contextData.components.length >= 4}
                    className={`text-xs px-4 py-2 rounded-xl text-white transition ${
                        contextData.components.length >= 4 ? "bg-gray-300 cursor-not-allowed" : "bg-[#0B0B23] hover:bg-[#1a1a3a]"
                    }`}
                >
                    Add Component
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {contextData.components.map((comp, index) => (
                    <div key={comp.id} className="border rounded-2xl p-4 bg-gray-50 flex flex-col gap-3 relative">
                        
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-xs text-gray-500">Component {index + 1}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveComponent(index)}
                                className="text-red-500 hover:text-red-700 font-medium text-xs transition"
                            >
                                Remove
                            </button>
                        </div>

                        {/* BILINGUAL LABEL COMPONENTS */}
                        <div className="grid grid-cols-2 gap-2">
                            <div data-error={`compLabel-en-${index}`}>
                                <label className="font-semibold block mb-1 text-[11px] text-gray-700">Label (EN) 🇬🇧</label>
                                <input
                                    type="text"
                                    value={comp.label_en || ""}
                                    placeholder="e.g. Trusted"
                                    onChange={(e) => {
                                        const value = e.target.value
                                        const updated = [...contextData.components]
                                        updated[index].label_en = value
                                        setContextData({ ...contextData, components: updated })
                                        
                                        if (value.trim()) {
                                            const newErr = { ...errors }
                                            delete newErr[`compLabel-en-${index}`]
                                            setErrors(newErr)
                                        }
                                    }}
                                    className={`w-full bg-white border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 ${errors[`compLabel-en-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}`}
                                />
                            </div>

                            <div data-error={`compLabel-id-${index}`}>
                                <label className="font-semibold block mb-1 text-[11px] text-gray-700">Label (ID) 🇮🇩</label>
                                <input
                                    type="text"
                                    value={comp.label_id || ""}
                                    placeholder="misal: Terpercaya"
                                    onChange={(e) => {
                                        const value = e.target.value
                                        const updated = [...contextData.components]
                                        updated[index].label_id = value
                                        setContextData({ ...contextData, components: updated })
                                        
                                        if (value.trim()) {
                                            const newErr = { ...errors }
                                            delete newErr[`compLabel-id-${index}`]
                                            setErrors(newErr)
                                        }
                                    }}
                                    className={`w-full bg-white border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 ${errors[`compLabel-id-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}`}
                                />
                            </div>
                        </div>

                        {/* ICON (Tetap 1 kolom, berlaku untuk dua bahasa) */}
                        <div data-error={`compIcon-${index}`}>
                            <label className="font-semibold block mb-1 text-xs text-gray-700">Icon Name</label>
                            <input
                                type="text"
                                value={comp.icon || ""}
                                placeholder="e.g. FaShieldAlt"
                                onChange={(e) => {
                                    const value = e.target.value
                                    const updated = [...contextData.components]
                                    updated[index].icon = value
                                    setContextData({ ...contextData, components: updated })

                                    if (value.trim()) {
                                        const newErr = { ...errors }
                                        delete newErr[`compIcon-${index}`]
                                        setErrors(newErr)
                                    }
                                }}
                                className={`w-full bg-white border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 ${errors[`compIcon-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}`}
                            />
                            {errors[`compIcon-${index}`] && <p className="text-red-500 text-[10px] mt-1">{errors[`compIcon-${index}`]}</p>}
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
})

export default HeroForm