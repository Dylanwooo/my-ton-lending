import { memo, useCallback, useMemo, useState } from 'react';
import { Tabs, Tab } from '@mui/material';

import TabPanel from '@/pages/Home/components/TabPanel';
import { Market } from '@/pages/Home/Market';
import { Earn } from '@/pages/Home/Earn';
import { MyPosition } from '@/pages/Home/MyPosition';
import { useLendingDialogState } from '@/pages/Home/contexts/LendingDialogProvider';
import { LendingDialog } from '@/pages/Home/components/LendingDialog';
import { useUserPosition } from '@/pages/Home/contexts/UserPositionProvider';
import { ReservesInfo } from '@/pages/Home/contexts/ReservesProvider';

const HomeComponent = () => {
  const [curTab, setCurTab] = useState(1);
  const { dialogProps, updateDialogProps, updateStatus } = useLendingDialogState();
  const { borrowPositionList, supplyPositionList } = useUserPosition();

  const positionsLength = useMemo(
    () => borrowPositionList.length + supplyPositionList.length,
    [borrowPositionList.length, supplyPositionList.length]
  );

  const handleCloseDialog = useCallback(() => {
    updateDialogProps({ ...dialogProps, reserveInfo: {} as ReservesInfo, visible: false });
    updateStatus('initial');
  }, [dialogProps, updateDialogProps, updateStatus]);

  return (
    <>
      <LendingDialog
        reserveInfo={dialogProps.reserveInfo}
        type={dialogProps.type}
        open={dialogProps.visible}
        onClose={handleCloseDialog}
      />
      <Tabs
        variant="fullWidth"
        value={curTab}
        onChange={(_, newValue: number) => {
          setCurTab(newValue);
        }}
      >
        <Tab label="Earn" />
        <Tab label="Market" />
        <Tab label={positionsLength > 0 ? `My Position (${positionsLength})` : 'My Position'} />
      </Tabs>

      <TabPanel value={curTab} index={0} pb="48px">
        <Earn />
      </TabPanel>

      <TabPanel value={curTab} index={1} pb="48px">
        <Market />
      </TabPanel>

      <TabPanel value={curTab} index={2} pb="48px">
        <MyPosition />
      </TabPanel>
    </>
  );
};

export default memo(HomeComponent);
