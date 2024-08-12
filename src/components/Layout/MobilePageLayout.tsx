import { Stack } from '@mui/material';
import { FC, ReactNode, memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { MobileMenu } from '../Menu';
import { Header } from '../Header';

const ContentWrapper = styled.div`
  max-width: 900px;
  padding: 20px;
`;

type Props = {
  fullPage?: boolean;
  showBack?: boolean;
  showMenu?: boolean;
  showHeader?: boolean;
};

export const MobilePageLayout: FC<Props & { children: ReactNode }> = memo(
  ({ fullPage = false, showBack = false, showMenu = true, showHeader = true, children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = useCallback(() => {
      const backPath = location.state?.back ?? '/';
      navigate(backPath);
    }, [location, navigate]);

    return (
      <Stack>
        {!fullPage && showHeader && <Header />}
        {fullPage && showBack && (
          <button type="button" onClick={goBack}>
            Back
          </button>
        )}
        <ContentWrapper>{children}</ContentWrapper>
        {!fullPage && showMenu && <MobileMenu />}
      </Stack>
    );
  }
);
