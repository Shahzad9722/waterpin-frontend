import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Nav } from "../../components/Nav"
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, RouteComponentProps, withRouter, useLocation} from 'react-router-dom';

import { Storyblok } from "../../storyblok"
import { useStoryblok } from "../../storyblok"
import DynamicComponent from "../../cms-components/DynamicComponent"
import { Footer } from '../../components/Footer';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface Props{
  story?:any;
}

export function Page(props:Props) {
  const [pageTitle, set_pageTitle] = React.useState('');

  let story = useStoryblok(props.story, true)

  React.useEffect(() => {
    if (props.story !== null && props.story !== null) {
      set_pageTitle(props.story.name)
    }
  },[props.story])


  return (
    <>
      <Helmet>
        <title>
          {pageTitle}
        </title>
      </Helmet>
      <Nav/>
      {story && story.content &&
        <DynamicComponent blok={story.content} />
      }
      <Footer/>

    </>
  );
}
