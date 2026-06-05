import { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '.';

const meta: Meta<typeof Card> = {
  title: 'Components/CardUI',
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80 border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드에 대한 간단한 설명입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">카드 본문 내용이 여기에 들어갑니다.</p>
      </CardContent>
      <CardFooter className="border-t border-gray-100">
        <p className="text-xs text-gray-400">푸터 영역</p>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-80 border border-gray-200 bg-white">
      <CardHeader>
        <div>
          <CardTitle>알림 설정</CardTitle>
          <CardDescription className="mt-1">수신할 알림 유형을 선택하세요.</CardDescription>
        </div>
        <CardAction>
          <button className="text-xs px-3 py-1 rounded-md bg-gray-900 text-white">편집</button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            이메일 알림
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            푸시 알림
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-300" />
            SMS 알림
          </li>
        </ul>
      </CardContent>
    </Card>
  ),
};
