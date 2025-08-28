"use client";

import { Provider } from "react-redux";
import InnerProviders from "./InnerProviders";
import { store } from "@/components/redux/store";

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <Provider store={store}>
      <InnerProviders>{children}</InnerProviders>
    </Provider>
  );
};

export default Providers;
