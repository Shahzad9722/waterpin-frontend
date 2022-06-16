/**
 *
 * Notifications
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import Carousel from 'react-material-ui-carousel'

interface Props {
  children:any[];
  handleNext?:any;
  handlePrev?:any;
}

export function Carousels(props: Props) {

  if (props.handleNext && props.handlePrev) {

    return (<Carousel
              next={(next, active) => props.handleNext(next, active)}
              prev={(prev, active) => props.handlePrev(prev, active)}
              >
            {props.children}
            </Carousel>)
  }

  return (<Carousel
            autoPlay={true}
            indicatorIconButtonProps={{
                style: {
                    zIndex:99,
                    marginTop: '-5rem',    // 1
                    marginBottom: '10px',    // 1
                }
            }}
            >
          {props.children}
          </Carousel>)
}

const Div = styled.div``;
