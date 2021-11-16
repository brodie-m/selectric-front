import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function MobileMenu() {
   
    const actions = [
        
        { icon: <HomeIcon />, name: 'Home' },
        { icon: <AccountCircleIcon />, name: 'Profile' },
        { icon: <QuestionAnswerTwoToneIcon />, name: 'About' },
        
      ];
    return (
        
        <SpeedDial
          ariaLabel="mobile menu"
          icon={<SpeedDialIcon />}
          direction={'down'}
          sx={{transform: 'scale(0.7)'}}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              sx={{zIndex: 20}}
            />
          ))}
        </SpeedDial>
      
    )
}
