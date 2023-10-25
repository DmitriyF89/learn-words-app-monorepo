import { ReactNode } from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

interface Props {
  summary: ReactNode;
  details: ReactNode;
  className?: string;
}

const Accordion: React.FC<Props> = ({ details, summary, className }) => {
  return (
    <MuiAccordion className={className}>
      <MuiAccordionSummary>{summary}</MuiAccordionSummary>
      <MuiAccordionDetails>{details}</MuiAccordionDetails>
    </MuiAccordion>
  );
};

export { Accordion };
