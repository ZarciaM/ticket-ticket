import { Typography } from "@mui/material";
import {
  ArrayField,
  Datagrid,
  DateField,
  RichTextField,
  TextField,
} from "react-admin";

const CustomEmpty = () => (
  <Typography sx={{ fontFamily: "Poppins", padding: "20px 0", color: "red" }}>
    Pas de commentaire
  </Typography>
);

const MyExpand = () => {
  return (
    <RichTextField
      source="message_content"
      stripTags
      sx={{ fontFamily: "Poppins", fontSize: "1rem", textAlign: "center" }}
    />
  );
};

export default function MessageUser() {
  return (
    <ArrayField source="messages">
      <Datagrid
        bulkActionButtons={false}
        expand={<MyExpand />}
        expandSingle
        empty={<CustomEmpty />}
        rowClick={false}
        sx={{
          "& .RaDatagrid-headerCell": {
            fontWeight: "bold",
            color: "#FFBA08",
          },
          "& .column-message_subject": {
            padding: "20px 10px",
          },
          "& .RaDatagrid-row": {
            "&:hover": {
              backgroundColor: "rgba(0, 119, 255, 0.05)",
            },
            "&:nth-of-type(even)": {
              backgroundColor: "rgba(255, 186, 8, 0.05)",
            },
          },
        }}
      >
        <TextField
          source="message_id"
          label="ID"
          sx={{ color: "#0077FF", fontFamily: "Poppins", fontSize: "1rem" }}
        />
        <TextField
          source="message_subject"
          label="Titre"
          sx={{
            fontFamily: "Poppins",
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
        />
        <DateField
          source="message_date"
          label="Date de création"
          showTime
          sx={{ color: "#0077FF", fontFamily: "Poppins", fontSize: "1rem" }}
        />
      </Datagrid>
    </ArrayField>
  );
}
