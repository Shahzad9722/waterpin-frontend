/**
 *
 * SignUp
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import ReactCodeInput from 'react-verification-code-input';
import {
  Modal,
  Typography,
  Box,
  IconButton,
  ListItemIcon,
  TextField,
  InputBase,
  Button,
  NativeSelect,
  CircularProgress,
} from '@mui/material';
import {
  InputGroup,
  InputContainerSingle,
  InputContainer,
  InputContainerBottom,
} from '../input';
import { ContinueButton, SSOIcon, SSOButton } from '../buttons';
import { useAppSlice } from '../../slice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  selectLoading,
  selectPayload,
  selectError,
  selectUser,
  selectToken,
  selectSuccess,
  selectLoginSuccess,
} from '../../slice/selectors';

interface Props {
  open: boolean;
  onClose: any;
}

export function Login(props: Props) {
  const { actions } = useAppSlice();
  const dispatch = useDispatch();

  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const [user, set_user] = React.useState({username:'', firstName:'',lastName:'', profile_image:'', notifications:[], role_id:1, is_owner:false});
  const [email, set_email] = React.useState('');
  const [password, set_password] = React.useState('');
  const [phoneNumber, set_phoneNumber] = React.useState('');
  const [loginWithEmail, set_loginWithEmail] = React.useState(false);
  const [loginWithPhoneNumber, set_loginWithPhoneNumber] = React.useState(true);
  const [phoneStep2, set_phoneStep2] = React.useState(false);
  const [emailStep2, set_emailStep2] = React.useState(false);
  const [contactVerfication, set_contactVerfication] = React.useState(false);
  const [inputArray, set_inputArray] = React.useState(new Array(4).fill(''));
  const [showPassword, setShowPassword] = React.useState(false);

  const authUser = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const errors = useSelector(selectError);
  const success = useSelector(selectSuccess);
  const payload = useSelector(selectPayload);
  const loginSuccess = useSelector(selectLoginSuccess);

  const { t, i18n } = useTranslation();
  const [code, setCode]: any = React.useState('');

  let userData: any = localStorage.getItem('tempUser');
  let temp = JSON.parse(userData);

  const onChange = val => {
    setCode(val);
  };

  React.useEffect(() => {
    if (
      loginSuccess !== undefined &&
      loginSuccess !== null &&
      loginSuccess === true
    ) {
      setTimeout(() => dispatch(actions.toggleLoginModal()), 100);
      setTimeout(() => history.push('/dashboard'), 2000);
    }
  }, [loginSuccess]);

  const handleClick = () => {
    setTimeout(
      () =>
        dispatch(actions.verifyVerification({ user_id: temp.id, code: code })),
      100,
    );
  };

  function handleLogin(e: any) {
    if (loginWithEmail) {
      setTimeout(
        () => dispatch(actions.login({ email: email, password: password })),
        100,
      );
    } else if (loginWithPhoneNumber) {
      setTimeout(
        () =>
          dispatch(
            actions.login({ phoneNumber: phoneNumber, password: password }),
          ),
        100,
      );
    }
  }

  const togglePassword = () => {
    console.log('here');
    if (showPassword) {
      document.getElementById('password')?.setAttribute('type', 'password');
      setShowPassword(false);
    } else {
      document.getElementById('password')?.setAttribute('type', 'text');
      setShowPassword(true);
    }
  };

  const style: any = {
    margin:'0 auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '100vh',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '15px',
    boxShadow: 24,
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModalHeader>
          <ModalTitle>Log in</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {loginWithEmail ? (
            <>
              {authUser && authUser.twoStepAuth ? (
                <Box width={'100%'}>
                  <ModalBody>
                    <LabelText1>
                      Enter the code we sent over Email to {email}
                    </LabelText1>
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <ReactCodeInput
                        type="number"
                        fields={6}
                        values={code}
                        onChange={onChange}
                      />
                    </Box>
                  </ModalBody>
                </Box>
              ) : (
                <>
                  <Box width={'100%'}>
                    <InputGroup>
                      <InputContainer>
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Email"
                          inputProps={{ 'aria-label': 'Email' }}
                          onChange={e => set_email(e.target.value)}
                          value={email}
                        />
                      </InputContainer>
                      <InputContainerBottom>
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Password"
                          type="password"
                          id="password"
                          inputProps={{ 'aria-label': 'Password' }}
                          onChange={e => set_password(e.target.value)}
                        />
                        <span onClick={togglePassword}>
                          <EyeButton className="fas fa-eye"></EyeButton>
                        </span>
                      </InputContainerBottom>
                    </InputGroup>
                  </Box>
                </>
              )}
            </>
          ) : loginWithPhoneNumber ? (
            <>
              {authUser && authUser.twoStepAuth ? (
                <Box width={'100%'}>
                  <Box width={'100%'}>
                    <ModalBody>
                      <LabelText1>
                        Enter the code we sent over SMS to +{phoneNumber}
                      </LabelText1>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <ReactCodeInput
                          type="number"
                          fields={6}
                          values={code}
                          onChange={onChange}
                        />
                      </Box>
                      {/* <LabelText2>Didn't get a text? Send again</LabelText2> */}
                    </ModalBody>
                  </Box>
                </Box>
              ) : (
                <>
                  <Box width={'100%'}>
                    <InputGroup>
                      <InputContainer>
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Phone Number"
                          inputProps={{ 'aria-label': 'First Name' }}
                          onChange={e => set_phoneNumber(e.target.value)}
                          value={phoneNumber}
                        />
                      </InputContainer>
                      <InputContainerBottom>
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Password"
                          type="password"
                          id="password"
                          inputProps={{ 'aria-label': 'Password' }}
                          onChange={e => set_password(e.target.value)}
                        />
                        <span onClick={togglePassword}>
                          <EyeButton className="fas fa-eye"></EyeButton>
                        </span>
                      </InputContainerBottom>
                    </InputGroup>
                  </Box>
                </>
              )}
            </>
          ) : null}

          <br />
          <>
            {authUser && authUser.twoStepAuth ? (
              <ContinueButton onClick={handleClick} disabled={code.length < 6}>
                {loading ? (
                  <CircularProgress
                    size={30}
                    sx={{
                      color: '#fff',
                    }}
                  />
                ) : (
                  'Continue'
                )}
              </ContinueButton>
            ) : (
              <ContinueButton onClick={handleLogin} disabled={loading}>
                {loading ? (
                  <CircularProgress
                    size={30}
                    sx={{
                      color: '#fff',
                    }}
                  />
                ) : (
                  'Continue'
                )}
              </ContinueButton>
            )}
          </>
          <Box
            width={'100%'}
            mt={3}
            mb={3}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box width={'45%'}>
              <Divider />
            </Box>
            <Box>
              <LabelText>OR</LabelText>
            </Box>
            <Box width={'45%'}>
              <Divider />
            </Box>
          </Box>

          <Box
            width={'100%'}
            mt={3}
            mb={3}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box width={'50%'} pr={2}>
              {loginWithEmail ? (
                <SSOButton
                  startIcon={
                    <SSOIcon src={process.env.PUBLIC_URL + '/email.svg'} />
                  }
                  onClick={() => {
                    set_loginWithPhoneNumber(true);
                    set_loginWithEmail(false);
                    set_email('')
                    set_phoneNumber('')
                    set_password('')

                  }}
                >
                  Log In With Phone Number
                </SSOButton>
              ) : (
                <SSOButton
                  startIcon={
                    <SSOIcon src={process.env.PUBLIC_URL + '/email.svg'} />
                  }
                  onClick={() => {
                    set_loginWithPhoneNumber(false);
                    set_loginWithEmail(true);
                    set_email('')
                    set_phoneNumber('')
                    set_password('')
                  }}
                >
                  Log In With Email
                </SSOButton>
              )}

              <SSOButton
                startIcon={
                  <SSOIcon src={process.env.PUBLIC_URL + '/facebook.svg'} />
                }
              >
                Log In with Facebook
              </SSOButton>
            </Box>
            <Box width={'50%'} pl={2}>
              <SSOButton
                startIcon={
                  <SSOIcon src={process.env.PUBLIC_URL + '/google.svg'} />
                }
              >
                Log In with Google
              </SSOButton>
              <SSOButton
                startIcon={
                  <SSOIcon src={process.env.PUBLIC_URL + '/apple.svg'} />
                }
              >
                Log In with Apple
              </SSOButton>
            </Box>
          </Box>
        </ModalBody>
      </Box>
    </Modal>
  );
}

const EyeButton = styled.i`
  cursor: pointer;
  &:hover {
    color: #006400;
  }
  &:active {
    color: #006400;
  }
`;

const LabelText1 = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: GilroyMedium;
  font-size: 16px;
  line-height: 19px;
  padding-left: 5px;
  padding-right: 5px;
  color: #333333;
`;

const LabelText2 = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: GilroyMedium;
  font-size: 16px;
  line-height: 19px;
  padding-left: 5px;
  padding-right: 5px;
  color: #333333;
`;

const LabelText = styled.p`
  font-family: GilroyBold;
  font-size: 16px;
  line-height: 19px;
  color: #bdbdbd;
  padding-left: 5px;
  padding-right: 5px;
`;

export const ModalTitle = styled.h1`
  font-family: GilroyBold;
  font-size: 1.875vw;
  line-height: 36px;
  text-align: center;
  color: #000;
`;

const Divider = styled.div`
  border-bottom: 1.5px solid #e0e0e0;
  height: 1px;
  width: 100%;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  border-bottom: 1.5px solid #e0e0e0;
`;

const ModalBody = styled.div`
  padding: 2.604vw;
  max-height: 600px;
  overflow-y: auto;
  width: 100%;
`;

const Div = styled.div``;
