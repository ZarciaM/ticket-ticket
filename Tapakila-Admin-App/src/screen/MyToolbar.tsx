import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function MyToolbar() {
  return (
    <>
      <Avatar src="/tapakila.png" />
      <Typography
        variant="h6"
        sx={{
          flexGrow: "1",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#000",
          display: "inline-block",
          padding: "10px",
        }}
      >
        <span style={{ color: "#0077FF" }}>Tap</span>
        <span style={{ color: "#FFBA08" }}>akila</span>
        <span style={{ color: "#0077FF", paddingLeft: "10px" }}>Ad</span>
        <span style={{ color: "#FFBA08" }}>min</span>
      </Typography>
    </>
  );
}
