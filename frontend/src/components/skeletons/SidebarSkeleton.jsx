import React from 'react'

const SidebarSkeleton = () => {

    const skeletonContacts = Array(5).fill(null);
    return (
        <div className='h-full w-full mt-6 py-3 overflow-y-auto flex flex-col gap-6 pl-4 pt-12'>
            {skeletonContacts.map((_, idx) => (
                <div key={idx} className="flex w-52 flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                        <div className="hidden lg:flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SidebarSkeleton