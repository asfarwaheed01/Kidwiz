import React, {useState, useEffect} from 'react'
import { Box, Grid, Typography } from '@mui/material';
import {  useTheme } from '@mui/material/styles';

import { useAppContext } from '../../../context/appContext';
// import { ASSETS } from '../../../config/assets';
// import { ROUTES } from '../../../config/routes';
import { tokens } from '../../../theme';
import { $ } from '../../../utils';

import AddChildModal from './AddChildModal';
import ChildInfoCard from './ChildInfoCard';

const ChildrenHorzontalCardList = ({wrapperStyleChildCard, addButtonStyleChildCard, containerStyleChildCard}) => {

    const theme = useTheme();
  const colors = tokens(theme.palette.mode);

//   const navigate = useNavigate();

  const {user, users_children, getAllChilds, childrenLoading, deleteChild, isLoading} = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    mode: "create",
    index: -1,
  });


  useEffect(() => {
    if(isLoading === false)
      getAllChilds();
  }, [isLoading])
  return (
    <Box>
         { childrenLoading 
                && 
                <Box>
                  <Typography
                    sx={{
                      fontSize: $({ size: 32 }),
                      fontWeight: '600',
                      lineHeight: $({ size: 40 }),
                      textAlign: 'center',
                      color: colors.grey[200],
                      margin: `${$({ size: 24 })} 0`,
                      
                    }}
                    >
                    Loading
                  </Typography>
                </Box> 
            }

          <Grid
            container
            sx={{
              minWidth: {
                xs: '100%',
                lg: $({ size: 320 }),
              },
              width: $({ size: 320 * 3 + 24 * 2 }),
              maxWidth: '100%',
              rowGap: $({ size: 24 }),
            }}>
              { (childrenLoading && <Box></Box>)
              
                ||

              (users_children.map((child,index)=>{
                // console.log("child index -- >" + index);
                return(
                  <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={index}>
                  <ChildInfoCard
                    fullname={child.fullname}
                    age={child.age}
                    gender={child.gender}
                    difficulty={child.difficulty}
                    profilePicture={  child.img }
                    hasInfo={
                      !(Object.keys(child).length === 0 && child.constructor === Object) && !child.disabled }
                    disabled={ (index === 2 && user.tier !== "premium") || child.disabled }
                    handleAddChild={() => {
                      setIsModalOpen({ isOpen: true, mode:"create", index: index });
                    }}
                    handleEditChild={() => {
                      setIsModalOpen({ isOpen: true,mode:"update", index: index });
                    }}
                    handleDeleteChild={() => {
                      
                      deleteChild(child.id);
                      child.disabled = true;
                      // console.log("here");
                    }}
                    wrapperStyle = {wrapperStyleChildCard}
                    addButtonStyle = {addButtonStyleChildCard}
                    containerStyle = {containerStyleChildCard}
                  />
                </Grid>
                )
              }))}
            
          </Grid>

        {isModalOpen.isOpen && (
        <AddChildModal
          currentChildData={users_children[isModalOpen.index]}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </Box>
  )
}

export default ChildrenHorzontalCardList