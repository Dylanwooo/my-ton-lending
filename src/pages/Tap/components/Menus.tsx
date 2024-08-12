import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Inline } from '@/components/Layout';

export const Menus = memo(() => {
  return (
    <Inline justifyContent="space-between">
      <Inline>
        <Link to="/tap/prize-pool" state={{ back: '/tap' }}>
          Prize Pool
        </Link>
        <Link to="/tap/lottery" state={{ back: '/tap' }}>
          Lottery
        </Link>
      </Inline>
      <Link to="/tap/help" state={{ back: '/tap' }}>
        Help
      </Link>
    </Inline>
  );
});
