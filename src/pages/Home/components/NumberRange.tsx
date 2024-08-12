import { memo, HTMLAttributes, ReactNode } from 'react';
import { formatNumber } from '@parallel-mono/utils';
import styled from 'styled-components';
import { Box } from '@mui/material';

import ArrowLeftSVG from '@/Icons/svg/arrow-left.svg';

type NumberRangeProps = HTMLAttributes<HTMLDivElement> & {
  start: number;
  end: number;
  formatter: (value: number) => ReactNode;
  symbol?: string;
};

const Container = styled.div`
  display: inline-flex;
  align-items: center;
`;
const NumberRange = memo((props: NumberRangeProps) => {
  const { start, end, formatter = formatNumber, symbol, ...others } = props;
  const determinant = start === end;

  if (!start) return <Container {...others}>-</Container>;

  if (determinant) {
    return (
      <Container {...others}>
        {formatter(start)} {symbol}
      </Container>
    );
  }
  return (
    <Container>
      {formatter(start)} {symbol}
      <Box
        component="img"
        src={ArrowLeftSVG}
        sx={{ mx: '8px', width: '16px', transform: 'rotate(180deg)' }}
      />
      {formatter(end)} {symbol}
    </Container>
  );
});

export default NumberRange;
