import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export type TableColumn<Entry> = {
	title: string;
	field?: keyof Entry;
	Cell?({ entry }: { entry: Entry }): React.ReactElement;
	width?: number | string;
};

export type DataTableProps<Entry> = {
	columns: TableColumn<Entry>[];
	data: Entry[];
	total: number;
	currentPage: number;
	nextPage: () => void;
	previousPage: () => void;
	lastPage: number;
	isLoading?: boolean;
	pagination?: boolean;
	nextPageNumber?: number | null;
	onRowClick?(entry: Entry): void;
};

const DataTable = <Entry extends { id: string | number }>({
	columns,
	data,
	total,
	currentPage,
	nextPage,
	previousPage,
	isLoading = false,
	pagination = true,
	onRowClick,
	nextPageNumber,
}: DataTableProps<Entry>) => {
	return (
		<div className="flex flex-col space-y-4">
			<div className="overflow-x-auto">
				<table className="w-full table-auto">
					<thead>
						<tr className="bg-gray-100 text-gray-600 text-left">
							{columns.map((column, index) => (
								<th
									key={`headCell-${index}`}
									className="p-3"
									style={{ width: column.width }}
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{isLoading ? (
							<tr>
								<td colSpan={columns.length} className="p-4 text-center">
									Loading...
								</td>
							</tr>
						) : data.length === 0 ? (
							<tr>
								<td colSpan={columns.length} className="p-4 text-center">
									No data available
								</td>
							</tr>
						) : (
							data.map((entry, index) => (
								<motion.tr
									key={entry.id}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
									whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
									className={`text-gray-700 hover:bg-gray-50/80 transition-colors ${
										onRowClick ? "cursor-pointer" : ""
									}`}
									onClick={() => onRowClick && onRowClick(entry)}
								>
									{columns.map(({ Cell, field }, cellIndex) => (
										<td key={`cell-${cellIndex}`} className="p-3">
											{Cell ? (
												<Cell entry={entry} />
											) : (
												<>{field ? entry[field] : field}</>
											)}
										</td>
									))}
								</motion.tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{pagination && data && data.length > 0 && (
				<div className="flex justify-between items-center pt-4 border-t border-gray-200">
					<div className="text-sm text-gray-500">
						Showing {data.length} of {total} entries
					</div>
					<div className="flex space-x-2">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							disabled={currentPage === 1}
							onClick={() => previousPage()}
							className={`px-3 py-1 border border-gray-300 rounded-md ${
								currentPage === 1
									? "text-gray-400 cursor-not-allowed"
									: "text-gray-700 hover:bg-gray-100"
							} transition-colors`}
						>
							<div className="flex items-center">
								<FiChevronLeft className="mr-1" /> Previous
							</div>
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							disabled={!nextPageNumber && currentPage !== 1}
							onClick={() => nextPage()}
							className={`px-3 py-1 border border-gray-300 rounded-md ${
								!nextPageNumber && currentPage !== 1
									? "text-gray-400 cursor-not-allowed"
									: "text-gray-700 hover:bg-gray-100"
							} transition-colors`}
						>
							<div className="flex items-center">
								Next <FiChevronRight className="ml-1" />
							</div>
						</motion.button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DataTable;
