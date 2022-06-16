import styled from 'styled-components/macro';
import * as React from 'react';
import { Modal, Box} from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const DefaultToolTip = styled(Tooltip)`
  &&{
    background-color: white;
    color: rgba(0, 0, 0, 0.87);
    font=size: 11px;
    position:absolute;
  }
`;
