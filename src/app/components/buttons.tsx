import styled from 'styled-components/macro';
import { Button, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface ButtonProps {
  name?:string;
  loading?:boolean;
  disabled?:boolean;
  onClick:any;
  text?:string;
  type?:string;
}

export const DefaultButton: React.FC<ButtonProps> = (props) => {
  let button:any = null;
  switch (props !== undefined && props.type !== undefined) {
    case props.type === "primary":
        button = (
          <ButtonPrimary
             name={props && props.name || ''}
             onClick={props.onClick}
             disabled={props.loading && props.loading === true}
           >
           {props.loading && props.loading === true
             ? (
               <CircularProgress
                   size={30}
                   sx={{
                     color: "#fff",
                   }}
                 />
             )
             : props.text
           }
           </ButtonPrimary>
        )
      break;
    case props.type === "owner":
        button = (
          <ButtonPrimaryOwnerBlue
             name={props && props.name || ''}
             onClick={props.onClick}
             disabled={props.loading && props.loading === true}
           >
           {props.loading && props.loading === true
             ? (
               <CircularProgress
                   size={30}
                   sx={{
                     color: "#fff",
                   }}
                 />
             )
             : props.text
           }
           </ButtonPrimaryOwnerBlue>
        )
      break;
    case props.type === "secondary":
      button = (
        <ButtonSecondary
           name={props && props.name || ''}
           onClick={props.onClick}
           disabled={props.loading && props.loading === true}
           color="success"
         >
         {props.loading && props.loading === true
           ? (
             <CircularProgress
                 size={30}
                 sx={{
                   color: "#fff",
                 }}
               />
           )
           : props.text
         }
         </ButtonSecondary>
      )
      break;
    case props.type === "outline":
      button = (
        <ButtonOutline
           name={props && props.name || ''}
           onClick={props.onClick}
           disabled={props.loading && props.loading === true}
           color="success"
         >
         {props.loading && props.loading === true
           ? (
             <CircularProgress
                 size={30}
                 sx={{
                   color: "#fff",
                 }}
               />
           )
           : props.text
         }
         </ButtonOutline>
      )
      break;
    default:
      button = (
        <ButtonPrimary
           name={props && props.name || ''}
           onClick={props.onClick}
           disabled={props.loading && props.loading === true}
           color="success"
         >
         {props.loading && props.loading === true
           ? (
             <CircularProgress
                 size={30}
                 sx={{
                   color: "#fff",
                 }}
               />
           )
           : props.text
         }
         </ButtonPrimary>
      )
      break;
  }

  return button

}

export const ButtonPrimaryOwnerBlue = styled(Button)`
  && {
    min-width: 10vw;
    height: 70px;
    color: #fff;
    font-family: GilroyBold;
    font-size: 1.25rem;
    line-height: 28px;
    text-transform: capitalize;
    background: #4385f3;
    border-radius: 15px;
    color: #fff;
    padding:1rem 1.5rem;

    &&:hover{
      background: #88b5ff;
    }

    &&:disabled{
      background: #f3f3f3;
      cursor: not-allowed;
      pointer-events:auto;
    }


  }
`;

export const ButtonPrimary = styled(Button)`
  && {
    min-width: 10vw;
    height: 70px;
    color: #fff;
    font-family: GilroyBold;
    font-size: 1.25rem;
    line-height: 28px;
    text-transform: capitalize;
    background: #00c2cb;
    border-radius: 15px;
    color: #fff;
    padding:1rem 1.5rem;

    &&:hover{
      background: #6ddee3;
    }

    &&:disabled{
      background: #f3f3f3;
      cursor: not-allowed;
      pointer-events:auto;
    }


  }
`;

export const ButtonSecondary = styled(Button)`
  && {
    width: 10vw;
    height: 70px;
    color: #fff;
    font-family: GilroyBold;
    font-size: 1.15vw;
    line-height: 28px;
    text-transform: capitalize;
    background: #e0e0e0;
    border-radius: 15px;
    color: #3C4848;
    padding:.5vw 0;

    &&:hover{
      background: #f3f3f3;
    }

    &&:disabled{
      background: #f3f3f3;
      cursor: not-allowed;
      pointer-events:auto;
    }


  }
`;


export const ButtonOutline = styled(Button)`
  && {
    width: 100%;
    height: 60px;
    color: #fff;
    font-family: GilroyRegular;
    font-size: 20px;
    line-height: 24px;
    text-transform: capitalize;
    color: #000;
    padding:.5vw 1rem;

    background: #FFFFFF;
    border: 1px solid #6D6D6D;
    box-sizing: border-box;
    border-radius: 10px;

    &&:hover{
      background: #000;
      color:#fff;
    }

    &&:disabled{
      background: #f3f3f3;
      cursor: not-allowed;
      pointer-events:auto;
    }


  }
`;

export const ContinueButton = styled(Button)`
  && {
    width: 100%;
    height: 85px;
    color: #fff;
    font-family: GilroyBold;
    font-size: 1.15vw;
    line-height: 28px;
    text-transform: capitalize;
    background: linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%);
    border-radius: 15px;
  }
`;


export const SSOButton = styled(Button)`
  && {
    width: 100%;
    height: 80px;
    color: #000;
    font-family: GilroyMedium;
    font-size: 1.15vw;
    line-height: 28px;
    text-transform: capitalize;
    background: #FFFFFF;
    border: 2px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 15px;
    margin-bottom:15px;
    display:flex;
    justify-content:flex-start;
    padding-left:25px;
  }
`;

export const SSOIcon = styled.img`
  width:30px;
  height:30px;
  margin-right:20px;
`;
