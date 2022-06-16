import styled from 'styled-components/macro';
import {TextField, InputBase, NativeSelect} from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';


interface InputProps {
  name:string;
  placeholder:string;
  onChange:any;
  label:string;
  type?:string;
  value?:any;
  multiline?:boolean;
  rows?:number;
}


interface SelectProps {
  name:string;
  placeholder:string;
  onChange:any;
  label:string;
  value?:any;
  defaultValue?:any;
  variant?:any;
}

export const DefaultSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 65,
  height: 65,
  padding: 0,
  marginTop:-10,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    top:11,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(25px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#F5F5F7',
        opacity: 1,
        border: 0,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: '#4285F4',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:'#efefefef'
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor:'#F5F5F7',
    opacity: 1,
    height: 25,
    width: 62,

  },
}));

export const DefaultSelect: React.FC<SelectProps> = ({children, name, placeholder, onChange, label, value, defaultValue}) => {
  return(
    <InputContainerSingle>
    <NativeSelect
        defaultValue={defaultValue || null}
        sx={{ ml: 1, flex: 1 }}
        value={value}
        onChange={onChange}
        inputProps={{
          name: name,
          id: 'uncontrolled-native',
          'aria-label': label
        }}
      >
      <option value='' hidden>
        {placeholder}
      </option>
      {children}
    </NativeSelect>
    </InputContainerSingle>
  )
}

export const DefaultInputLabel = styled.p`
  font-weight: 900;
  font-size: 0.9rem;
`;

export const DefaultInput: React.FC<InputProps> = ({name, placeholder, onChange, label, type, value, multiline, rows}) => {
  return(
    <InputContainerSingle>
    <InputBase
        name={name}
        multiline={(multiline !== undefined && multiline === true)? true : false}
        rows={(rows !== undefined && rows > 1) ? rows : 1}
        sx={{ ml: 1, flex: 1, width:"100%" }}
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        inputProps={{ 'aria-label': label, min:0}}
        onChange={onChange}
      />
    </InputContainerSingle>
  )
}

export const DefaultSelectBase: React.FC<SelectProps> = ({children, name, placeholder, onChange, label, value, defaultValue, variant}) => {

  if (variant) {
    if (variant === "outline") {
      return(
        <>
        <p style={{marginBottom:10}}>{label}</p>
        <SelectContainerOutline
            disableUnderline
            defaultValue={defaultValue || null}
            sx={{ flex: 1 }}
            value={value}
            onChange={onChange}
            inputProps={{
              name: name,
              id: 'uncontrolled-native',
              'aria-label': label
            }}
          >
          <SelectOption value='' disabled selected>
            {placeholder}
          </SelectOption>
          {children}
        </SelectContainerOutline>
        </>
      )
    }
  }

  return(
    <SelectContainer
        disableUnderline
        defaultValue={defaultValue || null}
        sx={{ ml: 1, flex: 1 }}
        value={value}
        onChange={onChange}
        inputProps={{
          name: name,
          id: 'uncontrolled-native',
          'aria-label': label
        }}
      >
      <SelectOption value='' disabled selected>
        {placeholder}
      </SelectOption>
      {children}
    </SelectContainer>
  )
}


export const SelectContainerOutline = styled(NativeSelect)`
  background: #FFFFFF;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
  width:100%;

  & > .MuiInputBase-input{
    padding-left:15px;
    height:45px;
  }

  "&&&:before": {
      borderBottom: "none"
  },
  "&&:after": {
      borderBottom: "none"
  }
`;

export const SelectContainer = styled(NativeSelect)`
  background: #FFFFFF;
  border: 2px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 10px;
  width:100%;

  & > .MuiInputBase-input{
    padding-left:15px;
    height:45px;
  }

  "&&&:before": {
      borderBottom: "none"
  },
  "&&:after": {
      borderBottom: "none"
  }
`;

export const SelectOption = styled.option`
  background: #FFFFFF;
  border: 2px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 10px;


  "&&&:before": {
      borderBottom: "none"
  },
  "&&:after": {
      borderBottom: "none"
  }
`;

// export const DefaultInputBase: React.FC<InputProps> = ({name, placeholder, onChange, label, type, value}) => {
//   return(
//     <InputBase
//         name={name}
//         sx={{ ml: 1, flex: 1 }}
//         type={type || 'text'}
//         placeholder={placeholder}
//         value={value}
//         inputProps={{ 'aria-label': label }}
//         onChange={onChange}
//       />
//   )
// }



export const InputGroup = styled.div`
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 15px;
`;

export const InputContainerSingle = styled.div`
  border-radius: 11px;
  font-family: GilroyMedium;
  font-size: 20px;
  line-height: 23px;
  padding: 1.302vh 1.563vw;
  align-items: center;
  color: #4f4f4f;
  background:#FAFAFA;
`;

export const InputContainer = styled.div`
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  font-family: GilroyMedium;
  font-size: 20px;
  line-height: 23px;
  padding: 1.302vh 1.563vw;
  display: flex;
  align-items: center;
  color: #4f4f4f;
  border-bottom: 1.5px solid #e0e0e0;
`;

export const InputContainerBottom = styled.div`
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  font-family: GilroyMedium;
  font-size: 20px;
  line-height: 23px;
  padding: 1.302vh 1.563vw;
  display: flex;
  align-items: center;
  color: #4f4f4f;
`;
