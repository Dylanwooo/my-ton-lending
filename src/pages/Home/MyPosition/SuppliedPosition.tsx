import {
  Box,
  Stack,
  Card,
  CardContent,
  Avatar,
  Switch,
  Typography,
  Button,
  Divider,
  CardActions
} from '@mui/material';
import { memo, useState } from 'react';
import { fromNano } from '@ton/core';

import { UsdEquivalent } from '@/components/UsdEquivalent';
import { LendingType } from '@/pages/Home/components/LendingDialog';
import { Row } from '@/components/styled';
import { UserPosition, useUserPosition } from '@/pages/Home/contexts/UserPositionProvider';
import Nodata from '@/pages/Home/components/Nodata';
import { useReservesInfoMap } from '@/pages/Home/contexts/ReservesProvider';
import CollapseCard from '@/pages/Home/components/CollapseCard';
import { formatBalance } from '@/utils';
import { useLendingDialogState } from '@/pages/Home/contexts/LendingDialogProvider';

const SuppliedPosition = () => {
  const [isCollapse, setIsCollapse] = useState(false);

  const { supplyPositionList } = useUserPosition();

  const { reservesInfoMap } = useReservesInfoMap();

  const { dialogProps, updateDialogProps } = useLendingDialogState();

  return (
    <Card variant="outlined" sx={{ p: '12px' }}>
      <CollapseCard
        title="My Supplied Position"
        checked={!isCollapse}
        onCollapse={() => setIsCollapse(!isCollapse)}
      >
        {supplyPositionList?.length ? (
          supplyPositionList.map(
            ({ symbol, supply, decimals, asCollateral, logo }: UserPosition) => {
              if (supply.isZero()) return null;

              const priceInUsd = fromNano(reservesInfoMap[symbol]?.price) || '0';

              return (
                <Box key={symbol}>
                  <Card variant="outlined" sx={{ mb: '16px' }}>
                    <CardContent>
                      <Stack alignItems="center" spacing="4px" mb="8px" direction="row">
                        <Avatar sizes="20" src={logo} />
                        <Typography>{symbol}</Typography>
                      </Stack>
                      <Row>
                        <Typography>Supplied:</Typography>
                        <Stack alignItems="flex-end">
                          <Typography align="right">
                            {formatBalance(supply.shiftedBy(-decimals))}
                          </Typography>

                          <UsdEquivalent
                            priceInUsd={priceInUsd}
                            value={supply.shiftedBy(-decimals).toString()}
                          />
                        </Stack>
                      </Row>
                      <Row>
                        <Typography>Collateral: </Typography>

                        <Stack alignItems="end">
                          <Switch checked={asCollateral} />
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
                            type: LendingType.Supply,
                            symbol
                          })
                        }
                      >
                        Supply
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() =>
                          updateDialogProps({
                            ...dialogProps,
                            reserveInfo: reservesInfoMap[symbol],
                            visible: true,
                            type: LendingType.Withdraw,
                            symbol
                          })
                        }
                      >
                        Withdraw
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              );
            }
          )
        ) : (
          <Nodata />
        )}
      </CollapseCard>
    </Card>
  );
};

export default memo(SuppliedPosition);
