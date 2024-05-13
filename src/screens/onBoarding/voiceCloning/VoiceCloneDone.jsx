import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GET_VOICES, DELETE_VOICE } from "../../../config/backend_endpoints";

import { CustomButton } from "../../../components";

import { RightArrowIcon, ShapesIcon } from "../../../icons";

import { ASSETS } from "../../../config/assets";
import { ROUTES } from "../../../config/routes";
import { tokens } from "../../../theme";
import { $ } from "../../../utils";
import axios from "axios";
import CreateVoicePopup from "./VoicePopup";
import DeleteVoiceConfirmationPopup from "./DeleteVoiceConfirmationPopup";

const VoiceClone = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [parentName, setParentName] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        const response = await axios.get(GET_VOICES, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const voices = response.data;
        const firstVoiceKey = Object.keys(voices)[0];
        const parentName = voices[firstVoiceKey].parent_name;
        setParentName(parentName);
      } catch (error) {
        console.error("Error fetching parent name:", error);
      }
    };

    fetchData();
  }, [parentName]);

  const handleConfirmDeleteVoice = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      await axios.delete(DELETE_VOICE, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate(ROUTES.ON_BOARDING.VOICE_CLONE.VOICE);
    } catch (error) {
      console.error("Error deleting voice:", error);
      alert("Error deleting voice. Please try again.");
    }
  };

  const handleDeleteVoice = async () => {
    setConfirmationPopupOpen(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.grey[900],
        height: "max-content",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: {
          xs: $({ size: 20 }),
          lg: $({ size: 40 }),
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: colors.white[800],
          boxShadow: `0 0 ${$({ size: 8 })} 0 ${alpha(
            colors.solids.black,
            0.25
          )}`,
          width: "100%",
          borderRadius: $({ size: 12 }),
          flexGrow: 1,
          gap: $({ size: 24 }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
            gap: $({ size: 8 }),
            marginBottom: $({ size: 40 }),
          }}
        >
          <Box
            component="img"
            alt="logo"
            src={ASSETS.LOGO}
            sx={{
              width: {
                xs: $({ size: 140 }),
                lg: $({ size: 160 }),
              },
              alignSelf: "flex-start",
              margin: {
                xs: `${$({ size: 32 })} 0 0 ${$({ size: 32 })}`,
                lg: `${$({ size: 40 })} 0 0 ${$({ size: 40 })}`,
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginY: $({ size: 12 }),
            }}
          >
            <Box
              sx={{
                backgroundColor: "#E7F4F8",
                borderRadius: "50%",
                width: $({ size: 160 }),
                height: $({ size: 160 }),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                alt="volume"
                src={ASSETS.VOLUME}
                sx={{
                  width: "70%",
                  height: "auto",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: $({ size: 550 }),
              borderRadius: $({ size: 8 }),
              padding: $({ size: 2 }),
              marginY: $({ size: 4 }),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Heading */}
            <Typography
              variant="h4"
              sx={{
                color: "#363636",
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: $({ size: 6 }),
              }}
            >
              Clone Your Voice
            </Typography>

            {/* Paragraph */}
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#363636", fontSize: "18px" }}
            >
              By creating an AI clone of your voice, your children will be
              taught with your own voice, as if you were with there them!
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#72B216",
              width: $({ size: 306 }),
              height: $({ size: 157 }),
              paddingX: $({ size: 16 }),
              borderRadius: $({ size: 20 }),
              marginY: $({ size: "20" }),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              objectFit: "cover",
            }}
          >
            {/* Heading */}
            <Typography
              variant="h4"
              sx={{ color: "#FAFAFA", marginBottom: $({ size: 28 }) }}
            >
              {parentName || "Your Voices"}
            </Typography>

            {/* Edit and Delete buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
                marginTop: $({ size: 2 }),
              }}
            >
              {/* Edit Button */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setPopupOpen(true)}
              >
                <Box
                  component="img"
                  alt="edit-voice"
                  src={ASSETS.EDITVOICE}
                  sx={{ width: "24px", height: "24px", marginRight: "8px" }}
                />
                <Typography variant="body1" sx={{ color: "#FAFAFA" }}>
                  Edit
                </Typography>
              </Box>

              {/* Delete Button */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleDeleteVoice}
              >
                <Box
                  component="img"
                  alt="delete-voice"
                  src={ASSETS.DELETEVOICE}
                  sx={{ width: "24px", height: "24px", marginRight: "8px" }}
                />
                <Typography variant="body1" sx={{ color: "#FAFAFA" }}>
                  Delete
                </Typography>
              </Box>
            </Box>
          </Box>
          <CustomButton
            label="Continue"
            rightIcon={<RightArrowIcon size={$({ size: 24, numeric: true })} />}
            sx={{
              width: "fit-content",
              margin: {
                // xs: `0 ${$({ size: 24 })} ${$({ size: 24 })} 0`,
                lg: `0 ${$({ size: 40 })} ${$({ size: 0 })} 0`,
              },
              alignSelf: "flex-end",
            }}
            onClick={() => {
              navigate(ROUTES.PARENT.DASHBOARD.INDEX);
            }}
          />
        </Box>
      </Box>
      <Box>
        {/* Delete confirmation popup */}
        {confirmationPopupOpen && (
          <DeleteVoiceConfirmationPopup
           open={()=>setConfirmationPopupOpen(true)}
            onClose={() => setConfirmationPopupOpen(false)}
            onConfirmDelete={handleConfirmDeleteVoice}
          />
        )}
      </Box>
      <CreateVoicePopup
        open={popupOpen}
        onClose={() => {
          setPopupOpen(false);
          window.location.reload();
        }}
      />
    </Box>
  );
};

export default VoiceClone;
