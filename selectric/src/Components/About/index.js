import React from 'react'
import Feature from '../Feature'
import './about.css'
export default function About() {
    return (
        <div className='selectric__about section__margin' id='about'>
            <div className='selectric__about-feature'>
                <Feature title='Meet our team' avatars={true}/>
            </div>
            <div className = 'selectric__about-heading'>
                <h1 className = 'gradient__text'>learn more about selectric</h1>
               

            </div>
            <div className='selectric__about-container'>
                <Feature title='purpose' text='purpose here...'/>
                <Feature title='how does it work' text='selectric uses...' />
            </div>
        </div>
    )
}
