import { Avatar } from '@mui/material'
import React from 'react'
import './profile.css'
export default function Profile() {
    return (
        <div className='profile__holder'>
            <Avatar alt='profile picture' sx={{height: '70px',width:'70px'}}/>
            <div className='names__holder'>
            <h2 className='profile__name'>User name</h2>
            <h3 className = 'car__name'>Tesla Model S</h3>
            </div>
            
        </div>
    )
}
