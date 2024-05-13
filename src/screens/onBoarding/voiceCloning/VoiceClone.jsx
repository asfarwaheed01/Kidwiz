import React, { useState } from 'react';
import { Box, Typography,Button, Checkbox, TextField, Modal, IconButton } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { CustomButton } from '../../../components';

import { ASSETS } from '../../../config/assets';
import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import CreateVoicePopup from './VoicePopup';


const VoiceClone = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  // const onSave = () =>{
  //   navigate(ROUTES.ON_BOARDING.VOICE_CLONE.CLONING_DONE);
  // }

  // const handleRecordVoice = () => {
  //   // Logic to record voice
  // };

  const [popup, setPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Box
      sx={{
        backgroundColor: colors.grey[900],
        height: 'max-content',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: {
          xs: $({ size: 20 }),
          lg: $({ size: 40 }),
        },
      }}>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: colors.white[800],
          boxShadow: `0 0 ${$({ size: 8 })} 0 ${alpha(
            colors.solids.black,
            0.25
          )}`,
          width: '100%',
          borderRadius: $({ size: 12 }),
          flexGrow: 1,
          gap: $({ size: 24 }),
        }}>
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            gap: $({ size: 8 }),
            marginBottom: $({ size: 40 }),
          }}>
            <Box
            component='img'
            alt='logo'
            src={ASSETS.LOGO}
            sx={{
              width: {
                xs: $({ size: 140 }),
                lg: $({ size: 160 }),
              },
              alignSelf: 'flex-start',
              margin: {
                xs: `${$({ size: 32 })} 0 0 ${$({ size: 32 })}`,
                lg: `${$({ size: 40 })} 0 0 ${$({ size: 40 })}`,
              },
            }}
          />
          <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginY: $({ size: 12 }),
  }}>
  <Box
    sx={{
      backgroundColor: '#E7F4F8',
      borderRadius: '50%',
      width: $({ size: 160 }),
      height: $({ size: 160 }),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Box
      component='img'
      alt='volume'
      src={ASSETS.VOLUME}
      sx={{
        width: '70%',
        height: 'auto',
      }}
    />
  </Box>
</Box>
<Box
  sx={{
    width:$({size:550}),
    borderRadius: $({ size: 8 }),
    padding: $({ size: 2 }),
    marginY: $({ size: 4 }),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
  <Typography variant="h4" sx={{ color: '#363636', fontSize: '32px',fontWeight:"bold", marginBottom: $({ size: 6 }) }}>
    Clone Your Voice
  </Typography>
  <Typography variant="body1" align="center" sx={{ color: '#363636', fontSize: '18px' }}>
  By creating an AI clone of your voice, your children will be taught with your own voice, as if you were with there them!
  </Typography>
</Box>
<Box
  sx={{
    backgroundColor: '#72B216',
    width:$({size:306}),
    height:$({size:157}),
    borderRadius: $({ size: 20 }),
    marginY:$({size:"20"}),
    display: 'flex',
    flexDirection: 'column',
    cursor:"pointer",
    alignItems: 'center',
    justifyContent:"center",
    objectFit:"cover"
  }} 
  onClick={() => setPopup(true)}
  // onClick={handleOpen}
  >
  {/* Image */}
  <Box
    component='img'
    alt='add-circle'
    src={ASSETS.ADDCIRCLE}
    sx={{
      width: '40',
      height: '40',
    }}
  />

  {/* Paragraph */}
  <Typography variant="body1" sx={{ marginTop: $({ size: 10 }), color:"#FAFAFA" }}>
    Create Your Cloned Voice
  </Typography>
  
</Box>
          <CustomButton
          label='Skip'
          sx={{
            color:"black",
            backgroundColor:"white",
            width: 'fit-content',
            margin: {
              xs: `0 ${$({ size: 24 })} ${$({ size: 24 })} 0`,
              lg: `0 ${$({ size: 40 })} ${$({ size: 0 })} 0`,
            },
            alignSelf: 'flex-end',
          }}
          onClick={() => {
            navigate(ROUTES.PARENT.DASHBOARD.INDEX);
          }}
        />
          </Box>
          </Box>
      <CreateVoicePopup open={popup} onClose={() => setPopup(false)} />
      </Box>
  )
}

export default VoiceClone
