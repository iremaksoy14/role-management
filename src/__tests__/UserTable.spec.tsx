// // @ts-nocheck
// import React from "react";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";
// import { render, screen, within, fireEvent } from "@testing-library/react";

// import usersReducer from "../features/users/userSlice";
// import UserTable from "../features/users/UserTable";

// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//     t: (key, opts) => {
//       if (key === "confirm.descDelete") {
//         return `“${opts?.name}”`;
//       }
//       const last = String(key).split(".").pop() || String(key);
//       const dict = {
//         users: "User list",
//         nameLabel: "Full Name",
//         role: "Role",
//         permissions: "Permissions",
//         actions: "Actions",
//         edit: "Edit",
//         delete: "Delete",
//         titleDelete: "Delete user",
//         loading: "Loading…",
//         empty: "No records",
//       };
//       return dict[last] ?? last;
//     },
//   }),
// }));

// function renderWithStore(ui, preloadedState) {
//   const rootReducer = combineReducers({ users: usersReducer });
//   const store = configureStore({ reducer: rootReducer, preloadedState });
//   return { store, ...render(<Provider store={store}>{ui}</Provider>) };
// }

// describe("UserTable", () => {
//   const preloadedState = {
//     users: {
//       items: [
//         {
//           id: "1",
//           name: "İrem Aksoy",
//           role: "Admin",
//           permissions: ["read", "write"],
//         },
//         { id: "2", name: "Ceren Aksoy", role: "Doctor", permissions: ["read"] },
//       ],
//       status: "idle",
//       error: null,
//       search: "",
//       roleFilter: "all",
//       page: 1,
//       pageSize: 10,
//     },
//   };

//   test("listeyi render eder ve sütun başlıkları görünür", () => {
//     renderWithStore(<UserTable />, preloadedState);

//     expect(screen.getByText("Full Name")).toBeInTheDocument();
//     expect(screen.getByText("Role")).toBeInTheDocument();
//     expect(screen.getByText("Permissions")).toBeInTheDocument();
//     expect(screen.getByText("Actions")).toBeInTheDocument();

//     expect(screen.getByText("İrem Aksoy")).toBeInTheDocument();
//     expect(screen.getByText("Ceren Aksoy")).toBeInTheDocument();
//   });

//   test("Edit tıklanınca doğru kullanıcı ile onEdit çağrılır", () => {
//     const onEdit = jest.fn();
//     renderWithStore(<UserTable onEdit={onEdit} />, preloadedState);

//     const row = screen.getByText("İrem Aksoy").closest("tr");
//     const editBtn = within(row).getByRole("button", { name: /edit/i });
//     fireEvent.click(editBtn);

//     expect(onEdit).toHaveBeenCalledTimes(1);
//     expect(onEdit.mock.calls[0][0]).toMatchObject({
//       id: "1",
//       name: "İrem Aksoy",
//     });
//   });

//   test("Delete tıklanınca confirm dialog açılır ve isim görünür", async () => {
//     renderWithStore(<UserTable />, preloadedState);

//     const row = screen.getByText("Ceren Aksoy").closest("tr");
//     const delBtn = within(row).getByRole("button", { name: /delete/i });
//     fireEvent.click(delBtn);

//     const dialog = await screen.findByRole("dialog");
//     expect(dialog).toBeInTheDocument();
//     expect(within(dialog).getByText(/Ceren Aksoy/)).toBeInTheDocument();
//     expect(
//       within(dialog).getByRole("button", { name: /delete/i })
//     ).toBeInTheDocument();
//   });

//   test("boş listede boş durum mesajı görünür", () => {
//     const emptyState = { users: { ...preloadedState.users, items: [] } };
//     renderWithStore(<UserTable />, emptyState);

//     expect(screen.getByText(/No records/i)).toBeInTheDocument();
//   });
// });
