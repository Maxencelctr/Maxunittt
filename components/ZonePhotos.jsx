'use client'

const labelsPhotos = [
  'Photo face',
  'Photo dos',
  'Photo défaut',
  'Photo logo',
  'Photo étiquette',
  'Photo bonus',
]

export default function ZonePhoto({ photos, setPhotos, uploadEnCours, setUploadEnCours, setErreur }) {

  const handlePhoto = async (e, index) => {
    const file = e.target.files[0]
    if (!file) return

    const nouveauxUploads = [...uploadEnCours]
    nouveauxUploads[index] = true
    setUploadEnCours(nouveauxUploads)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (data.url) {
        const nouvellesPhotos = [...photos]
        nouvellesPhotos[index] = data.url
        setPhotos(nouvellesPhotos)
      }
    } catch (error) {
      setErreur('Erreur upload photo')
    }

    const nouveauxUploads2 = [...uploadEnCours]
    nouveauxUploads2[index] = false
    setUploadEnCours(nouveauxUploads2)
  }

  const supprimerPhoto = (index) => {
    const nouvellesPhotos = [...photos]
    nouvellesPhotos[index] = ''
    setPhotos(nouvellesPhotos)
  }

  return (
    <div>
      <label className="text-xs font-semibold text-[#8C7B6B] tracking-widest">PHOTOS (6 max)</label>
      <div className="grid grid-cols-3 gap-3 mt-2">
        {labelsPhotos.map((label, index) => (
          <div key={index} className="flex flex-col gap-1">
            <p className="text-xs text-[#8C7B6B]">{label}</p>
            <div className="relative border border-[#E8DFD0] rounded-xl overflow-hidden h-24 bg-[#F5F0E8] flex items-center justify-center">
              {photos[index] ? (
                <>
                  <img src={photos[index]} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => supprimerPhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </>
              ) : (
                <p className="text-xs text-[#8C7B6B]">
                  {uploadEnCours[index] ? 'Upload...' : '+ Photo'}
                </p>
              )}
              {!photos[index] && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handlePhoto(e, index)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}