
import styled from 'styled-components/macro';


interface Props {
  user: any;
  rank: any;
}


export default function getRankHeader(props: Props) {
  switch (props.user.rank) {
    case 'new':
      return;
    case 'bronze':
      return;
    case 'silver':
      return;
    case 'gold':
      return;
    case 'platinum':
      return;
  }
}

export const HeadImage = styled.div`
  position: absolute;
  background-image: url(${process.env.PUBLIC_URL}/boat_color.svg);
  background-size: contain;
  background-repeat: no-repeat;
  width: 4em;
  height: 4em;
  top: 0;
  left: 7em;
`;