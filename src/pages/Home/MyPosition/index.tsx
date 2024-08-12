import { Box } from '@mui/material';
import { memo } from 'react';

import SuppliedPosition from './SuppliedPosition';
import BorrowedPosition from './BorrowedPosition';

export const MyPosition = memo(() => {
  return (
    <Box>
      <SuppliedPosition />
      <Box my="48px" />
      <BorrowedPosition />
    </Box>
  );
});
