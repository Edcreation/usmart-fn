export interface BaseModel {
	id: string;
	status: Status;
	createdAt: string;
	updatedAt: string;
}

export interface ListResponse<T> {
	list: T[];
	total: number;
	previousPage: number | null;
	nextPage: number | null;
	currentPage: number;
}

export type Status = "active" | "inactive" | "pending";