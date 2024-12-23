import React from 'react'
import { getSession } from '@/lib/auth';
import TransactionHistoryLayout from '../(components)/TransactionHistoryLayout';


const page = async () => {
    const session = await getSession();
    return (
        <div className='w-full h-full'>
            <TransactionHistoryLayout session={session} />
        </div>
    )
}

export default page