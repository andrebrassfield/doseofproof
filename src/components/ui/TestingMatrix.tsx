"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import type { TestingMatrixRow, ResultStatus } from "@/lib/testing-matrix";

const columnHelper = createColumnHelper<TestingMatrixRow>();

const RESULT_COLORS: Record<ResultStatus, string> = {
  confirmed: "bg-green-500/10 border-green-500/30 text-green-400",
  abnormal: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  pending: "bg-white/5 border-white/20 text-white/60",
  normal: "bg-white/5 border-white/10 text-white/40",
  "n/a": "bg-white/5 border-white/10 text-white/30",
};

const CATEGORY_COLORS: Record<string, string> = {
  Structure: "text-accent border-accent/30 bg-accent/5",
  Mold: "text-amber-400 border-amber-500/30 bg-amber-500/5",
  MCAS: "text-purple-400 border-purple-500/30 bg-purple-500/5",
  Autonomic: "text-green-400 border-green-500/30 bg-green-500/5",
};

interface TestingMatrixProps {
  rows: TestingMatrixRow[];
}

export function TestingMatrix({ rows }: TestingMatrixProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(rows.map((r) => r.category))).sort(),
    [rows]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Test",
        cell: (info) => (
          <Link
            href={info.row.original.href}
            className="text-white font-bold hover:text-accent transition-colors"
          >
            {info.getValue()}
          </Link>
        ),
        filterFn: "includesString",
      }),
      columnHelper.accessor("category", {
        header: "Pillar",
        cell: (info) => {
          const cat = info.getValue();
          const color = CATEGORY_COLORS[cat] ?? "text-white/60 border-white/10";
          return (
            <span className={`border px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold ${color}`}>
              {cat}
            </span>
          );
        },
        filterFn: (row, _columnId, filterValue) => {
          if (!filterValue) return true;
          return row.original.category === filterValue;
        },
      }),
      columnHelper.accessor("stage", {
        header: "Stage",
        cell: (info) => <span className="text-muted text-xs">{info.getValue()}</span>,
      }),
      columnHelper.accessor("costBand", {
        header: "Cost",
        cell: (info) => <span className="text-muted font-mono text-xs">{info.getValue()}</span>,
      }),
      columnHelper.accessor("turnaround", {
        header: "Turnaround",
        cell: (info) => <span className="text-muted font-mono text-xs">{info.getValue()}</span>,
      }),
      columnHelper.accessor("myResult", {
        header: "My Result",
        cell: (info) => {
          const result = info.getValue();
          if (!result) {
            return <span className="text-white/30 text-xs font-mono">—</span>;
          }
          return (
            <span
              className={`border px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold ${RESULT_COLORS[result]}`}
            >
              {result}
            </span>
          );
        },
        sortingFn: (a, b) => {
          const order = { confirmed: 0, abnormal: 1, pending: 2, normal: 3, "n/a": 4 } as Record<ResultStatus, number>;
          return (order[a.original.myResult ?? "n/a"] ?? 5) - (order[b.original.myResult ?? "n/a"] ?? 5);
        },
      }),
      columnHelper.accessor("myResultNote", {
        header: "Notes",
        cell: (info) => {
          const note = info.getValue();
          if (!note) return <span className="text-white/20 text-xs">—</span>;
          return (
            <span className="text-muted text-xs leading-relaxed line-clamp-2 max-w-md" title={note}>
              {note}
            </span>
          );
        },
        enableSorting: false,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const activeCategoryFilter =
    (table.getColumn("category")?.getFilterValue() as string | undefined) ?? "";

  return (
    <div className="space-y-4 js-only" data-component="TestingMatrix">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between border border-white/10 rounded-xl bg-zinc-950 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => table.getColumn("category")?.setFilterValue("")}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded border transition-colors ${
              activeCategoryFilter === ""
                ? "bg-accent text-black border-accent"
                : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
            }`}
          >
            All pillars
          </button>
          {categories.map((c) => {
            const color = CATEGORY_COLORS[c] ?? "text-white/60 border-white/10";
            const isActive = activeCategoryFilter === c;
            return (
              <button
                key={c}
                onClick={() =>
                  table.getColumn("category")?.setFilterValue(isActive ? "" : c)
                }
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded border transition-colors ${
                  isActive
                    ? `${color} bg-white/10`
                    : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <input
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search tests…"
          className="h-9 bg-black border border-white/15 rounded-md px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent md:w-64"
          aria-label="Filter tests by name or note"
        />
      </div>

      {/* Table */}
      <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-black/60 border-b border-white/10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sortDir = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        className={`text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-accent font-bold ${
                          canSort ? "cursor-pointer select-none hover:text-white" : ""
                        }`}
                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                        scope="col"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortDir === "asc" ? " ↑" : sortDir === "desc" ? " ↓" : ""}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-muted text-sm"
                  >
                    No tests match the current filter.{" "}
                    <button
                      onClick={() => {
                        setGlobalFilter("");
                        table.getColumn("category")?.setFilterValue("");
                      }}
                      className="text-accent hover:underline"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 align-top">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-muted flex justify-between">
          <span>
            {table.getFilteredRowModel().rows.length} of {rows.length} tests
          </span>
          <span>Click column headers to sort</span>
        </div>
      </div>
    </div>
  );
}
