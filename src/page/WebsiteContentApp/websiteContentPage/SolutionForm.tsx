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
                    title: "",
                    icon: "",
                    description: "",
                    // image dihapus dari sini
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
            const title = (solution.title || "").trim();
            const desc = (solution.description || "").trim();

            // Validasi image dihapus

            if (!title) {
                const key = `solutionTitle-${index}`
                newErrors[key] = "Solution title is required"
                setFirst(key)
            }

            if (!desc) {
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

                        <div data-error={`solutionTitle-${index}`}>
                            <label className="font-semibold block mb-2 text-sm text-gray-700">
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
                                className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm
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

                        <div data-error={`solutionDescription-${index}`}>
                            <label className="font-semibold block mb-2 text-sm text-gray-700">
                                Description
                            </label>

                            <textarea
                                rows={3}
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
                                className={`w-full bg-white border rounded-xl px-4 py-3 text-sm resize-none
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
                ))}
            </div>
        </div>
    )
})

export default SolutionForm