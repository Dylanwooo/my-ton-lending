import { Avatar, Stack, Box } from '@mui/material';

import LogoSvg from '@/Icons/svg/logo.svg';

export const Logo = () => {
  return (
    <Stack alignItems="center" direction="row" gap="4px">
      <Box component="img" alt="TonLayer" src={LogoSvg} />
    </Stack>
  );
};
