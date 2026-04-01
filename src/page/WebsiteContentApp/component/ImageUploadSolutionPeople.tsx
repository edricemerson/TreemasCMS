import { useRef } from "react"

type ImageUploadSolutionPeopleProps = {
  value?: string
  onChangeImage?: (image: string | null) => void
  showRemove?: boolean
}

function ImageUploadSolutionPeople({
  value,
  onChangeImage,
  showRemove = true,
}: ImageUploadSolutionPeopleProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const allowedTypes = ["image/png", "image/svg+xml"]

    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG and SVG files are allowed")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      if (onChangeImage) {
        onChangeImage(reader.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    handleFile(e.target.files[0])
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="relative border rounded-xl p-6 text-center text-gray-500 bg-white text-sm cursor-pointer hover:border-gray-400 transition"
    >
      {value ? (
        <>
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg"
          />

          {showRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChangeImage?.(null)
              }}
              className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md hover:bg-black"
            >
              Remove
            </button>
          )}
        </>
      ) : (
        <p>Upload PNG or SVG</p>
      )}

      <input
        type="file"
        accept=".png,.svg,image/png,image/svg+xml"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}

export default ImageUploadSolutionPeople