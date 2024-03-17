import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { CustomButton } from '../../../components';

import {
  AddIcon,
  EditIcon,
  LockIcon,
  PersonIcon,
  TrashIcon,
} from '../../../icons';

import { ASSETS } from '../../../config/assets';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';

const ChildInfoCard = ({
  fullname = 'Child Name',
  age = '?',
  gender = '?',
  difficulty = '?',
  profilePicture = ASSETS.ON_BOARDING.CHILD,
  hasInfo = true,
  disabled = false,
  handleAddChild = () => {},
  handleEditChild = () => {},
  handleDeleteChild = () => {},
  containerStyle = {},
  wrapperStyle = {},
  addButtonStyle = {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const backgroundColor = hasInfo
    ? colors.greenAccent[400]
    : disabled
    ? colors.extra.grey5
    : colors.extra.grey4;

  const detailHeadingColor = hasInfo
    ? colors.greenAccent[600]
    : disabled
    ? colors.extra.grey4
    : colors.extra.grey3;

  const detailColor = disabled ? colors.extra.grey3 : colors.grey[100];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: $({ size: 24 }),
        alignItems: 'center',
        padding: {
          xs: `0 ${$({ size: 24 })}`,
          lg: 0,
        },
        ...wrapperStyle,
      }}>
      <Box
        sx={{
          borderRadius: $({ size: 24 }),
          backgroundColor: backgroundColor,
          padding: `${$({ size: 24 })} ${$({ size: 24 })}`,
          display: 'flex',
          maxWidth: $({ size: 450 }),
          width: {
            xs: '100%',
            lg: $({ size: 320 }),
          },
          position: 'relative',
          ...containerStyle,
        }}>
        {hasInfo && (
          <img
            alt='child'
            src={profilePicture}
            style={{
              width: $({ size: 80 }),
              height: $({ size: 80 }),
              borderRadius: $({ size: 80 }),
              marginRight: $({ size: 16 }),
              objectFit: 'cover',
            }}
          />
        )}

        {!hasInfo && (
          <Box
            sx={{
              width: $({ size: 80 }),
              height: $({ size: 80 }),
              borderRadius: $({ size: 80 }),
              marginRight: $({ size: 16 }),
              backgroundColor: colors.white[800],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <PersonIcon
              size={$({ size: 40, numeric: true })}
              color={disabled ? colors.extra.grey3 : colors.grey[100]}
            />
          </Box>
        )}

        {disabled && (
          <Box
            sx={{
              position: 'absolute',
              top: $({ size: 16 }),
              right: $({ size: 16 }),
            }}>
            <LockIcon />
          </Box>
        )}

        <Box>
          <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight: '600',
              lineHeight: $({ size: 22 }),
              color: detailColor,
              // marginBottom: $({ size: 8 }),
            }}>
            {disabled ? 'Add Child' : fullname || 'Add Child'}
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{
                fontSize: $({ size: 13.5 }),
                fontWeight: '400',
                lineHeight: $({ size: 22 }),
                color: detailHeadingColor,
              }}>
              Age:&nbsp;
            </Typography>

            <Typography
              sx={{
                fontSize: $({ size: 13.5 }),
                fontWeight: '600',
                lineHeight: $({ size: 22 }),
                color: detailColor,
              }}>
              {age}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{
                fontSize: $({ size: 13.5 }),
                fontWeight: '400',
                lineHeight: $({ size: 22 }),
                color: detailHeadingColor,
              }}>
              Gender:&nbsp;
            </Typography>

            <Typography
              sx={{
                fontSize: $({ size: 13.5 }),
                fontWeight: '600',
                lineHeight: $({ size: 22 }),
                color: detailColor,
              }}>
              {gender}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{
                fontSize: $({ size: 13.5 }),
                fontWeight: '400',
                lineHeight: $({ size: 22 }),
                color: detailHeadingColor,
              }}>
              Difficulty:&nbsp;
            </Typography>

            <Typography
              sx={{
                fontSize: $({ size: 13.5 }),
                fontWeight: '600',
                lineHeight: $({ size: 22 }),
                color: detailColor,
              }}>
              {difficulty}
            </Typography>
          </Box>
        </Box>
      </Box>

      {hasInfo && (
        <Box sx={{ display: 'flex', gap: $({ size: 24 }) }}>
          <span onClick={handleDeleteChild}>
            <TrashIcon size={$({ size: 32, numeric: true })} />
          </span>
          <span onClick={handleEditChild}>
            <EditIcon size={$({ size: 32, numeric: true })} />
          </span>
        </Box>
      )}

      {!hasInfo && !disabled && (
        <CustomButton
          label='Add Child'
          rightIcon={<AddIcon />}
          sx={{
            'backgroundColor': colors.extra.grey1,
            '&:hover': {
              backgroundColor: alpha(colors.extra.grey1, 0.8),
            },
            'maxWidth': $({ size: 450 }),
            'width': $({ size: 320 }),
            ...addButtonStyle,
          }}
          onClick={handleAddChild}
        />
      )}
    </Box>
  );
};

export default ChildInfoCard;
