"use client";

import React from 'react'
import TransactionHistory from './TransactionHistory'
import { useQuery } from '@tanstack/react-query';
import { usePayment } from '@/hooks/usePayment';
import Loader from '@/components/Loader';

const TranscationHistoryLayout = ({ session }) => {

    const { getPaymentHistoriesByUserId } = usePayment();

    const { data: paymentHistories, isLoading: isPaymentHistoriesLoading } = useQuery({
        queryKey: ['payment', 'histories', session.user.id],
        queryFn: async () => {
            const res = await getPaymentHistoriesByUserId(session.user.id);
            return res;
        },
    });

    if (isPaymentHistoriesLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen container mx-auto'>
            <TransactionHistory paymentHistories={paymentHistories} />
        </div>
    )
}

export default TranscationHistoryLayout