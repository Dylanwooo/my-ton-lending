import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { memo } from 'react';

import ArrowDownSvg from '@/Icons/svg/chevron-down.svg';

const CollapseCard = ({
  children,
  title,
  checked = false,
  onCollapse = () => {}
}: {
  title: string;
  children: React.ReactNode;
  checked: boolean;
  onCollapse?: () => void;
}) => {
  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        fontWeight="bold"
        mb="24px"
      >
        {title}{' '}
        <Box
          component="img"
          onClick={onCollapse}
          alt="arrow"
          src={ArrowDownSvg}
          sx={{ transition: 'ease .3s', transform: !checked ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </Stack>

      <Collapse in={checked}>{children}</Collapse>
    </Stack>
  );
};

export default memo(CollapseCard);
