import { cn } from '@/lib/utils'
import { Column } from '@tanstack/react-table'
import React, { useState } from 'react'

type EditableType = 'input' | 'select' | undefined

type EditableComponentProps<T> = {
    info: any
    heading: any
    editable: boolean | undefined
    editableType: EditableType
    options?: string[]
    updateRow: (a: any, b: any) => void
}

const TableCell = <T,>({ info, heading, editable, editableType, options = [], updateRow }: EditableComponentProps<T>) => {
    const [editingCell, setEditingCell] = useState<{ rowId: number; column: string } | null>(null);
    const [editedValue, setEditedValue] = useState<string | number>("");
    const value = info.getValue();
    const row = info.row.original;
    const isEditing = editingCell?.rowId === row.id && editingCell?.column === heading.accessor;
    const content = heading.render ? heading.render(value, row) : value;
    const className = heading.className ? heading.className(value, row) : '';

    const editableFields: string[] = [];
    if (heading.editable) {
        editableFields.push(heading.accessor)
    }
    return (
        <div>

            {isEditing && editable && editableType === 'input' && (
                <input
                    className="border px-2 py-1 w-full"
                    value={editedValue}
                    autoFocus
                    onChange={(e) => setEditedValue(e.target.value)}
                    onBlur={() => {
                        updateRow(row.id, editedValue);
                        setEditingCell(null);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            updateRow(row.id, editedValue);
                            setEditingCell(null);
                        } else if (e.key === 'Escape') {
                            setEditingCell(null);
                        }
                    }}
                />
            )}
            {isEditing && editable && editableType === 'select' && (
                <select
                    value={(editedValue ?? '') as string}
                    onChange={(e) => setEditedValue(e.target.value)}
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

            {!isEditing && <div
                className={cn(className, "flex justify-end items-center truncate p-2")}
                style={{ width: heading.width, minHeight: "40px" }}
                onClick={() => {
                    if (editableFields.includes(heading.accessor as string)) {
                        setEditingCell({ rowId: row.id, column: heading.accessor as string });
                        setEditedValue(value);
                    }
                }}
            >
                {content}
            </div>}



        </div>
    )
}

export default TableCell
