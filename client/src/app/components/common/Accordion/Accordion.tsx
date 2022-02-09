import { ExpandMore } from '@mui/icons-material';
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  AccordionProps as MuiAccordionProps,
} from '@mui/material';
import Divider from '../Divider';
import React from 'react';

type AccordionProps = MuiAccordionProps & {
  label: string;
};

const Accordion: React.FC<AccordionProps> = ({ children, label }) => {
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
