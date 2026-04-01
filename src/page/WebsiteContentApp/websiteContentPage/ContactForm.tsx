import { useData } from "../DataStruct/Context"
import { useState, forwardRef, useImperativeHandle } from "react"

const ContactForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()
    const [errors, setErrors] = useState<Record<string, string>>({})

    /* ------------------ VALIDATION ------------------ */

    const validateContact = () => {
        const newErrors: Record<string, string> = {}
        let firstErrorKey: string | null = null

        const setFirst = (key: string) => {
            if (!firstErrorKey) firstErrorKey = key
        }

        const { email, phone, address } = contextData.contact

        if (!email.trim()) {
            newErrors.email = "Email is required"
            setFirst("email")
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Invalid email format"
            setFirst("email")
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required"
            setFirst("phone")
        }

        if (!address.trim()) {
            newErrors.address = "Address is required"
            setFirst("address")
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
        validate: validateContact,
    }))

    /* ------------------ UI ------------------ */

    return (
        <div className="bg-white rounded-2xl p-6 mt-6 border">
            <h2 className="font-semibold mb-6">Contact Section</h2>

            {/* EMAIL */}
            <div data-error="email" className="mb-5">
                <label className="block font-semibold mb-2 text-sm">
                    Email
                </label>

                <input
                    type="email"
                    value={contextData.contact.email}
                    onChange={(e) => {
                        const value = e.target.value
                        setContextData({
                            ...contextData,
                            contact: {
                                ...contextData.contact,
                                email: value,
                            },
                        })

                        if (value.trim()) {
                            setErrors(prev => {
                                if (!prev.email) return prev
                                const updated = { ...prev }
                                delete updated.email
                                return updated
                            })
                        }
                    }}
                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm border
                    ${errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-teal-500"}
                    focus:outline-none focus:ring-2`}
                />

                {errors.email && (
                    <p className="text-red-500 text-xs mt-2">
                        {errors.email}
                    </p>
                )}
            </div>

            {/* PHONE */}
            <div data-error="phone" className="mb-5">
                <label className="block font-semibold mb-2 text-sm">
                    Phone
                </label>

                <input
                    type="text"
                    value={contextData.contact.phone}
                    onChange={(e) => {
                        const value = e.target.value
                        setContextData({
                            ...contextData,
                            contact: {
                                ...contextData.contact,
                                phone: value,
                            },
                        })

                        if (value.trim()) {
                            setErrors(prev => {
                                if (!prev.phone) return prev
                                const updated = { ...prev }
                                delete updated.phone
                                return updated
                            })
                        }
                    }}
                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm border
                    ${errors.phone
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-teal-500"}
                    focus:outline-none focus:ring-2`}
                />

                {errors.phone && (
                    <p className="text-red-500 text-xs mt-2">
                        {errors.phone}
                    </p>
                )}
            </div>

            {/* ADDRESS */}
            <div data-error="address">
                <label className="block font-semibold mb-2 text-sm">
                    Address
                </label>

                <textarea
                    rows={3}
                    value={contextData.contact.address}
                    onChange={(e) => {
                        const value = e.target.value
                        setContextData({
                            ...contextData,
                            contact: {
                                ...contextData.contact,
                                address: value,
                            },
                        })

                        if (value.trim()) {
                            setErrors(prev => {
                                if (!prev.address) return prev
                                const updated = { ...prev }
                                delete updated.address
                                return updated
                            })
                        }
                    }}
                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm resize-none border
                    ${errors.address
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-teal-500"}
                    focus:outline-none focus:ring-2`}
                />

                {errors.address && (
                    <p className="text-red-500 text-xs mt-2">
                        {errors.address}
                    </p>
                )}
            </div>
        </div>
    )
})

export default ContactForm