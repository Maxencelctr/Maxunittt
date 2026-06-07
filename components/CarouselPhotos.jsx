'use client'
import { useState } from 'react'

export default function CarouselPhotos({ photos }) {
  const [photoActive, setPhotoActive] = useState(0)

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full aspect-[3/4] rounded-2xl bg-[#E8DFD0]" />
    )
  }

  const precedente = () => {
    setPhotoActive(prev => prev === 0 ? photos.length - 1 : prev - 1)
  }

  const suivante = () => {
    setPhotoActive(prev => prev === photos.length - 1 ? 0 : prev + 1)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Photo principale */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#E8DFD0]">
        <img src={photos[photoActive]} alt="" className="w-full aspect-[3/4] object-cover rounded-2xl" />
        {photos.length > 1 && (
          <>
            <button onClick={precedente} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-9 h-9 flex items-center justify-center hover:bg-white transition-colors">
              ←
            </button>
            <button onClick={suivante} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-9 h-9 flex items-center justify-center hover:bg-white transition-colors">
              →
            </button>
          </>
        )}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {photos.map((_, index) => (
            <button key={index} onClick={() => setPhotoActive(index)} className={`w-1.5 h-1.5 rounded-full transition-colors ${index === photoActive ? 'bg-white' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>

      {/* Miniatures */}
      {photos.length > 1 && (
        <div className="flex gap-2">
          {photos.map((photo, index) => (
            <button key={index} onClick={() => setPhotoActive(index)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${index === photoActive ? 'border-[#3D2B1F]' : 'border-transparent'}`}>
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}