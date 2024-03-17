import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../context/appContext";

import { LeftArrowIcon, RefreshIcon } from "../../../icons";

// import { Box, Typography, alpha, useTheme } from '@mui/material'
import { DashboardContainer, CustomBreadcrumbs } from "../../../components";
import { CustomButton, CustomTextInput, Message } from "../../../components";
import { ROUTES } from "../../../config/routes";
// import { ASSETS } from "../../../config/assets";
import { alpha, useTheme } from "@mui/material/styles";

import { BOT_CHAT } from "../../../config/backend_endpoints";

import { tokens } from "../../../theme";
import { $ } from "../../../utils";

import { Box, Typography, Avatar, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

var messagesData = [];
//   {
//     id: 1,
//     text: "Hi there!.bhkec ke bckhecbhekbckehbcd khebckh ebkjc ekcb khd cbhkdbc dic khd cbkd cbueocbdj cbekjd cbkjdb ckdj bc djkcbd c bdubc kdjbc djk bcudeo bcjd bckjdeb cjb cjdb jcbd jc bdjk",
//     sender: "bot",
//   },
//   { id: 2, text: "Hello!", sender: "user" },
//   { id: 3, text: "How can I assist you today?", sender: "bot" },
//   { id: 4, text: "Hello!", sender: "user" },
//   { id: 5, text: "How can I assist you today?", sender: "bot" },
//   { id: 6, text: "Hello!", sender: "user" },
//   { id: 7, text: "How can I assist you today?", sender: "bot" },
//   { id: 8, text: "Hello!", sender: "user" },
//   { id: 9, text: "How can I assist you today?", sender: "bot" },
//   { id: 10, text: "Hello!", sender: "user" },
//   { id: 11, text: "How can I assist you today?", sender: "bot" },

// ];

const ImproveParentingChat = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [rolePlayTopic, setRolePlayTopic] = useState(state.rolePlayTopic);
  // console.log(ROUTES.PARENT.LEARN_SUBJECT.INDEX);
  // console.log(ROUTES.PARENT.LEARN_SUBJECT.DETAIL.replace(':subjectId',subject.id));
  const [rolePlaySubTopic, setRolePlaySubTopic] = useState(
    state.rolePlaySubTopic
  );
  // SubjectDetailData = state.subject.courses;

  const { token, logoutUser, users_children, selected_Child_index } =
    useAppContext();

  const [userInput, setUserInput] = React.useState("");

  const [messages, setMessages] = useState(messagesData);
  const [serverRequest, setServerRequest] = useState({
    loading: false,
    status: "",
    response: "",
    error: "",
  });
  const [messageRequestParams, setMessageRequestParams] = useState({
    answer: userInput,
    roleplaying: true,
    roleplay_topic: rolePlayTopic?.topic_title || "",
    roleplay_subtopic: rolePlaySubTopic?.topic_title || "",
    roleplay_prompt: rolePlaySubTopic?.prompt || "",
    subject: "",
    topic: "",
    age: users_children[selected_Child_index].age,
    level: "easy",
    questions: "10",
    childId: users_children[selected_Child_index].id,
    messages: serverRequest.response,
  });
  
  const scrollRef = useRef(null);
  const handleUserMessageSend = () => {
    if (userInput !== "") {
      messagesData.push({
        id: messages.length + "userInput",
        text: userInput,
        sender: users_children[selected_Child_index].fullname,
        senderImage: users_children[selected_Child_index].img,
      });
      setMessages(messagesData);

      let data = {
        ...messageRequestParams,
        answer: userInput,
        messages: serverRequest.response,
      };
      chatCommunication(
        authorizedAxios,
        setServerRequest,
        messagesData,
        setMessages,
        data
      );
      setUserInput("");
    }
  };

  const handleStartOver = async () => {
    messagesData = [];
    setMessages(messagesData);
    setServerRequest({
      loading: false,
      status: "",
      response: "",
      error: "",
    });
    
  };

  
  // Below Axios is for whole Application
  const authorizedAxios = axios.create({
    baseURL: "",
    // timeout: 3000,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Add a response interceptor
  authorizedAxios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response["status"] !== undefined) {
        if (error.response.status === 401) {
          logoutUser();
        }
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (messages.length === 0) {
      let data = {
        ...messageRequestParams
      };
      chatCommunication(
        authorizedAxios,
        setServerRequest,
        messagesData,
        setMessages,
        data
      );
    }

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages.length]);
  useEffect(() => {
    return () => {
      messagesData = [];
    };
  }, []);

  return (
    <DashboardContainer
      disableContainer
      // wrapperStyle={{ position: "relative", overflowY: "scroll" }}
    >
      <Grid
        container
        sx={{
          height: "max-content",
          minHeight: "100%",
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {/* <Grid
          item
          xs={12}
          lg={2.5}
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: $({ size: 24 }),
            backgroundColor: colors.white[800],
            boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
            borderRadius: $({ size: 12 }),
          }}
        >
          <Box> Extra </Box>
        </Grid> */}
        <Grid
          item
          xs={12}
        //   lg={9.5}
          lg={12}
          sx={{
            flex: "1",
            padding: {
              xs: `${$({ size: 24 })} 0 0 0`,
              lg: `0 0 0 ${$({ size: 24 })}`,
            },
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.white[800],
              boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
                colors.solids.black,
                0.25
              )}`,
              borderRadius: $({ size: 12 }),
              padding: $({ size: 28 }),
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: {
                  xs: $({ size: 24 }),
                  sm: $({ size: 16 }),
                },
              }}
            >
              <CustomBreadcrumbs
                data={[
                  { path: ROUTES.PARENT.LEARN_SUBJECT.INDEX, title: "Home" },
                  {
                    path: ROUTES.PARENT.IMPROVE_PARENTING.INDEX,
                    title: "Improve Parenting",
                  },
                ]}
              />
              <Box></Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: $({ size: 20 }),
                mt: `-${$({ size: 2 })}`,
              }}
            >
              <Box
                onClick={() => navigate(ROUTES.PARENT.IMPROVE_PARENTING.INDEX)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <LeftArrowIcon size={$({ size: 24, numeric: true })} />
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: $({ size: 31.98 }),
                    fontWeight: "600",
                    lineHeight: $({ size: 40 }),
                    color: colors.extra.grey1,
                    display: "inline",
                  }}
                >
                  Learn about
                </Typography>
                <Typography
                  sx={{
                    fontSize: $({ size: 31.98 }),
                    fontWeight: "600",
                    lineHeight: $({ size: 40 }),
                    color: colors.greenAccent[500],
                    display: "inline",
                  }}
                >{` ${rolePlayTopic?.topic_title || "N/A"} `}</Typography>
                {/* <Typography
                  sx={{
                    fontSize: $({ size: 31.98 }),
                    fontWeight: "600",
                    lineHeight: $({ size: 40 }),
                    color: colors.extra.grey1,
                    display: "inline",
                  }}
                >
                  Subject
                </Typography> */}
              </Box>
            </Box>

            <Box
              sx={{
                // background: "red",
                height: "90%",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  height: $({ size: 500, numeric: true }),
                  overflow: "scroll",
                  p: 2,
                }}
              >
                {messages.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
                {serverRequest.loading && (
                  <Message
                    key="BotThinking"
                    loading={serverRequest.loading}
                    message={{ id: "BotThinking", text: "", sender: "bot" }}
                  />
                )}
                {/* <TypingDots /> */}
                <div ref={scrollRef}> </div>
              </Box>

              <Box
                sx={{
                  borderTop: `1px solid ${colors.extra.grey4}`,
                  pl: 2,
                  pr: 2,
                  pt: 2,

                  ml: $({ size: -28 }),
                  mr: $({ size: -28 }),
                }}
              >
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                  }}
                  // spacing={2}
                >
                  <Grid item xs={12} lg={2.25}>
                    <CustomButton
                      label="Start Over"
                      rightIcon={
                        <RefreshIcon
                          size={$({ size: 15, numeric: true })}
                          color={colors.white[800]}
                        />
                      }
                      sx={{
                        // width: "fit-content",
                        width: $({ size: 147 }),
                        alignSelf: "flex-end",
                        // height: "100%",
                        height: $({ size: 56 }),
                        backgroundColor: colors.redAccent[400],
                        "&:hover": {
                          backgroundColor: alpha(colors.redAccent[400], 0.8),
                        },
                        textTransform: "none",
                        fontSize: $({ size: 18 }),
                        fontWeight: "500",
                        padding: `${$({ size: 5 })} ${$({ size: 10 })}`,
                        margin: 0,
                        fontWeight: "400",
                      }}
                      onClick={() => {
                        handleStartOver();
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={8.25} pr={"10px"} pl={"8px"}>
                    <CustomTextInput
                      label=""
                      placeholder="Send a Message"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(event) => {
                        // console.log('User pressed: ', event.key);

                        if (event.key === "Enter") {
                          handleUserMessageSend();
                          // console.log('Enter key pressed ✅');
                        }
                      }}
                      // value={promptTitle}
                      // onChange={(e) => setPromptTitle(e.target.value)}
                      // error={errorsPrompt.title}
                    />
                    {/* <TextField
                      fullWidth
                      placeholder="Type a message"
                      value={input}
                      onChange={handleInputChange}
                    /> */}
                  </Grid>
                  <Grid item xs={12} lg={1.5}>
                    <CustomButton
                      label="Send"
                      rightIcon={
                        <SendIcon
                          size={$({ size: 15, numeric: true })}
                          color={colors.white[800]}
                        />
                      }
                      sx={{
                        width: $({ size: 104 }),
                        alignSelf: "flex-end",
                        height: $({ size: 56 }),
                        // backgroundColor: colors.redAccent[400],
                        // "&:hover": {
                        //   backgroundColor: alpha(colors.redAccent[400], 0.8),
                        // },
                        textTransform: "none",
                        fontSize: $({ size: 18 }),
                        padding: `${$({ size: 5 })} ${$({ size: 10 })}`,
                        fontWeight: "700",
                        lineHeight: "30px",
                      }}
                      onClick={() => {
                        handleUserMessageSend();
                        // if (userInput !== "") {
                        //   messagesData.push( {
                        //     id: messages.length + "userInput",
                        //     text: userInput,
                        //     sender: users_children[selected_Child_index].fullname,
                        //     senderImage: users_children[selected_Child_index].img,
                        //   });
                        //   setMessages(messagesData);

                        //   let data = {
                        //     "answer": userInput,
                        //     "roleplaying": false,
                        //     "roleplay_topic":"",
                        //     "roleplay_subtopic":"",
                        //     "roleplay_prompt":"",
                        //     "subject": subject.subjectName,
                        //     "topic": course.courseName,
                        //     "age": "7",
                        //     "level": "easy",
                        //     "questions": "10",
                        //     "childId":users_children[selected_Child_index].id,
                        //     "messages": serverRequest.response,
                        //   }
                        //   chatCommunication(authorizedAxios, setServerRequest, messagesData, setMessages, data);
                        //   setUserInput("");
                        // }
                      }}
                    />
                    {/* <CustomButton
                      label="Send"
                      // disabled={promptUploadRequest.loading}
                      // loading={promptUploadRequest.loading}
                      sx={{
                        textTransform: "none",
                        fontSize: $({ size: 15 }),
                        // padding: `${$({ size: 5 })} ${$({ size: 10 })}`,
                        fontWeight: "700",
                        maxWidth: $({ size: 160 }),
                        boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
                          colors.solids.black,
                          0.25
                        )}`,
                      }}
                      rightIcon={
                        <SendIcon size={$({ size: 15, numeric: true })} />
                      }
                      onClick={() => {}}
                    /> */}
                    {/* <Button
                      fullWidth
                      size="large"
                      color="primary"
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={handleSend}
                    >
                      Send
                    </Button> */}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          height: "max-content",
          minHeight: "100%",
          display: "flex",
          flexDirection: "row",
          "&::-webkit-scrollbar": {
            width: $({ size: 12 }),
            borderRadius: $({ size: 12 }),
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.extra.grey3,
            borderRadius: $({ size: 12 }),
          },
          // ...gridStyle,
        }}
      >
        <Box
          // item
          // xs={2}
          sx={{
            height: "max-content",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            'backgroundColor': colors.white[800],
              'boxShadow': `0 0 ${$({ size: 2 })} 0 ${alpha(
                colors.solids.black,
                0.25
              )}`,
              'width': '224px',
              'borderRadius': $({ size: 12 }),
              'height': '100%',
              'padding': {
                xs: $({ size: 12 }),
                md: $({ size: 24 }),
              },
              'gap': {
                xs: $({ size: 24 }),
                md: $({ size: 40 }),
              },
              'flex': '1',
            // '&::-webkit-scrollbar': {
            //   width: $({ size: 12 }),
            //   borderRadius: $({ size: 12 }),
            // },
            // '&::-webkit-scrollbar-thumb': {
            //   backgroundColor: colors.extra.grey3,
            //   borderRadius: $({ size: 12 }),
            // },
            // ...gridStyle,
          }}
        >
          <Box
            
          >
            1
          </Box>
          
          
        </Box>
        <Grid item xs={10}>
          
        <Box
            sx={{
              'display': 'flex',
              'flexDirection': 'column',
              'backgroundColor': colors.white[800],
              'boxShadow': `0 0 ${$({ size: 2 })} 0 ${alpha(
                colors.solids.black,
                0.25
              )}`,
              'width': '840px',
              'borderRadius': $({ size: 12 }),
              'height': '100%',
              'padding': {
                xs: $({ size: 24 }),
                md: $({ size: 40 }),
              },
              'gap': {
                xs: $({ size: 24 }),
                md: $({ size: 40 }),
              },
              'flex': '1',
              // '&::-webkit-scrollbar': {
              //   width: $({ size: 12 }),
              //   borderRadius: $({ size: 12 }),
              // },
              // '&::-webkit-scrollbar-thumb': {
              //   backgroundColor: colors.extra.grey3,
              //   borderRadius: $({ size: 12 }),
              // },
              // ...containerStyle,
            }}>
            12
          </Box>

        </Grid>
      </Grid> */}
      {/* <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>

      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              placeholder="Type a message"
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="large"
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>

    </Box> */}
    </DashboardContainer>
  );
};

