/**
 *
 * Maps
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import GoogleMapReact from 'google-map-react';

interface Props {
  listings:any[];
  center?:any;
}

export function Maps(props: Props) {
  const [center, set_center] = React.useState<any>(null);
  const [zoom, set_zoom] = React.useState(13);
  const [markers, set_markers] = React.useState([]);

  React.useEffect(() => {
    if(props !== undefined && props !== null){
      let markerList:any = []
      console.log(props.listings[0])
      props.listings.forEach(element => {
        if (element.latLocation !== null && element.lngLocation !== null) {
          markerList.push(
            <Marker
              lat={element.latLocation}
              lng={element.lngLocation}
            >
            <img src={process.env.PUBLIC_URL + '/waterpin.svg'} />
          </Marker>
          )
        }

      });

      set_markers(markerList)
      if (props.center) {
        set_center(props.center)
      }else{
        if (props.listings.length > 0) {
          if (props.listings[0].latLocation !== null && props.listings[0].lngLocation !== null) {
            set_center({lat:parseFloat(props.listings[0].latLocation) , lng:parseFloat(props.listings[0].lngLocation)})
          }
        }
      }
    }
  },[props])


  return (<MapsContainer>
      {center !== null
        ? (
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBs0n09_o7OmadZvIq6-lBhvPXLGhuQuVo" }}
            defaultZoom={zoom}
            center={center}
            // instead of css hover (which sometimes is bad for map markers) (bad means inability to hover on markers placed under other markers)
            // you can use internal GoogleMap component hover algorithm
            // hover algorithm explained at x_distance_hover example
            yesIWantToUseGoogleMapApiInternals
            hoverDistance={40 / 2}
          >
            {markers}
          </GoogleMapReact>
        )
        : null
      }

      </MapsContainer>);
}

interface NoMarkerMapProps {
  center?:any;
  zoom?:any;
}

export function MapsNoMarkers(props: NoMarkerMapProps) {
  const [center, set_center] = React.useState<any>({lat:0.00, lng:0.00});
  const [zoom, set_zoom] = React.useState(5);
  const [markers, set_markers] = React.useState([]);

  React.useEffect(() => {
    if(props !== undefined && props !== null){
      if (props.center) {
        set_center(props.center)
      }
      if (props.zoom) {
        set_zoom(props.zoom)
      }
    }
  },[props])

  return (<MapsContainer>
      {center !== null
        ? (
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBs0n09_o7OmadZvIq6-lBhvPXLGhuQuVo" }}
            zoom={zoom}
            center={center}
            // instead of css hover (which sometimes is bad for map markers) (bad means inability to hover on markers placed under other markers)
            // you can use internal GoogleMap component hover algorithm
            // hover algorithm explained at x_distance_hover example
            yesIWantToUseGoogleMapApiInternals
            hoverDistance={40 / 2}
          >
            {markers}
          </GoogleMapReact>
        )
        : null
      }

      </MapsContainer>);
}

const Div = styled.div``;

const MapsContainer = styled.div`
  display:flex;
  width:100%;
  height:100%;
  background: #F5F5F7;
`;


const Marker = styled.div<{lat:any,lng:any}>`
  display:flex;
  align-items:center;
  width:50px;
  height:50px;
`;
