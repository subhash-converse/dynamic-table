"use client";

import Table from '@/components/table'
import SidebarLayout from '@/layouts/sidebar-layout'
import React, { useState } from 'react'
import { cn } from '../../../lib/utils'
import { createColumnHelper } from '@tanstack/react-table';
import { El_Messiri } from 'next/font/google';

type Transaction = {
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
};

type Heading<T> = {
    name: string;
    accessor: keyof T;
    render?: (value: any, row: T) => React.ReactNode;
    className?: (value: any, row: T) => string;
};

const headings: Heading<Transaction>[] = [
    {
        name: 'Date',
        accessor: 'date',
    },
    {
        name: 'Description',
        accessor: 'description',
        className: (value) => value === "Salary" ? "bg-red-300 text-white" : ""

    },
    {
        name: 'Amount',
        accessor: 'amount',
        render: (value) => `₹${Math.abs(value).toLocaleString()}`,
        className: (value) => value < 0 ? 'text-red-500' : 'text-green-600',
    },
    {
        name: 'Type',
        accessor: 'type',
    }
];

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

const columnHelper = createColumnHelper<any>();

const columns = headings.map((heading) => {
    return columnHelper.accessor(heading.accessor as any, {
        header: heading.name,
        cell: (info) => {
            const value = info.getValue();
            const row = info.row.original;

            const content = heading.render ? heading.render(value, row) : value;
            const className = heading.className ? heading.className(value, row) : '';

            return <div className={className}>{content}</div>;
        },
    });
});


const page = () => {
    const [open, setOpen] = useState(true)
    return (
        <SidebarLayout>
            <div className={cn("bg-white flex gap-4 px-5 py-4 h-full ")}>
                <div className={cn("border border-gray-400 rounded-[7px] duration-500", open ? "w-[260px]" : "w-[60px]")} onClick={() => setOpen((prev) => !prev)}></div>
                <div className={cn("border flex-1 border-gray-400 rounded-[7px] p-4")}>
                    <Table data={data} columns={columns} id={"table"} />
                </div>

            </div>
        </SidebarLayout>
    )
}

export default page