// const Message = ({ message, loading=false }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const isBot = message.sender === "bot";

//   return (
//     <Box
//       sx={{
//         display: "flex",

//         justifyContent: isBot ? "flex-start" : "flex-end",
//         mb: 2,
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: isBot ? "row" : "row-reverse",
//           gap: 1,
//         }}
//       >
//         <Box>
//           <Avatar
//             alt="chatbot"
//             src={isBot? ASSETS.CHAT.CHAT_BOT_ICON: message.senderImage}
//             sx={{
//                 width:`${$({ size: 58 })}`,
//                 height:`${$({ size: 58 })}`,
//                 borderRadius: '50%',
//                }}
//             />
//         </Box>

//         <Box>
//           <Box
//             // variant="outlined"
//             sx={{
//               backgroundColor: isBot
//                 ? colors.chatColor[100]
//                 : colors.chatColor[200],
//               padding: $({ size: 12 }),
//               marginTop: $({ size: 18 }),
//               borderRadius: $({ size: 12 }),
//               maxWidth: "528px",
//             }}
//           >
//             {loading && <TypingDots />}
//             <Typography>{message.text}</Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* <Avatar
//                 src={users_children[selected_Child_index].img}
//                 sx={{
//                   width: $({ size: 112 }),
//                   height: $({ size: 112 }),
//                   borderRadius: $({ size: 112 }),
//                   border: `${$({ size: 3 })} solid ${
//                     colors.greenAccent[500]
//                   }`,
//                   objectFit: 'cover',
//                 }}
//               /> */}
//     </Box>
//   );
// };

const chatCommunication = async (
  authorizedAxios,
  setServerRequest,
  messagesData,
  setMessages,
  data
) => {
  setServerRequest({
    loading: true,
    status: "start",
    response: "",
    error: "",
  });
  console.log(data);
  try {
    const response = await authorizedAxios.post(BOT_CHAT, {
      ...data,
    });
    console.log(response);
    setServerRequest({
      loading: false,
      status: "complete",
      response: response.data.messages,
      error: "",
    });
    messagesData.push({
      id: messagesData.length,
      text: response.data.messages[response.data.messages.length - 1].content,
      sender: "bot",
    });
    setMessages(messagesData);
  } catch (error) {
    console.error(error);
    setServerRequest({
      loading: false,
      status: "complete",
      response: "",
      error: error.message,
    });
  }
};

export default ImproveParentingChat;
