import { Button, Container, Dialog } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import './header.css'
import map from '../../assets/map.png'
import Register from '../Register';
import { flexbox } from '@mui/system';
import About from '../About';
export default function Header(props) {
    const [formToDisplay, setFormToDisplay] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
    useLayoutEffect(() => {
        const titles = document.querySelectorAll('.anim')
        const observer =new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate')
                }
                else {entry.target.classList.remove('animate')}
            })
        })
        titles.forEach(title=> {
            observer.observe(title)
        })
        return () => {
            
        };
    }, [])
    return (
        <>
        <div className='selectric__header section__padding' id='home'>
            <div className='selectric__header-content anim'>
                <h1 className='gradient__text anim'>
                Select the perfect route for your electric vehicle
                </h1>
                <p className ='anim'>Selectric plans your journey for you. No more worrying about charging points or what to do when you’re charging - we’ve got you covered.</p>
            
            <div className = 'selectric__header-content__input'>
               
                <input type='email' placeholder='your email address' id='email-input'></input>
                <button onClick = {() => {
                    const emailToPass = document.getElementById('email-input').value
                    console.log(emailToPass)
                    handleOpen();
                    setFormToDisplay(<Register email={emailToPass}/>);
                }}>get started</button>
               
            </div>
            </div>
            <div className = 'selectric__header-image' >
                <img src={map} alt='map'/>
            </div>
            
           

      
    <Dialog open={open} onClose = {handleClose}>
    {formToDisplay}
</Dialog>

        </div>
        <div>
            <About/>
        </div>
        </>
    )
}
