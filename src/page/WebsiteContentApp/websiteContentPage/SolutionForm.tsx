import ImageUploadSolutionPeople from "../component/ImageUploadSolutionPeople"
import { useData } from "../DataStruct/Context"
import { useState, forwardRef, useImperativeHandle } from "react"

const SolutionForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()
    const [errors, setErrors] = useState<Record<string, string>>({})

    /* ------------------ HANDLERS ------------------ */

    const handleAddSolution = () => {
        if (contextData.solutions.length >= 3) return

        setContextData({
            ...contextData,
            solutions: [
                ...contextData.solutions,
                {
                    id: crypto.randomUUID(),
                    title: "",
                    description: "",
                    image: "",
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

    /* ------------------ VALIDATION ------------------ */

    const validateSolution = () => {
        const newErrors: Record<string, string> = {}
        let firstErrorKey: string | null = null

        const setFirst = (key: string) => {
            if (!firstErrorKey) firstErrorKey = key
        }

        contextData.solutions.forEach((solution, index) => {

            if (!solution.image) {
                const key = `solutionImage-${index}`
                newErrors[key] = "Solution image is required"
                setFirst(key)
            }

            if (!solution.title.trim()) {
                const key = `solutionTitle-${index}`
                newErrors[key] = "Solution title is required"
                setFirst(key)
            }

            if (!solution.description.trim()) {
                const key = `solutionDescription-${index}`
                newErrors[key] = "Solution description is required"
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

    /* 🔥 EXPOSE TO PARENT */
    useImperativeHandle(ref, () => ({
        validate: validateSolution,
    }))

    /* ------------------ UI ------------------ */

    return (
        <div className="bg-white rounded-2xl p-6 mt-6 border">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-semibold">Solutions Section</h2>

                <button
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
                </button>
            </div>

            {/* Solutions List */}
            <div className="flex flex-col gap-6">
                {contextData.solutions.map((solution, index) => (
                    <div key={solution.id} className="border rounded-2xl p-4 bg-gray-50">

                        <div className="flex justify-between items-center mb-6">
                            <p className="font-semibold text-gray-700 text-sm">
                                Solution {index + 1}
                            </p>

                            <button
                                type="button"
                                onClick={() => handleDeleteSolution(solution.id)}
                                className="text-red-500 hover:text-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">

                            {/* IMAGE */}
                            <div data-error={`solutionImage-${index}`}>
                                <label className="font-semibold block mb-2 text-sm">
                                    Image
                                </label>

                                <ImageUploadSolutionPeople
                                    value={solution.image}
                                    onChangeImage={(img) => {
                                        const updated = [...contextData.solutions]
                                        updated[index].image = img || ""
                                        setContextData({ ...contextData, solutions: updated })

                                        if (img) {
                                            setErrors(prev => {
                                                const key = `solutionImage-${index}`
                                                if (!prev[key]) return prev
                                                const updatedErr = { ...prev }
                                                delete updatedErr[key]
                                                return updatedErr
                                            })
                                        }
                                    }}
                                />

                                {errors[`solutionImage-${index}`] && (
                                    <p className="text-red-500 text-xs mt-2">
                                        {errors[`solutionImage-${index}`]}
                                    </p>
                                )}
                            </div>

                            {/* TEXT */}
                            <div>

                                {/* TITLE */}
                                <div data-error={`solutionTitle-${index}`} className="mb-4">
                                    <label className="font-semibold block mb-2 text-sm">
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        value={solution.title}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const updated = [...contextData.solutions]
                                            updated[index].title = value
                                            setContextData({ ...contextData, solutions: updated })

                                            if (value.trim()) {
                                                setErrors(prev => {
                                                    const key = `solutionTitle-${index}`
                                                    if (!prev[key]) return prev
                                                    const updatedErr = { ...prev }
                                                    delete updatedErr[key]
                                                    return updatedErr
                                                })
                                            }
                                        }}
                                        className={`w-full bg-white border rounded-xl px-3 py-2 text-sm
                                        ${errors[`solutionTitle-${index}`]
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-teal-500"}
                                        focus:outline-none focus:ring-2`}
                                    />

                                    {errors[`solutionTitle-${index}`] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors[`solutionTitle-${index}`]}
                                        </p>
                                    )}
                                </div>

                                {/* DESCRIPTION */}
                                <div data-error={`solutionDescription-${index}`}>
                                    <label className="font-semibold block mb-2 text-sm">
                                        Description
                                    </label>

                                    <textarea
                                        rows={2}
                                        value={solution.description}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const updated = [...contextData.solutions]
                                            updated[index].description = value
                                            setContextData({ ...contextData, solutions: updated })

                                            if (value.trim()) {
                                                setErrors(prev => {
                                                    const key = `solutionDescription-${index}`
                                                    if (!prev[key]) return prev
                                                    const updatedErr = { ...prev }
                                                    delete updatedErr[key]
                                                    return updatedErr
                                                })
                                            }
                                        }}
                                        className={`w-full bg-white border rounded-xl p-3 text-sm
                                        ${errors[`solutionDescription-${index}`]
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-teal-500"}
                                        focus:outline-none focus:ring-2`}
                                    />

                                    {errors[`solutionDescription-${index}`] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors[`solutionDescription-${index}`]}
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
})

export default SolutionForm