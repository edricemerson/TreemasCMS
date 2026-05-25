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
                    position: "",
                    image: "",
                    description: "",
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
            // Kita gunakan (person.properti || "") untuk mencegah error undefined
            const name = (person.name || "").trim();
            const pos = (person.position || "").trim();
            const label = (person.labelName || "").trim();
            const desc = (person.description || "").trim();

            if (!person.image) {
                const key = `personImage-${index}`
                newErrors[key] = "Person image is required"
                setFirst(key)
            }

            if (!name) {
                const key = `personName-${index}`
                newErrors[key] = "Person name is required"
                setFirst(key)
            }

            if (!pos) {
                const key = `personPosition-${index}`
                newErrors[key] = "Person position is required"
                setFirst(key)
            }

            if (!label) {
                const key = `personLabel-${index}`
                newErrors[key] = "Person label is required"
                setFirst(key)
            }

            if (!desc) {
                const key = `personDescription-${index}`
                newErrors[key] = "Person description is required"
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

                        <div className="grid grid-cols-2 gap-4">

                            <div data-error={`personImage-${index}`}>
                                <label className="font-semibold block mb-1 text-sm">
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

                            <div>

                                <div data-error={`personLabel-${index}`} className="mb-3">
                                    <label className="font-semibold block mb-1 text-sm">
                                        Label
                                    </label>

                                    <input
                                        type="text"
                                        value={person.labelName || ""}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const updated = [...contextData.people]

                                            updated[index].labelName = value

                                            setContextData({
                                                ...contextData,
                                                people: updated,
                                            })

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
                                        className={`w-full bg-white border rounded-xl px-3 py-2
                                        ${errors[`personLabel-${index}`]
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-teal-500"}
                                        focus:outline-none focus:ring-2`}
                                    />

                                    {errors[`personLabel-${index}`] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors[`personLabel-${index}`]}
                                        </p>
                                    )}
                                </div>

                                <div data-error={`personName-${index}`} className="mb-3">
                                    <label className="font-semibold block mb-1 text-sm">
                                        Name
                                    </label>

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
                                        className={`w-full bg-white border rounded-xl px-3 py-2
                                        ${errors[`personName-${index}`]
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-teal-500"}
                                        focus:outline-none focus:ring-2`}
                                    />

                                    {errors[`personName-${index}`] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors[`personName-${index}`]}
                                        </p>
                                    )}
                                </div>

                                <div data-error={`personPosition-${index}`}>
                                    <label className="font-semibold block mb-1 text-sm">
                                        Position
                                    </label>

                                    <input
                                        type="text"
                                        value={person.position}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const updated = [...contextData.people]
                                            updated[index].position = value
                                            setContextData({ ...contextData, people: updated })

                                            if (value.trim()) {
                                                setErrors(prev => {
                                                    const key = `personPosition-${index}`
                                                    if (!prev[key]) return prev
                                                    const updatedErr = { ...prev }
                                                    delete updatedErr[key]
                                                    return updatedErr
                                                })
                                            }
                                        }}
                                        className={`w-full bg-white border rounded-xl px-3 py-2
                                        ${errors[`personPosition-${index}`]
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-teal-500"}
                                        focus:outline-none focus:ring-2`}
                                    />

                                    {errors[`personPosition-${index}`] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors[`personPosition-${index}`]}
                                        </p>
                                    )}
                                </div>

                                <div data-error={`personDescription-${index}`} className="mt-3">
                                    <label className="font-semibold block mb-1 text-sm">
                                        Description
                                    </label>

                                    <textarea
                                        value={person.description || ""}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const updated = [...contextData.people]

                                            updated[index].description = value

                                            setContextData({
                                                ...contextData,
                                                people: updated,
                                            })

                                            if (value.trim()) {
                                                setErrors(prev => {
                                                    const key = `personDescription-${index}`

                                                    if (!prev[key]) return prev

                                                    const updatedErr = { ...prev }
                                                    delete updatedErr[key]

                                                    return updatedErr
                                                })
                                            }
                                        }}
                                        rows={4}
                                        className={`w-full bg-white border rounded-xl px-3 py-2 resize-none
                                        ${errors[`personDescription-${index}`]
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-teal-500"}
                                        focus:outline-none focus:ring-2`}
                                    />

                                    {errors[`personDescription-${index}`] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors[`personDescription-${index}`]}
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

export default PeopleForm