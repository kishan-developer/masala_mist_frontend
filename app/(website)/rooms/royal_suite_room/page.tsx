import React from 'react'

import Room_details_hero from './Components/Room_details_hero'
import RoomDetails from './Components/RoomDetails'
import SimilarRooms from './Components/SimilarRooms'

export default function page() {
  return (
    <div>
      <Room_details_hero  />

      <RoomDetails />

      <SimilarRooms />
    </div>
  )
}
