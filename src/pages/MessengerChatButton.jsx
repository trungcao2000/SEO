import React from "react";
import { Fab, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const MessengerLinkButton = () => {
  const messengerLink = "https://m.me/104708512416680"; // Thay bằng Page ID của bạn

  const handleClick = () => {
    const newWindow = window.open(
      messengerLink,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Tooltip title="Chat qua Messenger">
      <Fab
        color="primary"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#0084FF",
          color: "#fff",
          "&:hover": { bgcolor: "#006bbd" },
          fontFamily: "Times New Roman",
          zIndex: 1000,
        }}
      >
        <ChatIcon />
      </Fab>
    </Tooltip>
  );
};

export default MessengerLinkButton;
