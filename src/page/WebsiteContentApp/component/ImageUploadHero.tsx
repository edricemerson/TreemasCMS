import { useRef } from "react"

type ImageUploadHeroProps = {
    value?: string
    onChangeImage?: (img: string | null) => void
    showRemove?: boolean
}

function ImageUploadHero({
    value,
    onChangeImage,
    showRemove = true,
}: ImageUploadHeroProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleFile = (file: File) => {
        const allowedTypes = ["image/png", "image/svg+xml", "image/jpeg", "image/jpg", "image/webp"]

        if (!allowedTypes.includes(file.type)) {
            alert("format not supported use PNG, JPG, or WEBP.")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("max size 5mb")
            return
        }
        const reader = new FileReader()
        
        reader.onloadend = () => {
            onChangeImage?.(reader.result as string)
            console.log("successfully converted into base64"); 
        }
        
        reader.readAsDataURL(file)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        handleFile(e.target.files[0])
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        onChangeImage?.(null)
    }

    return (
        <div
            onClick={() => inputRef.current?.click()}
            className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 text-gray-500 text-sm cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
        >
            {value ? (
                <>
                    <img
                        src={value}
                        alt="Hero Preview"
                        className="w-full h-48 object-cover rounded-lg shadow-sm"
                    />

                    {showRemove && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-4 right-4 bg-red-500/80 text-white text-xs px-3 py-1.5 rounded-md hover:bg-red-600 font-medium transition-colors"
                        >
                            Hapus Hero
                        </button>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-4">
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <p className="font-semibold text-gray-700">Upload Background Hero</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG atau WEBP (Maks. 5MB)</p>
                </div>
            )}

            <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                ref={inputRef}
                onChange={handleChange}
                className="hidden"
            />
        </div>
    )
}

export default ImageUploadHero