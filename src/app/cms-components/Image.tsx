import React from 'react'

const ImageComponent = ({blok}) => {
  return (
    <img src={blok.image_url.filename} alt={blok.alt} style={{width:blok.width, height:blok.height, borderRadius:blok.borderRadius}} />
  )
}

export default ImageComponent
