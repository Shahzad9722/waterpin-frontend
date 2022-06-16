import styled from 'styled-components/macro';
import * as React from 'react';
import { Modal, Box, Grid} from '@mui/material';
import { DefaultInput, DefaultSelectBase, InputContainerSingle} from './input'
import {CardNumberElement,CardExpiryElement,CardCvcElement} from '@stripe/react-stripe-js';
import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { DefaultButton } from './buttons'
import { createPortal } from "react-dom";


import { useAccountSlice } from '../pages/Account/slice';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectLoading,
  selectPayload,
  selectError,
  selectUser,
  selectPMSetupData,
  selectSuccess
} from '../pages/Account/slice/selectors';


interface Props {
  open:boolean;
  onClose:any;
  children?: React.ReactNode
  title?:string;
}

interface PMProps {
  open:boolean;
  onClose:any;
  children?: React.ReactNode
  title?:string;
  onSubmit?:any;
  modalRoot?:any;
  user:any;
}


const style:any = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius:"15px",
  boxShadow: 24,
};

export const BasicModal: React.FC<Props> = ({children, open, onClose, title}) => {
  return(
    <Modal
       open={open}
       onClose={onClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style}>
          <ModalHeader>
           <ModalTitle>
            {title && title || ''}
           </ModalTitle>
          </ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
       </Box>
     </Modal>
  )
}


const profileModalStyle:any = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius:"15px",
  boxShadow: 24,
};

export const EditProfileModal: React.FC<Props> = ({children, open, onClose, title}) => {
  return(
    <Modal
       open={open}
       onClose={onClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={profileModalStyle}>
          <ModalHeader>
           <ModalTitle>
            {title && title || ''}
           </ModalTitle>
          </ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
       </Box>
     </Modal>
  )
}


const notifModalStyle:any = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30vw',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius:"30px",
  boxShadow: 24,
};

export const NotificationsModal: React.FC<Props> = ({children, open, onClose, title}) => {
  return(
    <Modal
       open={open}
       onClose={onClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={notifModalStyle}>
          <ModalHeader style={{justifyContent:"space-between"}}>
           <ModalTitle>
            {title && title || ''}
           </ModalTitle>
          </ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
       </Box>
     </Modal>
  )
}



const bookingConfirmationModal:any = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius:"30px",
  boxShadow: 15,
};

export const BookingConfirmModal: React.FC<Props> = ({children, open, onClose, title}) => {
  return(
    <Modal
       open={open}
       onClose={onClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={bookingConfirmationModal}>
          <ModalHeader style={{justifyContent:"space-between"}}>
           <ModalTitle>
            {title && title || ''}
           </ModalTitle>
          </ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
       </Box>
     </Modal>
  )
}


const pmModalStyle:any = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '760px',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius:"15px",
  boxShadow: 24,
};


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_ID || '');


