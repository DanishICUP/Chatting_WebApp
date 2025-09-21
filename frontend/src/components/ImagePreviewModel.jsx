import { DeleteIcon } from 'lucide-react'
import React from 'react'

const ImagePreviewModel = ({ closeModal, selectedImage }) => {

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={closeModal} 
        >
            <div
                className="relative"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={selectedImage}
                    alt="Full preview"
                    className="max-h-[90vh] max-w-[90vw] rounded-lg"
                />
                <button
                    className="absolute top-2 right-2 bg-opacity-50 text-black p-2"
                    onClick={closeModal}
                >
                    <DeleteIcon/>
                </button>
            </div>
        </div>
    )
}

export default ImagePreviewModel