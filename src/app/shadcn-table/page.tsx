"use client";

import Table from '@/components/table-html'
import SidebarLayout from '@/layouts/sidebar-layout'
import React, { useState } from 'react'
import { cn } from '../../../lib/utils'
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@/components/table';

type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    action?: React.ReactNode;
};

type Heading<T> = {
    name: string;
    accessor: keyof T;
    render?: (value: any, row: T) => React.ReactNode;
    className?: (value: any, row: T) => string;
};

const headings: Heading<Transaction>[] = [
    { name: 'Id', accessor: 'id' },
    { name: 'Date', accessor: 'date' },
    { name: 'Description', accessor: 'description', className: (value) => value === "Salary" ? "bg-red-300 text-white" : "" },
    { name: 'Amount', accessor: 'amount', render: (value) => `₹${Math.abs(value).toLocaleString()}`, className: (value) => value < 0 ? 'text-red-500' : 'text-green-600' },
    { name: 'Type', accessor: 'type' },
    {
        name: 'Action',
        accessor: 'action',
        render: (_value, row) => (
            <div className='flex gap-2 py-1'>
                <button
                    onClick={() => alert(`Editing: ${row.id}`)}
                    className="px-2 py-1 text-xs text-white bg-[#1758d0] rounded shadow-md"
                >
                    Edit
                </button>
                <button
                    onClick={() => alert(`Deleting: ${row.id}`)}
                    className="px-2 py-1 text-xs text-black bg-gray-200 rounded shadow-md"
                >
                    Delete
                </button>
            </div>
        ),
    },
];

const data: Transaction[] = [
    { id: 1, date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { id: 2, date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { id: 3, date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
    { id: 4, date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { id: 5, date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { id: 6, date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
    { id: 7, date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { id: 8, date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { id: 9, date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
    { id: 10, date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { id: 11, date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { id: 12, date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
    { id: 13, date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { id: 14, date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { id: 15, date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
    { id: 16, date: '2025-07-10', description: 'Salary', amount: 5000, type: 'credit' },
    { id: 17, date: '2025-07-11', description: 'Groceries', amount: -1200, type: 'debit' },
    { id: 18, date: '2025-07-12', description: 'Freelance', amount: 2000, type: 'credit' },
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
                    {/* <Table data={data} columns={columns} id={"table"} /> */}
                    {/* <DataTable columns={columns} data={data} /> */}
                    <table className="w-full table-fixed border border-collapse border-gray-300">
                        <tbody>
                            <tr className="align-top">
                                <td className="border p-2">
                                    <div className="min-h-[190px] bg-red-100">Tall Cell</div>
                                </td>
                                <td className="border p-2">
                                    <div className="min-h-[190px] bg-blue-100 flex items-center justify-center">
                                        ✅ Now it matches height!
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>

            </div>
        </SidebarLayout>
    )
}

export default page