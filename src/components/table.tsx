"use client"
import React from 'react'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import { spawn } from 'child_process';



const Table = ({ data, columns }: any) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full">
            <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="p-2 text-left border-b">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="p-2 border-b">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table