import { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { formatNumber } from '@parallel-mono/utils';

import { formatToPercentage, zero, formatToCurrency } from '@/utils';
import { ReservesInfo } from '@/pages/Home/contexts/ReservesProvider';
import { Row } from '@/components/styled';
import { useUserPosition } from '@/pages/Home/contexts/UserPositionProvider';
import NumberRange from '@/pages/Home/components/NumberRange';

const BorrowInfoWrapper = styled(Stack)`
  border-radius: 8px;
  padding: 8px;
  gap: 6px;
  font-size: 14px;
  background: #ececec;
`;

type BorrowInfoProps = {
  amount: string; // Input borrow amount
  reserveInfo: ReservesInfo;
};

const BorrowInfo = ({ amount, reserveInfo }: BorrowInfoProps) => {
  const { borrowApy, utilization } = reserveInfo;

  const { userAccountHealthInfo, userPositionMap } = useUserPosition();

  const { healthFactor } = userAccountHealthInfo ?? {};
  return (
    <BorrowInfoWrapper>
      <Row>
        Borrow limit{' '}
        <Typography align="right">
          <NumberRange start={0} end={1} formatter={formatToCurrency} />
        </Typography>
      </Row>
      <Row>
        Borrow APY <Typography align="right">{borrowApy}</Typography>
      </Row>
      <Row>
        Health factor{' '}
        <Typography align="right">
          {formatNumber(healthFactor ?? zero, { threshold: { max: 20 } })}
        </Typography>
      </Row>
      <Row>
        Utilization <Typography align="right">{formatToPercentage(utilization)}</Typography>
      </Row>
    </BorrowInfoWrapper>
  );
};

export default memo(BorrowInfo);
