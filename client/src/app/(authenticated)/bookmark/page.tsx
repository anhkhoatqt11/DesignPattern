import React from 'react'
import { getSession } from '@/lib/auth';
import BookmarkLayout from './(components)/BookmarkLayout';


const page = async () => {
    const session = await getSession();
    return (
        <div className='w-full h-full'>
            <BookmarkLayout session={session}/>
        </div>
    )
}

export default page