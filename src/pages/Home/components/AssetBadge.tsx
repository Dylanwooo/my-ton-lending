import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { memo } from 'react';
import styled from 'styled-components';

type AssetBadgeProps = {
  symbol: string;
  logo: string;
};

const BadgeWrapper = styled(Stack)`
  padding: 4px;
  border-radius: 4px;
  background: #e8e6e6;
  align-items: center;
  gap: 4px;
`;

const AssetBadge = ({ symbol, logo }: AssetBadgeProps) => {
  return (
    <BadgeWrapper direction="row">
      {logo && <Avatar sx={{ width: '20px', height: '20px' }} src={logo} />}
      <Typography>{symbol}</Typography>
    </BadgeWrapper>
  );
};

export default memo(AssetBadge);
