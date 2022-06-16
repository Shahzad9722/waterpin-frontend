import React from 'react'
import Typography from '@mui/material/Typography';
import Storyblok, { useStoryblok } from "../storyblok";

const TextComponent: React.FC<{blok:any}> = ({blok}) => {
  return (
    <Typography align={blok.text_align} padding={blok.padding} fontWeight={blok.font_weight} mt={blok.margin_top} ml={blok.margin_left} mr={blok.margin_top} mb={blok.margin_bottom} color={blok.color} fontSize={blok.size_base}>
      {blok.text}
    </Typography>
  )
}

function createMarkup(storyblokHTML) {
  return {
    __html: Storyblok.richTextResolver.render(storyblokHTML),
  }
}

export const RichTextField = ({blok}) => {
  return <div style={{color:blok.color, textAlign:blok.textAlign, fontSize:blok.fontSize}} dangerouslySetInnerHTML={createMarkup(blok.data)} />
}

export default TextComponent
