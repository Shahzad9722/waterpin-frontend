import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, CircularProgress } from '@mui/material';

import { Nav } from "../../components/Nav"
import { Footer } from '../../components/Footer';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, RouteComponentProps, withRouter, useLocation} from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const BlogAuthor = (props:any) => {
  return (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      <img
        src={props.image}
        alt={`Avatar of ${props.name}`}
        style={{width:35, borderRadius:100}}
      />
      <h3 style={{marginLeft:5}}>{props.name}</h3>
      <p>—</p>
      <p>{props.date.toLocaleString()}</p>
    </Box>
  );
};

export const BlogTags = (props:any) => {
  return (
    <Box>
      {props.tags.map((tag) => {
        return (
          <p>
            {tag}
          </p>
        );
      })}
    </Box>
  );
};

interface Props{
  blogs?:any;
}

export function Blog(props:Props) {
  const [posts, set_posts] = React.useState([]);
  React.useEffect(() => {
    if (props.blogs !== undefined && props.blogs !== null) {
      let renderList = props.blogs.map((post) =>
                (
                    <Box
                       mt={1}
                       display="flex"
                       flexDirection={{ base: 'column', sm: 'row' }}
                       justifyContent="space-between">
                       <Box
                         ml={'5%'}
                         mt="5%"
                         >
                         <a href={`blog/${post.slug && post.slug}`}>
                           <img
                             src={post.content.image && post.content.image.filename}
                             alt="Article Image"
                             style={{objectFit:"contain", height:"200px"}}
                           />
                         </a>
                       </Box>
                       <Box
                         display="flex"
                         flexGrow="1"
                         ml={5}
                         flexDirection="column"
                         justifyContent="center"
                         mt={3}>
                         <BlogTags tags={post.tag_list} />
                         <h1>
                           <a href={post.full_slug} style={{textDecoration: 'none'}}>
                             {post.name}
                           </a>
                         </h1>
                         <p>
                           {post.content.intro}
                         </p>
                         <BlogAuthor name={post.content.author} date={post.content.date} image={post.content.author_image && post.content.author_image.filename}/>
                       </Box>
                     </Box>
                )
              ).sort()

      set_posts(renderList)
    }
  },[props.blogs])

  return (
    <>
      <Helmet>
        <title>Waterpin Blog</title>
      </Helmet>
      <Nav/>
        <BlogHeroContainer>
          <BlogHeroTitle>What’s New With Waterpin?</BlogHeroTitle>
          <BlogHeroText>Checkout the latest news, guides, and tips with our Waterpin blog.</BlogHeroText>
        </BlogHeroContainer>
        <Container maxWidth="lg">
          {posts.length > 0
            ? (
              <Grid>
                {posts}
              </Grid>
            )
            : (
              <CircularProgress/>
            )
          }

        </Container>
        <Footer/>
    </>
  );
}


export const BlogHeroText = styled.p`
  font-size: 22px;
  text-align: center;
  color: #fff;
`;

export const BlogHeroTitle = styled.h1`
  font-size: 36px;
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
  margin-bottom:5px;
  width: 100%;
  height: 500px;
  background: #fff;
  transition:  transform 250ms;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${process.env.PUBLIC_URL + '/blog-bg.png'});
`;
