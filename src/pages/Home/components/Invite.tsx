import { memo } from 'react';
import { Card } from '@mui/material';

const Invite = () => {
  return (
    <Card variant="outlined" sx={{ p: '16px' }}>
      Invite Friends
    </Card>
  );
};

export default memo(Invite);
