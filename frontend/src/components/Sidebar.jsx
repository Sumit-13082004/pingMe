import { Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import SidebarSkeleton from './skeletons/SidebarSkeleton.jsx';

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);
    
    if (isUsersLoading) {
        return <SidebarSkeleton />
    }

    return (
        <aside className='h-full w-20 lg:w-72 flex flex-col border-r border-base-300 transition-all duration-200 p-2'>
            <div>
                <div className='flex items-center gap-2'>
                    <Users className='size-6' />
                    <span className='font-medium hidden lg:block'>
                        Contacts
                    </span>
                </div>
                {/* Apply the feature later */}
                <div className='sort-by-online flex items-center gap-2 mt-2'>
                    <input type="checkbox" name="" id="showOnly" className='size-4' />
                    <label htmlFor="showOnly">Show online only</label>
                    <span className='text-sm font-light'>(0 Online)</span>
                </div>
            </div>

            <div className='h-full w-full mt-6 py-3 overflow-y-auto flex flex-col gap-6'>
                {users.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`w-full p-3 flex items-center gap-2 hover:bg-base-300 transition-colors rounded-md cursor-pointer ${selectedUser?._id === user._id ? "bg-base-300" : ""}`}
                    >

                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {/* {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                                    rounded-full ring-2 ring-zinc-900"
                                />
                            )} */}
                        </div>


                        <div className='hidden lg:flex flex-col items-start'>
                            <span className='font-medium'>{user.fullName}</span>
                            <span className='font-thin'>Offline</span>
                        </div>

                    </button>
                ))}
            </div>

        </aside>
    )
}

export default Sidebar