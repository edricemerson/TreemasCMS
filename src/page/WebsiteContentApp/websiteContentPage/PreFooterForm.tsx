import ImageUploadHero from "../component/ImageUploadHero"
import { useData } from "../DataStruct/Context"
import {
    useState,
    forwardRef,
    useImperativeHandle,
} from "react"

const PrefooterForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()

    const [errors, setErrors] = useState({
        title1: "",
        title2: "",
        description: "",
        backgroundImage: "",
        buttonLink: "",
    })

    useImperativeHandle(ref, () => ({
        validate: () => {
            const newErrors = {
                title1:
                    contextData.prefooter.title1.trim()
                        ? ""
                        : "Title 1 is required",

                title2:
                    contextData.prefooter.title2.trim()
                        ? ""
                        : "Title 2 is required",

                description:
                    contextData.prefooter.description.trim()
                        ? ""
                        : "Description is required",

                backgroundImage:
                    contextData.prefooter.backgroundImage
                        ? ""
                        : "Background image is required",
                buttonLink:
                    contextData.prefooter.buttonLink.trim()
                        ? ""
                        : "Button link is required",
            }

            setErrors(newErrors)

            return !Object.values(newErrors).some(Boolean)
        },
    }))

    return (
        <div className="min-w-5xl flex flex-col bg-white mt-5 rounded-2xl border">
            <form className="p-4">
                <p className="font-semibold mb-4">
                    Prefooter Section
                </p>

                {/* TITLE 1 */}
                <div className="mb-4">
                    <label className="text-sm font-semibold block mb-1">
                        Prefooter Title 1
                    </label>

                    <input
                        type="text"
                        value={contextData.prefooter.title1}
                        onChange={(e) => {
                            const value = e.target.value

                            setContextData({
                                ...contextData,
                                prefooter: {
                                    ...contextData.prefooter,
                                    title1: value,
                                },
                            })

                            if (value.trim()) {
                                setErrors((prev) => ({
                                    ...prev,
                                    title1: "",
                                }))
                            }
                        }}
                        className={`w-full bg-gray-100 border rounded-xl p-2 text-sm
                        ${
                            errors.title1
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-teal-500"
                        }
                        focus:outline-none focus:ring-2`}
                    />

                    {errors.title1 && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.title1}
                        </p>
                    )}
                </div>

                {/* TITLE 2 */}
                <div className="mb-4">
                    <label className="text-sm font-semibold block mb-1">
                        Prefooter Title 2
                    </label>

                    <input
                        type="text"
                        value={contextData.prefooter.title2}
                        onChange={(e) => {
                            const value = e.target.value

                            setContextData({
                                ...contextData,
                                prefooter: {
                                    ...contextData.prefooter,
                                    title2: value,
                                },
                            })

                            if (value.trim()) {
                                setErrors((prev) => ({
                                    ...prev,
                                    title2: "",
                                }))
                            }
                        }}
                        className={`w-full bg-gray-100 border rounded-xl p-2 text-sm
                        ${
                            errors.title2
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-teal-500"
                        }
                        focus:outline-none focus:ring-2`}
                    />

                    {errors.title2 && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.title2}
                        </p>
                    )}
                </div>

                {/* DESCRIPTION */}
                <div className="mb-4">
                    <label className="text-sm font-semibold block mb-1">
                        Prefooter Description
                    </label>

                    <textarea
                        rows={3}
                        value={contextData.prefooter.description}
                        onChange={(e) => {
                            const value = e.target.value

                            setContextData({
                                ...contextData,
                                prefooter: {
                                    ...contextData.prefooter,
                                    description: value,
                                },
                            })

                            if (value.trim()) {
                                setErrors((prev) => ({
                                    ...prev,
                                    description: "",
                                }))
                            }
                        }}
                        className={`w-full bg-gray-100 border rounded-xl p-2 text-sm
                        ${
                            errors.description
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-teal-500"
                        }
                        focus:outline-none focus:ring-2`}
                    />

                    {errors.description && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* IMAGE */}
                <div className="mb-6">
                    <ImageUploadHero
                        title="Background Image"
                        value={contextData.prefooter.backgroundImage}
                        showRemove
                        onChangeImage={(img) => {
                            setContextData({
                                ...contextData,
                                prefooter: {
                                    ...contextData.prefooter,
                                    backgroundImage: img || "",
                                },
                            })

                            if (img) {
                                setErrors((prev) => ({
                                    ...prev,
                                    backgroundImage: "",
                                }))
                            }
                        }}
                    />

                    {errors.backgroundImage && (
                        <p className="text-red-500 text-xs mt-2">
                            {errors.backgroundImage}
                        </p>
                    )}
                </div>
                {/* button link */}
                <div className="mb-4">
                    <label className="text-sm font-semibold block mb-1">
                        Button Link
                    </label>

                    <input
                        type="text"
                        value={contextData.prefooter.buttonLink}
                        onChange={(e) => {
                            const value = e.target.value

                            setContextData({
                                ...contextData,
                                prefooter: {
                                    ...contextData.prefooter,
                                    buttonLink: value,
                                },
                            })

                            if (value.trim()) {
                                setErrors((prev) => ({
                                    ...prev,
                                    buttonLink: "",
                                }))
                            }
                        }}
                        className={`w-full bg-gray-100 border rounded-xl p-2 text-sm
                        ${
                            errors.buttonLink
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-teal-500"
                        }
                        focus:outline-none focus:ring-2`}
                        placeholder="https://example.com"
                    />

                    {errors.buttonLink && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.buttonLink}
                        </p>
                    )}
                </div>
            </form>
        </div>
    )
})

export default PrefooterForm