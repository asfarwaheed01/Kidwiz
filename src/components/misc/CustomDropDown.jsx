import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { CaretDownIcon, CaretUpIcon } from '../../icons';

import { CustomLabel } from '../../components';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const CustomDropDown = ({
  value = '',
  placeholder = 'Placeholder',
  label = '',
  error = '',
  data = [],
  dropDownOpen = false,
  setDropDownOpen = () => {},
  labelStyle = {},
  placeholderOpenStyle = {},
  placeholderClosedStyle = {},
  inputClosedStyle = {},
  inputOpenStyle = {},
  itemContainerStyle = {},
  itemsContainerStyle = {},
  errorStyle = {},
  showBackdrop = false,
  closeWhenClickedOnBackdrop = true,
  header = <></>,
  preventDefault = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {showBackdrop && dropDownOpen && (
        <Box
          onClick={() => {
            if (!closeWhenClickedOnBackdrop) return;
            setDropDownOpen(false);
          }}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 99,
          }}
        />
      )}

      <Box
        sx={{ display: 'flex', flexDirection: 'column', userSelect: 'none' }}>
        <CustomLabel
          label={label}
          labelStyle={labelStyle}
        />
        <Box sx={{ position: 'relative' }}>
          <Box
            onClick={() => {
              if (dropDownOpen) return;
              setDropDownOpen(true);
            }}
            sx={{
              borderRadius: $({ size: 12 }),
              background: colors.extra.grey5,
              boxShadow: `inset 0 0 ${$({ size: 2 })} ${alpha(
                colors.solids.black,
                0.25
              )}`,
              padding: `${$({ size: 12 })} ${$({ size: 24 })}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              cursor: 'pointer',
              gap: $({ size: 12 }),
              visibility: dropDownOpen ? 'hidden' : 'visible',
              ...inputClosedStyle,
            }}>
            <Typography
              sx={{
                fontSize: $({ size: 18 }),
                fontWeight: '400',
                color: colors.extra.grey1,
                lineHeight: $({ size: 30 }),
                ...placeholderClosedStyle,
              }}>
              {value || placeholder}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CaretDownIcon size={$({ size: 11, numeric: true })} />
            </Box>
          </Box>

          {dropDownOpen && (
            <Box
              onClick={() => {
                if (preventDefault) return;
                setDropDownOpen(false);
              }}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                background: colors.extra.grey5,
                borderRadius: $({ size: 12 }),
                boxShadow: `0 0 ${$({ size: 2 })} ${alpha(
                  colors.solids.black,
                  0.25
                )}`,
                padding: `${$({ size: 12 })} ${$({ size: 24 })}`,
                zIndex: 100,
                ...inputOpenStyle,
              }}>
              <Box
                onClick={() => {
                  setDropDownOpen(false);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}>
                <Typography
                  sx={{
                    fontSize: $({ size: 18 }),
                    fontWeight: '400',
                    color: colors.extra.grey2,
                    lineHeight: $({ size: 30 }),
                    ...placeholderOpenStyle,
                  }}>
                  {placeholder}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CaretUpIcon size={$({ size: 11, numeric: true })} />
                </Box>
              </Box>

              {header && header}

              <Box sx={{ ...itemsContainerStyle }}>
                {data.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      onClick={item.onClick}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: $({ size: 12 }),
                        paddingTop: $({ size: 8 }),
                        paddingBottom:
                          index === data.length - 1 ? 0 : $({ size: 8 }),
                        borderBottom:
                          index === data.length - 1
                            ? 'none'
                            : `${$({ size: 1 })} solid ${colors.extra.grey4}`,
                        cursor: 'pointer',
                        ...itemContainerStyle,
                      }}>
                      {item.component}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>

        {error && (
          <Typography
            sx={{
              fontSize: $({ size: 16 }),
              fontWeight: '400',
              color: colors.redAccent[500],
              lineHeight: $({ size: 30 }),
              paddingTop: $({ size: 4 }),
              ...errorStyle,
            }}>
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CustomDropDown;
