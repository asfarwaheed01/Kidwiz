import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, useTheme, alpha } from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useAppContext } from '../../../context/appContext';

import {
  CustomButton,
  
  CustomModal,
  CustomTextInput,
} from '../../../components';

import { SaveIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import { JOURNAL } from '../../../config/backend_endpoints';



const JournalManagementModal = ({
  isModalOpen = { isOpen: false, index: -1, mode:'create' },
  setIsModalOpen = () => {},
  currentSelectedJournal = null,
  setCurrentSelectedJournal = () => {},
  offset = {
    top: 152,
    left: 48,
    right: 48,
  },
  
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { authorizedAxios, users_children, selected_Child_index } = useAppContext();

  const [journalTitle, setJournalTitle] = React.useState(
    currentSelectedJournal?.title || ''
  );

  const [journalContent, setJournalContent] = React.useState(
    currentSelectedJournal?.content || ''
  );

  const [dateDropDownOpen, setDateDropDownOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(
    dayjs(currentSelectedJournal?.date) || null
  );

  const [journalUploadRequest, setJournalUploadRequest] = useState({
    loading: false,
    status: "", // strat || complete
    error: "",
  });

  const [errorJournal, setErrorJournal] = useState({
    title: '',
    date: '',
    content: '',
  });

  const validateInput = ()=>{
    let _errors = {...errorJournal};
    if (journalTitle === "") {
      _errors.title = "Required";
    }else _errors.title = "";
    if (journalContent === "") {
      _errors.content = "Required";
    }else _errors.content = "";
    if (!selectedDate) {
      _errors.date = "Required";
    }else _errors.date = "";

    setErrorJournal(_errors);

    for (const key in _errors) if (_errors[key]) return false;
    return true;
  }

  useEffect(()=>{
    if (!journalUploadRequest.loading && journalUploadRequest.status === 'complete' && journalUploadRequest.error === '' ) {
      setIsModalOpen({ isOpen: false, index: -1, mode: 'create' });
      setCurrentSelectedJournal(null);      
    }
  },[journalUploadRequest]);

  return (
    <CustomModal
      title={
        currentSelectedJournal ? 'Edit Journal Entry' : 'New Journal Entry'
      }
      onClose={() => {
        setIsModalOpen({ isOpen: false, index: -1, mode: 'create' });
        setCurrentSelectedJournal(null);
      }}
      offset={{
        top: offset.top,
        left: offset.left,
        right: offset.right,
      }}
      containerStyle={{
        minWidth: $({ size: 760 }),
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 18 }),
      }}
      headerContainerStyle={{
        mt: `-${$({ size: 8 })}`,
      }}
      wrapperStyle={{
        left: '50%',
        transform: 'translateX(-50%)',
        width: $({ size: 760 }),
      }}>
      {dateDropDownOpen && (
        <Box
          onClick={() => {
            setDateDropDownOpen(false);
          }}
          sx={{
            background: alpha(colors.extra.grey1, 0.4),
            position: 'absolute',
            top: 0,
            left: 0,
            minWidth: $({ size: 760 }),
            bottom: $({ size: 20 }),
            borderRadius: $({ size: 12 }),
            zIndex: 80,
          }}
        />
      )}


        {journalUploadRequest.error !== "" &&
          <Typography
            sx={{
              fontSize: $({ size: 16 }),
              fontWeight: '400',
              color: colors.redAccent[500],
              lineHeight: $({ size: 30 }),
              paddingTop: $({ size: 4 }),
              
            }}>
            { journalUploadRequest.error }
          </Typography>
        }


      <Grid
        container
        rowGap={$({ size: 16 })}
        columnSpacing={$({ size: 48 })}>
        <Grid
          item
          xs={12}
          md={12}>
          <CustomTextInput
            label='Title'
            placeholder='Entry title'
            value={journalTitle}
            error={errorJournal.title}
            onChange={(e) => setJournalTitle(e.target.value)}
            labelStyle={{
              pb: 0,
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}>
          {/* <CustomDropDown
            label='Dates'
            // value={selectedDate}
            placeholder='Choose date'
            dropDownOpen={dateDropDownOpen}
            setDropDownOpen={setDateDropDownOpen}
            labelStyle={{
              pb: 0,
              mt: $({ size: 4 }),
            }}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs} 
          sx={{
            
            // borderRadius: $({ size: 12 }),
            // background: colors.extra.grey5,
            // boxShadow: `inset 0 0 ${$({ size: 2 })} ${alpha(
            //   colors.solids.black,
            //   0.25
            // )}`,
            // padding: `${$({ size: 12 })} ${$({ size: 24 })}`,
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'space-between',
            // width: '100%',
            // cursor: 'pointer',
            // gap: $({ size: 12 }),
            
            
          }}>
              <DatePicker 
                label="Choose date" 
                value={selectedDate}
                onChange={(value)=>{setSelectedDate(value)}}
                sx={{
                  width:"100%",
                  borderRadius: $({ size: 12 }),
                  background: colors.extra.grey5,
                  boxShadow: `inset 0 0 ${$({ size: 2 })} ${alpha(
                    colors.solids.black,
                    0.25
                  )}`,
                  
                  // padding: `${$({ size: 12 })} ${$({ size: 24 })}`,
                  // display: 'flex',
                  // alignItems: 'center',
                  // justifyContent: 'space-between',
                  // width: '100%',
                  // cursor: 'pointer',
                  // gap: $({ size: 12 }),
                  
                  
                }}
                />
          </LocalizationProvider>
          {errorJournal.date !== "" && (
            <Typography
              sx={{
                fontSize: $({ size: 16 }),
                fontWeight: '400',
                color: colors.redAccent[500],
                lineHeight: $({ size: 30 }),
                paddingTop: $({ size: 4 }),
              }}>
              {errorJournal.date}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={12}>
          <CustomTextInput
            label='Content'
            placeholder='Write the content of the entry...'
            value={journalContent}
            error={errorJournal.content}
            onChange={(e) => setJournalContent(e.target.value)}
            multiline={true}
            labelStyle={{
              pb: 0,
              mt: $({ size: 4 }),
            }}
            containerStyle={{
              width: '100%',
              height: $({ size: 240 }),
            }}
            inputContainerStyle={{
              height: `calc(100% - ${$({ size: 55, numeric: true })}px)`,
              pr: `${$({ size: 12 })}`,
            }}
            inputStyle={{
              'height': `calc(100% - ${$({ size: 8, numeric: true })}px)`,
              'overflowY': 'scroll',
              '&::-webkit-scrollbar': {
                width: $({ size: 6 }),
                borderRadius: $({ size: 6 }),
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: colors.extra.grey3,
                borderRadius: $({ size: 6 }),
              },
              'pr': $({ size: 6 }),
            }}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: $({ size: 24 }),
          mt: `-${$({ size: 16 })}`,
        }}>
        <CustomButton
          label='Cancel'
          isSecondary
          sx={{
            maxWidth: $({ size: 143 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          onClick={() => {
            setIsModalOpen({ isOpen: false, index: -1, mode: 'create' });
            setCurrentSelectedJournal(null);
          }}
        />
        <CustomButton
          label='Save'
          loading = {journalUploadRequest.loading}
          sx={{
            maxWidth: $({ size: 163 }),
            boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
          }}
          rightIcon={<SaveIcon size={$({ size: 24, numeric: true })} />}
          onClick={() => {
            if (validateInput()) {
              if (isModalOpen.mode === "create") {
                  // console.log(selectedDate.format("YYYY-MM-DD") , " -- " , journalTitle, " -- ", journalContent);
                  const journalData = {
                    childrenId: users_children[selected_Child_index].id,
                    title: journalTitle,
                    date: selectedDate.format("YYYY-MM-DD"),
                    content: journalContent,
                  }
                  // console.log(journalData);
                  saveNewJournal(authorizedAxios, journalData, setJournalUploadRequest);
                
              }else if (isModalOpen.mode === 'update') {
                let journalData = {journal_id : currentSelectedJournal.id};
                if (journalTitle !== currentSelectedJournal.title) {
                  journalData.title = journalTitle;
                }
                if (selectedDate.format("YYYY-MM-DD") !== currentSelectedJournal.date) {
                  journalData.date = selectedDate.format("YYYY-MM-DD");
                }
                if (journalContent !== currentSelectedJournal.content) {
                  journalData.content = journalContent;
                }
                // console.log(journalData);
                updateJournal(authorizedAxios, journalData, setJournalUploadRequest);
              }
            }
            
            // setJournalsData([
            //   ...(!currentSelectedJournal?.id && [
            //     {
            //       id: `journal-${jounalsData.length + 1}`,
            //       // date: selectedDate || 'July 12, 2021',
            //       title: journalTitle,
            //       content: journalContent,
            //     },
            //   ]),
            //   ...jounalsData.map((subject) => {
            //     if (subject?.id === currentSelectedJournal?.id) {
            //       return {
            //         ...subject,
            //         title: journalTitle,
            //         content: journalContent,
            //         // date: selectedDate || 'July 12, 2021',
            //       };
            //     }
            //     return subject;
            //   }),
            // ]);
            // setIsModalOpen({ isOpen: false, index: -1 });
            // setCurrentSelectedJournal(null);
          }}
        />
      </Box>
    </CustomModal>
  );
};

export default JournalManagementModal;

const saveNewJournal = async (authorizedAxios, journalData, setJournalUploadRequest)=>{
  setJournalUploadRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.post(JOURNAL.SAVE, {
              ...journalData
                      });
    // console.log(response);
    setJournalUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setJournalUploadRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}

const updateJournal = async (authorizedAxios, journalData, setJournalUploadRequest)=>{
  setJournalUploadRequest({
    loading: true,
    status: "start",
    error: "",
  });
  try {
    const response = await authorizedAxios.patch(JOURNAL.UPDATE, {
              ...journalData
                      });
    // console.log(response);
    setJournalUploadRequest({
      loading: false,
      status: "complete",
      error: "",
    });
    
  } catch (error) {
    console.error(error);
    setJournalUploadRequest({
      loading: false,
      status: "complete",
      error: error.message,
    });
  }
}