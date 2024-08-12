import { BottomNavigation, Paper, BottomNavigationAction } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MobileMenu = () => {
  const [value, setValue] = useState<number>();

  const location = useLocation();

  useEffect(() => {
    [
      '^/$',
      '(^/tap$|^/tap/.*)',
      '(^/leaderboard$|^/leaderboard/.*)',
      '(^/friends$|^/friends/.*)'
    ].some((pathReg, index) => {
      if (new RegExp(pathReg).test(location.pathname)) {
        setValue(index);
        return true;
      }
      return false;
    });
  }, [location.pathname]);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels value={value}>
        <BottomNavigationAction label="Home" component={Link} to="/" />
        <BottomNavigationAction label="Tap" component={Link} to="/tap" />
        <BottomNavigationAction label="Leaderboard" component={Link} to="/leaderboard" />
        <BottomNavigationAction label="Friends" component={Link} to="/friends" />
      </BottomNavigation>
    </Paper>
  );
};
