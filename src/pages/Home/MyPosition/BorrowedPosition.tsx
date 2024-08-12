import {
  Box,
  Stack,
  Button,
  CardActions,
  Card,
  CardContent,
  Avatar,
  Divider,
  Typography
} from '@mui/material';
import { memo, useMemo, useState } from 'react';
import { fromNano } from '@ton/core';

import { UsdEquivalent } from '@/components/UsdEquivalent';
import { Row } from '@/components/styled';
import { UserPosition, useUserPosition } from '@/pages/Home/contexts/UserPositionProvider';
import Nodata from '@/pages/Home/components/Nodata';
import { LendingType } from '@/pages/Home/components/LendingDialog';
import { useReservesInfoMap } from '@/pages/Home/contexts/ReservesProvider';
import CollapseCard from '@/pages/Home/components/CollapseCard';
import { formatBalance } from '@/utils';
import { useLendingDialogState } from '@/pages/Home/contexts/LendingDialogProvider';

const BorrowedPosition = () => {
  const [isCollapse, setIsCollapse] = useState(false);
  const { borrowPositionList } = useUserPosition();
  const { reservesInfoMap } = useReservesInfoMap();

  const { dialogProps, updateDialogProps } = useLendingDialogState();

  const priceInUsd = useMemo(() => {
    if (!reservesInfoMap) return '0';

    return fromNano(reservesInfoMap[dialogProps.symbol]?.price || 0) || '0';
  }, [dialogProps.symbol, reservesInfoMap]);

  return (
    <Card variant="outlined" sx={{ p: '12px' }}>
      <CollapseCard
        title="My Borrow Position"
        checked={!isCollapse}
        onCollapse={() => setIsCollapse(!isCollapse)}
      >
        {borrowPositionList.length ? (
          borrowPositionList.map(({ symbol, borrow, decimals, logo }: UserPosition) => {
            return (
              <Box key={symbol}>
                <Card variant="outlined" sx={{ mb: '16px' }}>
                  <CardContent>
                    <Stack alignItems="center" spacing="4px" mb="8px" direction="row">
                      <Avatar sizes="20" src={logo} />
                      <Typography>{symbol}</Typography>
                    </Stack>
                    <Row>
                      <Typography>Borrow:</Typography>

                      <Stack alignItems="flex-end">
                        <Typography align="right">
                          {formatBalance(borrow.shiftedBy(-decimals))}
                        </Typography>
                        <UsdEquivalent
                          priceInUsd={priceInUsd}
                          value={borrow.shiftedBy(-decimals).toString()}
                        />
                      </Stack>
                    </Row>
                  </CardContent>
                  <Divider sx={{ my: '24px' }} />

                  <CardActions>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() =>
                        updateDialogProps({
                          ...dialogProps,
                          reserveInfo: reservesInfoMap[symbol],
                          visible: true,
                          type: LendingType.Borrow,
                          symbol
                        })
                      }
                    >
                      Borrow
                    </Button>

                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() =>
                        updateDialogProps({
                          ...dialogProps,
                          reserveInfo: reservesInfoMap[symbol],
                          visible: true,
                          type: LendingType.Repay,
                          symbol
                        })
                      }
                    >
                      Repay
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            );
          })
        ) : (
          <Nodata />
        )}
      </CollapseCard>
    </Card>
  );
};

export default memo(BorrowedPosition);
