import Button from "../../Button"
import ImageUploadSolutionPeople from "../component/ImageUploadSolutionPeople"
import { useData } from "../DataStruct/Context"
import { useState, forwardRef, useImperativeHandle } from "react"

const PeopleForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleAddPerson = () => {
        if (contextData.people.length >= 3) return

        setContextData({
            ...contextData,
            people: [
                ...contextData.people,
                {
                    id: crypto.randomUUID(),
                    labelName: "",
                    name: "",
                    title_en: "", // Sesuai kolom database ERD
                    title_id: "",
                    image: "",
                    description_en: "",
                    description_id: "",
                },
            ],
        })
    }

    const handleDeletePerson = (id: string) => {
        setContextData({
            ...contextData,
            people: contextData.people.filter(p => p.id !== id),
        })
    }

    const validatePeople = () => {
        const newErrors: Record<string, string> = {}
        let firstErrorKey: string | null = null

        const setFirst = (key: string) => {
            if (!firstErrorKey) firstErrorKey = key
        }

        contextData.people.forEach((person, index) => {
            const name = (person.name || "").trim();
            const label = (person.labelName || "").trim();
            const title_en = (person.title_en || "").trim();
            const title_id = (person.title_id || "").trim();
            const desc_en = (person.description_en || "").trim();
            const desc_id = (person.description_id || "").trim();

            if (!person.image) {
                const key = `personImage-${index}`
                newErrors[key] = "Person image is required"
                setFirst(key)
            }

            if (!label) {
                const key = `personLabel-${index}`
                newErrors[key] = "Person label is required"
                setFirst(key)
            }

            if (!name) {
                const key = `personName-${index}`
                newErrors[key] = "Person name is required"
                setFirst(key)
            }

            // Validasi Bilingual: Title (Jabatan)
            if (!title_en) {
                const key = `personTitleEn-${index}`
                newErrors[key] = "EN Position/Title is required"
                setFirst(key)
            }
            if (!title_id) {
                const key = `personTitleId-${index}`
                newErrors[key] = "ID Position/Title is required"
                setFirst(key)
            }

            // Validasi Bilingual: Description
            if (!desc_en) {
                const key = `personDescEn-${index}`
                newErrors[key] = "EN Description is required"
                setFirst(key)
            }
            if (!desc_id) {
                const key = `personDescId-${index}`
                newErrors[key] = "ID Description is required"
                setFirst(key)
            }
        })

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
        validate: validatePeople,
    }))

    return (
        <div className="bg-white rounded-2xl p-6 mt-6 border">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-semibold">People Section</h2>

                <Button
                    type="button"
                    onClick={handleAddPerson}
                    disabled={contextData.people.length >= 3}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition
                        ${contextData.people.length >= 3
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#0B0B23] hover:bg-[#1a1a3a]"}
                    `}
                >
                    Add Person
                </Button>
            </div>

            <div className="flex flex-col gap-6">
                {contextData.people.map((person, index) => (
                    <div key={person.id} className="border rounded-2xl p-4 bg-gray-50">

                        <div className="flex justify-between items-center mb-4">
                            <p className="font-semibold text-gray-700 text-sm">
                                Person {index + 1}
                            </p>

                            <Button
                                type="button"
                                onClick={() => handleDeletePerson(person.id)}
                                className="text-red-500"
                            >
                                Delete
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* KIRI: UPLOAD GAMBAR */}
                            <div data-error={`personImage-${index}`}>
                                <label className="font-semibold block mb-2 text-sm text-gray-700">
                                    Image
                                </label>

                                <ImageUploadSolutionPeople
                                    value={person.image}
                                    onChangeImage={(img) => {
                                        const updated = [...contextData.people]
                                        updated[index].image = img || ""
                                        setContextData({ ...contextData, people: updated })

                                        if (img) {
                                            setErrors(prev => {
                                                const key = `personImage-${index}`
                                                if (!prev[key]) return prev
                                                const updatedErr = { ...prev }
                                                delete updatedErr[key]
                                                return updatedErr
                                            })
                                        }
                                    }}
                                />

                                {errors[`personImage-${index}`] && (
                                    <p className="text-red-500 text-xs mt-2">
                                        {errors[`personImage-${index}`]}
                                    </p>
                                )}
                            </div>

                            {/* KANAN: FORM TEKS */}
                            <div className="flex flex-col gap-3">

                                {/* LABEL & NAMA (1 Baris, 2 Kolom) */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div data-error={`personLabel-${index}`}>
                                        <label className="font-semibold block mb-1 text-xs text-gray-700">Label</label>
                                        <input
                                            type="text"
                                            value={person.labelName || ""}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const updated = [...contextData.people]
                                                updated[index].labelName = value
                                                setContextData({ ...contextData, people: updated })

                                                if (value.trim()) {
                                                    setErrors(prev => {
                                                        const key = `personLabel-${index}`
                                                        if (!prev[key]) return prev
                                                        const updatedErr = { ...prev }
                                                        delete updatedErr[key]
                                                        return updatedErr
                                                    })
                                                }
                                            }}
                                            className={`w-full bg-white border rounded-xl px-3 py-2 text-sm
                                            ${errors[`personLabel-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"} focus:outline-none focus:ring-2`}
                                        />
                                        {errors[`personLabel-${index}`] && <p className="text-red-500 text-[10px] mt-1">{errors[`personLabel-${index}`]}</p>}
                                    </div>

                                    <div data-error={`personName-${index}`}>
                                        <label className="font-semibold block mb-1 text-xs text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            value={person.name}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const updated = [...contextData.people]
                                                updated[index].name = value
                                                setContextData({ ...contextData, people: updated })

                                                if (value.trim()) {
                                                    setErrors(prev => {
                                                        const key = `personName-${index}`
                                                        if (!prev[key]) return prev
                                                        const updatedErr = { ...prev }
                                                        delete updatedErr[key]
                                                        return updatedErr
                                                    })
                                                }
                                            }}
                                            className={`w-full bg-white border rounded-xl px-3 py-2 text-sm
                                            ${errors[`personName-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"} focus:outline-none focus:ring-2`}
                                        />
                                        {errors[`personName-${index}`] && <p className="text-red-500 text-[10px] mt-1">{errors[`personName-${index}`]}</p>}
                                    </div>
                                </div>

                                {/* BILINGUAL TITLE/POSITION */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div data-error={`personTitleEn-${index}`}>
                                        <label className="font-semibold block mb-1 text-[11px] text-gray-700">Position (EN) 🇬🇧</label>
                                        <input
                                            type="text"
                                            value={person.title_en || ""}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const updated = [...contextData.people]
                                                updated[index].title_en = value
                                                setContextData({ ...contextData, people: updated })

                                                if (value.trim()) {
                                                    setErrors(prev => {
                                                        const key = `personTitleEn-${index}`
                                                        if (!prev[key]) return prev
                                                        const updatedErr = { ...prev }
                                                        delete updatedErr[key]
                                                        return updatedErr
                                                    })
                                                }
                                            }}
                                            className={`w-full bg-white border rounded-xl px-3 py-2 text-sm
                                            ${errors[`personTitleEn-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"} focus:outline-none focus:ring-2`}
                                        />
                                        {errors[`personTitleEn-${index}`] && <p className="text-red-500 text-[10px] mt-1">{errors[`personTitleEn-${index}`]}</p>}
                                    </div>

                                    <div data-error={`personTitleId-${index}`}>
                                        <label className="font-semibold block mb-1 text-[11px] text-gray-700">Position (ID) 🇮🇩</label>
                                        <input
                                            type="text"
                                            value={person.title_id || ""}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const updated = [...contextData.people]
                                                updated[index].title_id = value
                                                setContextData({ ...contextData, people: updated })

                                                if (value.trim()) {
                                                    setErrors(prev => {
                                                        const key = `personTitleId-${index}`
                                                        if (!prev[key]) return prev
                                                        const updatedErr = { ...prev }
                                                        delete updatedErr[key]
                                                        return updatedErr
                                                    })
                                                }
                                            }}
                                            className={`w-full bg-white border rounded-xl px-3 py-2 text-sm
                                            ${errors[`personTitleId-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"} focus:outline-none focus:ring-2`}
                                        />
                                        {errors[`personTitleId-${index}`] && <p className="text-red-500 text-[10px] mt-1">{errors[`personTitleId-${index}`]}</p>}
                                    </div>
                                </div>

                                {/* BILINGUAL DESCRIPTION */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div data-error={`personDescEn-${index}`}>
                                        <label className="font-semibold block mb-1 text-[11px] text-gray-700">Description (EN) 🇬🇧</label>
                                        <textarea
                                            rows={3}
                                            value={person.description_en || ""}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const updated = [...contextData.people]
                                                updated[index].description_en = value
                                                setContextData({ ...contextData, people: updated })

                                                if (value.trim()) {
                                                    setErrors(prev => {
                                                        const key = `personDescEn-${index}`
                                                        if (!prev[key]) return prev
                                                        const updatedErr = { ...prev }
                                                        delete updatedErr[key]
                                                        return updatedErr
                                                    })
                                                }
                                            }}
                                            className={`w-full bg-white border rounded-xl px-3 py-2 text-sm resize-none
                                            ${errors[`personDescEn-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"} focus:outline-none focus:ring-2`}
                                        />
                                        {errors[`personDescEn-${index}`] && <p className="text-red-500 text-[10px] mt-1">{errors[`personDescEn-${index}`]}</p>}
                                    </div>

                                    <div data-error={`personDescId-${index}`}>
                                        <label className="font-semibold block mb-1 text-[11px] text-gray-700">Description (ID) 🇮🇩</label>
                                        <textarea
                                            rows={3}
                                            value={person.description_id || ""}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const updated = [...contextData.people]
                                                updated[index].description_id = value
                                                setContextData({ ...contextData, people: updated })

                                                if (value.trim()) {
                                                    setErrors(prev => {
                                                        const key = `personDescId-${index}`
                                                        if (!prev[key]) return prev
                                                        const updatedErr = { ...prev }
                                                        delete updatedErr[key]
                                                        return updatedErr
                                                    })
                                                }
                                            }}
                                            className={`w-full bg-white border rounded-xl px-3 py-2 text-sm resize-none
                                            ${errors[`personDescId-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"} focus:outline-none focus:ring-2`}
                                        />
                                        {errors[`personDescId-${index}`] && <p className="text-red-500 text-[10px] mt-1">{errors[`personDescId-${index}`]}</p>}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
})

export default PeopleForm