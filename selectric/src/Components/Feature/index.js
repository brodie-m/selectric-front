
import { Avatar, AvatarGroup } from '@mui/material'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import React from 'react'
import '../About/about.css'
import './features.css'
export default function Feature({title,text,avatars}) {
    const people = [
        
        { icon: <Avatar src={'headshots/ed.png'}/>, name: 'Elena Doronina' },
        { icon: <Avatar src={'headshots/kp.png'}/>, name: 'Kushal Patel' },
        { icon:  <Avatar src={'headshots/dt.png'}/>, name: 'Dimeji Taiwo' },
        { icon:  <Avatar src={'headshots/bw.png'}/>, name: 'Ben Watson' },
        { icon:  <Avatar src={'headshots/bm.png'}/>, name: 'Brodie McGuire' },
        
      ];
    return (
        <div className='selectric__features-container__feature'>
            <div className='selectric__features-container__feature-title'>
                <hr />
                <h1>{title}</h1>
                <div className='selectric__features-container__feature-text'>
                    <p>{text}</p>
                </div>
                {avatars && <SpeedDial 
                sx={{p: 2, mb:-3}}
                 ariaLabel="people"
                 icon={<SpeedDialIcon sx={{ background: 'var(--gradient-text)', borderRadius: '20%', color: 'white', marginLeft: '22px'}}/>}
                 direction={'right'}
                
                >

                    {people.map(person => (
                        <SpeedDialAction
                        key={person.name}
                        icon={person.icon}
                        tooltipTitle={person.name}
                        sx={{zIndex: 20, transform: 'scale(1.5)', marginTop: '1rem', ml:3}}
                        />
                        ))}
                        </SpeedDial>
                   }
            </div>
        </div>
    )
}
