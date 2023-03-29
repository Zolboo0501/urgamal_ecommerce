import GlobalLayout from "@/components/GlobalLayout/GlobalLayout"
import { useEffect } from "react"
import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const Location = () => {

    useEffect(() => {
        window.dispatchEvent(new Event('storage'))
    })
    return (
        <div>
            <GlobalLayout />
            <div className="bg-grey-back w-full h-full">
                <html>
                    <iframe width="600" height="450" loading="lazy" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJS22qaQYFJzYRluDmNzkh3eA&key=AIzaSyAV8VW1N-lXwWL6LshQoovekgAFBV57tdE"></iframe>
                </html>
            </div>
        </div>
    )
}

export default Location