
import { Avatar, AvatarGroup } from '@mui/material'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import React from 'react'
import '../About/about.css'
import './features.css'
export default function Feature({title,text,avatars}) {
    const avatarStyle = {height:'10vw',width:'10vw',maxHeight: '80px',maxWidth: '80px',transition: 'all 0.2s ease', '&:hover': {transform: 'scale(1.1)', cursor: 'pointer'}}
    const people = [
        
        { icon: <Avatar sx={avatarStyle}src={'headshots/ed.png'} onClick={() => window.location.href='https://github.com/eledoro'}/>, name: 'Elena Doronina' },
        { icon: <Avatar sx={avatarStyle}src={'headshots/kp.png'} onClick={() => window.location.href='https://github.com/KushalPatel36'}/>, name: 'Kushal Patel' },
        { icon:  <Avatar sx={avatarStyle}src={'headshots/dt.png'} onClick={() => window.location.href='https://github.com/dimtaiwo'}/>, name: 'Dimeji Taiwo' },
        { icon:  <Avatar sx={avatarStyle}src={'headshots/bw.png'} onClick={() => window.location.href='https://github.com/benwato'}/>, name: 'Ben Watson' },
        { icon:  <Avatar sx={avatarStyle}src={'headshots/bm.png'} onClick={() => window.location.href='https://github.com/brodie-m'}/>, name: 'Brodie McGuire' },
        
      ];
    return (
        <div className='selectric__features-container__feature'>
            <div className='selectric__features-container__feature-title'>
                <hr />
                <h1>{title}</h1>
                </div>
                <div className='selectric__features-container__feature-text'>
                    <p>{text}</p>
                </div>
                {avatars && <AvatarGroup>
                    {people.map(person => (
                        person.icon
                    ))}
                </AvatarGroup>
                   }
            
        </div>
    )
}
// <SpeedDial 
// sx={{p: 2}}
// ariaLabel="people"
// icon={<SpeedDialIcon sx={{ background: 'var(--gradient-text)', borderRadius: '20%', color: 'white', marginLeft: '22px'}}/>}
// direction={'right'}

// >

//    {people.map(person => (
//        <SpeedDialAction
//        key={person.name}
//        icon={person.icon}
//        tooltipTitle={person.name}
//        sx={{zIndex: 20, transform: 'scale(1.5)', marginTop: '1rem', ml:3}}
//        />
//        ))}
//        </SpeedDial>