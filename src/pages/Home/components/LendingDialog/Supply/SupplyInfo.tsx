import { Stack, Typography } from '@mui/material';
import { memo } from 'react';
import styled from 'styled-components';
import { fromNano } from '@ton/core';
import BigNumber from 'bignumber.js';
import { formatNumber } from '@parallel-mono/utils';

import { formatToPercentage, formatBalance, formatToCurrency, zero } from '@/utils';
import { Row } from '@/components/styled';
import { ReservesInfo } from '@/pages/Home/contexts/ReservesProvider';
import NumberRange from '@/pages/Home/components/NumberRange';
import { useUserPosition } from '@/pages/Home/contexts/UserPositionProvider';
import { ActionTypeEnum, useLendingSimulation } from '@/pages/Home/hooks';

const SupplyInfoWrapper = styled(Stack)`
  border-radius: 8px;
  padding: 8px;
  gap: 6px;
  font-size: 14px;
  background: #ececec;
`;

type SupplyInfoProps = {
  amount: string; // Input supply amount
  reserveInfo: ReservesInfo;
};

const SupplyInfo = ({ amount, reserveInfo }: SupplyInfoProps) => {
  const {
    utilization,
    supplyApy,
    availableLiquidity = 0,
    liquidationThreshold,
    ltv,
    symbol,
    price
  } = reserveInfo || {};
  const { userAccountHealthInfo, userPositionMap } = useUserPosition();

  const { healthFactor, avgLtv, totalDebtInUsd, totalCollateralInUsd } =
    userAccountHealthInfo ?? {};
  const { supply } = userPositionMap[symbol] ?? {};

  // TODO: add a new state to store the user's usage as collateral status
  const usageAsCollateralEnabledOnUser = true;

  const asCollateral = usageAsCollateralEnabledOnUser || supply?.eq(0);

  // TODO: get from healthInfo when available
  const borrowLimitInUsd = totalCollateralInUsd?.times(avgLtv)?.lt(totalDebtInUsd)
    ? BigNumber(0)
    : totalCollateralInUsd?.times(avgLtv)?.minus(totalDebtInUsd);

  const { borrowLimitInUsd: newBorrowLimitInUsd } = useLendingSimulation([
    {
      type: ActionTypeEnum.SUPPLY,
      targetAsset: {
        value:
          asCollateral && Number.isFinite(+amount)
            ? BigNumber(fromNano(price ?? 0)).times(amount!)
            : new BigNumber(0),
        LTV: BigNumber(ltv?.toString() ?? 0),
        reserveLiquidationThreshold: BigNumber(liquidationThreshold?.toString() ?? 0)
      }
    }
  ]);

  return (
    <SupplyInfoWrapper>
      <Row>
        New Borrow Limit{' '}
        <Typography align="right">
          <NumberRange
            start={borrowLimitInUsd?.toNumber()}
            end={newBorrowLimitInUsd?.toNumber()}
            formatter={formatToCurrency}
          />
        </Typography>
      </Row>
      <Row>
        Supply APY <Typography align="right">{supplyApy}</Typography>
      </Row>
      <Row>
        Health factor{' '}
        <Typography align="right">
          {formatNumber(healthFactor ?? zero, { threshold: { max: 20 } })}
        </Typography>
      </Row>
      <Row>
        Pool liquility{' '}
        <Typography align="right">
          {formatBalance(BigNumber(fromNano(availableLiquidity ?? 0)))}
        </Typography>
      </Row>
      <Row>
        Utilization <Typography align="right">{formatToPercentage(utilization)}</Typography>
      </Row>
    </SupplyInfoWrapper>
  );
};

export default memo(SupplyInfo);
