import {
  Show,
  TabbedShowLayout,
  WithRecord
} from "react-admin";
import MyProfil from "./MyProfil";
import TicketUser from "../ticket/TicketUser";
import MessageUser from "../message/MessageUser";

export const UserShow = () => {
  return (
    <Show
      sx={{
        "& .RaShow-card": {
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 119, 255, 0.1)",
        },
        "& .RaLabeled-label": {
          width: "150px",
          fontWeight: "bold",
          color: "#0077FF",
        },
      }}
    >
      <TabbedShowLayout sx={{ padding: "40px" }}>
        <TabbedShowLayout.Tab label="Profil" sx={{fontFamily: "Poppins"}} >
          <WithRecord render={(record) => <MyProfil record={record} />} />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Tickets" sx={{fontFamily: "Poppins"}}>
          <TicketUser />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Commentaire" sx={{fontFamily: "Poppins"}}>
          <MessageUser />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
