import { useData } from "../DataStruct/Context"
import { useState, forwardRef, useImperativeHandle } from "react"

const SocialForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (
        field: "linkedin" | "instagram" | "twitter",
        value: string
    ) => {
        setContextData((prev) => ({
            ...prev,
            social: {
                ...prev.social,
                [field]: value,
            },
        }))

        if (value.trim()) {
            setErrors(prev => {
                if (!prev[field]) return prev
                const updated = { ...prev }
                delete updated[field]
                return updated
            })
        }
    }

    /* ------------------ VALIDATION ------------------ */

    const validateSocial = () => {
        const newErrors: Record<string, string> = {}
        let firstErrorKey: string | null = null

        const setFirst = (key: string) => {
            if (!firstErrorKey) firstErrorKey = key
        }

        const { linkedin, instagram, twitter } = contextData.social

        const usernameRegex = /^[a-zA-Z0-9._-]+$/ // allows letters, numbers, dot, underscore, dash

        // LINKEDIN
        if (!linkedin.trim()) {
            newErrors.linkedin = "LinkedIn username is required"
            setFirst("linkedin")
        } else if (!usernameRegex.test(linkedin)) {
            newErrors.linkedin = "Invalid username format"
            setFirst("linkedin")
        }

        // INSTAGRAM
        if (!instagram.trim()) {
            newErrors.instagram = "Instagram username is required"
            setFirst("instagram")
        } else if (!usernameRegex.test(instagram)) {
            newErrors.instagram = "Invalid username format"
            setFirst("instagram")
        }

        // TWITTER
        if (!twitter.trim()) {
            newErrors.twitter = "Twitter username is required"
            setFirst("twitter")
        } else if (!usernameRegex.test(twitter)) {
            newErrors.twitter = "Invalid username format"
            setFirst("twitter")
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
        validate: validateSocial,
    }))

    /* ------------------ UI ------------------ */

    return (
        <div className="bg-white rounded-2xl p-6 mt-6 border">

            <h2 className="font-semibold mb-6">
                Social Links
            </h2>

            {/* LINKEDIN */}
            <div data-error="linkedin" className="mb-5">
                <label className="block font-semibold mb-2 text-sm">
                    LinkedIn URL
                </label>

                <div
                    className={`flex items-stretch bg-gray-100 rounded-xl border overflow-hidden
                    ${errors.linkedin
                            ? "border-red-500 focus-within:ring-red-500"
                            : "border-gray-300 focus-within:ring-teal-500"
                        }
                    focus-within:ring-2`}
                >
                    <span className="pl-3 text-gray-500 text-sm whitespace-nowrap flex items-center">
                        https://linkedin.com/company/
                    </span>

                    <input
                        type="text"
                        value={contextData.social.linkedin}
                        onChange={(e) =>
                            handleChange("linkedin", e.target.value)
                        }
                        placeholder="yourusername"
                        className="flex-1 bg-transparent px-2 py-3 text-sm focus:outline-none"
                    />
                </div>

                {errors.linkedin && (
                    <p className="text-red-500 text-xs mt-2">
                        {errors.linkedin}
                    </p>
                )}
            </div>

            {/* INSTAGRAM */}
            <div data-error="instagram" className="mb-5">
                <label className="block font-semibold mb-2 text-sm">
                    Instagram Username
                </label>

                <div
                    className={`flex items-stretch bg-gray-100 rounded-xl border overflow-hidden
                    ${errors.instagram
                            ? "border-red-500 focus-within:ring-red-500"
                            : "border-gray-300 focus-within:ring-teal-500"
                        }
                    focus-within:ring-2`}
                >
                    <span className="pl-3 text-gray-500 text-sm whitespace-nowrap flex items-center">
                        https://instagram.com/
                    </span>

                    <input
                        type="text"
                        value={contextData.social.instagram}
                        onChange={(e) =>
                            handleChange("instagram", e.target.value)
                        }
                        placeholder="yourusername"
                        className="flex-1 bg-transparent px-2 py-3 text-sm focus:outline-none"
                    />
                </div>

                {errors.instagram && (
                    <p className="text-red-500 text-xs mt-2">
                        {errors.instagram}
                    </p>
                )}
            </div>

            {/* TWITTER */}
            <div data-error="twitter">
                <label className="block font-semibold mb-2 text-sm">
                    X (Twitter) URL
                </label>

                <div
                    className={`flex items-stretch bg-gray-100 rounded-xl border overflow-hidden
                    ${errors.twitter
                            ? "border-red-500 focus-within:ring-red-500"
                            : "border-gray-300 focus-within:ring-teal-500"
                        }
                    focus-within:ring-2`}
                >
                    <span className="pl-3 text-gray-500 text-sm whitespace-nowrap flex items-center">
                        https://twitter.com/
                    </span>

                    <input
                        type="text"
                        value={contextData.social.twitter}
                        onChange={(e) =>
                            handleChange("twitter", e.target.value)
                        }
                        placeholder="yourusername"
                        className="flex-1 bg-transparent px-2 py-3 text-sm focus:outline-none"
                    />
                </div>

                {errors.twitter && (
                    <p className="text-red-500 text-xs mt-2">
                        {errors.twitter}
                    </p>
                )}
            </div>

        </div>
    )
})

export default SocialForm