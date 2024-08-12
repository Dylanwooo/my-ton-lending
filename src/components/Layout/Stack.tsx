import { HTMLAttributes, ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  width?: CSSProperties['width'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  inset?: CSSProperties['padding'];
  gap?: CSSProperties['marginTop'];
  block?: boolean;
  children: ReactNode;
  flex?: CSSProperties['flex'];
}

const Stack = styled.div<StackProps>`
  width: ${props => props.width};
  display: ${props => (props.block ?? true ? 'flex' : 'inline-flex')};
  flex-direction: column;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  padding: ${props => props.inset || '0'};
  ${props => (props.flex !== undefined ? `flex: ${props.flex};` : '')}
  > * + * {
    margin-top: ${props => props.gap || '1.5rem'};
  }
`;

export type { StackProps };
export { Stack };
