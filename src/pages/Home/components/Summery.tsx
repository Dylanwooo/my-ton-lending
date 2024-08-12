import { memo } from 'react';
import { Card } from '@mui/material';

const Summery = () => {
  return (
    <Card variant="outlined" sx={{ p: '16px' }}>
      Market Summery
    </Card>
  );
};

export default memo(Summery);
