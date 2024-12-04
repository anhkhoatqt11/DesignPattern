import React from 'react'
import Login from './Login'
import { alreadyLoggedIn } from '@/lib/auth';


const page = async () => {
    await alreadyLoggedIn();
    return (
        <div className='w-full min-h-screen flex items-center justify-center relative'>
            <Login />
        </div>
    )
}

export default page