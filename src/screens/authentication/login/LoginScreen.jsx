import React, { useState, useEffect, useReducer } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup,FacebookAuthProvider } from 'firebase/auth';
import { GOOGLE_LOGIN } from '../../../config/backend_endpoints';
import {app} from "../../../firebase"
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { initialState, useAppContext } from '../../../context/appContext';

import {
  AuthenticationFormBackground,
  CustomTextInput,
  CustomButton,
} from '../../../components';

import { ASSETS } from '../../../config/assets';
import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import axios from 'axios';
import { LOGIN_GOOGLE_ERROR, LOGIN_GOOGLE_SUCCESS, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS } from '../../../context/actions';
import reducer from '../../../context/reducer';

const LoginScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { loginUser, showAlert, alertText, isLoading, user } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [errorMessages, setErrorMessages] = useState({email:'',password:''});

  useEffect(()=>{

    if (isLoading === false && showAlert === false && user !== null) {
      if (user.role.toLowerCase() === "parent") {
        // console.log("Its parent");
        if( user.no_of_chlid === 0){
          navigate(ROUTES.ON_BOARDING.ADD_CHILDREN);
        }else if( user.no_of_chlid > 0){
          // navigate(ROUTES.PARENT.DASHBOARD.INDEX);
          navigate(ROUTES.ON_BOARDING.ADD_CHILDREN);
        }
        
      }
      else if (user.role.toLowerCase() === "admin") {
        // console.log("Its Admin");
        navigate(ROUTES.ADMIN.DASHBOARD.INDEX);
        
      }
    }  
    

  },[isLoading, user]);
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
  
      // Construct the data object to be sent in the request
      const requestData = {
        email: result.user.email,
        username: result.user.displayName,
        avatar: result.user.photoURL,
      };
  
      // Make a POST request using Axios
      const response = await axios.post(GOOGLE_LOGIN, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log("Response From Google API",response.data)
      const data = response.data;
      let user = data.user;
      user = { ...user , "role": data.role, "no_of_chlid":data.no_of_chlid, "onboard": data.onboard, "tier": data.tier, "trail":data.trail, "img":data.img, "mobile_number":data.mobile_number };
      const token = data.access;
      console.log("New User",user)
      
      // Update the state with user data
      dispatch({
        type: LOGIN_GOOGLE_SUCCESS,
        payload: { user, token },
      });
      
      // Store user and token in local storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setTimeout(() => {
        navigate(ROUTES.ON_BOARDING.ADD_CHILDREN);
      }, 1000);
      window.location.reload();
    } catch (error) {
      console.error('Could not sign in with Google', error);
      
      let error_message = "Error Logging in with Google";
      // Dispatch error action
      dispatch({
        type: LOGIN_GOOGLE_ERROR,
        payload: { msg: error_message },
      });
    }
  };

  const handleFacebookClick = async () => {
    try {
      // Authenticate with Facebook
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      const response = await signInWithPopup(auth, provider);
  
      // Extract user data
      const userData = {
        email: response.user.email,
        username: response.user.displayName,
        avatar: response.user.photoURL
      };
  
      // Send user data to the backend API
      const res = await axios.post(GOOGLE_LOGIN, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('User data sent to backend:', res.data);
  
      // Optionally, navigate or perform other actions after successful login
    } catch (error) {
      console.error('Error logging in with Facebook:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        backgroundColor: colors.grey[900],
        height: 'max-content',
        minHeight: '100%',
      }}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          lg={4.25}>
          <AuthenticationFormBackground
            title='Sign in to continue'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: `calc(100% - ${$({ size: 45 + 60 + 60 + 31.98 })})`,
              gap: $({ size: 16 }),
            }}>
            <Box
              sx={{
                paddingTop: $({ size: 10 }),
                gap: $({ size: 12 }),
                display: 'flex',
                flexDirection: 'column',
              }}>

            { showAlert && 
              <Typography
                sx={{
                  fontSize: $({ size: 16 }),
                  fontWeight: '400',
                  color: colors.redAccent[500],
                  lineHeight: $({ size: 30 }),
                  paddingTop: $({ size: 4 }),
                }}>
                  {alertText}
              </Typography>
            }



              <CustomTextInput
                label='Email address'
                placeholder='you@email.com'
                type='email'
                value={email}
                error={errorMessages.email}
                onChange={(e) => setEmail(e.target.value)}
                labelStyle={{ pb: $({ size: 2 }) }}
              />

              <CustomTextInput
                label='Password'
                placeholder='•••••••••'
                type='password'
                value={password}
                error={errorMessages.password}
                onChange={(e) => setPassword(e.target.value)}
                labelStyle={{ pb: $({ size: 2 }) }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    sx={{
                      'color': colors.grey[100],
                      'padding': '0',
                      '&.Mui-checked': { color: colors.greenAccent[500] },
                      '&:hover': { backgroundColor: 'transparent' },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: $({ size: 13.5 }),
                      fontWeight: '400',
                      lineHeight: $({ size: 25 }),
                      marginLeft: $({ size: 8 }),
                      color: colors.grey[100],
                    }}>
                    Remember me on this device
                  </Typography>
                }
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'start',
                  margin: '0',
                  padding: '0',
                  mt: $({ size: 20 }),
                }}
              />

              <Typography
                onClick={() => {
                  navigate(ROUTES.AUTHENTICATION.RESET_PASSWORD);
                }}
                sx={{
                  fontSize: $({ size: 13.5 }),
                  fontWeight: '400',
                  lineHeight: $({ size: 25 }),
                  color: colors.solids.purpleBright,
                  cursor: 'pointer',
                }}>
                Forgot password?
              </Typography>

              <CustomButton
                label= { isLoading ? 'Loging in' : 'Log in'}
                disabled = {isLoading}
                onClick={() => {
                  if (!email) {
                    setErrorMessages({...errorMessages, email:'Required!'})
                    return
                  }
                  if (!password) {
                    setErrorMessages({...errorMessages, password:'Required!'})
                    return
                  }

                  loginUser({currentUser : { email, password}});

                  
                }}
                sx={{ mt: $({ size: 11 }) }}
              />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: `${$({ size: 17 })} 0`,
                  gap: $({ size: 10 }),
                }}>
                <Box
                  sx={{
                    height: $({ size: 1.5 }),
                    width: '100%',
                    backgroundColor: colors.grey[800],
                  }}
                />
                <Typography
                  sx={{
                    fontSize: $({ size: 13.5 }),
                    fontWeight: '400',
                    lineHeight: $({ size: 25 }),
                    color: colors.grey[500],
                  }}>
                  or
                </Typography>
                <Box
                  sx={{
                    height: $({ size: 1.5 }),
                    width: '100%',
                    backgroundColor: colors.grey[800],
                  }}
                />
              </Box>

              <CustomButton
                label='Continue with Google'
                onClick={handleGoogleClick}
                sx={{
                  'backgroundColor': colors.white[800],
                  'fontWeight': '400',
                  'color': colors.solids.black,
                  'textTransform': 'none',
                  '&:hover': { backgroundColor: colors.grey[900] },
                  'mb': $({ size: 6 }),
                }}
                leftIcon={
                  <img
                    alt='google-icon'
                    src={ASSETS.AUTHENTICATION.ICONS.GOOGLE}
                    sx={{ height: $({ size: 18 }) }}
                  />
                }
              />

              <CustomButton
                label='Continue with Facebook'
                onClick={handleFacebookClick}
                sx={{
                  'backgroundColor': colors.white[800],
                  'fontWeight': '400',
                  'color': colors.solids.black,
                  'textTransform': 'none',
                  '&:hover': { backgroundColor: colors.grey[900] },
                }}
                leftIcon={
                  <img
                    alt='facebook-icon'
                    src={ASSETS.AUTHENTICATION.ICONS.FACEBOOK}
                    sx={{ height: $({ size: 18 }) }}
                  />
                }
              />
            </Box>

            <Box
              sx={{
                margin: `${$({ size: 16 })} 0 ${$({ size: 16 })} 0`,
                textAlign: 'center',
              }}>
              <Typography
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: '400',
                  lineHeight: $({ size: 27 }),
                  color: colors.grey[100],
                  display: 'inline',
                }}>{`Don't have an account? `}</Typography>
              <Typography
                onClick={() => {
                  navigate(ROUTES.AUTHENTICATION.SIGN_UP);
                }}
                sx={{
                  fontSize: $({ size: 18 }),
                  fontWeight: '600',
                  lineHeight: $({ size: 27 }),
                  color: colors.solids.purpleBright,
                  display: 'inline',
                  cursor: 'pointer',
                }}>{`Create One!`}</Typography>
            </Box>
          </AuthenticationFormBackground>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={7.75}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}>
          <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight: '400',
              lineHeight: $({ size: 25 }),
              fontStyle: 'italic',
              alignSelf: 'start',
              width: $({ size: 609 }),
              mt: $({ size: 87 }),
              ml: $({ size: 61 }),
              mb: $({ size: 40 }),
            }}>
            "The future of early childhood education lies in unlocking the
            limitless potential of every child, nurturing their curiosity, and
            empowering them to become lifelong learners."
          </Typography>
          <Box
            sx={{
              px: $({ size: 60 }),
              pb: $({ size: 30 }),
              width: '100%',
            }}>
            <Box
              component='img'
              src={ASSETS.AUTHENTICATION.MAIN_BACKGROUND}
              alt='main-background'
              sx={{
                objectFit: 'contain',
                objectPosition: 'center',
                width: 'inherit',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginScreen;
