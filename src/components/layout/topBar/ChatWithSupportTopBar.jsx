import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';

import { DocumentAttachmentIcon, HelpIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';
import CustomTextInput from '../../misc/CustomTextInput';

const ChatWithSupportTopBar = ({
  data = [],
  isToggled = false,
  setIsToggled = () => {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState(data);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        onClick={setIsToggled}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: $({ size: 8 }),
          backgroundColor: isToggled
            ? alpha(colors.extra.grey3, 0.12)
            : 'transparent',
          padding: $({ size: 10 }),
        }}>
        <HelpIcon
          size={$({ size: 24, numeric: true })}
          color={colors.extra.grey3}
        />
      </Box>
      {isToggled && (
        <Box
          sx={{
            boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
            position: 'absolute',
            top: $({ size: 56 }),
            right: 0,
            zIndex: 10,
            backgroundColor: colors.white[800],
            borderRadius: $({ size: 8 }),
            width: $({ size: 280 }),
            userSelect: 'none',
            overflow: 'hidden',
          }}>
          <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight: '500',
              lineHeight: $({ size: 18 }),
              color: colors.extra.grey2,
              padding: $({ size: 16 }),
            }}>
            Chat with Support
          </Typography>

          <Box
            sx={{
              'backgroundColor': colors.solids.green,
              'height': $({ size: 330 }),
              'overflowY': 'scroll',
              'display': 'flex',
              'flexDirection': 'column',
              // 'justifyContent': 'flex-end',
              '&::-webkit-scrollbar': {
                width: $({ size: 6 }),
                borderRadius: $({ size: 6 }),
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: colors.extra.grey3,
                borderRadius: $({ size: 6 }),
              },
            }}>
            {data.map((item, index) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    padding: $({ size: 10 }),
                    backgroundColor: item.showOnRight
                      ? colors.white[800]
                      : colors.greenAccent[600],
                    borderRadius: $({ size: 16 }),
                    mt: $({ size: 8 }),
                    maxWidth: $({ size: 200 }),
                    alignSelf: item.showOnRight ? 'flex-end' : 'flex-start',
                    mr: item.showOnRight ? $({ size: 8 }) : 0,
                    ml: item.showOnRight ? 0 : $({ size: 12 }),
                  }}>
                  <Typography
                    sx={{
                      color: colors.solids.black,
                      fontSize: $({ size: 14 }),
                      fontWeight: '400',
                      lineHeight: $({ size: 16 }),
                    }}>
                    {item.text}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              padding: $({ size: 8 }),
              backgroundColor: colors.solids.green,
            }}>
            <CustomTextInput
              label={null}
              placeholder='Type your message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              inputContainerStyle={{
                background: colors.white[800],
                borderRadius: $({ size: 120 }),
                boxShadow: 'none',
                padding: `${$({ size: 7 })} ${$({ size: 16 })}`,
              }}
              inputStyle={{
                'fontSize': $({ size: 14 }),
                'fontWeight': '400',
                'color': colors.solids.black,
                '&::placeholder': {
                  color: colors.extra.grey3,
                  opacity: 0.7,
                },
              }}
              rightIcon={
                <Box
                  onClick={() => {
                    setMessages([
                      ...messages,
                      {
                        id: `message-${messages.length + 1}`,
                        text: message,
                        showOnRight: true,
                      },
                    ]);
                    setMessage('');
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <DocumentAttachmentIcon
                    size={$({ size: 24, numeric: true })}
                    color={colors.extra.grey2}
                  />
                </Box>
              }
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatWithSupportTopBar;
