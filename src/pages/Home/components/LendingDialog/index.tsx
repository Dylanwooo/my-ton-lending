import { Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import { Supply as SupplyComponent } from './Supply';
import { Borrow as BorrowComponent } from './Borrow';
import { Withdraw as WithdrawComponent } from './Withdraw';
import { Repay as RepayComponent } from './Repay';

import ArrowLeftSVG from '@/Icons/svg/arrow-left.svg';
import TabPanel from '@/pages/Home/components/TabPanel';
import { DialogBase } from '@/components/Dialog';
import { ReservesInfo } from '@/pages/Home/contexts/ReservesProvider';
import { useLendingDialogState } from '@/pages/Home/contexts/LendingDialogProvider';
import { TransactionChecker } from '@/pages/Home/components/TransactionChecker';

export enum LendingType {
  Supply,
  Borrow,
  Withdraw,
  Repay
}

type LendingDialogProps = {
  type?: LendingType;
  onClose: () => void;
  reserveInfo: ReservesInfo;
  open: boolean;
};
export const LendingDialog = ({
  type = LendingType.Supply,
  open,
  onClose,
  reserveInfo
}: LendingDialogProps) => {
  const [curIndex, setCurIndex] = useState(LendingType.Supply);

  const { status } = useLendingDialogState();

  useEffect(() => {
    setCurIndex(type);

    return () => setCurIndex(LendingType.Supply);
  }, [type]);

  return (
    <DialogBase open={open} onClose={onClose} fullScreen={status === 'initial'}>
      <Stack direction="row" alignItems="center" p="16px" onClick={onClose}>
        <img alt="back" src={ArrowLeftSVG} />
        <Typography ml="12px" fontSize={16} fontWeight={500}>
          Home
        </Typography>
      </Stack>

      {/* <Tabs
        variant="fullWidth"
        value={curIndex}
        onChange={(_, newValue: number) => {
          setCurIndex(newValue);
        }}
      >
        <Tab label="Supply" />
        <Tab label="Borrow" />
        <Tab label="Withdraw" />
        <Tab label="Repay" />
      </Tabs> */}

      {status === 'initial' && (
        <>
          <TabPanel value={curIndex} index={0}>
            <SupplyComponent onClose={onClose} />
          </TabPanel>
          <TabPanel value={curIndex} index={1}>
            <BorrowComponent onClose={onClose} />
          </TabPanel>
          <TabPanel value={curIndex} index={2}>
            <WithdrawComponent onClose={onClose} />
          </TabPanel>
          <TabPanel value={curIndex} index={3}>
            <RepayComponent onClose={onClose} />
          </TabPanel>
        </>
      )}

      {status === 'pending' && <TransactionChecker />}
    </DialogBase>
  );
};
