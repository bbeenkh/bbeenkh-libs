import { Meta, StoryObj } from '@storybook/react';
import Spinner from '.';
import Card from '../Card';
import { useState } from 'react';
import Button from '../Button';

/**
 * 스피너는 실행 중인 프로세스의 현재 상태와 완료까지 남은 시간을 정확하게 알 수 없는 경우에 사용됩니다.
 * - 진행중인 프로세스가 완료되면 스피너가 사라집니다.
 * - 사이즈는 xs, sm, lg, xl가 제공됩니다
 * - className을 사용해 사이즈/색상 커스텀이 가능합니다 (text, fill 속성 사용)
 */
const meta: Meta<typeof Spinner> = {
  component: Spinner,
};

export default meta;

export const DefaultExample = () => {
  return (
    <div className="ods-flex ods-h-[60px] ods-w-full ods-gap-8 ods-items-center">
      <div className="ods-h-full ods-flex-col ods-gap-8">
        <span>XS</span>
        <Spinner size="xs" />
      </div>
      <div className="ods-h-full ods-flex-col ods-gap-8">
        <span>SM</span>
        <Spinner size="sm" className="ods-fill-state-info" />
      </div>
      <div className="ods-h-full ods-flex-col ods-gap-8">
        <span>LG</span>
        <Spinner
          size="lg"
          className="ods-fill-state-danger ods-text-state-info"
        />
      </div>
      <div className="ods-h-full ods-flex-col ods-gap-8">
        <span>XL</span>
        <Spinner
          size="xl"
          className="ods-fill-state-warning ods-text-[green]"
        />
      </div>
    </div>
  );
};

export const SpinnerInCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const load = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button size="sm" onClick={load}>
        로딩 시작
      </Button>
      <Card className="ods-justify-center ods-h-[10em]">
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Card.Body>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Card.Body>
        )}
      </Card>
    </>
  );
};
