import React, { useState } from 'react';
// import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Box, Typography, IconButton, Avatar, alpha } from '@mui/material';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
// import 'react-pro-sidebar/dist/css/styles.css';

import MenuIcon from '@mui/icons-material/Menu';

import { ChatWithSupportTopBar, NotificationsTopBar } from './../../components';

import {
  LearnSubjectIcon,
  RibbonIcon,
  CompassIcon,
  LogoutIcon,
  CloseIcon,
  ReportCardIcon,
  ChevronSlimDownIcon,
  DashboardIcon,
} from '../../icons';

import {
  // ColorModeContext,
  tokens,
} from '../../theme';
import { ASSETS } from '../../config/assets';
import { ROUTES } from '../../config/routes';
import { $ } from '../../utils';

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  hovered,
  setHovered,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      onMouseEnter={() => setHovered(to)}
      component={<Link to={to} />}
      onMouseLeave={() => setHovered('')}
      active={selected === to}
      onClick={() => setSelected(to)}
      icon={selected === to || hovered === to ? icon.active : icon.inactive}
      style={{ color: colors.grey[500] }}>
      <Typography>{title}</Typography>
      {/* <Link to={to} /> */}
    </MenuItem>
  );
};

const MySideBar = ({ isToggled = false, setIsToggled = () => {} }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selected, setSelected] = useState('');
  const [hovered, setHovered] = useState('');

  const navigate = useNavigate();
  const { state } = useLocation();

  React.useEffect(() => {
    const path = window.location.pathname.split('/').slice(0, 3).join('/');
    setSelected(path.replace(/\/$/, ''));

    setIsToggled(false);
  }, [navigate, setIsToggled, state]);

  return (
    <Box
      sx={{
        'backgroundColor': colors.white[800],
        'zIndex': '50',
        'border': `${$({ size: 1 })} solid ${colors.white[800]}  !important`,
        'boxShadow': `7px 2px 59px -1px ${colors.grey[100]}20`,
        'borderRadius': `0 ${$({ size: 24 })} ${$({ size: 24 })} 0 !important`,
        
      }}>
      <Sidebar
        breakPoint='xl'
        // toggled={() => setIsToggled(!isToggled)}
        onToggle={() => setIsToggled(!isToggled)}
        collapsed = {isToggled}
        collapsedWidth='0px'
        width='fit-content'
        background='Transparent'
        rootStyles={{
          // [`.ps-sidebar-container`]: {
          // backgroundColor: 'transparent !important',
          // borderWidth: '0px',
          // lineHeight: '0 !important',
          // },
          // '.ps-menu-button': {
          //   padding: `${$({ size: 0 })} ${$({ size: 0 })} !important`,
          //   margin: `${$({ size: 0 })} ${$({ size: 0 })} !important`,
          // },
          
          // '.ps-menuitem-root:hover': {
          //   'background': `${colors.greenAccent[500]} !important`,
          //   'borderRadius': '8px !important',
            
          // },
          [`.${sidebarClasses.container}`] : {
            'backgroundColor': 'transparent',

            // optional
            'backgroundColor': colors.white[800],
            'borderRadius': `0 ${$({ size: 24 })} ${$({ size: 24 })} 0 !important`,
              },
          //////////////////////////////------------------
          '.ps-menuitem-root .ps-menu-label p': {
            fontSize: `${$({ size: 18 })} !important`,
            fontWeight: '400 !important',
            padding: `${$({ size: 0 })} ${$({ size: 0 })} !important`,
            margin: `${$({ size: 0 })} ${$({ size: 0 })} !important`,
          },
          //Active link
          ".ps-menu-root .ps-active a": {
            background: `${colors.greenAccent[500]} !important`,
            borderRadius: '8px !important',
          },
          //Active link text
          ".ps-menu-root .ps-active .ps-menu-label p": {
            color: `${colors.white[800]} !important`,
            fontWeight: '600 !important',
            fontSize: `${$({ size: 18 })} !important`,
          },
          //On Hover Link
          '.ps-menu-root .ps-menuitem-root a:hover': {
            background: `${colors.greenAccent[500]} !important`,
            color: `${colors.white[800]} !important`,
            borderRadius: '8px !important',
            fontWeight: '600 !important',
            fontSize: `${$({ size: 18 })} !important`,
          },
          ////////////-------------------------
        }}

        >
        <Box
          onClick={() => setIsToggled(!isToggled)}
          sx={{
            position: 'absolute',
            top: $({ size: 12 }),
            right: $({ size: 12 }),
            display: {
              xs: 'block',
              lg: 'none',
            },
          }}>
          <CloseIcon size={$({ size: 32, numeric: true })} />
        </Box>

        <Menu iconShape='square'>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            height='100%'>
            <Box
              sx={{
                mt: {
                  xs: $({ size: 22 }),
                  md: 0,
                },
              }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: $({ size: 40 }),
                  mb: $({ size: 58 }),
                }}>
                <img
                  alt='profile-user'
                  width='160px'
                  height='45px'
                  src={ASSETS.LOGO}
                  style={{ cursor: 'pointer' }}
                />
              </Box>

              <Box
                sx={{
                  paddingX: $({ size: 24 }),
                  display: 'flex',
                  flexDirection: 'column',
                  gap: $({ size: 20 }),
                }}>
                {[
                  {
                    title: 'Report Card',
                    to: ROUTES.CHILD.REPORT_CARD.INDEX,
                    icon: {
                      active: (
                        <ReportCardIcon
                          color={colors.white[800]}
                          size={$({ size: 20, numeric: true })}
                        />
                      ),
                      inactive: (
                        <ReportCardIcon
                          color={colors.extra.grey3}
                          size={$({ size: 20, numeric: true })}
                        />
                      ),
                    },
                  },
                  {
                    title: 'Learn Subject',
                    to: ROUTES.CHILD.LEARN_SUBJECT.INDEX,
                    icon: {
                      active: (
                        <LearnSubjectIcon
                          color={colors.white[800]}
                          size={$({ size: 20, numeric: true })}
                        />
                      ),
                      inactive: (
                        <LearnSubjectIcon
                          color={colors.extra.grey3}
                          size={$({ size: 20, numeric: true })}
                        />
                      ),
                    },
                  },
                  {
                    title: 'Daily Quiz',
                    to: ROUTES.CHILD.DAILY_QUIZ.INDEX,
                    icon: {
                      active: (
                        <RibbonIcon
                          color={colors.white[800]}
                          size={$({ size: 20, numeric: true })}
                        />
                      ),
                      inactive: (
                        <RibbonIcon
                          color={colors.extra.grey3}
                          size={$({ size: 20, numeric: true })}
                        />
                      ),
                    },
                  },
                  {
                    title: 'Explore',
                    to: ROUTES.CHILD.EXPLORE.INDEX,
                    icon: {
                      active: (
                        <CompassIcon
                          color={colors.white[800]}
                          size={$({ size: 20, numeric: true })}
                        />
                      ),
                      inactive: (
                        <CompassIcon
                          color={colors.extra.grey3}
                          size={$({ size: 20, numeric: true })}
                        />
                      ),
                    },
                  },
                ].map((item) => {
                  return (
                    <Item
                      key={item.title}
                      title={item.title}
                      to={item.to}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                      hovered={hovered}
                      setHovered={setHovered}
                    />
                  );
                })}
              </Box>
            </Box>

            <Box
              sx={{
                paddingX: $({ size: 24 }),
                mb: $({ size: 24 }),
              }}>
              <Item
                title='Logout'
                to={ROUTES.CHILD.LOGOUT.INDEX}
                icon={{
                  active: (
                    <LogoutIcon
                      color={colors.white[800]}
                      size={$({ size: 20, numeric: true })}
                    />
                  ),
                  inactive: (
                    <LogoutIcon
                      color={colors.extra.grey3}
                      size={$({ size: 20, numeric: true })}
                    />
                  ),
                }}
                selected={selected}
                setSelected={setSelected}
                hovered={hovered}
                setHovered={setHovered}
              />
            </Box>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

