import React from 'react';
import { Box, useTheme, Typography, Grid, alpha } from '@mui/material';
// import { SortableContainer, SortableElement } from 'react-sortable-hoc';
// import { arrayMoveImmutable } from 'array-move';

import { ReactSortable } from "react-sortablejs";

import { DashboardContainer, CustomTextInput, CustomButton } from '../../../components';

import { CrossIcon, ReorderThreeIcon, RightArrowIcon, SaveIcon } from '../../../icons';

import { tokens } from '../../../theme';
import { $ } from '../../../utils';



// const SortableNotificationKeywordsContainer = SortableContainer(
//   ({ children, colors }) => {
//     return (
//       <Grid
//         item
//         xs={12}
//         md={6.7}
//         sx={{
//           'mt': {
//             xs: $({ size: 0 }),
//             md: $({ size: 36 }),
//           },
//           // 'maxHeight': $({ size: 244 }),
//           'height': '100%',
//           'overflowY': 'scroll',
//           'pr': $({ size: 12 }),
//           '&::-webkit-scrollbar': {
//             width: $({ size: 8 }),
//             borderRadius: $({ size: 8 }),
//           },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: colors.extra.grey3,
//             borderRadius: $({ size: 8 }),
//           },
//           'display': 'flex',
//           'flexDirection': 'column',
//           'gap': $({ size: 8 }),
//         }}>
//         {children}
//       </Grid>
//     );
//   }
// );

const SortableItem = (props) => {
  const { keyword, notificationKeywords, setNotificationKeywords, currentIndex, deletedSelectedIndex, colors } = props;

  return (
    <Box
      sx={{
        mt: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: $({ size: 12 }),
        width: '100%',
      }}>
      <Box
        sx={{
          background: colors.extra.grey5,
          padding: `${$({ size: 9 })} ${$({
            size: 14,
          })}`,
          borderRadius: $({ size: 12 }),
          overflow: 'hidden',
          width: '100%',
          userSelect: 'none',
        }}>
        <Typography
          sx={{
            fontSize: $({ size: 13.5 }),
            fontWeight: '400',
            color: colors.solids.black,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}>
          {keyword}
        </Typography>
      </Box>

      <Box sx={{ cursor: 'pointer' }}>
        <ReorderThreeIcon
          size={$({ size: 16, numeric: true })}
          color={colors.extra.grey3}
        />
      </Box>

      <Box
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          deletedSelectedIndex(currentIndex);
          // let array = [
          //   ...prompts.slice(0, currentIndex),
          //   ...prompts.slice(currentIndex + 1),
          // ]
          // setPrompts(array);
          // updatePromptByPromptsList();
        }}>
        <CrossIcon
          size={$({ size: 16, numeric: true })}
          color={colors.extra.grey3}
        />
      </Box>
    </Box>
  );
}

const SortableKeywordsContainer = ({ children, colors }) => {
  return (
    <Grid
      item
      xs={12}
      md={5.7}
      sx={{
        'mt': {
          xs: $({ size: 0 }),
          md: $({ size: 36 }),
        },
        'maxHeight': $({ size: 244 }),
        'overflowY': 'scroll',
        'pr': $({ size: 12 }),
        '&::-webkit-scrollbar': {
          width: $({ size: 8 }),
          borderRadius: $({ size: 8 }),
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: colors.extra.grey3,
          borderRadius: $({ size: 8 }),
        },
        'display': 'flex',
        'flexDirection': 'column',
        'gap': $({ size: 10 }),
        
      }}>
      {children}
    </Grid>
  );
};

const KeywordsAlertHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let keywordsOnload = []
  const [notificationKeywords, setNotificationKeywords] = React.useState(keywordsOnload);

  const [notificationKeyword, setNotificationKeyword] = React.useState('');

  // TO CALCULATE TOP SECTION HEIGHT
  const topSectionRef = React.useRef(null);
  const [topSectionHeight, setTopSectionHeight] = React.useState(0);

  React.useEffect(() => {
    setTopSectionHeight(topSectionRef.current?.offsetHeight || 0);
  }, [topSectionRef.current?.offsetHeight]);

  const deletedSelectedIndex = (index) => {
    console.log('Delete index');
  }

  return (
    <DashboardContainer
      wrapperStyle={{ position: 'relative' }}
      containerStyle={{
        pb: $({ size: 20 }),
        gap: {
          xs: $({ size: 16 }),
          md: $({ size: 20 }),
        },
      }}>
      <Box
        ref={topSectionRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: $({ size: 12 }),
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            alignItems: {
              xs: 'flex-start',
              sm: 'center',
            },
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: {
              xs: $({ size: 24 }),
              sm: $({ size: 16 }),
            },
          }}>
          <Typography
            sx={{
              fontSize: $({ size: 31.98 }),
              fontWeight: '600',
              color: colors.extra.grey1,
            }}>
            Keywords Alert Notifications
          </Typography>

          <Typography
            sx={{
              fontSize: $({ size: 18 }),
              fontWeight: '400',
              color: colors.solids.black,
            }}>
            If a keyword on the list is in the AI generated text, then you will
            receive a notification to alert you about it.
          </Typography>
        </Box>
      </Box>

      <Grid
        sx={{
          height: `calc(100vh - ${topSectionHeight}px - ${$({
            numeric: true,
            // ADJUSTMENT
            size:
              60 + // TOP BAR HEIGHT
              24 + // PARENT CONTAINER TOP PADDING
              24 + // PARENT  CONTAINER BOTTOM PADDING
              40 + // WRAPPER CONTAINER TOP PADDING
              40 + // WRAPPER CONTAINER BOTTOM PADDING
              20 + // HEADER SECTION GAP
              24,
          })}px)`,
        }}
        container
        rowGap={$({ size: 16 })}
        columnSpacing={$({ size: 0 })}>
        <Grid
          item
          xs={12}
          md={4.7}>
          <CustomTextInput
            label='Notification Keywords'
            placeholder='Separate keywords by a comma e.g. Keyword, keyword, keyword, ...'
            value={notificationKeyword}
            onChange={(e) => {
              setNotificationKeyword(e.target.value);
            }}
            multiline={true}
            containerStyle={{
              width: '100%',
              height: '100%',
            }}
            inputContainerStyle={{
              height: `calc(100% - ${$({ size: 40, numeric: true })}px)`,
            }}
            inputStyle={{
              height: `calc(100% - ${$({ size: 8, numeric: true })}px)`,
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={0.6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Box
            onClick={() => {
              if (notificationKeyword) {
                let tempArray = notificationKeyword.split(",");
                let notificationKeywordArray = tempArray.map((item, index)=>{return {id:index, name:item}});
                
                  setNotificationKeywords(notificationKeywordArray);
                // setNotificationKeywords([
                //   notificationKeyword,
                //   ...notificationKeywords,
                // ]);
                // setNotificationKeyword('');
              }
            }}
            sx={{
              display: 'flex',
              width: $({ size: 64 }),
              alignItems: 'center',
              justifyContent: 'center',
              mt: $({ size: 32 }),
              cursor: 'pointer',
            }}>
            <RightArrowIcon
              color={colors.solids.mainButton}
              size={$({ size: 32, numeric: true })}
            />
          </Box>
        </Grid>

        <SortableKeywordsContainer colors={colors}>
          <ReactSortable 
            list={notificationKeywords} 
            setList={(newState) => {
              

              if (notificationKeywords.length === newState.length) {
                let flag = true;
                for (let index = 0; index < notificationKeywords.length; index++) {
                  if (notificationKeywords[index].name !== newState[index].name) {
                    flag = flag && false;
                    break;
                  } 
                }
                if (flag) {
                  return;
                }
              }


              console.log(newState);
                setNotificationKeywords(newState);
                let tempArray = newState.map((item)=>{return item.name});
                tempArray = tempArray.join(",");
                setNotificationKeyword(tempArray);
                // this.setState({ list: newState })
                // updatePromptByPromptsList();
              
            }}
            
            >
            {notificationKeywords.map((item, index) => (
              // <Box >
                <SortableItem 
                  key={item.id} 
                  keyword={item.name} 
                  colors={colors}
                  notificationKeywords= {notificationKeywords}
                  setNotificationKeywords={setNotificationKeywords} 
                  currentIndex= {index}
                  deletedSelectedIndex={deletedSelectedIndex}
                >

                </SortableItem>
                
              // </Box>
            ))}
          </ReactSortable>
        </SortableKeywordsContainer>

        
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          // backgroundColor: 'red',
          width: '100%',
          height: 'fit-content',
          // gap: $({ size: 24 }),
        }}>
          <CustomButton
            label='Save'
            // disabled = {promptUploadRequest.loading}
            // loading= {promptUploadRequest.loading}
            sx={{
              // maxHeight: $({ size: 60 }),
              maxWidth: $({ size: 160 }),
              boxShadow: `0 0 ${$({ size: 4 })} 0 ${alpha(
                colors.solids.black,
                0.25
              )}`,
            }}
            rightIcon={<SaveIcon size={$({ size: 24, numeric: true })} />}
            onClick={() => {
              
              
              
            }}
          />
        </Box>

        
      </Grid>
      
    </DashboardContainer>
  );
};

export default KeywordsAlertHome;
