import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function MobileMenu({isLoggedIn}) {
   
    const actions = isLoggedIn ? [
        
        { icon: <HomeIcon onClick={() => window.location.href = 'https://selectric.netlify.app/'}/>, name: 'Home' },
        { icon: <AccountCircleIcon onClick={() => window.location.href = 'https://selectric.netlify.app/profile'} />, name: 'Profile' },
        { icon: <QuestionAnswerTwoToneIcon onClick={() => window.location.href = 'https://selectric.netlify.app/#about'}/>, name: 'About' },
        
      ] : [
        
        { icon: <HomeIcon />, name: 'Home' },
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