const TopBar = ({ isToggled = false, setIsToggled = () => {} }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const colorMode = React.useContext(ColorModeContext)

  const navigate = useNavigate();
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  const [isChatWithSupportOpen, setIsChatWithSupportOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <Box
      sx={{
        ml: {
          xs: 0,
          lg: `-${$({ size: 50 })}`,
        },
        width: {
          xs: '100%',
          lg: `calc(100% + ${$({ size: 50 })})`,
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: $({ size: 56 }),
        padding: {
          xs: `${$({ size: 8 })} ${$({ size: 16 })}`,
          lg: $({ size: 4 }),
        },
        boxShadow: '7px 1px 5px 0px rgba(0,0,0,0.2)',
        backgroundColor: colors.white[800],
      }}>
      <Box
        sx={{
          display: {
            xs: 'flex',
            lg: 'none',
          },
          cursor: 'pointer',
          alignItems: 'center',
          gap: $({ size: 16 }),
        }}>
        <IconButton
          onClick={() => {
            setIsToggled(!isToggled);
          }}>
          <MenuIcon
            sx={{ fontSize: $({ size: 32 }), color: colors.extra.grey1 }}
          />
        </IconButton>
        <Box
          onClick={() => {
            navigate(ROUTES.CHILD.DASHBOARD.INDEX);
          }}
          component='img'
          alt='logo'
          src={ASSETS.LOGO}
          sx={{
            cursor: 'pointer',
            height: $({ size: 30 }),
          }}
        />
      </Box>

      <Box
        sx={{
          display: {
            xs: 'none',
            lg: 'flex',
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: $({ size: 32 }),
        }}>
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {
            theme.palette.mode === 'dark'
              ? <DarkModeOutlinedIcon />
              : <LightModeOutlinedIcon />
          }
        </IconButton> */}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ChatWithSupportTopBar
            isToggled={isChatWithSupportOpen}
            setIsToggled={() => {
              setIsChatWithSupportOpen(!isChatWithSupportOpen);
              setIsNotificationsOpen(false);
              setIsOptionMenuOpen(false);
              setTimeout(() => {
                setIsChatWithSupportOpen(false);
              }, 15000);
            }}
            data={[
              {
                id: 'message-1',
                text: 'User message goes here',
                showOnRight: true,
              },
              {
                id: 'message-2',
                text: 'User message',
                showOnRight: true,
              },
              {
                id: 'message-3',
                text: 'Support message goes here in this field',
                showOnRight: false,
              },
              {
                id: 'message-4',
                text: 'User message goes here',
                showOnRight: true,
              },
              {
                id: 'message-5',
                text: 'User message',
                showOnRight: true,
              },
              {
                id: 'message-6',
                text: 'Support message goes here in this field',
                showOnRight: false,
              },
              {
                id: 'message-7',
                text: 'User message goes here',
                showOnRight: true,
              },
              {
                id: 'message-8',
                text: 'User message',
                showOnRight: true,
              },
              {
                id: 'message-9',
                text: 'Support message goes here in this field',
                showOnRight: false,
              },
            ]}
          />
          <NotificationsTopBar
            isToggled={isNotificationsOpen}
            setIsToggled={() => {
              setIsChatWithSupportOpen(false);
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsOptionMenuOpen(false);
              setTimeout(() => {
                setIsNotificationsOpen(false);
              }, 5000);
            }}
            data={[
              {
                text: 'Notification text example goes in this field',
                time: '2 hours ago',
                isUnread: true,
              },
              {
                text: 'Notification text example goes in this field',
                time: '2 hours ago',
                isUnread: true,
              },
              {
                text: 'Notification text example goes in this field',
                time: '2 hours ago',
                isUnread: false,
              },
              {
                text: 'Notification text example goes in this field',
                time: '2 hours ago',
                isUnread: false,
              },
              {
                text: 'Notification text example goes in this field',
                time: '2 hours ago',
                isUnread: false,
              },
            ]}
          />
        </Box>

        <Box
          sx={{
            width: $({ size: 56 }),
          }}
        />

        <Box
          onClick={() => {
            setIsChatWithSupportOpen(false);
            setIsNotificationsOpen(false);
            setIsOptionMenuOpen(!isOptionMenuOpen);
            setTimeout(() => {
              setIsOptionMenuOpen(false);
            }, 5000);
          }}
          sx={{
            display: 'flex',
            gap: $({ size: 12 }),
            alignItems: 'center',
            boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
              colors.solids.black,
              0.25
            )}`,
            padding: `${$({ size: 8 })} ${$({ size: 16 })}`,
            borderRadius: $({ size: 16 }),
            cursor: 'pointer',
            width: $({ size: 190 }),
          }}>
          <Avatar
            src={
              'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg'
            }
            alt='profile'
            sx={{
              width: $({ size: 32 }),
              height: $({ size: 32 }),
              borderRadius: $({ size: 8 }),
              objectFit: 'cover',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: $({ size: 2 }),
              userSelect: 'none',
            }}>
            <Typography
              sx={{
                color: colors.extra.grey1,
                fontSize: $({ size: 11 }),
                fontWeight: '500',
                lineHeight: $({ size: 11 }),
              }}>
              Welcome back,
            </Typography>
            <Typography
              sx={{
                color: colors.extra.grey1,
                fontSize: $({ size: 17 }),
                fontWeight: '500',
                lineHeight: $({ size: 17 }),
              }}>
              Michael
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ChevronSlimDownIcon
              size={$({ size: 9, numeric: true })}
              color={colors.extra.grey1}
            />
          </Box>
        </Box>

        {isOptionMenuOpen && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: $({ size: 12 }),
              boxShadow: `0 0 ${$({ size: 2 })} 0 ${alpha(
                colors.solids.black,
                0.25
              )}`,
              padding: $({ size: 16 }),
              borderRadius: $({ size: 8 }),
              position: 'absolute',
              right: $({ size: 28 }),
              top: $({ size: 64 }),
              zIndex: 10,
              backgroundColor: colors.white[800],
              width: $({ size: 240 }),
            }}>
            <Box
              sx={{
                display: 'flex',
                gap: $({ size: 8 }),
                mb: $({ size: 12 }),
              }}>
              <Avatar
                src={
                  'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg'
                }
                alt='profile'
                sx={{
                  width: $({ size: 36 }),
                  height: $({ size: 36 }),
                  borderRadius: $({ size: 8 }),
                  objectFit: 'cover',
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: $({ size: 6 }),
                }}>
                <Typography
                  sx={{
                    color: colors.extra.grey1,
                    fontSize: $({ size: 18 }),
                    fontWeight: '500',
                    lineHeight: $({ size: 18 }),
                  }}>
                  Michael Johnson
                </Typography>
                <Typography
                  sx={{
                    color: colors.extra.grey2,
                    fontSize: $({ size: 11 }),
                    fontWeight: '400',
                    lineHeight: $({ size: 11 }),
                  }}>
                  liamjohnson@gmail.com
                </Typography>
              </Box>
            </Box>

            {[
              {
                icon: (
                  <DashboardIcon
                    size={$({ size: 20, numeric: true })}
                    color={colors.extra.grey2}
                  />
                ),
                title: 'Dashboard',
                to: ROUTES.CHILD.DASHBOARD.INDEX,
              },
              {
                icon: (
                  <CompassIcon
                    size={$({ size: 20, numeric: true })}
                    color={colors.extra.grey2}
                  />
                ),
                title: 'Explore',
                to: ROUTES.CHILD.EXPLORE.INDEX,
              },
              {
                icon: (
                  <LogoutIcon
                    size={$({ size: 20, numeric: true })}
                    color={colors.extra.grey2}
                  />
                ),
                title: 'Logout',
                to: ROUTES.CHILD.LOGOUT.INDEX,
              },
            ].map((item, index, _) => {
              return (
                <Box
                  key={item.title}
                  onClick={() => {
                    if (item.to) {
                      navigate(item.to);
                      setIsOptionMenuOpen(false);
                    }
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: $({ size: 12 }),
                    cursor: 'pointer',
                    ...(index === _.length - 1 && {
                      pt: $({ size: 12 }),
                      ml: `-${$({ size: 16 })}`,
                      mr: `-${$({ size: 16 })}`,
                      pr: $({ size: 16 }),
                      pl: $({ size: 16 }),
                      borderTop: `${$({ size: 1.5 })} solid ${
                        colors.extra.grey4
                      }`,
                    }),
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {item.icon}
                  </Box>

                  <Typography
                    sx={{
                      color: colors.solids.black,
                      fontSize: $({ size: 18 }),
                      fontWeight: '400',
                    }}>
                    {item.title}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const ChildDashboardLayout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isToggled, setIsToggled] = useState(false);

  return (
    <Box
      className='app'
      sx={{ backgroundColor: colors.grey[900] }}>
      <MySideBar
        isToggled={isToggled}
        setIsToggled={setIsToggled}
      />
      <Box
        sx={{
          width: '100%',
          height: `calc(100vh - ${$({ size: 56 })})`,
        }}>
        <TopBar
          isToggled={isToggled}
          setIsToggled={setIsToggled}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default ChildDashboardLayout;
