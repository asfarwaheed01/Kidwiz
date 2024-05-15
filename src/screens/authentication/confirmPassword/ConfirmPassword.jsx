import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import { ASSETS } from '../../../config/assets';

import { CustomTextInput, CustomButton } from '../../../components';
import { RESET_USER_PASSWORD } from '../../../config/backend_endpoints';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';

const ConfirmPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { token } = useParams();

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.put(RESET_USER_PASSWORD, {
                token: token,
                new_password: password,
                confirm_password: confirmPassword
            });
            console.log('Password reset successful:', response.data);
            navigate(ROUTES.AUTHENTICATION.LOGIN);
        } catch (error) {
            console.error('Error resetting password:', error);
            setErrorMessage(error.message)
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: colors.grey[900],
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: {
                            xs: $({ size: 24 }),
                            lg: $({ size: 80 }),
                        },
                    }}>
                    <img
                        src={ASSETS.LOGO}
                        alt='logo'
                        style={{
                            height: $({ size: 65 }),
                            paddingRight: $({ size: 16 }),
                            marginTop: `-${$({ size: 4 })}`,
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: $({ size: 31.98 }),
                            fontWeight: '600',
                            lineHeight: $({ size: 10 }),
                            textAlign: 'center',
                            color: colors.solids.black,
                            mt: `-${$({ size: 8 })}`,
                            mb: `-${$({ size: 8 })}`,
                        }}>
                        Reset Passowrd
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: $({ size: 28 }),
                    }}>
                    <CustomTextInput
                        label='Password'
                        placeholder='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <CustomTextInput
                        label='Confirm Password'
                        placeholder='confirm password'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setErrorMessage(''); // Clear error message when confirm password changes
                        }}
                    />
                    {errorMessage && (
                        <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>
                    )}
                    <CustomButton
                        label='Reset Password'
                        onClick={handleResetPassword}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ConfirmPassword;
