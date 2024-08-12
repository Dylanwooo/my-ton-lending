import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

import NoDataSVG from '@/Icons/svg/no-data.svg';

const NoData = () => {
  return (
    <Stack alignItems="center">
      <img src={NoDataSVG} alt="Empty" />
      <Typography color="gray">No Data</Typography>
    </Stack>
  );
};

export default memo(NoData);
