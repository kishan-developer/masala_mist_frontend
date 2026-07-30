import React from 'react'

import AboutHero from './components/AboutHero'
import WelcomeSection from './components/WelcomeSection'
import HotelFacilities from './components/HotelFacilities'
import TestimonialSection from '../Home/TestimonialSection'
import MeetTheTeam from './components/MeetTheTeam'

export default function page() {
  return (
    <div>
      <AboutHero />

      <WelcomeSection />

      <HotelFacilities/>

      <TestimonialSection />

      {/* <MeetTheTeam /> */}
    </div>
  )
}
