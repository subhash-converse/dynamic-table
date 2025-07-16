import { Column } from '@tanstack/react-table'
import React from 'react'

type EditableType = 'input' | 'select'| undefined

type EditableComponentProps<T> = {
    column: Column<T, unknown>
    editable: boolean | undefined
    editableType: EditableType
    options?: string[]
}

const TableColumnFilter = <T,>({ column, editable, editableType, options = [] }: EditableComponentProps<T>) => {
    return (
        <div>
            {editable && editableType === 'input' && (
                <input
                    type="text"
                    placeholder="Search..."
                    value={(column.getFilterValue() ?? '') as string}
                    onChange={(e) => column.setFilterValue(e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border rounded text-sm"
                />
            )}
            {editable && editableType === 'select' && (
                <select
                    value={(column.getFilterValue() ?? '') as string}
                    onChange={(e) => column.setFilterValue(e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border rounded text-sm"
                >
                    <option value="">All</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default TableColumnFilter
