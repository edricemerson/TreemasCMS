import { useData } from "../DataStruct/Context"
import StatisticsSection from "../component/StatisticsSection"
import { useState, forwardRef, useImperativeHandle } from "react"

const AboutForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()
    const [errors, setErrors] = useState<Record<string, string>>({})

    /* ------------------ VALIDATION ------------------ */

    const validateAbout = () => {
        const newErrors: Record<string, string> = {}
        let firstErrorKey: string | null = null

        const setFirst = (key: string) => {
            if (!firstErrorKey) firstErrorKey = key
        }

        if (!contextData.about.trim()) {
            newErrors.about = "About content is required"
            setFirst("about")
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

    /* 🔥 EXPOSE TO PARENT */
    useImperativeHandle(ref, () => ({
        validate: validateAbout,
    }))

    /* ------------------ UI ------------------ */

    return (
        <>
            <div className="bg-white rounded-2xl p-6 mt-6 border mb-6">

                <h2 className="font-semibold mb-6">About Section</h2>

                <div data-error="about" className="mb-6">
                    <label className="block font-semibold mb-2 text-sm">
                        Content
                    </label>

                    <textarea
                        rows={3}
                        placeholder="Write about your company..."
                        value={contextData.about}
                        onChange={(e) => {
                            const value = e.target.value
                            setContextData({ ...contextData, about: value })

                            if (value.trim()) {
                                setErrors(prev => {
                                    if (!prev.about) return prev
                                    const updated = { ...prev }
                                    delete updated.about
                                    return updated
                                })
                            }
                        }}
                        className={`w-full bg-gray-100 rounded-xl p-4 resize-none text-sm border
                        ${errors.about
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-teal-500"}
                        focus:outline-none focus:ring-2`}
                    />

                    {errors.about && (
                        <p className="text-red-500 text-xs mt-2">
                            {errors.about}
                        </p>
                    )}

                    <p className="text-gray-500 mt-2 text-sm">
                        Rich text editor would go here in production
                    </p>
                </div>
            </div>

            <StatisticsSection />
        </>
    )
})

export default AboutForm