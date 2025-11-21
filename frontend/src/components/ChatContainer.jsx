import React from 'react'
import ChatHeader from './ChatHeader.jsx'
import MessageInput from './MessageInput.jsx'
import MessageSkeleton from './skeletons/MessageSkeleton.jsx'

const ChatContainer = () => {
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        {/* Chat Header */}
        <ChatHeader />

        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            <MessageSkeleton />
        </div>

        {/* MessageInput */}
        <MessageInput />
    </div>
  )
}

export default ChatContainer