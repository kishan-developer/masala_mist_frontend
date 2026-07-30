import React from 'react'
import GalleryHero from './Components/GalleryHero'
import GalleryGrid from './Components/GalleryGrid'
import VideoOverview from './Components/VideoOverview'

export default function page() {
  return (
    <div>
      <GalleryHero/>

      <GalleryGrid />

      <VideoOverview />
    </div>
  )
}
