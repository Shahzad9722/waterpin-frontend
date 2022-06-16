/**
 *
 * Account
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import './invite.scss'

export function CommonQuestions() {

  return (
    <>
    <div className='common-question-container'>
          <h2>Common Questions</h2>

          <div className='accordion-container'>
            <Accordion className='accordion-top'>
              <AccordionSummary
                expandIcon={
                  <span className='MuiAccordionSummary-expandIcon'>+</span>
                }
                aria-controls='content'
                id='header'
              >
                <div className='head'>
                  Where does the discount go once my friends sign up?
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className='body'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className='accordion-btw'>
              <AccordionSummary
                expandIcon={
                  <span className='MuiAccordionSummary-expandIcon'>+</span>
                }
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className='body'>How to redeem my rewards?</div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion className='accordion-bottom'>
              <AccordionSummary
                expandIcon={
                  <span className='MuiAccordionSummary-expandIcon'>+</span>
                }
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className='body'>How many people can I invite?</div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
    </>
  );
}
