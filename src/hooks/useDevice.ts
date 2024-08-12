import { useState, useEffect } from 'react';
import isMobile from 'ismobilejs';
import { useWindowSize } from 'react-use';

export interface DeviceType {
  isDesktop: boolean;
  isMobile: boolean;
}

const getDeviceType = () => {
  const isAnyMobile = isMobile(window.navigator).any;
  return {
    isDesktop: !isAnyMobile,
    isMobile: isAnyMobile
  };
};

export const useDevice = () => {
  const { height, width } = useWindowSize();
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    setDeviceType(getDeviceType());
  }, [height, width]);

  return deviceType;
};
