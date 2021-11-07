import { ExpandMore } from '@mui/icons-material';
import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import React from 'react';

const Accordion = ({ children, label }) => {
  return (
    <MuiAccordion>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content' id='panel1a-header'>
        <Typography variant='subtitle2'>{label}</Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
