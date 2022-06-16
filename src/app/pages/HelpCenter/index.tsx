import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, CircularProgress, Skeleton, Typography} from '@mui/material';

import { Nav } from "../../components/Nav"
import { Footer } from '../../components/Footer';

import { MenuTreeItem,MenuTreeItemLink, MenuTreeItemSecondary, MenuTreeFlex, TreeContentCard, TreeContentHeader, TreeContentBox, TreeContentLabel, TreeContentText } from '../../components/layout';

import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, RouteComponentProps, withRouter, useLocation} from 'react-router-dom';
import DynamicComponent from "../../cms-components/DynamicComponent"
import { render, NODE_HEADING, NODE_UL, NODE_LI, NODE_OL, NODE_IMAGE, NODE_PARAGRAPH  } from "storyblok-rich-text-react-renderer"
import { CgChevronRight, CgChevronDown } from 'react-icons/cg';

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
  articles?:any;
}

interface Props extends RouteComponentProps{
  folder?: string; // parameters will always be a string (even if they are numerical)
  slug: string; // parameters will always be a string (even if they are numerical)
}

export function HelpCenter(props:Props) {

  const { folder, slug } : any = useParams();

  const [page_index, set_page_index] = React.useState(0);
  const [activeArticle, set_activeArticle] = React.useState<any>({ content:{name:'', intro:'', long_text:''}, id:''});
  const [loading, set_loading] = React.useState<any>(false);

  const [articles, set_articles] = React.useState([]);
  const [general_articles, set_general_articles] = React.useState([]);
  const [getStarted_articles, set_getStarted_articles] = React.useState([]);
  const [renter_articles, set_renter_articles] = React.useState([]);
  const [owner_articles, set_owner_articles] = React.useState([]);
  const [terms_articles, set_terms_articles] = React.useState([]);
  const [other_articles, set_other_articles] = React.useState([]);

  React.useEffect(() => {

  },[])

  React.useEffect(() => {
    if (props.articles !== undefined && props.articles !== null) {
      let renderList = props.articles.map((post) =>
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

      set_articles(renderList)

      let getStarted = props.articles.filter((element:any) => element.full_slug.includes('get-started'))
      set_getStarted_articles(getStarted)
      //set_activeArticle(getStarted[0])

      let renterArts = props.articles.filter((element:any) => element.full_slug.includes('renter'))
      set_renter_articles(renterArts)

      let ownerArts = props.articles.filter((element:any) => element.full_slug.includes('owner'))
      set_owner_articles(ownerArts)

      let termsArts = props.articles.filter((element:any) => element.full_slug.includes('terms-and-conditions'))
      set_terms_articles(termsArts)

      if (folder !== undefined && folder !== null) {
        switch (true) {
          case folder === 'get-started':
            set_page_index(0)
            break;
          case folder === 'renter':
            set_page_index(1)
            break;
          case folder === 'owner':
            set_page_index(2)
            break;
          case folder === 'terms-and-conditions':
            set_page_index(3)
            break;
          default:
            set_page_index(0)
            break;
        }
      }
      if (slug !== undefined && slug !== null) {
        let fullSlug = 'help-center/'+folder+'/'+slug
        console.log(fullSlug)
        let foundArticle = props.articles.find((element:any)=>element.full_slug === fullSlug)
        if (foundArticle) {
          set_activeArticle(foundArticle)
        }
      }

      if (folder !== undefined && folder !== null && slug === undefined) {
        let fullSlug = 'help-center/'+folder+'/'
        let foundArticle = props.articles.find((element:any)=>element.full_slug.includes(fullSlug) && element.full_slug.includes('general') )
        if (foundArticle) {
          set_activeArticle(foundArticle)
        }
      }

      if ((folder === undefined || folder === null) && (slug === undefined || slug === null)) {
        let fullSlug = 'help-center/get-started/general'
        let foundArticle = props.articles.find((element:any)=>element.full_slug === fullSlug)
        if (foundArticle) {
          set_activeArticle(foundArticle)
        }
      }

      console.log(folder)
    }
  },[props.articles])

  function handlePageChange(index:number) {
    if (page_index === index) {
      set_page_index(-1)
    }else{
      set_page_index(index)
    }
  }

  function handleArticleChange(article:any) {
    set_activeArticle(article)
  }

  function renderChevron(index:number, activeIndex:number) {
    if (index === activeIndex) {
      return <CgChevronDown style={{marginRight:10}}/>
    }else{
      return <CgChevronRight style={{marginRight:10}}/>
    }
  }

  function renderHelpCenterView(activeArticle:any) {

    if (activeArticle === null && activeArticle === undefined) {
      return null
    }

    return(
      <TreeContentCard>
      <TreeContentHeader>
        <TreeContentLabel style={{marginBottom:20, paddingLeft:20}}>{activeArticle && activeArticle.name || <Skeleton variant="text" height={40} width={"30%"} animation="wave" /> }</TreeContentLabel>
        <p style={{marginRight:10}}>{activeArticle && activeArticle.content.intro}</p>
      </TreeContentHeader>
      <TreeContentBox style={{minHeight:500}}>
        {activeArticle && activeArticle.content
          ? (
            <Box display={'flex'} flexDirection={'column'} flexGrow={1} maxWidth={'850px'} alignItems={'flex-start'} justifyContent={'flex-start'}>
               <br/>
                {render(activeArticle.content.long_text, {
                  nodeResolvers: {
                      [NODE_HEADING as any]: (children, props) => <Typography variant={`h${props.level}`} {...props} >{children}</Typography>,
                      [NODE_PARAGRAPH  as any]: (children, props) => <p {...props} >{children}</p>,
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

      </TreeContentBox>
      <br/>
      </TreeContentCard>
    )
  }

  return (
    <>
      <Helmet>
        <title>Help Center</title>
      </Helmet>
      <Nav/>
        <Container maxWidth="lg">
          <MenuTreeFlex>
            <Box width={'35%'}>
              <TreeContentCard>
                <MenuTreeItem onClick={()=>handlePageChange(0)}>{renderChevron(0,page_index)}Getting Started:</MenuTreeItem>
                {page_index === 0
                  ? (
                    <Box sx={{backgroundColor:"#fff"}} mb={1}>
                      {getStarted_articles.map((element:any, index) => {
                        return (
                          <MenuTreeItemSecondary onClick={(e)=> handleArticleChange(element)}>
                            <MenuTreeItemLink isActive={element.id === activeArticle.id ? true:false}>{element.name || ''}</MenuTreeItemLink>
                          </MenuTreeItemSecondary>
                        );
                      }).reverse()}

                    </Box>
                  )
                  : null
                }
                <MenuTreeItem onClick={()=>handlePageChange(1)}>{renderChevron(1,page_index)}Renter :</MenuTreeItem>
                {page_index === 1
                  ? (
                    <Box sx={{backgroundColor:"#fff"}} mb={1}>
                      {renter_articles.map((element:any, index) => {
                        return (
                          <MenuTreeItemSecondary onClick={(e)=> handleArticleChange(element)}>
                            <MenuTreeItemLink isActive={element.id === activeArticle.id ? true:false}>{element.name || ''}</MenuTreeItemLink>
                          </MenuTreeItemSecondary>
                        );
                      }).reverse()}

                    </Box>
                  )
                  : null
                }
                <MenuTreeItem onClick={()=>handlePageChange(2)}>{renderChevron(2,page_index)}Owner :</MenuTreeItem>
                {page_index === 2
                  ? (
                    <Box sx={{backgroundColor:"#fff"}} mb={1}>
                      {owner_articles.map((element:any, index) => {
                        return (
                          <MenuTreeItemSecondary onClick={(e)=> handleArticleChange(element)}>
                            <MenuTreeItemLink isActive={element.id === activeArticle.id ? true:false}>{element.name || ''}</MenuTreeItemLink>
                          </MenuTreeItemSecondary>
                        );
                      }).reverse()}

                    </Box>
                  )
                  : null
                }
                <MenuTreeItem onClick={()=>handlePageChange(3)}>{renderChevron(3,page_index)}Terms & Conditions :</MenuTreeItem>
                {page_index === 3
                  ? (
                    <Box sx={{backgroundColor:"#fff"}} mb={1}>
                      {terms_articles.map((element:any, index) => {
                        return (
                          <MenuTreeItemSecondary onClick={(e)=> handleArticleChange(element)}>
                            <MenuTreeItemLink isActive={element.id === activeArticle.id ? true:false}>{element.name || ''}</MenuTreeItemLink>
                          </MenuTreeItemSecondary>
                        );
                      }).reverse()}

                    </Box>
                  )
                  : null
                }
              </TreeContentCard>
            </Box>
            <Box flex={1} pl={'25px'}>
                {renderHelpCenterView(activeArticle)}
            </Box>
          </MenuTreeFlex>

        </Container>
        <Footer/>
    </>
  );
}
