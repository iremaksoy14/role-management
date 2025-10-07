// import React from "react";
// import "@testing-library/jest-dom";

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";
// import { render, screen, within, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import usersReducer from "@/features/users/userSlice";
// import UserTable from "@/features/users/UserTable";

// function renderWithStore(ui: React.ReactElement, preloadedState?: any) {
//   const rootReducer = combineReducers({ users: usersReducer });
//   const store = configureStore({ reducer: rootReducer, preloadedState });
//   const Wrapper = ({ children }: { children: React.ReactNode }) => (
//     <Provider store={store}>{children}</Provider>
//   );
//   return {
//     store,
//     user: userEvent.setup(),
//     ...render(ui, { wrapper: Wrapper }),
//   };
// }

// describe("UserTable", () => {
//   beforeEach(() => {
//     jest.restoreAllMocks();
//   });

//   test("Edit: tıklanınca onEdit doğru kullanıcıyla çağrılır", async () => {
//     const preloadedState = {
//       users: {
//         items: [
//           {
//             id: "1",
//             name: "Ayşe Yılmaz",
//             role: "Admin",
//             permissions: ["read", "write"],
//           },
//           {
//             id: "2",
//             name: "Mehmet Demir",
//             role: "Doctor",
//             permissions: ["read"],
//           },
//         ],
//         status: "idle",
//         error: null,
//         search: "",
//         roleFilter: "all",
//         page: 1,
//         pageSize: 10,
//       },
//     };

//     const onEdit = jest.fn();
//     const { user } = renderWithStore(
//       <UserTable onEdit={onEdit} />,
//       preloadedState
//     );

//     const row = await screen.findByRole("row", { name: /ayşe yılmaz/i });
//     const editBtn = within(row).getByRole("button", { name: /düzenle/i });
//     await user.click(editBtn);

//     expect(onEdit).toHaveBeenCalledTimes(1);
//     expect(onEdit).toHaveBeenCalledWith(
//       expect.objectContaining({ id: "1", name: "Ayşe Yılmaz" })
//     );
//   });

//   test("Delete: Sil → onay sonrası satır tablodan kalkar", async () => {
//     jest.spyOn(global, "fetch").mockImplementation((input: any, init?: any) => {
//       const url = typeof input === "string" ? input : input.toString();
//       if (/\/users\/\w+$/.test(url) && init?.method === "DELETE") {
//         return Promise.resolve(new Response(null, { status: 200 }));
//       }
//       return Promise.reject(new Error("Unhandled request: " + url));
//     });

//     const preloadedState = {
//       users: {
//         items: [
//           {
//             id: "u-01",
//             name: "İrem Aksoy",
//             role: "Admin",
//             permissions: ["read", "write"],
//           },
//           {
//             id: "u-02",
//             name: "Ceren Aksoy",
//             role: "Doctor",
//             permissions: ["read"],
//           },
//         ],
//         status: "idle",
//         error: null,
//         search: "",
//         roleFilter: "all",
//         page: 1,
//         pageSize: 10,
//       },
//     };

//     const { user } = renderWithStore(<UserTable />, preloadedState);

//     const row = await screen.findByRole("row", { name: /ayşe yılmaz/i });
//     const deleteBtn = within(row).getByRole("button", { name: /sil/i });
//     await user.click(deleteBtn);

//     const confirmBtn = await screen.findByRole("button", { name: /^sil$/i });
//     await user.click(confirmBtn);

//     await waitFor(() => {
//       expect(
//         screen.queryByRole("row", { name: /ayşe yılmaz/i })
//       ).not.toBeInTheDocument();
//     });
//   });
// });
