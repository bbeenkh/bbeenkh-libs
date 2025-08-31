import ODSButton, { IButtonProps } from '@/components/Button';
import { ArrowLeftSolid } from '@/components/Icons';
import { createContext, useContext } from 'react';
import { twJoin } from 'tailwind-merge';
import '@/styles/coconut-styles.css';

interface IProps {
  size: 'sm' | 'lg';
  title: string;
  backButton?: boolean;
  onClickBackButton?: () => void;
  description?: string;
  children?: React.ReactNode;
}

const HeaderContext = createContext<Pick<IProps, 'size'>>({
  size: 'lg',
});

/**
 * 코코넛 design system: 헤더 컴포넌트
 */
function Header({
  size = 'lg',
  title = '',
  backButton = false,
  onClickBackButton,
  description = '',
  children,
}: IProps) {
  return (
    <HeaderContext.Provider value={{ size }}>
      <header className="ods-w-full ods-justify-between ods-items-center ods-flex-col ods-gap-xs">
        {/* Left */}
        <div
          className={twJoin(
            'ods-w-full ods-justify-start ods-items-center ods-gap-sm ods-flex',
            size === 'lg' ? 'ods-h-[2.75em]' : 'ods-h-[2.25em]',
          )}
        >
          {/* backbutton */}
          {backButton && (
            <ArrowLeftSolid
              aria-label="backbutton"
              onClick={onClickBackButton}
              className={twJoin(
                'ods-fill-black ods-cursor-pointer',
                size === 'sm' ? 'ods-w-6 ods-h-6' : 'ods-w-8 ods-h-8',
              )}
            />
          )}
          {/* title */}
          <p
            className={twJoin(
              'ods-text-black',
              size === 'sm'
                ? 'ods-text-lg ods-font-normal'
                : 'ods-text-2xl ods-font-bold',
            )}
          >
            {title}
          </p>
          <div className="ods-flex ods-justify-between ods-flex-grow ods-items-center">
            {children}
          </div>
        </div>
        {description && (
          <p
            className={twJoin(
              'ods-text-gray-700',
              size === 'lg' ? 'ods-text-title4' : 'ods-text-xs',
            )}
          >
            {description}
          </p>
        )}
      </header>
    </HeaderContext.Provider>
  );
}

/**
 * 좌측 부분
 * arrow, title 포함
 * */
const Left = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twJoin(
        'ods-justify-start ods-items-center ods-gap-xxs ods-flex',
        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 *  우측 부분
 *  arrow, title 포함
 * */
const Right = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twJoin(
        'ods-justify-start ods-items-center ods-gap-2 ods-flex',
        className,
      )}
    >
      {children}
    </div>
  );
};

const Button = (props: IButtonProps) => {
  const { size } = useContext(HeaderContext);
  const _size = size === 'sm' ? 'sm' : 'md';
  return <ODSButton size={_size} {...props} />;
};

Header.Left = Left;
Header.Right = Right;
Header.Button = Button;

export default Header;
