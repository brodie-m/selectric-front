import React, { useState } from 'react'
import './directions.css'
export default function Directions(props) {
    const route = props.route
    console.log(route)
    // const [query, setQuery] = useState('')

    function buildQuery(legsArray) {
        // get initial start location
       
        let locations = []
        if (legsArray.length > 1) {
            for (let i = 0; i < legsArray.length; i++ ) {
            
                if (i==legsArray.length-1) {
                    locations.push({
                        lat: legsArray[i].start_location.lat(), lng: legsArray[i].start_location.lng()
                    })
                    locations.push({
                        lat: legsArray[i].end_location.lat(), lng: legsArray[i].end_location.lng()
                    })
                }
                else {
                    locations.push({
                        lat: legsArray[i].start_location.lat(), lng: legsArray[i].start_location.lng()
                    })
                }
                
            }
        }
        else {
            locations.push({
                lat: legsArray[0].start_location.lat(), lng: legsArray[0].start_location.lng()
            })
            locations.push({
                lat: legsArray[0].end_location.lat(), lng: legsArray[0].end_location.lng()
            })
        }
        
        
        const start = `https://www.google.com/maps/dir/`
        let query = ''
        locations.forEach(location => {
            query += `${location.lat}+${location.lng}/`
        })
        const result = start + query;
        // setQuery(result)
        console.log(result)
    }
    if (route) {
        buildQuery(route[3])
    }
    return (
        <div className = 'property'>
            { route &&

                <>
                <h3 className='gradient__text'>Duration: </h3>
                <h4>{route[0]}</h4>
            <h3 className='gradient__text'>Distance:</h3>
            <h4>{route[1]}</h4>
            <h3 className='gradient__text'>Summary: </h3>
            <h4>{route[2]}</h4>
            {/* <h4><a href={query}>Take me there</a></h4> */}
            </>
            }
        </div>
    )
}
