import { Button } from '@mui/material'
import React from 'react'
import './header.css'
import map from '../../assets/map.png'
export default function Header() {
    return (
        <div className='selectric__header section__padding' id='home'>
            <div className='selectric__header-content'>
                <h1 className='gradient__text'>
                Select the perfect route for your electric vehicle
                </h1>
                <p>Selectric plans your journey for you. No more worrying about charging points or what to do when you’re charging - we’ve got you covered.</p>
            
            <div className = 'selectric__header-content__input'>
                <input type='email' placeholder='your email address'></input>
                <button>get started</button>
            </div>
            </div>
            <div className = 'selectric__header-image' >
                <img src={map} alt='map'/>
            </div>
        </div>
    )
}
