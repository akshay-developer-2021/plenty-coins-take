import { type GetManyResponse, useMany, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

export const ProductList = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "description",
        accessorKey: "description",
        header: "Description",
      },
      {
        id: "price",
        accessorKey: "price",
        header: "Price",
        cell: function render({ getValue }) {
          return `$${getValue<any>()?.toFixed(2)}`;
        },
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse;
          };

          try {
            const category = meta.categoryData?.data?.find(
              (item) => item.id == getValue<any>()?.id
            );

            return category?.title ?? "Loading...";
          } catch (error) {
            return null;
          }
        },
      },
      {
        id: "stock",
        accessorKey: "stock",
        header: "Stock",
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: function render({ getValue }) {
          const status = getValue<any>();
          return (
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                backgroundColor: status === "active" ? "#52c41a" : "#ff4d4f",
                color: "white",
                fontSize: "12px",
              }}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return new Date(getValue<any>()).toLocaleString(undefined, {
            timeZone: "UTC",
          });
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              <button
                onClick={() => {
                  show("products", getValue() as string);
                }}
              >
                Show
              </button>
              <button
                onClick={() => {
                  edit("products", getValue() as string);
                }}
              >
                Edit
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const { edit, show, create } = useNavigation();

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: { tableQueryResult },
  } = useTable({
    columns,
  });

  const { data: categoryData } = useMany({
    resource: "categories",
    ids: tableQueryResult?.data?.data?.map((item) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!tableQueryResult?.data?.data,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Products</h1>
        <div>
          <button
            onClick={() => {
              create("products");
            }}
          >
            Create
          </button>
        </div>
      </div>
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
