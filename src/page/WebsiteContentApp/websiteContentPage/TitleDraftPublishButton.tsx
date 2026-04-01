type Props = {
    onPublish: () => void
}

function TitleDraftPublishButton({ onPublish }: Props) {
    return (
        <div className="flex items-start justify-between">

            <div>
                <p className="text-3xl font-semibold pb-2">Website Content</p>
                <p className="text-gray-600">
                    Manage your public-facing website content
                </p>
            </div>

            <div className="flex gap-4 mt-1">

                <button className="flex items-center bg-gray-100 border border-gray-300 px-4 py-2 rounded-2xl hover:bg-gray-200 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h12l4 4v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                        <polyline points="16 4 16 8 8 8 8 4" />
                        <line x1="8" y1="16" x2="16" y2="16" />
                    </svg>
                    <p className="pl-3 font-semibold text-gray-900 text-sm">
                        Save Draft
                    </p>
                </button>

                {/* ✅ Publish Button */}
                <button
                    onClick={onPublish}
                    className="flex items-center bg-[#0B0B23] px-4 py-2 
                    rounded-2xl hover:bg-[#1a1a3a] transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-white">
                        <path d="M22 2L11 13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    <p className="pl-3 font-semibold text-white text-sm">
                        Publish
                    </p>
                </button>

            </div>
        </div>
    )
}

export default TitleDraftPublishButton