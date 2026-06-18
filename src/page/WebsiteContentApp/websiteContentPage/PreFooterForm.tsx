import ImageUploadHero from "../component/ImageUploadHero"
import { useData } from "../DataStruct/Context"
import {
    useState,
    forwardRef,
    useImperativeHandle,
} from "react"

const PrefooterForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()

    // State error disesuaikan dengan field bilingual, meski validasi dilonggarkan
    const [errors, setErrors] = useState({
        title1_en: "", title1_id: "",
        title2_en: "", title2_id: "",
        description_en: "", description_id: "",
        backgroundImage: "",
        buttonLink: "",
    })

    useImperativeHandle(ref, () => ({
        validate: () => {
            // 🔴 PERBAIKAN: Kita longgarkan validasinya. 
            // Karena Prefooter sifatnya opsional, kita hilangkan semua error
            // dan SELALU kembalikan nilai TRUE agar tombol Publish bisa jalan!
            setErrors({
                title1_en: "", title1_id: "",
                title2_en: "", title2_id: "",
                description_en: "", description_id: "",
                backgroundImage: "",
                buttonLink: "",
            });
            return true;
        },
    }))

    return (
        <div className="min-w-5xl flex flex-col bg-white mt-5 rounded-2xl border mb-10">
            <form className="p-6">
                <p className="font-semibold text-lg mb-6">
                    Prefooter Section
                </p>

                {/* BILINGUAL: TITLE 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-sm font-semibold block mb-2 text-gray-700">
                            Prefooter Title 1 (EN) 🇬🇧
                        </label>
                        <input
                            type="text"
                            value={contextData.prefooter.title1_en || ""}
                            onChange={(e) => {
                                const value = e.target.value
                                setContextData({
                                    ...contextData,
                                    prefooter: { ...contextData.prefooter, title1_en: value },
                                })
                                if (value.trim()) setErrors((prev) => ({ ...prev, title1_en: "" }))
                            }}
                            className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold block mb-2 text-gray-700">
                            Prefooter Title 1 (ID) 🇮🇩
                        </label>
                        <input
                            type="text"
                            value={contextData.prefooter.title1_id || ""}
                            onChange={(e) => {
                                const value = e.target.value
                                setContextData({
                                    ...contextData,
                                    prefooter: { ...contextData.prefooter, title1_id: value },
                                })
                                if (value.trim()) setErrors((prev) => ({ ...prev, title1_id: "" }))
                            }}
                            className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>

                {/* BILINGUAL: TITLE 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-sm font-semibold block mb-2 text-gray-700">
                            Prefooter Title 2 (EN) 🇬🇧
                        </label>
                        <input
                            type="text"
                            value={contextData.prefooter.title2_en || ""}
                            onChange={(e) => {
                                const value = e.target.value
                                setContextData({
                                    ...contextData,
                                    prefooter: { ...contextData.prefooter, title2_en: value },
                                })
                                if (value.trim()) setErrors((prev) => ({ ...prev, title2_en: "" }))
                            }}
                            className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold block mb-2 text-gray-700">
                            Prefooter Title 2 (ID) 🇮🇩
                        </label>
                        <input
                            type="text"
                            value={contextData.prefooter.title2_id || ""}
                            onChange={(e) => {
                                const value = e.target.value
                                setContextData({
                                    ...contextData,
                                    prefooter: { ...contextData.prefooter, title2_id: value },
                                })
                                if (value.trim()) setErrors((prev) => ({ ...prev, title2_id: "" }))
                            }}
                            className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>

                {/* BILINGUAL: DESCRIPTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="text-sm font-semibold block mb-2 text-gray-700">
                            Prefooter Description (EN) 🇬🇧
                        </label>
                        <textarea
                            rows={3}
                            value={contextData.prefooter.description_en || ""}
                            onChange={(e) => {
                                const value = e.target.value
                                setContextData({
                                    ...contextData,
                                    prefooter: { ...contextData.prefooter, description_en: value },
                                })
                                if (value.trim()) setErrors((prev) => ({ ...prev, description_en: "" }))
                            }}
                            className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold block mb-2 text-gray-700">
                            Prefooter Description (ID) 🇮🇩
                        </label>
                        <textarea
                            rows={3}
                            value={contextData.prefooter.description_id || ""}
                            onChange={(e) => {
                                const value = e.target.value
                                setContextData({
                                    ...contextData,
                                    prefooter: { ...contextData.prefooter, description_id: value },
                                })
                                if (value.trim()) setErrors((prev) => ({ ...prev, description_id: "" }))
                            }}
                            className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>

                {/* IMAGE & BUTTON LINK (Satu baris, 2 kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    
                    {/* BACKGROUND IMAGE */}
                    <div>
                        <label className="text-sm font-semibold block mb-2 text-gray-700">
                            Background Image
                        </label>
                        <ImageUploadHero
                            title="Background Image"
                            value={contextData.prefooter.backgroundImage}
                            showRemove
                            onChangeImage={(img) => {
                                setContextData({
                                    ...contextData,
                                    prefooter: { ...contextData.prefooter, backgroundImage: img || "" },
                                })
                                if (img) setErrors((prev) => ({ ...prev, backgroundImage: "" }))
                            }}
                        />
                    </div>

                    {/* BUTTON LINK */}
                    <div>
                        <label className="text-sm font-semibold block mb-2 text-gray-700">
                            Button Link
                        </label>
                        <input
                            type="text"
                            value={contextData.prefooter.buttonLink || ""}
                            onChange={(e) => {
                                const value = e.target.value
                                setContextData({
                                    ...contextData,
                                    prefooter: { ...contextData.prefooter, buttonLink: value },
                                })
                                if (value.trim()) setErrors((prev) => ({ ...prev, buttonLink: "" }))
                            }}
                            className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="https://example.com"
                        />
                    </div>

                </div>
            </form>
        </div>
    )
})

export default PrefooterForm