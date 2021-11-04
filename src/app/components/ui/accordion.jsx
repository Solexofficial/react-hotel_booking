import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import React from 'react';

const MyAccordion = ({ children, label }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content' id='panel1a-header'>
        <Typography variant='subtitle2'>{label}</Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default MyAccordion;
