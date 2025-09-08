import { type ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import MyAppBar from "./components/Layout/MyAppBar";
import { MyMenu } from "./components/Layout/MyMenu";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <RALayout
      appBar={MyAppBar}
      menu={MyMenu}
      sx={{
        padding: "40px",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/bgHome.jfif)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "& .RaLayout-content": {
          background: "transparent",
        },
      }}
    >
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  );
};
