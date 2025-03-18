import { store } from "../../redux.ts";
import { adminApi } from "../adminApi.ts";
import { IUserDataGrid } from "../types/UserInterface.tsx";

export const changeRoleService = async (user: IUserDataGrid, role: string) => {
  try {
    await store
      .dispatch(
        adminApi.endpoints.changeRoleUser.initiate({ id: user.id, role }),
      )
      .unwrap();
  } catch (err) {
    console.error(err);
  }
};
