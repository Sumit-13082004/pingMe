import { Image, Send } from 'lucide-react';
import React, { useState, useRef } from 'react'
import { useChatStore } from '../store/useChatStore.js';

const MessageInput = () => {
    const [text, setText] = useState("");
    const {sendMessage} = useChatStore();
    const [previewImage, setPreviewImage] = useState(null);

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
            <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
                <div className='flex-1 flex gap-2'>
                    <input
                        type='text'
                        className='w-full input input-bordered rounded-lg input-sm sm:input-md'
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                    />
                    <input
                        type='file'
                        accept='image/*'
                        className='hidden'

                    />
                    <button
                        type='button'
                        className={`hidden sm:flex btn btn-circle`}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type='submit'
                    className='btn btn-sm btn-circle'
                    disabled={!text.trim()}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    )
}

export default MessageInput