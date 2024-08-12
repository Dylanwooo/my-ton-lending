/**
 * This is a base Dialog component.
 * Full screen on mobile devices.
 */

import { Dialog } from '@mui/material';
import { ReactNode } from 'react';

import { useDevice } from '@/hooks';

type DialogBaseProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  fullScreen?: boolean;
};
export const DialogBase = ({ children, open, onClose, fullScreen }: DialogBaseProps) => {
  const { isMobile } = useDevice();
  return (
    <Dialog fullScreen={fullScreen || isMobile} open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
};
