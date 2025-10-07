import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "@/features/users/userSlice";
import { render } from "@testing-library/react";

// root reducer'ı açıkça tanımla → configureStore doğru overload'ı seçsin
const rootReducer = combineReducers({
  users: usersReducer,
});

export type TestRootState = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<TestRootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as any,
  });
}

export function renderWithStore(
  ui: React.ReactElement,
  { preloadedState }: { preloadedState?: Partial<TestRootState> } = {}
) {
  const store = makeStore(preloadedState);
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
