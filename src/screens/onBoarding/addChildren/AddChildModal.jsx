import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Pie } from "@nivo/pie";

import { useAppContext } from "../../../context/appContext";

import {
  CustomButton,
  CustomDropDown,
  CustomFileUploader,
  CustomModal,
  CustomSubjectFoucsSlider,
  CustomTextInput,
} from "../../../components";

import { SaveIcon } from "../../../icons";

import { tokens } from "../../../theme";
import { $ } from "../../../utils";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AddChildModal = ({
  currentChildData = {},
  isModalOpen = { isOpen: false, mode: "create", index: -1 },
  setIsModalOpen = () => {},
  offset = {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { createNewChild, updateChild, isLoading } = useAppContext();
  const [birthday, setbirthday] = useState(
    isModalOpen.mode === "update" && currentChildData.birthday
      ? currentChildData.birthday
      : ""
  );

  const [fullname, setFullname] = React.useState(
    currentChildData.fullname || ""
  );
  // const [characterName, setcharacterName] = React.useState(
  //   currentChildData.characterName ? [currentChildData.characterName] : []
  // );
  const [characterName, setcharacterName] = React.useState(
    isModalOpen.mode === "update"
      ? currentChildData.favorite_character
        ? currentChildData.favorite_character.split(",")
        : []
      : []
  );

  let nameOfProfilePicture = "";
  if (isModalOpen.mode === "update") {
    // const listOfString =  currentChildData.img.split("/");
    const listOfString = currentChildData.profile_image.split("/");
    nameOfProfilePicture = listOfString[listOfString.length - 1];
  }
  const [pictureChanged, setPictureChanged] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    isModalOpen.mode === "update" ? { name: nameOfProfilePicture } : null
  );
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Oher", value: "Other" },
  ];

  const [gender, setGender] = React.useState(
    isModalOpen.mode === "update"
      ? genderOptions.filter((item) => {
          return item.value === currentChildData.gender;
        })[0]
      : ""
  );

  const difficultyOptions = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
    { label: "Very Hard", value: "very-hard" },
  ];

  const names = [
    { label: "Unicorn", value: "Unicorn" },
    { label: "cat", value: "Cat" },
    { label: "Polar Bear", value: "Polar Bear" },
    { label: "Dog", value: "Dog" },
    { label: "Butterfly", value: "Butterfly" },
    { label: "Blue Whale", value: "Blue Whale" },
  ];

  const [difficulty, setDifficulty] = React.useState(
    isModalOpen.mode === "update"
      ? difficultyOptions.filter((item) => {
          return item.value === currentChildData.difficulty;
        })[0]
      : ""
  );

  const [genderDropDownOpen, setGenderDropDownOpen] = React.useState(false);
  const [difficultyDropDownOpen, setDifficultyDropDownOpen] =
    React.useState(false);

  const subjectFocusDefaultValue = [
    {
      id: "1",
      label: "Science, biology, & Environment",
      color: colors.subjectsFocus[100],
      value: Math.floor(Math.random() * 100),
    },
    {
      id: "2",
      label: "Social Study & Langubirthdays",
      color: colors.subjectsFocus[200],
      value: Math.floor(Math.random() * 100),
    },
    {
      id: "3",
      label: "English & Coding",
      color: colors.subjectsFocus[300],
      value: Math.floor(Math.random() * 100),
    },
    {
      id: "4",
      label: "Logic, Life Skills, Emotions, & Innovation",
      color: colors.subjectsFocus[400],
      value: Math.floor(Math.random() * 100),
    },
    {
      id: "5",
      label: "Math, Money, & Music",
      color: colors.subjectsFocus[500],
      value: Math.floor(Math.random() * 100),
    },
  ];
  let childfocusClone = [];
  if (isModalOpen.mode === "update") {
    for (let index = 0; index < currentChildData.childfocus.length; index++) {
      const element = { ...currentChildData.childfocus[index] };
      childfocusClone[index] = element;
    }
  }

  const [subjectFocusGraphData, setSubjectFocusGraphData] = React.useState(
    isModalOpen.mode === "update" ? childfocusClone : subjectFocusDefaultValue
  );
  // console.log(subjectFocusGraphData);
  const [requestToCloseModel, setRequestToCloseModel] = useState(false);

  const [errors, setErrors] = React.useState({
    fullname: "",
    birthday: "",
    profilePicture: "",
    gender: "",
    difficulty: "",
    characterName: "",
  });

  const Validate = ({
    fullname,
    birthday,
    profilePicture,
    gender,
    difficulty,
    characterName,
  }) => {
    const _errors = { ...errors };

    if (!fullname) _errors.fullname = "Required!";
    else if (fullname.length < 3) _errors.fullname = "Minimum 3 characters!";
    else if (fullname.length > 50) _errors.fullname = "Maximum 50 characters!";
    else _errors.fullname = "";

    if (!birthday) _errors.birthday = "Required!";
    else _errors.birthday = "";

    if (!profilePicture) _errors.profilePicture = "Required!";
    else if (profilePicture?.file?.size > 1024 * 1024 * 2)
      _errors.profilePicture = "Maximum file size is 2MB!";
    else _errors.profilePicture = "";

    if (!gender) _errors.gender = "Required!";
    else _errors.gender = "";

    if (!difficulty) _errors.difficulty = "Required!";
    else _errors.difficulty = "";

    if (!characterName) _errors.characterName = "Required!";
    else _errors.characterName = "";

    setErrors(_errors);

    for (const key in _errors) if (_errors[key]) return false;
    return true;
  };

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setcharacterName(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (requestToCloseModel === true && isLoading === false) {
      setIsModalOpen({ isOpen: false, index: -1 });
      setFullname("");
      setbirthday("");
      setProfilePicture(null);
      setPictureChanged(false);
      setGender("");
      setDifficulty("");
      setcharacterName([]);
      setSubjectFocusGraphData(subjectFocusDefaultValue);
      setRequestToCloseModel(false);
    }
  }, [isLoading]);

  return (
    <CustomModal
      showBackdrop={true}
      title={isModalOpen.mode === "create" ? "Create Child" : "Update Child"}
      onClose={() =>
        setIsModalOpen({ isOpen: false, model: "create", index: -1 })
      }
      offset={offset}
      containerStyle={{
        maxWidth: $({ size: 1040 }),
        display: "flex",
        flexDirection: "column",
        gap: $({ size: 20 }),
      }}
      wrapperStyle={{
        left: "50%",
        transform: "translateX(-50%)",
        width: $({ size: 1040 }),
      }}
    >
      {(genderDropDownOpen || difficultyDropDownOpen) && (
        <Box
          onClick={() => {
            setGenderDropDownOpen(false);
            setDifficultyDropDownOpen(false);
          }}
          sx={{
            background: alpha(colors.extra.grey1, 0.4),
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: $({ size: 20 }),
            borderRadius: $({ size: 12 }),
            zIndex: 80,
          }}
        />
      )}
      <Grid container rowGap={$({ size: 16 })} columnSpacing={$({ size: 32 })}>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            label="Full name"
            placeholder="e.g. John Doe"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            error={errors.fullname}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            label="Birth Date"
            type="date"
            value={birthday}
            onChange={(e) => setbirthday(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFileUploader
            label="Profile Picture"
            placeholder={
              profilePicture ? profilePicture?.name : "Upload picture"
            }
            onClick={(file) => {
              setPictureChanged(true);
              setProfilePicture(file.file);
            }}
            error={errors.profilePicture}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDropDown
            value={gender?.label || ""}
            placeholder="Choose gender"
            label="Gender"
            dropDownOpen={genderDropDownOpen}
            setDropDownOpen={setGenderDropDownOpen}
            data={genderOptions.map((item) => {
              return {
                onClick: () => {
                  setGender(item);
                },
                component: (
                  <Typography
                    sx={{
                      fontSize: $({ size: 18 }),
                      fontWeight: gender.value === item.value ? "600" : "400",
                      color: colors.extra.grey1,
                      lineHeight: $({ size: 30 }),
                    }}
                  >
                    {item.label}
                  </Typography>
                ),
              };
            })}
            error={errors.gender}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDropDown
            value={difficulty?.label || ""}
            placeholder="Choose difficulty"
            label="Difficulty"
            dropDownOpen={difficultyDropDownOpen}
            setDropDownOpen={setDifficultyDropDownOpen}
            data={difficultyOptions.map((item) => {
              return {
                onClick: () => {
                  setDifficulty(item);
                },
                component: (
                  <Typography
                    sx={{
                      fontSize: $({ size: 18 }),
                      fontWeight:
                        difficulty?.value === item.value ? "600" : "400",
                      color: colors.extra.grey1,
                      lineHeight: $({ size: 30 }),
                    }}
                  >
                    {item.label}
                  </Typography>
                ),
              };
            })}
            error={errors.difficulty}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel
            id="demo-multiple-checkbox-label"
            sx={{
              fontSize: 18,
              fontWeight: "500",
              marginBottom: "10px",
              color: "black",
            }}
          >
            Favorite Characters
          </InputLabel>
          
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            label="Favourite Character"
            multiple
            value={characterName}
            onChange={handleChangeSelect}
            input={<OutlinedInput/>}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <p style={{ color:colors.extra.grey1, fontSize: "16px", padding:0, margin:0 }}>Favourite Character</p>;
              }
              return selected.join(", ");
            }}
            displayEmpty
            sx={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "10px",
              background: "#ECECEC",
              padding: "15px 10px",
              border: "none",
              fontSize: "16px",
              fontWeight: 500,
              '& .MuiSelect-select': {
                padding: '0px', // Adjust as needed
              },
              '& .MuiOutlinedInput-input': {
                padding: '0 10px', // Adjust as needed
              },
            }}
          >
            <MenuItem disabled value="">
            <span style={{ fontSize: "15px", fontStyle:"normal", padding:"0" }}>Favourite Character</span>
            </MenuItem>
            {names.map((name) => (
              <MenuItem key={name.label} value={name.value}>
                <Checkbox checked={characterName.indexOf(name.value) > -1} />
                <ListItemText primary={name.value}/>
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Box>
        <Typography
          sx={{
            fontSize: $({ size: 18 }),
            fontWeight: "500",
            lineHeight: $({ size: 30 }),
            color: colors.solids.black,
          }}
        >
          Focus
        </Typography>

        <Typography
          sx={{
            fontSize: $({ size: 13.5 }),
            fontWeight: "400",
            lineHeight: $({ size: 25 }),
            color: colors.solids.black,
          }}
        >
          The more the level of focus of a category is, the more we emphasize on
          it in your child’s learning journey. Choose wisely!
        </Typography>
      </Box>

      <Grid
        container
        rowGap={$({ size: 20 })}
        columnSpacing={$({ size: 20 })}
        sx={{ pr: $({ size: 20 }) }}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              position: "relative",
              height: $({ size: 280 }),
              width: $({ size: 280 }),
            }}
          >
            <Box
              sx={{
                filter: `drop-shadow(0 0 ${$({ size: 5 })} ${alpha(
                  colors.solids.black,
                  0.1
                )})`,
              }}
            >
              <Pie
                data={subjectFocusGraphData}
                innerRadius={0.65}
                padAngle={0}
                legends={[]}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                isInteractive={false}
                width={$({ size: 280, numeric: true })}
                height={$({ size: 280, numeric: true })}
                animate={false}
                fit={true}
                colors={(d) => d.data.color}
              />
            </Box>

            <Typography
              sx={{
                fontWeight: "700",
                fontSize: $({ size: 18 }),
                color: colors.extra.grey2,
                position: "absolute",
                lineHeight: $({ size: 30 }),
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: $({ size: 150 }),
                textAlign: "center",
              }}
            >
              Subjects Focus
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Grid
            container
            rowGap={$({ size: 16 })}
            columnSpacing={$({ size: 32 })}
          >
            {subjectFocusGraphData.map((item, index) => {
              return (
                <Grid item xs={12} lg={6} key={index}>
                  <CustomSubjectFoucsSlider
                    label={item.label}
                    color={item.color}
                    value={item.value}
                    onChange={(e) => {
                      const newData = [...subjectFocusGraphData];
                      newData[index].value = e.target.value;
                      setSubjectFocusGraphData(newData);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: $({ size: 24 }),
        }}
      >
        <CustomButton
          label="Cancel"
          disabled={isLoading}
          isSecondary
          sx={{
            maxWidth: $({ size: 160 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          onClick={() => {
            setIsModalOpen({ isOpen: false, index: -1 });
          }}
        />
        <CustomButton
          label={isLoading ? "Saving..." : "Save"}
          disabled={isLoading}
          sx={{
            maxWidth: $({ size: 160 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          rightIcon={<SaveIcon size={$({ size: 24, numeric: true })} />}
          onClick={() => {
            const isValid = Validate({
              fullname,
              birthday: birthday,
              profilePicture,
              gender,
              difficulty,
              characterName,
            });
            console.log(
              fullname,
              birthday,
              profilePicture,
              gender,
              difficulty,
              characterName
            );
            const child = {
              fullname,
              // birthday: birthday ? birthday.toISOString().split('T')[0] : null,
              birthday: birthday,
              gender: gender.value,
              profile_image: profilePicture,
              difficulty: difficulty.value,
              favorite_character: characterName.join(","),
              childfocus: JSON.stringify(subjectFocusGraphData),
            };
            if (isModalOpen.mode === "create") {
              createNewChild(child, profilePicture);
              setRequestToCloseModel(true);
            } else {
              let child = { child_id: currentChildData.id };
              if (currentChildData.fullname !== fullname) {
                child = { ...child, fullname: fullname };
              }
              if (currentChildData.birthday !== birthday) {
                // child.birthday = birthday ? birthday.toISOString() : null;
                child.birthday = birthday;
              }
              if (currentChildData.gender !== gender.value) {
                child = { ...child, gender: gender.value };
              }
              if (currentChildData.difficulty !== difficulty.value) {
                child = { ...child, difficulty: difficulty.value };
              }
              if (
                currentChildData.favorite_character !== characterName.join(",")
              ) {
                child = {
                  ...child,
                  favorite_character: characterName.join(","),
                };
              }
              let focusChange = false;
              for (
                let index = 0;
                index < currentChildData.childfocus.length;
                index++
              ) {
                if (
                  currentChildData.childfocus[index].value !==
                  subjectFocusGraphData[index].value
                ) {
                  focusChange = true;
                  break;
                }
              }
              if (focusChange) {
                child = {
                  ...child,
                  childfocus: JSON.stringify(subjectFocusGraphData),
                };
              }
              if (pictureChanged) {
                console.log("Picture also changed");
                // setPictureChanged(profilePicture);
              }
              console.log("child data is", child);
              // updateChild(child, pictureChanged ? profilePicture : null);
              // updateChild(child, pictureChanged ? profilePicture : null);
              updateChild(child, pictureChanged ? profilePicture : null);
              setRequestToCloseModel(true);
            }
          }}
        />
      </Box>
    </CustomModal>
  );
};

export default AddChildModal;
