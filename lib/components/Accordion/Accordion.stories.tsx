import { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '.';

const meta: Meta = {
  title: 'Components/Accordion',
};
export default meta;

type Story = StoryObj;

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>배송 정책은 어떻게 되나요?</AccordionTrigger>
        <AccordionContent>
          주문 후 영업일 기준 1~3일 내에 배송됩니다. 제주 및 도서산간 지역은 추가 배송일이 소요될 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>반품 및 교환은 가능한가요?</AccordionTrigger>
        <AccordionContent>
          수령일로부터 7일 이내에 반품 및 교환 신청이 가능합니다. 단, 상품 훼손 시 반품이 제한될 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>회원 탈퇴는 어떻게 하나요?</AccordionTrigger>
        <AccordionContent>
          마이페이지 &gt; 계정 설정 &gt; 회원 탈퇴 메뉴에서 탈퇴 신청이 가능합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>JavaScript란 무엇인가요?</AccordionTrigger>
        <AccordionContent>
          JavaScript는 웹 페이지에서 동적인 기능을 구현하기 위한 프로그래밍 언어입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>React란 무엇인가요?</AccordionTrigger>
        <AccordionContent>
          React는 Meta에서 개발한 UI 구축을 위한 JavaScript 라이브러리입니다. 컴포넌트 기반으로 동작합니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>TypeScript란 무엇인가요?</AccordionTrigger>
        <AccordionContent>
          TypeScript는 JavaScript에 정적 타입을 추가한 언어로, 대규모 애플리케이션 개발에 적합합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  name: 'Multiple (여러 항목 동시 열기)',
};
