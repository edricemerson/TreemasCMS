import ImageUploadHero from "../component/ImageUploadHero"
import ImageUploadComponent from "../component/ImageUploadComponent"
import { useData } from "../DataStruct/Context"
import { useState, forwardRef, useImperativeHandle } from "react"

const HeroForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()
    const [errors, setErrors] = useState<Record<string, string>>({})

    /* ------------------ COMPONENT HANDLERS ------------------ */

    const handleAddComponent = () => {
        if (contextData.components.length >= 4) return

        setContextData({
            ...contextData,
            components: [
                ...contextData.components,
                {
                    id: crypto.randomUUID(),
                    label: "",
                    image: "",
                },
            ],
        })
    }

    const handleDeleteComponent = (id: string) => {
        setContextData({
            ...contextData,
            components: contextData.components.filter(c => c.id !== id),
        })
    }

    /* ------------------ VALIDATION ------------------ */

    const validateHero = () => {
        const newErrors: Record<string, string> = {}
        let firstErrorKey: string | null = null

        const setFirst = (key: string) => {
            if (!firstErrorKey) firstErrorKey = key
        }

        if (!contextData.title.trim()) {
            newErrors.title = "Hero title is required"
            setFirst("title")
        }

        if (!contextData.description.trim()) {
            newErrors.description = "Hero description is required"
            setFirst("description")
        }

        if (!contextData.backgroundImage) {
            newErrors.backgroundImage = "Background image is required"
            setFirst("backgroundImage")
        }

        contextData.components.forEach((comp, index) => {
            if (!comp.label.trim()) {
                newErrors[`componentLabel-${index}`] =
                    "Component label is required"
                setFirst(`componentLabel-${index}`)
            }

            if (!comp.image) {
                newErrors[`componentImage-${index}`] =
                    "Component image is required"
                setFirst(`componentImage-${index}`)
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

    /* 🔥 EXPOSE VALIDATE TO PARENT */
    useImperativeHandle(ref, () => ({
        validate: validateHero,
    }))

    /* ------------------ UI ------------------ */

    return (
        <div className="min-w-5xl flex flex-col bg-white mt-5 rounded-2xl border">
            <form className="p-4">
                <p className="font-semibold mb-4">Hero Section</p>

                {/* HERO TITLE */}
                <div data-error="title" className="mb-4">
                    <label className="text-sm font-semibold block mb-1">
                        Hero Title
                    </label>

                    <input
                        type="text"
                        value={contextData.title}
                        onChange={(e) => {
                            const value = e.target.value

                            setContextData({ ...contextData, title: value })

                            if (value.trim().length > 0) {
                                setErrors(prev => {
                                    if (!prev.title) return prev
                                    const updated = { ...prev }
                                    delete updated.title
                                    return updated
                                })
                            }
                        }}
                        className={`w-full bg-gray-100 border rounded-xl p-2 text-sm
                        ${errors.title
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-teal-500"}
                        focus:outline-none focus:ring-2`}
                    />

                    {errors.title && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* HERO DESCRIPTION */}
                <div data-error="description" className="mb-4">
                    <label className="text-sm font-semibold block mb-1">
                        Hero Description
                    </label>

                    <textarea
                        rows={2}
                        value={contextData.description}
                        onChange={(e) => {
                            const value = e.target.value

                            setContextData({ ...contextData, description: value })

                            if (value.trim().length > 0) {
                                setErrors(prev => {
                                    if (!prev.description) return prev
                                    const updated = { ...prev }
                                    delete updated.description
                                    return updated
                                })
                            }
                        }}
                        className={`w-full bg-gray-100 border rounded-xl p-2 text-sm
                        ${errors.description
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-teal-500"}
                        focus:outline-none focus:ring-2`}
                    />

                    {errors.description && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* BACKGROUND IMAGE */}
                <div data-error="backgroundImage" className="mb-6">
                    <ImageUploadHero
                        title="Background Image"
                        value={contextData.backgroundImage}
                        showRemove
                        onChangeImage={(img) => {
                            setContextData({
                                ...contextData,
                                backgroundImage: img || "",
                            })

                            if (img) {
                                setErrors(prev => {
                                    if (!prev.backgroundImage) return prev
                                    const updated = { ...prev }
                                    delete updated.backgroundImage
                                    return updated
                                })
                            }
                        }}
                    />

                    {errors.backgroundImage && (
                        <p className="text-red-500 text-xs mt-2">
                            {errors.backgroundImage}
                        </p>
                    )}
                </div>

                {/* COMPONENTS */}
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold">
                            Hero Components
                        </h3>

                        <button
                            type="button"
                            onClick={handleAddComponent}
                            disabled={contextData.components.length >= 4}
                            className={`flex items-center gap-2 px-3 py-1 text-sm rounded-lg text-white transition font-semibold
                            ${contextData.components.length >= 4
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-[#0B0B23] hover:bg-[#1a1a3a]"}`}
                        >
                            Add Component
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        {contextData.components.map((item, index) => (
                            <div key={item.id} className="relative">

                                <button
                                    type="button"
                                    onClick={() => handleDeleteComponent(item.id)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md"
                                >
                                    ✕
                                </button>

                                <label className="text-sm font-semibold block mb-1">
                                    Component {index + 1}
                                </label>

                                <div data-error={`componentLabel-${index}`}>
                                    <input
                                        type="text"
                                        value={item.label}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const updatedComponents = [...contextData.components]
                                            updatedComponents[index].label = value

                                            setContextData({
                                                ...contextData,
                                                components: updatedComponents,
                                            })

                                            if (value.trim().length > 0) {
                                                setErrors(prev => {
                                                    const key = `componentLabel-${index}`
                                                    if (!prev[key]) return prev
                                                    const updated = { ...prev }
                                                    delete updated[key]
                                                    return updated
                                                })
                                            }
                                        }}
                                        className={`w-full bg-gray-100 border rounded-xl p-2 text-sm mb-1
                                        ${errors[`componentLabel-${index}`]
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-teal-500"}
                                        focus:outline-none focus:ring-2`}
                                    />

                                    {errors[`componentLabel-${index}`] && (
                                        <p className="text-red-500 text-xs mb-2">
                                            {errors[`componentLabel-${index}`]}
                                        </p>
                                    )}
                                </div>

                                <div data-error={`componentImage-${index}`}>
                                    <ImageUploadComponent
                                        value={item.image}
                                        onChangeImage={(img) => {
                                            const updatedComponents = [...contextData.components]
                                            updatedComponents[index].image = img || ""

                                            setContextData({
                                                ...contextData,
                                                components: updatedComponents,
                                            })

                                            if (img) {
                                                setErrors(prev => {
                                                    const key = `componentImage-${index}`
                                                    if (!prev[key]) return prev
                                                    const updated = { ...prev }
                                                    delete updated[key]
                                                    return updated
                                                })
                                            }
                                        }}
                                    />

                                    {errors[`componentImage-${index}`] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors[`componentImage-${index}`]}
                                        </p>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    )
})

export default HeroForm