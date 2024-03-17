import React from 'react';
import { Box } from '@mui/material';

import { $ } from '../../../utils';

import AddChildModal from './../../onBoarding/addChildren/AddChildModal';
import ChildInfoCard from './../../onBoarding/addChildren/ChildInfoCard';

import ChildrenHorzontalCardList from '../../onBoarding/addChildren/ChildrenHorzontalCardList';

const ChildrenTab = ({ topSectionHeight = 0 }) => {
  const [childrenData, setChildrenData] = React.useState([
    { hasInfo: false, disabled: false },
    { hasInfo: false, disabled: false },
    { hasInfo: false, disabled: true },
  ]);

  const [isModalOpen, setIsModalOpen] = React.useState({
    isOpen: false,
    index: -1,
  });

  return (
    <Box
      sx={{
        // display: 'flex',
        // gap: $({ size: 20 }),
        // justifyContent: 'center',
        // alignItems: 'center',
        // mt: $({ size: 20 }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // width: '100%',
        // height: '100%',
      }}>

        <ChildrenHorzontalCardList 
          wrapperStyleChildCard={{
            padding: 0,
            maxWidth: $({ size: 304 }),
            height: $({ size: 128 }),
            gap: $({ size: 16 }),
          }}
          addButtonStyleChildCard={{
            width: '100%',
          }}
          containerStyleChildCard={{
            maxWidth: $({ size: 304 }),
            height: $({ size: 128 }),
          }}
        />
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: $({ size: 24 }),
          justifyContent: 'center',
        }}>
        {childrenData.map((child, index) => {
          return (
            <ChildInfoCard
              key={index}
              fullname={child.fullname}
              age={child.age}
              gender={child.gender?.label}
              difficulty={child.difficulty?.label}
              profilePicture={child?.profilePicture?.src}
              hasInfo={child.hasInfo}
              disabled={child.disabled}
              handleAddChild={() => {
                setIsModalOpen({ isOpen: true, index: index });
              }}
              handleEditChild={() => {
                setIsModalOpen({ isOpen: true, index: index });
              }}
              handleDeleteChild={() => {
                const newChildrenData = [...childrenData];
                newChildrenData[index] = { hasInfo: false, disabled: false };
                setChildrenData(newChildrenData);
              }}
              wrapperStyle={{
                padding: 0,
                maxWidth: $({ size: 304 }),
                height: $({ size: 128 }),
                gap: $({ size: 16 }),
              }}
              addButtonStyle={{
                width: '100%',
              }}
              containerStyle={{
                maxWidth: $({ size: 304 }),
                height: $({ size: 128 }),
              }}
            />
          );
        })}
      </Box>

      {isModalOpen.isOpen && (
        <AddChildModal
          currentChildData={childrenData[isModalOpen.index]}
          childrenData={childrenData}
          setChildrenData={setChildrenData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )} */}
    </Box>
  );
};

export default ChildrenTab;
