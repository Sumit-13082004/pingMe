import { Image, Send, X } from 'lucide-react';
import React, { useState, useRef } from 'react'
import { useChatStore } from '../store/useChatStore.js';
import toast from 'react-hot-toast';

const MessageInput = () => {
    const [text, setText] = useState("");
    const { sendMessage } = useChatStore();
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const removeImage = () => {
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        }
    }

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (!text.trim()) return;

        try {
            await sendMessage({
                text: text,
                image: previewImage,
            });

            setText("");
            setPreviewImage(null);
        } catch (error) {
            console.error("Failed to send message: ", error);
        }
    }
    return (
        <div className='p-4 w-full'>
            {previewImage && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className='relative'>
                        <img
                            src={previewImage}
                            alt='preview_image'
                            className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                            flex items-center justify-center cursor-pointer"
                            type="button"
                        >
                            <X className='size-3' />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
                <div className='flex-1 flex gap-2'>
                    <input
                        type='text'
                        placeholder='Type a message...'
                        className='w-full input input-bordered rounded-lg input-sm sm:input-md'
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />
                    <input
                        type='file'
                        accept='image/*'
                        className='hidden'
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type='button'
                        className={`hidden sm:flex btn btn-circle
                            ${previewImage ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type='submit'
                    className='btn btn-sm btn-circle'
                    disabled={!text.trim() && !previewImage}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    )
}

export default MessageInput