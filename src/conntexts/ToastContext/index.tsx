import { isFunction, isObject, isUndefined, mapValues } from 'lodash';
import { FC, createContext, memo, ReactNode, useContext, useMemo } from 'react';
import {
  ToastContainer,
  Icons,
  IconProps,
  toast,
  ToastPromiseParams,
  ToastOptions,
  UpdateOptions,
  ToastContent
} from 'react-toastify';
import { BuiltInIconProps } from 'react-toastify/dist/components';

import { PromiseToastRender } from './PromistToastRender';

type TonLayerToast = Omit<typeof toast, 'promise'> & {
  promise: <T extends unknown>(
    promise: Promise<T> | (() => Promise<T>),
    params?: ToastPromiseParams,
    options?: ToastOptions
  ) => Promise<T>;
};

const ToastContainerId = 'TonLayerToast';

const ToastContext = createContext<TonLayerToast>(toast as TonLayerToast);

const iconMap: {
  [key: string]: ReactNode | FC<BuiltInIconProps>;
} = {
  info: Icons.info,
  success: Icons.success,
  error: Icons.error,
  warning: Icons.error
};

const renderIcon = (props: IconProps) => {
  const { type } = props;
  const icon = iconMap[type];
  if (isFunction(icon)) {
    return icon(props);
  }
  return icon;
};

const defaultToastOptions: {
  info: ToastOptions;
  success: ToastOptions;
  error: ToastOptions;
  warning: ToastOptions;
} = {
  info: {
    autoClose: 3000,
    containerId: ToastContainerId
  },
  success: {
    autoClose: 3000,
    containerId: ToastContainerId
  },
  error: {
    containerId: ToastContainerId
  },
  warning: {
    autoClose: 3000,
    containerId: ToastContainerId
  }
};

const defaultPromiseToastParams: {
  pending: UpdateOptions;
  success: UpdateOptions;
  error: UpdateOptions;
} = {
  pending: {
    /*
      this is necessary because we use "icon" prop of ToastContainer to customize all icon,
      but there is a defect using ToastContainer's icon prop: toast.promise won't be able to
      display loading spinner for pending stage.
    */
    icon: Icons.spinner,
    // @ts-ignore
    render: PromiseToastRender
  },
  success: {
    // have to update icon to undefined, otherwise it'll remain old value from the pending stage
    icon: undefined,
    // @ts-ignore
    render: PromiseToastRender,
    autoClose: 5000
  },
  error: {
    // have to update icon to undefined, otherwise it'll remain old value from the pending stage
    icon: undefined,
    // @ts-ignore
    render: PromiseToastRender,
    autoClose: 5000
  }
};

const DEFAULT_MESSAGE = {
  success: 'Transaction confirmed!',
  pending: 'Transaction confirming',
  error: undefined
};

// TODO upgrade react-toastify and revert this wrapping func
// this is to avoid a known issue of react-toastify
const wrapPromiseToAvoidReactToastifyBug = <T extends unknown>(
  promise: Promise<T> | (() => Promise<T>)
) => {
  const rawPromise = isFunction(promise) ? promise() : promise;
  return new Promise<T>((rs, rj) => {
    rawPromise
      .then(result => {
        setTimeout(() => {
          rs(result);
        }, 0);
      })
      .catch(err => {
        setTimeout(() => {
          rj(err);
        }, 0);
      });
  });
};

export const ToastProvider = memo(({ children }: { children: ReactNode }) => {
  // @ts-ignore
  const customizedToast: TonLayerToast = useMemo(() => {
    return {
      ...toast,
      promise: <T extends unknown>(
        promise: Promise<T> | (() => Promise<T>),
        params?: ToastPromiseParams,
        options?: ToastOptions
      ) => {
        const customizedParams = mapValues(
          defaultPromiseToastParams,
          (defaultValue: any, key: keyof ToastPromiseParams) => {
            const value = params?.[key as keyof ToastPromiseParams] || DEFAULT_MESSAGE[key];
            if (isObject(value)) {
              return {
                ...defaultValue,
                ...value
              };
            }
            return {
              ...defaultValue,
              render: isUndefined(value) ? defaultValue.render : value
            };
          }
        );
        const wrappedPromise = wrapPromiseToAvoidReactToastifyBug<T>(promise);
        // @ts-ignore
        return toast.promise<T>(wrappedPromise, customizedParams, {
          containerId: ToastContainerId,
          ...options
        });
      },
      info: (content: ToastContent, options?: ToastOptions<{}> | undefined) => {
        const defaultOptions = defaultToastOptions.info;
        return toast.info(content, { ...defaultOptions, ...options });
      },
      success: (content: ToastContent, options?: ToastOptions<{}> | undefined) => {
        const defaultOptions = defaultToastOptions.success;
        return toast.success(content, { ...defaultOptions, ...options });
      },
      error: (content: ToastContent, options?: ToastOptions<{}> | undefined) => {
        const defaultOptions = defaultToastOptions.error;
        return toast.error(content, { ...defaultOptions, ...options });
      },
      warning: (content: ToastContent, options?: ToastOptions<{}> | undefined) => {
        const defaultOptions = defaultToastOptions.warning;
        return toast.warning(content, { ...defaultOptions, ...options });
      },
      warn: (content: ToastContent, options?: ToastOptions<{}> | undefined) => {
        const defaultOptions = defaultToastOptions.warning;
        return toast.warn(content, { ...defaultOptions, ...options });
      },
      loading: (content: ToastContent, options?: ToastOptions<{}> | undefined) => {
        const defaultOptions = defaultToastOptions.warning;
        return toast.loading(content, { ...defaultOptions, ...options });
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={customizedToast}>
      <ToastContainer
        containerId={ToastContainerId}
        position="top-right"
        autoClose={false}
        pauseOnFocusLoss
        pauseOnHover
        hideProgressBar
        // https://github.com/fkhadra/react-toastify/blob/8bd39a914f07bd48d4174206c37ee38f0bae47e4/src/components/Icons.tsx#L76
        icon={renderIcon as any}
        theme="colored"
        closeButton={false}
      />
      {children}
    </ToastContext.Provider>
  );
});

export const useToast = () => useContext(ToastContext);
