import React from 'react'
import ChallengeDashboardLayout from './(components)/ChallengeDashboardLayout'
import { getSession } from '@/lib/auth';
const page = async () => {
    const session = await getSession();
    return (
        <div className='w-full min-h-screen'>
            <ChallengeDashboardLayout session={session}/>
        </div>
    )
}

export default page