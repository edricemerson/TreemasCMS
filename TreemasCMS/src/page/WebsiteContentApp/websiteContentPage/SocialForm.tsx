import { forwardRef, useImperativeHandle } from "react"
import { useData } from "../DataStruct/Context"

const SocialForm = forwardRef((_, ref) => {
    const { contextData, setContextData } = useData()

    // Bebas validasi untuk sosmed (tidak memblokir tombol publish)
    useImperativeHandle(ref, () => ({
        validate: () => true, 
    }))

    const addSocial = () => {
        setContextData({
            ...contextData,
            social: [...contextData.social, { platform: "", url: "", icon: "" }]
        })
    }

    const removeSocial = (index: number) => {
        const newSocial = [...contextData.social]
        newSocial.splice(index, 1)
        setContextData({
            ...contextData,
            social: newSocial
        })
    }

    return (
        <div className="bg-white rounded-2xl p-6 mt-6 border">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg">Social Media Links</h2>
                <button 
                    type="button" 
                    onClick={addSocial} 
                    className="bg-[#0B0B23] text-white px-4 py-2 rounded-xl text-sm transition hover:bg-[#1a1a3a]"
                >
                    Add Link
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {contextData.social.map((item, index) => (
                    <div key={index} className="flex gap-4 items-end border p-4 rounded-xl bg-gray-50">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Platform</label>
                            <input 
                                className="border p-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" 
                                placeholder="e.g. instagram, linkedin, x" 
                                value={item.platform} 
                                onChange={(e) => {
                                    const newSocial = [...contextData.social];
                                    newSocial[index].platform = e.target.value;
                                    setContextData({...contextData, social: newSocial});
                                }} 
                            />
                        </div>
                        <div className="flex-[2]">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">URL</label>
                            <input 
                                className="border p-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" 
                                placeholder="https://..." 
                                value={item.url} 
                                onChange={(e) => {
                                    const newSocial = [...contextData.social];
                                    newSocial[index].url = e.target.value;
                                    setContextData({...contextData, social: newSocial});
                                }} 
                            />
                        </div>
                        <button 
                            type="button" 
                            onClick={() => removeSocial(index)} 
                            className="text-red-500 font-medium text-sm p-2 mb-1 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                ))}
                
                {contextData.social.length === 0 && (
                    <p className="text-gray-500 text-sm italic text-center py-4">
                        No social links added yet. Click "Add Link" to create one.
                    </p>
                )}
            </div>
        </div>
    )
})

export default SocialForm