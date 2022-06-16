import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { Nav } from "../../components/Nav"
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, RouteComponentProps, withRouter, useLocation} from 'react-router-dom';
import { Box, Container, Grid, CircularProgress } from '@mui/material';

import { Storyblok } from "../../storyblok"
import { useStoryblok } from "../../storyblok"
import DynamicComponent from "../../cms-components/DynamicComponent"
import {BlogAuthor, BlogTags} from "./Blog"
import { render, NODE_HEADING, NODE_UL, NODE_LI, NODE_OL, NODE_IMAGE, NODE_PARAGRAPH  } from "storyblok-rich-text-react-renderer"
import { Footer } from '../../components/Footer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


interface Props{
  story?:any;
}


export function BlogDetail(props:Props) {
  const [pageTitle, set_pageTitle] = React.useState('');
  const [pageIntro, set_pageIntro] = React.useState('');
  const [pageImg, set_pageImg] = React.useState('');

  const [pageAuthor, set_pageAuthor] = React.useState('');
  const [pageAuthorImage, set_pageAuthorImage] = React.useState('');
  const [pageDate, set_pageDate] = React.useState('');

  const [pageText, set_pageText] = React.useState('');

  let story = useStoryblok(props.story, true)


  React.useEffect(() => {
    //setTimeout(() => dispatch(actions.loadAccount()), 100);
  },[])

  React.useEffect(() => {
    if (props.story !== null && props.story !== null) {
      set_pageTitle(props.story.content.title)
      set_pageIntro(props.story.content.intro)
      set_pageImg(props.story.content.image.filename)
      set_pageDate(props.story.content.date)
      set_pageAuthorImage(props.story.content.author_image.filename)
      set_pageAuthor(props.story.content.author)
      set_pageText(props.story.content.long_text)
    }
  },[props.story])

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Nav/>
        <BlogHeroContainer style={{backgroundImage:`url(${pageImg})`}}>
          <BlogHeroTitle>{pageTitle}</BlogHeroTitle>
          <BlogHeroText>{pageIntro}</BlogHeroText>
        </BlogHeroContainer>
        <Container maxWidth="md">
          {story && story.content
            ? (
              <Box display={'flex'} flexDirection={'column'} flexGrow={1} maxWidth={'850px'} alignItems={'center'} justifyContent={'center'}>
                 <br/>
                  {render(pageText, {
                    nodeResolvers: {
                        [NODE_HEADING as any]: (children, props) => <h1  {...props} >{children}</h1>,
                        [NODE_PARAGRAPH  as any]: (children, props) => <BlogText  {...props} >{children}</BlogText>,
                        [NODE_UL as any]: (children, props) => <ul style={{marginLeft:45}} {...props} >{children}</ul>,
                        [NODE_OL as any]: (children, props) => <ol style={{marginLeft:45}}>{children}</ol>,
                        [NODE_IMAGE as any]: (children, props) => <img src={props.src} style={{width:"100%", marginTop:10, marginBottom:10, marginLeft:"auto", marginRight:"auto"}}/>
                    }
                  })}
                 <br/>
                 <br/>
               </Box>
            )
            : <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'center'}><CircularProgress/></Box>
          }
        </Container>
        {story && story.content && story.content.blocks && story.content.blocks.map((blok) =>
          (<DynamicComponent blok={blok} key={blok._uid}/>
          )
        )}
        <Footer/>
    </>
  );
}

export const BlogText = styled.p`
  line-height: 2rem;
  font-size: 1.45rem;
`;

export const BlogHeroText = styled.p`
  font-size: 1.45rem;
  text-align: center;
  color: #fff;
`;

export const BlogHeroTitle = styled.h1`
  font-size: 2rem;
  line-height: 42px;
  text-align: center;
  color: #fff;
  margin-top:40px;
  margin-bottom:40px;
`;


export const BlogHeroContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  padding:20px;
  width: 100%;
  min-height: 500px;
  height: 500px;
  transition:  transform 250ms;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${process.env.PUBLIC_URL + '/blog-hero.jpg'});
`;
