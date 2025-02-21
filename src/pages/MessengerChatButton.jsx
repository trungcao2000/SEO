import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const MessengerChatButton = () => {
  const messengerUrl = "https:/m.me/104708512416680";

  return (
    <Tooltip title="Chat với chúng tôi trên Messenger" arrow>
      <IconButton
        color="primary"
        onClick={() => window.open(messengerUrl, "_blank")}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          bgcolor: "white",
          borderRadius: "50%",
          boxShadow: 3,
          width: 64,
          height: 64,
          animation: "bounce 2s infinite",
          "&:hover": {
            bgcolor: "primary.main",
            color: "white",
            transform: "scale(1.1)",
            transition: "all 0.3s ease",
          },
          "@keyframes bounce": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
          },
        }}
      >
        <ChatIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default MessengerChatButton;
