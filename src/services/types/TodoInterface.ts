import { TODO_STATUS } from "../../utils/constant.ts";

export interface ITodoResponse {
  id: number;
  title: string;
  description: string | null;
  status: TODO_STATUS;
  isCompleted: boolean;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ITodoCreatePayload {
  title?: string;
  status?: TODO_STATUS;
  description?: string;
  isCompleted?: boolean;
  dueDate?: string;
}
