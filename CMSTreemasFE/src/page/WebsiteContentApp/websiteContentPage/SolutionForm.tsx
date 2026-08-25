import Button from "../../Button"
import { useData } from "../DataStruct/Context"
import { useState, forwardRef, useImperativeHandle } from "react"

const SolutionForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleAddSolution = () => {
        if (contextData.solutions.length >= 3) return

        setContextData({
            ...contextData,
            solutions: [
                ...contextData.solutions,
                {
                    id: crypto.randomUUID(),
                    title_en: "",
                    title_id: "",
                    icon: "",
                    description_en: "",
                    description_id: "",
                },
            ],
        })
    }

    const handleDeleteSolution = (id: string) => {
        setContextData({
            ...contextData,
            solutions: contextData.solutions.filter((s) => s.id !== id),
        })
    }

    const validateSolution = () => {
        const newErrors: Record<string, string> = {}
        let firstErrorKey: string | null = null

        const setFirst = (key: string) => {
            if (!firstErrorKey) firstErrorKey = key
        }

        contextData.solutions.forEach((solution, index) => {
            const titleEn = (solution.title_en || "").trim();
            const titleId = (solution.title_id || "").trim();
            const descEn = (solution.description_en || "").trim();
            const descId = (solution.description_id || "").trim();

            if (!titleEn) {
                const key = `solutionTitleEn-${index}`
                newErrors[key] = "EN Solution title is required"
                setFirst(key)
            }
            if (!titleId) {
                const key = `solutionTitleId-${index}`
                newErrors[key] = "ID Solution title is required"
                setFirst(key)
            }

            if (!descEn) {
                const key = `solutionDescEn-${index}`
                newErrors[key] = "EN Solution description is required"
                setFirst(key)
            }
            if (!descId) {
                const key = `solutionDescId-${index}`
                newErrors[key] = "ID Solution description is required"
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
        validate: validateSolution,
    }))

    return (
        <div className="bg-white rounded-2xl p-6 mt-6 border">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-semibold">Solutions Section</h2>

                <Button
                    type="button"
                    onClick={handleAddSolution}
                    disabled={contextData.solutions.length >= 3}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition
                        ${contextData.solutions.length >= 3
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#0B0B23] hover:bg-[#1a1a3a]"}
                    `}
                >
                    Add Solution
                </Button>
            </div>

            <div className="flex flex-col gap-6">
                {contextData.solutions.map((solution, index) => (
                    <div key={solution.id} className="border rounded-2xl p-5 bg-gray-50 flex flex-col gap-4">

                        <div className="flex justify-between items-center border-b pb-3 mb-2">
                            <p className="font-semibold text-gray-700 text-sm">
                                Solution {index + 1}
                            </p>

                            <Button
                                type="button"
                                onClick={() => handleDeleteSolution(solution.id)}
                                className="text-red-500 hover:text-red-600 transition font-medium text-sm"
                            >
                                Delete
                            </Button>
                        </div>

                        {/* BILINGUAL: TITLE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div data-error={`solutionTitleEn-${index}`}>
                                <label className="font-semibold block mb-2 text-sm text-gray-700">
                                    Title (EN) 🇬🇧
                                </label>
                                <input
                                    type="text"
                                    value={solution.title_en}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        const updated = [...contextData.solutions]
                                        updated[index].title_en = value
                                        setContextData({ ...contextData, solutions: updated })

                                        if (value.trim()) {
                                            setErrors(prev => {
                                                const key = `solutionTitleEn-${index}`
                                                if (!prev[key]) return prev
                                                const updatedErr = { ...prev }
                                                delete updatedErr[key]
                                                return updatedErr
                                            })
                                        }
                                    }}
                                    className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm
                                    ${errors[`solutionTitleEn-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}
                                    focus:outline-none focus:ring-2`}
                                />
                                {errors[`solutionTitleEn-${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`solutionTitleEn-${index}`]}</p>}
                            </div>

                            <div data-error={`solutionTitleId-${index}`}>
                                <label className="font-semibold block mb-2 text-sm text-gray-700">
                                    Title (ID) 🇮🇩
                                </label>
                                <input
                                    type="text"
                                    value={solution.title_id}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        const updated = [...contextData.solutions]
                                        updated[index].title_id = value
                                        setContextData({ ...contextData, solutions: updated })

                                        if (value.trim()) {
                                            setErrors(prev => {
                                                const key = `solutionTitleId-${index}`
                                                if (!prev[key]) return prev
                                                const updatedErr = { ...prev }
                                                delete updatedErr[key]
                                                return updatedErr
                                            })
                                        }
                                    }}
                                    className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm
                                    ${errors[`solutionTitleId-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}
                                    focus:outline-none focus:ring-2`}
                                />
                                {errors[`solutionTitleId-${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`solutionTitleId-${index}`]}</p>}
                            </div>
                        </div>

                        {/* ICON */}
                        <div data-error={`solutionIcon-${index}`}>
                            <label className="font-semibold block mb-2 text-sm text-gray-700">
                                Icon Name
                            </label>
                            <input
                                type="text"
                                value={solution.icon || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const updated = [...contextData.solutions];
                                    updated[index].icon = value;
                                    setContextData({ ...contextData, solutions: updated });
                                }}
                                placeholder="e.g. FaChartLine, lucide-briefcase"
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        {/* BILINGUAL: DESCRIPTION */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div data-error={`solutionDescEn-${index}`}>
                                <label className="font-semibold block mb-2 text-sm text-gray-700">
                                    Description (EN) 🇬🇧
                                </label>
                                <textarea
                                    rows={3}
                                    value={solution.description_en}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        const updated = [...contextData.solutions]
                                        updated[index].description_en = value
                                        setContextData({ ...contextData, solutions: updated })

                                        if (value.trim()) {
                                            setErrors(prev => {
                                                const key = `solutionDescEn-${index}`
                                                if (!prev[key]) return prev
                                                const updatedErr = { ...prev }
                                                delete updatedErr[key]
                                                return updatedErr
                                            })
                                        }
                                    }}
                                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm resize-none
                                    ${errors[`solutionDescEn-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}
                                    focus:outline-none focus:ring-2`}
                                />
                                {errors[`solutionDescEn-${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`solutionDescEn-${index}`]}</p>}
                            </div>

                            <div data-error={`solutionDescId-${index}`}>
                                <label className="font-semibold block mb-2 text-sm text-gray-700">
                                    Description (ID) 🇮🇩
                                </label>
                                <textarea
                                    rows={3}
                                    value={solution.description_id}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        const updated = [...contextData.solutions]
                                        updated[index].description_id = value
                                        setContextData({ ...contextData, solutions: updated })

                                        if (value.trim()) {
                                            setErrors(prev => {
                                                const key = `solutionDescId-${index}`
                                                if (!prev[key]) return prev
                                                const updatedErr = { ...prev }
                                                delete updatedErr[key]
                                                return updatedErr
                                            })
                                        }
                                    }}
                                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm resize-none
                                    ${errors[`solutionDescId-${index}`] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500"}
                                    focus:outline-none focus:ring-2`}
                                />
                                {errors[`solutionDescId-${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`solutionDescId-${index}`]}</p>}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
})

export default SolutionForm