import React from 'react'
import UserProfileLayout from '../(components)/UserProfileLayout'
import { getSession } from '@/lib/auth';


const page =  async () => {
    const session = await getSession();
    return (
        <div className='w-full h-full'>
            <UserProfileLayout session={session}/>
        </div>
    )
}

export default page