"use client";

import Table from '@/components/table'
import SidebarLayout from '@/layouts/sidebar-layout'
import React, { useState } from 'react'
import { cn } from '../../../lib/utils'
import { createColumnHelper } from '@tanstack/react-table';

type Transaction = {
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
};

const data: Transaction[] = [
    { date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
    { date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
    { date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
    { date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
    { date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
    { date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
];

const columnHelper = createColumnHelper<Transaction>();

const columns = [
    columnHelper.accessor('date', {
        header: 'Date',
        cell: info => <div className='py-[6px] px-1'>{info.getValue()}</div>,
    }),
    columnHelper.accessor('description', {
        header: 'Description',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => (
            <span className={info.getValue() < 0 ? 'text-red-500' : 'text-green-600'}>
                ₹{Math.abs(info.getValue()).toLocaleString()}
            </span>
        ),
    }),
    columnHelper.accessor('type', {
        header: 'Type',
        cell: info => info.getValue(),
    }),
];


const page = () => {
    const [open, setOpen] = useState(true)
    return (
        <SidebarLayout>
            <div className={cn("bg-white flex gap-4 px-5 py-4 h-full ")}>
                <div className={cn("border border-gray-400 rounded-[7px] duration-500", open ? "w-[260px]" : "w-[60px]")} onClick={() => setOpen((prev) => !prev)}></div>
                <div className={cn("border flex-1 border-gray-400 rounded-[7px] p-4")}>
                    <Table data={data} columns={columns} />
                </div>

            </div>
        </SidebarLayout>
    )
}

export default page