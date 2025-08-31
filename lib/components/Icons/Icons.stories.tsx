import { Meta } from '@storybook/react';
import * as Icons from '.';

type TIcons = Record<keyof typeof Icons, React.ComponentType>;

/**
 * 공용 아이콘 패키지입니다.
 */
export const IconGrid = () => {
  return (
    <div className="ods-grid ods-grid-cols-5 ods-gap-12">
      {Object.keys(Icons as unknown as TIcons).map((key) => {
        const key2 = key as keyof typeof Icons;
        // eslint-disable-next-line import/namespace
        const Icon = Icons[key2];
        return <IconBox key={key} title={key} Icon={Icon} />;
      })}
    </div>
  );
};

const meta: Meta<typeof Icons> = {
  component: IconGrid,
};

export default meta;

const IconBox = ({
  title,
  Icon,
}: {
  title: string;
  Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}) => {
  return (
    <div className="ods-flex ods-flex-col ods-justify-center ods-items-center ods-gap-2">
      <Icon width="24" height="24" className="ods-fill-primary" />
      <span className="ods-text-xxs">{title}</span>
    </div>
  );
};
