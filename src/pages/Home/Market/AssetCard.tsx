import { Card, CardContent, Stack, Avatar, Typography, Button, Divider } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';
import { fromNano } from '@ton/core';
import BigNumber from 'bignumber.js';

import { LendingType } from '../components/LendingDialog';

import { useTonConnect } from '@/hooks';
import { useToast } from '@/conntexts';
import { ReservesInfo } from '@/pages/Home/contexts/ReservesProvider';
import { Row } from '@/components/styled';
import { formatToPercentage, formatBalance } from '@/utils';
import { UsdEquivalent } from '@/components/UsdEquivalent';
import { useLendingDialogState } from '@/pages/Home/contexts/LendingDialogProvider';
import { getEffectiveApy } from '@/pages/Home/utils';
import { useMintSampleJetton } from '@/pages/Home/hooks';

type AssetCardProps = {
  reserveInfo: ReservesInfo;
  balance: string;
};

const AssetCard = ({ reserveInfo, balance }: AssetCardProps) => {
  const { dialogProps, updateDialogProps } = useLendingDialogState();
  const { asyncMint } = useMintSampleJetton();

  const toast = useToast();
  const { connected } = useTonConnect();

  const {
    symbol,
    ltv,
    logo,
    availableLiquidity,
    price,
    borrowingEnabled,
    supplyApy,
    borrowApy,
    utilization,
    reserveAddress
  } = reserveInfo;

  const handleClickMint = useCallback(
    () => asyncMint(reserveAddress.toString()),
    [asyncMint, reserveAddress]
  );

  const reserveInfoList = useMemo(() => {
    return [
      {
        title: 'LTV',
        key: 'ltv',
        value: formatToPercentage(BigNumber(ltv.toString()))
      },
      {
        title: 'Balance:',
        key: 'balance',
        value: connected ? formatBalance(BigNumber(balance)) || '0' : '-'
      },
      {
        title: 'Pool Liquility:',
        key: 'availableLiquidity',
        value: formatBalance(BigNumber(fromNano(availableLiquidity)))
      },
      {
        title: 'Supply APY:',
        key: 'supplyApy',
        value: supplyApy
      },
      {
        title: 'Borrow APY:',
        key: 'borrowApy',
        value: borrowApy
      }
    ];
  }, [ltv, connected, balance, availableLiquidity, supplyApy, borrowApy]);

  return (
    <Card variant="outlined" sx={{ mb: '16px', borderRadius: '8px' }}>
      <CardContent>
        <Row>
          <Stack alignItems="center" spacing="4px" direction="row">
            <Avatar sizes="20" src={logo} />
            <Typography>{symbol}</Typography>
          </Stack>
        </Row>

        {reserveInfoList.map(({ title, value, key }) => (
          <Row key={title}>
            <Typography color="gray">{title}</Typography>
            <Stack alignItems="flex-end">
              <Typography align="right">{value}</Typography>

              {key === 'balance' && <UsdEquivalent priceInUsd={fromNano(price)} value={balance} />}
              {key === 'availableLiquidity' && (
                <Typography color="gray" fontSize={12}>
                  Utilization: {formatToPercentage(utilization)}
                </Typography>
              )}
            </Stack>
          </Row>
        ))}

        <Divider sx={{ my: '24px' }} />

        <Row>
          <Button
            size="small"
            onClick={() => {
              updateDialogProps({
                ...dialogProps,
                reserveInfo,
                symbol,
                visible: true,
                type: LendingType.Supply
              });
            }}
            variant="outlined"
          >
            SUPPLY
          </Button>
          <Button
            size="small"
            variant="outlined"
            disabled={!borrowingEnabled}
            onClick={() =>
              updateDialogProps({
                ...dialogProps,
                reserveInfo,
                visible: true,
                type: LendingType.Borrow,
                symbol
              })
            }
          >
            BORROW
          </Button>
        </Row>
        <Button
          size="small"
          variant="outlined"
          fullWidth
          onClick={() => toast.warning('Coming soon')}
        >
          LOOP
        </Button>

        {symbol !== 'TON' && (
          <Button size="small" variant="outlined" fullWidth onClick={handleClickMint}>
            MINT
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(AssetCard);
