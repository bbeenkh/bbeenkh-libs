import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 컴포넌트 레이아웃
 *
 * @returns
 */
function Layout({ children, className }: IProps) {
  return (
    <main
      className={twMerge(
        'ods-w-full ods-h-full ods-flex ods-flex-col ods-items-center',
        className,
      )}
    >
      {children}
    </main>
  );
}

Layout.Header = ({
  sticky,
  children,
  className,
}: IProps & { sticky?: boolean }) => {
  return (
    <header
      className={twMerge(
        'ods-w-full ods-z-50 ods-flex ods-justify-center',
        className,
        sticky ? 'ods-sticky ods-top-0' : '',
      )}
    >
      <div className="ods-layout__header-height ods-h-full ods-w-full ods-layout__width ods-layout__padding ods-flex ods-justify-center">
        {children}
      </div>
    </header>
  );
};

/**
 * Layout Body
 * @param isDrawerOpen: drawer가 open되었는지에 따라 이동, drawer 추가시에만 사용
 */
Layout.Body = ({
  children,
  className,
  isDrawerOpen = false,
  ...props
}: IProps & {
  isDrawerOpen?: boolean;
}) => {
  return (
    <div
      className={twMerge(
        'max-w-[var(--layout-max-width)] w-full h-auto flex justify-center flex-grow relative',
        className,
      )}
      {...props}
    >
      <div
        className={twMerge(
          'w-full h-full px-[var(--layout-padding-x)] py-[var(--body-padding-y)] max-w-[var(--layout-width)] transition-[margin-left] duration-200 ease-in-out',
          isDrawerOpen ? 'ml-[var(--body-drawer-open-margin)]' : '',
        )}
      >
        {children}
      </div>
    </div>
  );
};

Layout.Footer = ({ children, className }: IProps) => {
  return (
    <footer
      className={twMerge(
        'ods-w-full ods-z-50 ods-flex ods-justify-center',
        className,
      )}
    >
      <div className="ods-w-full ods-layout__width ods-layout__padding ods-layout__footer-height">
        {children}
      </div>
    </footer>
  );
};

export default Layout;
