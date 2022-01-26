import { ExpandMore } from '@mui/icons-material';
import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Divider from '../Divider';
import React from 'react';

const Accordion = ({ children, label }) => {
  return (
    <MuiAccordion>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content' id='panel1a-header'>
        <p>{label}</p>
        <Divider />
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
