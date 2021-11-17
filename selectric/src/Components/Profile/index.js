import { Avatar } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import './profile.css'


  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }
  

export default function Profile( props) {


    return (
        <div className='profile__holder'>
                {props.userData ?
                
                props.userData.avatar ? 
                
                (<Avatar src={'bolt1.svg'} sx={{height:'70px',width:'70px', boxShadow: 3}}/>) 
                : 
                (<Avatar {...stringAvatar(props.userData.username)} sx={{height: '70px',width:'70px', boxShadow: 3}}/>) : ''}
                   
                
            
           
            
            <div className='names__holder'>

            <h2 className='profile__name'>{props.userData && props.userData.username}</h2>
            <h3 className = 'car__name'>{props.userData && props.userData.cars.brand}{props.userData && props.userData.cars.model}</h3>

            </div>
            
        </div>
    )
}
