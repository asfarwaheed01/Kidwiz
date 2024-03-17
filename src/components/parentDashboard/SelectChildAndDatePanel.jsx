import React from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { useAppContext } from '../../context/appContext';

import {
    CustomDropDown,
  } from '../../components';

import { tokens } from '../../theme';
import { $ } from '../../utils';

const SelectChildAndDatePanel = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { users_children, selected_Child_index, changeSelectedChild }  = useAppContext();

  const [childDropDownOpen, setChildDropDownOpen] = React.useState(false);
  const [selectedChild, setSelectedChild] = React.useState(users_children[selected_Child_index]);

  const [datesDropDownOpen, setDatesDropDownOpen] = React.useState(false);
  const [selectedDates, setSelectedDates] = React.useState({});

  const getAvailableChildern = () => {
    const usersFilteredChildern = users_children.filter((item)=>{
        if ('id' in item) {
            return item;
        }
        
    });
    return usersFilteredChildern;
  }

  React.useEffect(() => {
    setSelectedDates({
      startDate: 'April 9, 2023',
      endDate: 'May 6, 2023',
    });
  }, []);

  return (
    
    <Grid
    container
    sx={{
      backgroundColor: colors.white[800],
      boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
        colors.solids.black,
        0.25
      )}`,
      borderRadius: $({ size: 12 }),
      height: '100%',
      minHeight: $({ size: 443 }),
      padding: $({ size: 24 }),
      position: 'relative',
    }}>
    <Box sx={{width:'100%'}}>

            {(childDropDownOpen || datesDropDownOpen) && (
            <Box
                onClick={() => {
                setChildDropDownOpen(false);
                setDatesDropDownOpen(false);
                }}
                sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 99,
                borderRadius: $({ size: 12 }),
                }}
            />
            )}
        
        <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={12}
        sx={{
            padding: {
            xs: `0 0 ${$({ size: 24 })} 0`,
            sm: `0 ${$({ size: 24 })} 0 0`,
            md: `0 ${$({ size: 24 })} 0 0`,
            lg: `0 0 ${$({ size: 24 })} 0`,
            },
        }}>
        <CustomDropDown
            label='Child'
            value='Choose a child'
            placeholder='Choose a child'
            dropDownOpen={childDropDownOpen}
            setDropDownOpen={setChildDropDownOpen}
            labelStyle={{
            fontWeight: '600',
            fontSize: $({ size: 13.5 }),
            lineHeight: $({ size: 8 }),
            }}
            placeholderClosedStyle={{
            fontSize: $({ size: 13.5 }),
            lineHeight: $({ size: 20 }),
            }}
            placeholderOpenStyle={{
            fontSize: $({ size: 13.5 }),
            lineHeight: $({ size: 25 }),
            }}
            inputClosedStyle={{
            padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
            }}
            inputOpenStyle={{
            padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
            }}
            data={getAvailableChildern().map((item, index) => {
                // if ('id' in item) {
                //     console.log(item);
                //     console.log(index);
                    return {
                        onClick: () => {
                        // setSelectedChild(item); // remove this lately
                        changeSelectedChild(index);
                        },
                        component: (
                        <>
                            <img
                            src={item.img}
                            alt={item.fullname}
                            style={{
                                width: $({ size: 40 }),
                                height: $({ size: 40 }),
                                borderRadius: $({ size: 40 }),
                                border: `${$({ size: 1 })} solid ${
                                colors.extra.grey4
                                }`,
                                objectFit: 'cover',
                            }}
                            />
                            <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                width: '100%',
                                overflow: 'hidden',
                            }}>
                            <Typography
                                sx={{
                                fontSize: $({ size: 13.5 }),
                                fontWeight: '500',
                                color: colors.extra.grey1,
                                lineHeight: $({ size: 22 }),
                                width: '100%',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                }}>
                                {item.fullname}
                            </Typography>
                            <Typography
                                sx={{
                                fontSize: $({ size: 12 }),
                                fontWeight: '400',
                                color: colors.extra.grey2,
                                lineHeight: $({ size: 22 }),
                                width: '100%',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                }}>
                                {`${item.age} years old ${item.gender === 'female' ? 'girl':'boy'}`}
                            </Typography>
                            </Box>
                        </>
                        ),
                    };
                // }
            })}
        />

        <Box height={`${$({ size: 20 })}`} />

        <Typography
            sx={{
            fontSize: $({ size: 13.5 }),
            fontWeight: '600',
            lineHeight: $({ size: 13.5 }),
            color: colors.extra.grey3,
            visibility: selectedChild.fullname ? 'visible' : 'hidden',
            }}>
            Currently Selected
        </Typography>

        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            gap: $({ size: 8 }),
            marginTop: $({ size: 8 }),
            visibility: selectedChild.fullname ? 'visible' : 'hidden',
            }}>
            <Avatar
            src={users_children[selected_Child_index]?.img || ''}
            sx={{
                width: $({ size: 40 }),
                height: $({ size: 40 }),
                borderRadius: $({ size: 40 }),
                border: `${$({ size: 2 })} solid ${
                colors.greenAccent[500]
                }`,
            }}
            />

            <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography
                sx={{
                fontSize: $({ size: 13.5 }),
                fontWeight: '500',
                lineHeight: $({ size: 13.5 }),
                color: colors.extra.grey1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                }}>
                {users_children[selected_Child_index]?.fullname || ''}
            </Typography>

            <Typography
                sx={{
                fontSize: $({ size: 10 }),
                fontWeight: '400',
                color: colors.extra.grey2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                }}>
                {`${users_children[selected_Child_index].age} years old ${users_children[selected_Child_index].gender === 'female' ? 'girl':'boy'}`}
            </Typography>
            </Box>
        </Box>
        </Grid>

        <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={12}
        sx={{
            // mt: $({ size: -64 }),
        }}>
        <CustomDropDown
            label='Dates'
            value='Choose dates'
            placeholder='Choose dates'
            dropDownOpen={datesDropDownOpen}
            setDropDownOpen={setDatesDropDownOpen}
            labelStyle={{
            fontWeight: '600',
            fontSize: $({ size: 13.5 }),
            lineHeight: $({ size: 8 }),
            }}
            placeholderClosedStyle={{
            fontSize: $({ size: 13.5 }),
            lineHeight: $({ size: 20 }),
            }}
            placeholderOpenStyle={{
            fontSize: $({ size: 13.5 }),
            lineHeight: $({ size: 25 }),
            }}
            inputClosedStyle={{
            padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
            }}
            inputOpenStyle={{
            padding: `${$({ size: 12 })} ${$({ size: 16 })}`,
            }}
        />

        <Box height={`${$({ size: 16 })}`} />

        <Typography
            sx={{
            fontSize: $({ size: 13.5 }),
            fontWeight: '600',
            color: colors.extra.grey3,
            visibility: selectedDates?.startDate ? 'visible' : 'hidden',
            }}>
            Currently Selected
        </Typography>
        <Typography
            sx={{
            fontSize: $({ size: 13.5 }),
            fontWeight: '500',
            color: colors.extra.grey1,
            visibility: selectedDates?.startDate ? 'visible' : 'hidden',
            }}>{`${selectedDates?.startDate} 🡢 ${selectedDates?.endDate}`}</Typography>
        </Grid>
    </Box>
  </Grid>
  )
}

export default SelectChildAndDatePanel;