import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, Modal, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CustomTextInput, CustomButton } from "../../../components";
import { ASSETS } from "../../../config/assets";
import { tokens } from "../../../theme";
import { $ } from "../../../utils";
import { RESET_USER_PASSWORD } from "../../../config/backend_endpoints";
import { ROUTES } from "../../../config/routes";

const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sendEmail = async (email) => {
    setError("");
    try {
      const response = await axios.post(RESET_USER_PASSWORD, {
        email: email,
      });
      console.log("Response from API:", response.data);
      setError("");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error sending email:", error);
      setError(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(ROUTES.AUTHENTICATION.LOGIN);
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.grey[900],
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.white[800],
          boxShadow: `0 0 ${$({ size: 8 })} 0 ${alpha(
            colors.solids.black,
            0.25
          )}`,
          borderRadius: $({ size: 24 }),
          padding: {
            xs: `${$({ size: 48 })} ${$({ size: 32 })}`,
            lg: `${$({ size: 80 })}`,
          },
          minWidth: $({ size: 600 }),
          minHeight: $({ size: 564 }),
          gap: $({ size: 48 }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: {
              xs: $({ size: 24 }),
              lg: $({ size: 80 }),
            },
          }}
        >
          <img
            src={ASSETS.LOGO}
            alt="logo"
            style={{
              height: $({ size: 65 }),
              paddingRight: $({ size: 16 }),
              marginTop: `-${$({ size: 4 })}`,
            }}
          />
          <Typography
            sx={{
              fontSize: $({ size: 31.98 }),
              fontWeight: "600",
              lineHeight: $({ size: 40 }),
              textAlign: "center",
              color: colors.solids.black,
              mt: `-${$({ size: 8 })}`,
              mb: `-${$({ size: 8 })}`,
            }}
          >
            Recover your password
          </Typography>
        </Box>
        {error && (
          <Typography
            sx={{
              fontSize: $({ size: 15.98 }),
              fontWeight: "400",
              lineHeight: $({ size: 22 }),
              textAlign: "center",
              color: colors.solids.error,
              mt: `-${$({ size: 4 })}`,
              mb: `-${$({ size: 4 })}`,
            }}
          >
            {error}
          </Typography>
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: $({ size: 48 }),
          }}
        >
          <CustomTextInput
            label="Email address"
            placeholder="you@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelStyle={{ pb: $({ size: 2 }) }}
          />
          <CustomButton
            label="Reset Password"
            onClick={() => sendEmail(email)}
          />
        </Box>
      </Box>
      {/* MUI Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Reset Password Email Sent Successfully
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            An email with instructions to reset your password has been sent to
            your email address.
          </Typography>
          <Button
            onClick={handleCloseModal}
            sx={{ mt: 2, background: "#72B216", fontWeight: 500 }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ResetPasswordScreen;
