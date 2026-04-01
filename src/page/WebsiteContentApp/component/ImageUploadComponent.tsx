import { useRef } from "react"

type ImageUploadComponentProps = {
    value?: string
    onChangeImage?: (img: string | null) => void
    showRemove?: boolean
}

function ImageUploadComponent({
    value,
    onChangeImage,
    showRemove = true,
}: ImageUploadComponentProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFile = (file: File) => { 
        const allowedTypes = ["image/png", "image/svg+xml", "image/jpeg", "image/jpg"]

        if (!allowedTypes.includes(file.type)) {
            alert("Only PNG, SVG, and JPEG files are allowed")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("File must be under 5MB")
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
            className="relative border rounded-xl p-6 text-center text-gray-500 bg-white text-sm cursor-pointer hover:border-gray-400 transition"
        >
            {value ? (
                <>
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-28 object-cover rounded-lg"
                    />

                    {showRemove && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md hover:bg-black"
                        >
                            Remove
                        </button>
                    )}
                </>
            ) : (
                <p>Upload PNG, SVG, or JPEG</p>
            )}

            <input
                type="file"
                accept=".png,.svg,.jpg,.jpeg,image/png,image/svg+xml,image/jpeg"
                ref={inputRef}
                onChange={handleChange}
                className="hidden"
            />
        </div>
    )
}

export default ImageUploadComponent