"use client";

import SidebarLayout from '@/layouts/sidebar-layout'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../../../lib/utils'
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { DataTable } from '@/components/table/index';
import { SlOptions } from "react-icons/sl";
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    editable?: boolean;
    className?: (value: any, row: T) => string;
    width?: string | number;
};

const headings: Heading<Transaction>[] = [
    { name: 'Id', accessor: 'id', editable: true, className: (value) => value === 1 ? "bg-red-300 text-white" : "" },
    { name: 'Date', accessor: 'date', editable: true, },
    { name: 'Description', editable: true, accessor: 'description', className: (value) => value === "Salary" ? "bg-red-300 text-white" : "" },
    { name: 'Amount', accessor: 'amount', render: (value) => `₹${Math.abs(value).toLocaleString()}`, className: (value) => value < 0 ? 'text-red-500' : 'text-green-600' },
    { name: 'Type', accessor: 'type' },
    {
        name: 'Action',
        accessor: 'action',
        render: (_value, row) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="p-1 hover:bg-gray-200 rounded">
                        <SlOptions className="w-4 h-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => alert(`Editing ${row.description + " " + row.id}`)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert(`Deleting ${row.description + " " + row.id}`)}>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert(`Sharing ${row.description + " " + row.id}`)}>
                        Share
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

const data = [
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

const columnHelper = createColumnHelper<Transaction>();

const page = () => {
    const tablePerRows = 5;
    const [tableData, setTableData] = useState<Transaction[]>(data as Transaction[])
    const [editingCell, setEditingCell] = useState<{ rowId: number; column: string } | null>(null);
    const [editedValue, setEditedValue] = useState<string | number>("");
    const [savedValue, setSavededValue] = useState<string | number>("");
    const [open, setOpen] = useState(false)

    const updateRow = (id: number, newValue: string | number, key: string) => {
        console.log(newValue);
        console.log(editedValue, "edit");
        const newData = tableData.map((item) =>
            item.id === id ? { ...item, [key]: (newValue) ? newValue : editedValue } : item
        );
        setTableData(newData as Transaction[])
    };

    const columns = headings.map((heading) => {
        return columnHelper.accessor(heading.accessor as any, {
            header: () => (<div className='bg-[#F7AB79] h-full flex justify-center items-end'>{heading.name}</div>),
            cell: (info) => {
                const value = info.getValue();
                const row = info.row.original;
                const isEditing = editingCell?.rowId === row.id && editingCell?.column === heading.accessor;
                const content = heading.render ? heading.render(value, row) : value;
                const className = heading.className ? heading.className(value, row) : '';

                const editableFields: string[] = [];
                if (heading.editable) {
                    editableFields.push(heading.accessor)
                }

                if (isEditing) {
                    return (
                        <div className={cn(info.row.index === tablePerRows - 1 ? "flex flex-col-reverse gap-1" : "flex flex-col gap-1")}>
                            <div>
                                <input
                                    className="border px-2 py-1 w-full"
                                    value={editedValue}
                                    autoFocus
                                    onChange={(e) => setEditedValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            updateRow(row.id, editedValue, heading.accessor);
                                            setSavededValue(editedValue);
                                            setEditingCell(null);
                                        } else if (e.key === 'Escape') {
                                            setEditingCell(null);
                                        }
                                    }}
                                />
                            </div>
                            <div className='relative '>
                                <div
                                    className={cn(
                                        info.row.index === tablePerRows - 1 ? "absolute bottom-0" : "absolute top-0",
                                        "flex w-full justify-end gap-2"
                                    )}
                                >
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setEditedValue(savedValue);
                                            setEditingCell(null);
                                        }}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        className="bg-[#F7AB79] hover:bg-[#c59575] text-white"
                                        variant="outline"
                                        onClick={() => {
                                            updateRow(row.id, editedValue, heading.accessor);
                                            setSavededValue(editedValue);
                                            setEditingCell(null);
                                        }}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>

                        </div>

                    );
                }

                return (
                    <div
                        className={cn(className, "flex justify-end items-center truncate p-2")}
                        style={{ width: heading.width, minHeight: "40px" }}
                        onClick={() => {
                            if (editableFields.includes(heading.accessor as string)) {
                                setEditingCell({ rowId: row.id, column: heading.accessor as string });
                                setEditedValue(value);
                                setSavededValue(value)
                            }
                        }}
                    >
                        {content}
                    </div>
                );
            },
        });
    });


    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: tablePerRows,
            },
        },

    })

    return (
        <SidebarLayout>
            <div className={cn("bg-white flex gap-4 px-5 py-4 h-full ")}>
                <div className={cn("border border-gray-400 rounded-[7px] duration-500", open ? "w-[260px]" : "w-[60px]")} onClick={() => setOpen((prev) => !prev)}></div>
                <div className={cn("border flex-1 border-gray-400 rounded-[7px] p-4")}>
                    <DataTable table={table} />
                </div>
            </div>
        </SidebarLayout>
    )
}

export default page