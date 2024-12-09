import React from 'react'
import { getSession } from '@/lib/auth';
import IngameLayout from './(components)/IngameLayout';
const page = async () => {
    const session = await getSession();
    return (
        <div className='w-full min-h-screen'>
            <IngameLayout session={session}/>
        </div>
    )
}

export default page