import { ReactNode, memo } from 'react';
import { Box } from '@mui/material';

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
  [key: string]: any;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...others } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...others}
    >
      {value === index && <>{children}</>}
    </Box>
  );
};

export default memo(TabPanel);
