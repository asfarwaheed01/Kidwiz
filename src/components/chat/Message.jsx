import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { $ } from "../../utils";
import { ASSETS } from "../../config/assets";

import { TypingDots } from "../../components";

import {
    Box,
    Typography,
    Avatar,
  } from "@mui/material";

const Message = ({ message, loading=false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const isBot = message.sender === "bot";
  
    return (
      <Box
        sx={{
          display: "flex",
  
          justifyContent: isBot ? "flex-start" : "flex-end",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isBot ? "row" : "row-reverse",
            gap: 1,
          }}
        >
          <Box>
            <Avatar
              alt="chatbot"
              src={isBot? ASSETS.CHAT.CHAT_BOT_ICON: message.senderImage}
              sx={{
                  width:`${$({ size: 58 })}`,
                  height:`${$({ size: 58 })}`,
                  borderRadius: '50%',
                 }}
              />
          </Box>
  
          <Box>
            <Box
              // variant="outlined"
              sx={{
                backgroundColor: isBot
                  ? colors.chatColor[100]
                  : colors.chatColor[200],
                padding: $({ size: 12 }),
                paddingBottom:$({ size: loading? 20: 12 }),
                marginTop: $({ size: 18 }),
                borderRadius: $({ size: 12 }),
                maxWidth: "528px",
              }}
            >
              {loading && <TypingDots />}
              <Typography>{message.text}</Typography>
            </Box>
          </Box>
        </Box>
  
        {/* <Avatar
                  src={users_children[selected_Child_index].img}
                  sx={{
                    width: $({ size: 112 }),
                    height: $({ size: 112 }),
                    borderRadius: $({ size: 112 }),
                    border: `${$({ size: 3 })} solid ${
                      colors.greenAccent[500]
                    }`,
                    objectFit: 'cover',
                  }}
                /> */}
      </Box>
    );
  }

  export default Message;