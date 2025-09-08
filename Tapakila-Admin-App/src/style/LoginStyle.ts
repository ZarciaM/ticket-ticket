import { SxProps } from "@mui/material";

export const LoginStyle: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/bgLogin.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",

  "& .MuiCard-root": {
    padding: "2rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
    textAlign: "center",
    minWidth: "320px",
  },

  "& .MuiTextField-root": {
    width: "100%",
    marginBottom: "1rem",
  },

  "& .MuiButton-root": {
    marginTop: "1rem",
    padding: "10px",
    fontSize: "16px",
  },
};
