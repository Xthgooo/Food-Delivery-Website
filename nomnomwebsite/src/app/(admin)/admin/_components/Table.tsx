"use client";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationLink,
} from "@/components/ui/pagination";
import { IconDropdown } from "react-day-picker";
import { useState } from "react";
import {
	FoodOrderInfo,
	StatusType,
} from "./contextProvider/AdminContextProvider";
import { ShowOrderedFoods } from "./ShowOrderedFoods";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";
import { myAPI } from "@/axios";

export function FoodOrdersDataTable({
	tableData,
	handleStatusChange,
	refreshOrders,
}: {
	tableData: FoodOrderInfo[];
	refreshOrders: () => void;
	handleStatusChange: ({
		status,
		orderID,
	}: {
		status: StatusType;
		orderID: string;
	}) => void;
}) {
	const data = tableData;
	const status: StatusType[] = ["Pending", "Delivered", "Cancelled"];
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const columns: ColumnDef<FoodOrderInfo>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					className="border-black"
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					className="border-black "
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			id: "rowNumber",
			header: () => <p className="w-5 flex justify-center">№</p>,
			cell: ({ row }) => {
				const num = row.index + 1;
				return <p className="w-5 flex justify-center">{num}</p>;
			},
			enableSorting: false,
		},
		{
			accessorKey: "user.profileEmoji",
			header: "User",
		},
		{
			accessorKey: "user.email",
			header: () => <p className="max-w-40 min-w-20 w-full flex">Customer</p>,
		},
		{
			id: "foodCount",
			header: () => <p className="max-w-40 min-w-20 w-full flex ">Food</p>,
			cell: ({ row }) => {
				const foodOrders = row.original.foodOrderItems;
				const count = foodOrders.reduce(
					(total, item) => total + item.quantity,
					0
				);
				console.log("one order array", foodOrders);
				return (
					<div className="max-w-40 min-w-20 w-full  justify-between  flex items-center">
						<p>
							{count} food{count !== 1 ? "s" : ""}
						</p>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<IconDropdown />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{foodOrders.map((order, index) => (
									<DropdownMenuItem key={index}>
										<ShowOrderedFoods
											image={order.food.image}
											foodName={order.food.foodName}
											count={order.quantity}
										/>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => {
				return (
					<div className="max-w-40 min-w-20 w-full justify-between flex items-center">
						<p>Date</p>
						<Button
							variant="ghost"
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === "asc")
							}>
							<svg
								width="9"
								height="12"
								viewBox="0 0 9 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M1.16675 7.99984L4.50008 11.3332L7.83341 7.99984M1.16675 3.99984L4.50008 0.666504L7.83341 3.99984"
									stroke="#09090B"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="max-w-40 min-w-20 w-full  flex items-center">
					{new Date(row.getValue("createdAt"))
						.toISOString()
						.split("T")[0]
						.replace(/-/g, "/")}
				</div>
			),
		},
		{
			accessorKey: "totalPrice",
			header: () => <div className="text-left">Total</div>,
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("totalPrice"));

				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(amount);

				return <div className="text-left font-medium">{formatted}</div>;
			},
		},
		{
			accessorKey: "address",
			header: "Delivery Address",
		},
		{ accessorKey: "_id", header: "", cell: () => null },
		{
			accessorKey: "status",
			header: "Delivery state",
			cell: ({ row }) => {
				const orderID: string = row.getValue("_id");
				return (
					<DropdownMenu>
						<DropdownMenuTrigger
							className="w-fit flex h-8 items-center p-[10px] gap-[10px] border text-[12px] font-bold rounded-full"
							style={{
								borderColor:
									row.getValue("status") === "Pending"
										? "black"
										: row.getValue("status") === "Delivered"
										? "green"
										: "red",
								color:
									row.getValue("status") === "Pending"
										? "black"
										: row.getValue("status") === "Delivered"
										? "green"
										: "red",
							}}>
							<p>{row.getValue("status")}</p>
							<svg
								width="9"
								height="12"
								viewBox="0 0 9 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M1.16675 7.99984L4.50008 11.3332L7.83341 7.99984M1.16675 3.99984L4.50008 0.666504L7.83341 3.99984"
									stroke="#09090B"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{status.map((status, index) => (
								<DropdownMenuItem
									key={index}
									onClick={() => handleChange({ status, orderID })}>
									{status}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => {
				const orderID = row.original._id;

				const handleDelete = async () => {
					const confirmed = window.confirm(
						"Are you sure you want to delete this order?"
					);
					if (!confirmed) return;

					try {
						await myAPI.delete(`/foodOrder/${orderID}`);
						toast.success("Order deleted successfully");
						refreshOrders();
					} catch (error) {
						toast.error("Failed to delete order");
						console.error("Delete error:", error);
					}
				};

				return (
					<button
						onClick={handleDelete}
						className="bg-black w-8 h-[30px] flex justify-center items-center rounded-md hover:bg-black/30">
						<Trash2Icon color="white" size={16} />
					</button>
				);
			},
		},
	];

	const handleChange = ({
		status,
		orderID,
	}: {
		status: StatusType;
		orderID: string;
	}) => {
		handleStatusChange({ status, orderID });
	};

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full h-full ">
			<div className=" bg-white/60">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="bg-white/70 h-14">
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="border-1 border-black/20">
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="space-x-2 text-white">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious onClick={() => table.previousPage()} />
							</PaginationItem>

							{Array.from({ length: table.getPageCount() }).map((_, index) => (
								<PaginationItem key={index}>
									<PaginationLink
										isActive={table.getState().pagination.pageIndex === index}
										onClick={() => table.setPageIndex(index)}
										className="bg-white/40 rounded-[50%]">
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							))}

							<PaginationItem>
								<PaginationNext
									onClick={() => table.nextPage()}
									// disabled={!table.getCanNextPage()}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	);
}