export const AddPaymentMethodWrapper: React.FC<{children:any}> = ({children}) => {

  const { actions } = useAccountSlice();
  const dispatch = useDispatch();

  const [client_secret, set_client_secret] = React.useState('');
  const [options, set_options] = React.useState<any>(null);

  const pmSecret = useSelector(selectPMSetupData)


  React.useEffect(() => {
    setTimeout(() => dispatch(actions.loadPaymentSetupIntent()), 0);
  },[])


    React.useEffect(() => {
      if(pmSecret !== undefined && pmSecret !== null){
        set_client_secret(pmSecret)
        const options = {
          // passing the client secret obtained in step 2
          clientSecret: pmSecret,
          // Fully customizable with appearance API.
          appearance: {/*...*/},
        };
        set_options(options)
      }
    },[pmSecret])





  return(
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}


export const AddPaymentMethodModal: React.FC<PMProps> = ({children, open, onClose, modalRoot, user}) => {

  const { actions } = useAccountSlice();
  const dispatch = useDispatch();

  const el = React.useRef<any>(null);


  const cardNumRef = React.useRef<any>(null);
  const cardExpRef = React.useRef<any>(null);
  const cardCVCRef = React.useRef<any>(null);


  const pmSecret = useSelector(selectPMSetupData)
  const addPMSuccess = useSelector(selectSuccess)



  //const [stripePromise, setStripePromise] = React.useState(() => loadStripe(process.env.REACT_APP_STRIPE_ID || ''))


  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#b4b4b4",
        fontFamily: '"GilroyMedium", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#b4b4b4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };




  const [cc_num, set_cc_num] = React.useState('');
  const [cc_name, set_cc_name] = React.useState('');
  const [exp_cvc, set_exp_cvc] = React.useState('');
  const [cc_zip, set_cc_zip] = React.useState('');

  const [exp_month, set_exp_month] = React.useState('');
  const [exp_year, set_exp_year] = React.useState('');

  const [client_secret, set_client_secret] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<any>(null);
  const [isSubmitting, set_isSubmitting] = React.useState(false);

  const stripe = useStripe();
  const elements:any = useElements();

  React.useEffect(() => {
    // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    if (stripe && elements && open ===true) {

      let cardElement = elements.getElement('cardNumber');
      let cardExpElement = elements.getElement('cardExpiry');
      let cardCvcElement = elements.getElement('cardCvc');

      if (!cardElement) {
        elements.create('cardNumber');
        cardElement = elements.getElement('cardNumber');
      }else{
        cardElement = elements.getElement('cardNumber');
      }

      if (!cardExpElement) {
        elements.create('cardExpiry');
        cardExpElement = elements.getElement('cardExpiry');
      }else{
        cardExpElement = elements.getElement('cardExpiry');
      }

      if (!cardCvcElement) {
        elements.create('cardCvc');
        cardCvcElement = elements.getElement('cardCvc');
      }else{
        cardCvcElement = elements.getElement('cardCvc');
      }

      cardElement.mount('#card-element-number');
      cardExpElement.mount('#card-element-exp');
      cardCvcElement.mount('#card-element-cvc');
    }
  }, [open]);


  React.useEffect(() => {
    // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    if (addPMSuccess !== undefined && addPMSuccess !== null && addPMSuccess === true) {
      set_isSubmitting(false)
      onClose()
    }
  }, [addPMSuccess]);




  const handleAddPaymentMethod = async (event) =>{
        // We don't want to let default form submission happen here,
      // which would refresh the page.
      //event.preventDefault();
      setErrorMessage('');
      set_isSubmitting(true)

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      var cardElement = elements.getElement('cardNumber');
      var cardExpElement = elements.getElement('cardExpiry');
      var cardCvElement = elements.getElement('cardCvc');

      const {setupIntent, error} = await stripe.confirmCardSetup(
          pmSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: 'Jenny Rosen',
              },
            },
          },
        );

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message);
        console.log(error.message)
        set_isSubmitting(false)

      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
        if (setupIntent && setupIntent.payment_method) {
          setTimeout(() => dispatch(actions.addPaymentMethod({payment_method_id:setupIntent.payment_method, userId:user.id})), 0);
        }
      }

    }

    return(
        <Modal
           disablePortal={true}
           open={open}
           onClose={onClose}
           aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description"
         >
             <Box sx={pmModalStyle}>
                <ModalHeader style={{justifyContent:"space-between"}}>
                 <ModalTitle>
                  {'Add A New Card'}
                 </ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <p style={{color:"red"}}>{errorMessage !== null && errorMessage}</p>
                  <Grid container spacing={2}>
                    <Grid item xs={8} alignItems={'center'}>
                      <DefaultInput name="message" type="text" placeholder="Name on Card" label="Name on Card" onChange={(e)=>set_cc_name(e.target.value)}/>
                    </Grid>
                    <Grid item xs={4} alignItems={'center'}>
                      <DefaultInput name="cc_zip" type="text" placeholder="Billing Zip Code" label="Billing Zip Code" onChange={(e)=>set_cc_zip(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} alignItems={'center'}>
                      <CardElementContainer>
                        <div ref={cardNumRef} id="card-element-number">
                        </div>
                      </CardElementContainer>
                    </Grid>
                    <Grid item xs={6} alignItems={'center'}>
                    <CardElementContainer>
                      <div id="card-element-exp"/>
                    </CardElementContainer>
                    </Grid>
                    <Grid item xs={6} alignItems={'center'}>
                      <CardElementContainer>
                      <div id="card-element-cvc"/>
                      </CardElementContainer>

                    </Grid>
                  </Grid>
                  <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} mt={1}>
                    <Box>
                      <DefaultButton text="Cancel" type="secondary" onClick={onClose} />
                    </Box>
                    <Box ml={2}>
                      <DefaultButton loading={isSubmitting === true ? true : false} text="Add Card" type="primary" onClick={handleAddPaymentMethod} />
                    </Box>
                  </Box>
                </ModalBody>
             </Box>
         </Modal>
  )
}


const customstyle:any = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  maxWidth:'1160px',
  bgcolor: 'background.paper',
  border: '0px solid #fff',
  borderRadius:"15px",
  focus:{
    border: '0px solid #fff',
  },
  boxShadow: 24,
};

interface CustomProps {
  open:boolean;
  onClose:any;
  children?: React.ReactNode
  header_children?:React.ReactNode;
}

export const CustomModal: React.FC<CustomProps> = ({children, open, onClose, header_children}) => {
  return(
    <Modal
       open={open}
       onClose={onClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={customstyle}>
          <ModalHeader>
           {header_children}
          </ModalHeader>
          <ModalBody style={{padding:0, maxHeight:"650px"}}>
            {children}
          </ModalBody>
       </Box>
     </Modal>
  )
}



export const CardElementContainer = styled.div`
  border-radius: 11px;
  font-family: GilroyMedium;
  font-size: 20px;
  line-height: 23px;
  padding: 1.302vh 1.563vw;
  align-items: center;
  color: #4f4f4f;
  background:#FAFAFA;
`;

const LabelText = styled.p`
  font-family: GilroyBold;
  font-size: 16px;
  line-height: 19px;
  color: #BDBDBD;
  padding-left:5px;
  padding-right:5px;
`;

export const ModalTitle = styled.h1`
  font-family: GilroyBold;
  font-size: clamp(16px, 2.5vw, 20px);
  line-height: 36px;
  text-align: center;
  color: #000;
`;

export const Divider = styled.div`
  border-bottom: 1.5px solid #e0e0e0;
  height:1px;
  width:100%;
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
  border-bottom: 1.5px solid #e0e0e0;
`;

export const ModalBody = styled.div`
  padding: 2.604vw;
  max-height: 600px;
  overflow-y: auto;
  width:100%;
`;
