import { Avatar } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import './profile.css'
export default function Profile( props) {

    return (
        <div className='profile__holder'>
            <Avatar alt='profile picture' sx={{height: '70px',width:'70px'}}/>
            <div className='names__holder'>
            <h2 className='profile__name'>{props.userData && props.userData.username}</h2>
            <h3 className = 'car__name'>{props.userData && props.userData.selectedCar}</h3>
            </div>
            
        </div>
    )
}
