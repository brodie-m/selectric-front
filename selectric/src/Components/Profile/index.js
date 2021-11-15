import { Avatar } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import './profile.css'
export default function Profile( props) {
//     const [userData, setUserData] = useState(null)
//     useLayoutEffect(()=> {
//     const token = localStorage.getItem('token')
//     console.log(token)
//     async function fetchUserData() {
//         const options = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'auth-token':token
//             }
//         }
//         const result = await fetch(`https://selectric.herokuapp.com/user`, options)
        
//         const data = await result.json()
//         setUserData(data)
        
    
//       }
//       fetchUserData()
//       return () => {
          
//       };
//   }, [])
    return (
        <div className='profile__holder'>
            <Avatar alt='profile picture' sx={{height: '70px',width:'70px'}}/>
            <div className='names__holder'>
            <h2 className='profile__name'>{userData && userData.username}</h2>
            <h3 className = 'car__name'>Tesla Model S</h3>
            </div>
            
        </div>
    )
}
