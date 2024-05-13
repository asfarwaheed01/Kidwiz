import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  Modal,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../../config/assets";
import { ROUTES } from "../../../config/routes";
import { $ } from "../../../utils";
import { NoEncryption } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import {
  ADD_VOICE,
  GET_VOICES,
  DELETE_SINGLE_VOICE,
} from "../../../config/backend_endpoints";
import { Mp3Encoder } from "lamejs";
import lamejs from "lamejs";
import axios from "axios";
import MicRecorder from "mic-recorder-to-mp3";
import { ConfirmDeletePopup } from "./ConfirmDeletePopup";

const CreateVoicePopup = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [voiceName, setVoiceName] = useState("");
  const [voiceSamples, setVoiceSamples] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  const [recording, setRecording] = useState(false);
  const [mp3Recorder, setMp3Recorder] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  // State to store initial values
  const [initialVoiceName, setInitialVoiceName] = useState("");
  const [initialVoiceSamples, setInitialVoiceSamples] = useState([]);
  const [sampleToDelete, setSampleToDelete] = useState(null);
  const [voiceid, setVoiceId] = useState([]);
  const [nameError, setNameError] = useState("");
  const [samplesError, setSamplesError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(voiceSamples);

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          const accessToken = localStorage.getItem("token");
          const response = await axios.get(GET_VOICES, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const voices = response.data;
          const firstVoiceKey = Object.keys(voices)[0];
          const firstVoice = voices[firstVoiceKey];
          if (firstVoice) {
            setVoiceName(firstVoice.parent_name);
            setVoiceSamples(Object.values(voices).map((voice) => voice.url));
            setInitialVoiceName(firstVoice.parent_name);
            setInitialVoiceSamples(
              Object.values(voices).map((voice) => voice.url)
            );
          }
          // Delay setting voice IDs by 2 seconds
          setTimeout(() => {
            const voiceIds = Object.values(voices).map(
              (voice) => voice.voice_id
            );
            setVoiceId(voiceIds);
            console.log("Voice Ids are", voiceIds); // Print the voiceIds here
          }, 2000);
        } catch (error) {
          console.error("Error fetching voices:", error);
        }
      };
      fetchData();
    }
  }, [open]);

  if (!open) return null;

  const onSave = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const formData = new FormData();
      let nameChanged = false;
      let samplesChanged = false;
      setLoading(true);

      if (voiceName !== initialVoiceName) {
        formData.append("parent_name", voiceName);
        nameChanged = true;
        setNameError("");
      }
      formData.append("parent_name", voiceName);


      if (voiceSamples.length !== initialVoiceSamples.length) {
        voiceSamples.forEach((sample, index) => {
          // Check if the sample exists in initialVoiceSamples
          if (!initialVoiceSamples.includes(sample)) {
            formData.append(
              "input_voice",
              sample,
              String(sample.name || "recorded_voice")
            );
          }
        });
        samplesChanged = true;
        setSamplesError("");
      }
      // if (voiceSamples !== initialVoiceSamples) {
      //   voiceSamples.forEach((sample, index) => {
      //     // Check if the sample exists in initialVoiceSamples
      //     if (!initialVoiceSamples.includes(sample)) {
      //       formData.append(
      //         "input_voice",
      //         sample,
      //         String(sample.name || "recorded_voice")
      //       );
      //     }
      //   });
      //   samplesChanged = true;
      //   setSamplesError("");
      // }
      console.log("FormData:", formData.get("parent_name"));
      console.log("Input voice:", formData.getAll("input_voice"));
      if (
        !formData.has("parent_name") ||
        !formData.has("input_voice") ||
        !voiceName.trim() ||
        voiceSamples.length === 0
      ) {
        if (voiceName.trim() && voiceSamples.length === 0) {
          setNameError("");
          setSamplesError("At least 1 voice is required");
          setLoading(false);
          return;
        }

        if (!voiceName.trim() && voiceSamples.length > 0) {
          setNameError("Parent Name is Required");
          setSamplesError("");
          setLoading(false);
          return;
        }

        if (!voiceName.trim() && voiceSamples.length === 0) {
          setNameError("Parent Name is Required");
          setSamplesError("At least 1 voice is required");
          setLoading(false);
          return;
        }
      }

      // check if both are same
      if (
        voiceName === initialVoiceName &&
        voiceSamples.length === initialVoiceSamples.length
      ) {
        onClose();
        return;
      }

      // If either name or samples have changed, make the API call
      if (nameChanged || samplesChanged ) {
        console.log("FormData:", formData.get("parent_name"));
        console.log("Input voice:", formData.getAll("input_voice"));

        await axios.post(ADD_VOICE, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setLoading(false);
      navigate(ROUTES.ON_BOARDING.VOICE_CLONE.CLONING_DONE);
      onClose();
    } catch (error) {
      console.error("Error saving voice:", error);
    }
  };

  const handleCheckbox = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleRecordVoice = async () => {
    try {
      const mp3rec = new MicRecorder({ bitRate: 128 });
      mp3rec
        .start()
        .then(() => {
          setRecording(true);
          setMp3Recorder(mp3rec);
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mp3Recorder) {
      mp3Recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          setRecording(false);
          setVoiceSamples((prevSamples) => [...prevSamples, blob]);
        })
        .catch((e) => {
          alert("We could not retrieve your message");
          console.log(e);
        });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setVoiceSamples((prevSamples) => [...prevSamples, file]);
  };

  const handleDeleteSample = (sample, index) => {
    setSampleToDelete({ sample, index });
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async ({ sample, index }) => {
    try {
      // If the sample has a voiceId associated with it, delete it using the API
      if (voiceid[index]) {
        const accessToken = localStorage.getItem("token");
        await axios.delete(`${DELETE_SINGLE_VOICE}/${voiceid[index]}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const updatedVoiceId = [...voiceid];
        updatedVoiceId.splice(index, 1);
        setVoiceId(updatedVoiceId);
      }
      const updatedSamples = [...voiceSamples];
      updatedSamples.splice(index, 1);
      setVoiceSamples(updatedSamples);

      // Adjust the length of initialVoiceSamples
      const updatedInitialSamples = [...initialVoiceSamples];
      updatedInitialSamples.splice(index, 1);
      setInitialVoiceSamples(updatedInitialSamples);

      // Close the delete confirmation popup
      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting voice sample:", error);
    }
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation popup without deleting the sample
    setConfirmDeleteOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1040,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          border: "none",
          p: 4,
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h2" id="modal-title">
            Create Cloned Voice
          </Typography>
          <Box>
            <img
              alt="logo"
              src={ASSETS.POPUPCLOSE}
              onClick={onClose}
              style={{ height: "40px", width: "auto", cursor: "pointer" }}
            />
          </Box>
        </Box>
        <Box component="form" sx={{ width: "100%", mt: 2 }}>
          <Box>
            <InputLabel
              htmlFor="voice-name"
              sx={{
                color: "black",
                mb: 1,
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Voice Name
            </InputLabel>
            <input
              id="voice-name"
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
              placeholder="Mike’s voice"
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "10px",
                background: "#ECECEC",
                padding: "14px 5px",
                border: "none",
                color: "#090909",
                fontSize: "18px",
              }}
              required
            />
            {nameError && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>{nameError}</p>
            )}
          </Box>
          <Box style={{ width: "100%", mt: 2, fontSize: "18px" }}>
            <span style={{ fontWeight: "500" }}>Upload Voice Sample</span>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ced4da",
                borderRadius: "10px",
                background: "#ECECEC",
                mt: 1,
                mb: 2,
                p: 1,
                cursor: "pointer",
                fontWeight: "400",
              }}
            >
              <label
                htmlFor="upload-voice"
                style={{ width: "100%", cursor: "pointer" }}
              >
                <span style={{ color: "#363636" }}>
                  Click to upload a file or drag and drop. Audio or video files,
                  up to 10MB each.
                </span>
              </label>
              <img
                src={ASSETS.UPLOADVOICE}
                alt="Upload Voice"
                style={{ cursor: "pointer" }}
              />
            </Box>
            <input
              type="file"
              id="upload-voice"
              accept="audio/*, video/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            {samplesError && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>{samplesError}</p>
            )}
          </Box>
          <Box style={{ width: "100%", mt: "10px", fontSize: "18px" }}>
            <span style={{ fontWeight: "500" }}>Record Voice Sample</span>
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ced4da",
                borderRadius: "10px",
                background: "#ECECEC",
                mt: 1,
                p: 1,
                cursor: "pointer",
                fontWeight: "400",
              }}
              onClick={recording ? handleStopRecording : handleRecordVoice}
            >
              <span style={{ color: "#363636" }}>
                {recording ? "Stop Recording" : "Click here to start recording"}
              </span>
              <img
                src={ASSETS.RECORDVOICE}
                alt="Record Voice"
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Samples ({voiceSamples.length}/25)
          </Typography>
          <Typography sx={{ fontSize: "13.5px" }}>
            Sample quality is more important than quantity. Noisy samples may
            give bad results. Providing more than 5 minutes of audio in total
            brings little improvement.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <ConfirmDeletePopup // Render the ConfirmDeletePopup component
              open={confirmDeleteOpen}
              onClose={handleCancelDelete}
              // onConfirmDelete={handleConfirmDelete}
              onConfirmDelete={() => handleConfirmDelete(sampleToDelete)}
            />
            {voiceSamples.map((sample, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                {/* <Typography>{`Sample ${index + 1}`}</Typography> */}
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  {typeof sample === "string" ? (
                    <audio controls style={{ width: "100%", padding: "5px 0" }}>
                      <source src={sample} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : sample && typeof sample === "object" ? (
                    <audio controls style={{ width: "100%", padding: "5px 0" }}>
                      <source
                        src={URL.createObjectURL(sample)}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  ) : null}
                  <Button onClick={() => handleDeleteSample(sample, index)}>
                    <img
                      src={ASSETS.DELETEPOPUPVOICE}
                      alt="Delete Voice"
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                    />
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Checkbox
            checked={isChecked}
            onChange={handleCheckbox}
            color="primary"
            sx={{ width: "8px", height: "8px", mt: 1 }}
          />
          <Typography variant="body1" sx={{ fontSize: "18px", ml: 1 }}>
            I hereby confirm that I have all necessary rights or consents to
            upload and clone these voice samples and that I will not use the
            platform-generated content for any illegal, fraudulent, or harmful
            purpose. I reaffirm my obligation to abide by KidWiz’s Terms of
            Service and Privacy Policy.
          </Typography>
        </Box>
        {!isChecked && (
            <Typography variant="body2" color="error" sx={{fontSize:"14px"}}>
              Please confirm that you have all necessary rights or consents to
              upload and clone these voice samples.
            </Typography>
          )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            onClick={onClose}
            sx={{
              mr: 2,
              bgcolor: "white",
              borderRadius: "20px",
              paddingX: "20px",
              border: "1px solid lightgray",
              paddingY: "10px",
              width: "143px",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onSave}
            sx={{
              borderRadius: "20px",
              paddingX: "20px",
              background: "#72B216",
              display: "flex",
              alignItems: "center",
              gap: "10ox",
              width: "143px",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {loading ? "Saving..." : "Save"}{" "}
            <img
              src={ASSETS.SAVEVOICE}
              alt="Save Upload"
              style={{ marginLeft: "8px" }}
            />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateVoicePopup;
