import * as SelectPrimitive from '@radix-ui/react-select';

interface StyleClass {
  trigger?: string;
  content?: string;
  item?: string;
  viewport?: string;
}

interface Option {
  label: string;
  value: string;
}

interface Props {
  value?: string;
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
  styleClass?: StyleClass;
}

/**
 * # Selectbox UI
 * ---
 * - 간단설명: Radix UI Select 기반 선택 박스 컴포넌트
 * - `options` 배열로 선택지를 주입하며, `onSelect`으로 선택 값을 받는다
 * - 기본 스타일 없음 — 모든 스타일은 `styleClass`로 주입
 * ---
 * @param value 현재 선택된 값
 * @param options 선택지 배열 `{ label: string; value: string }[]`
 * @param onSelect 값 선택 시 호출되는 콜백 `(value: string) => void`
 * @param placeholder 선택 전 표시할 placeholder 텍스트
 * @param styleClass 커스텀 스타일 클래스 객체
 * - `styleClass.trigger`: 트리거 버튼 클래스
 * - `styleClass.content`: 드롭다운 콘텐츠 클래스
 * - `styleClass.viewport`: 뷰포트 래퍼 클래스
 * - `styleClass.item`: 개별 옵션 아이템 클래스
 * @example
 * <Selectbox
 *   value={sort}
 *   options={[{ label: '정확도순', value: 'accuracy' }, { label: '최신순', value: 'latest' }]}
 *   onSelect={setSort}
 *   placeholder="정렬 선택"
 *   styleClass={{
 *     trigger: 'border rounded px-3 py-2',
 *     content: 'bg-white shadow-lg rounded',
 *     item: 'px-3 py-2 cursor-pointer hover:bg-gray-100',
 *   }}
 * />
 */
function Selectbox({ value, options, onSelect, placeholder, styleClass }: Props) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onSelect}>
      <SelectPrimitive.Trigger className={styleClass?.trigger}>
        <SelectPrimitive.Value placeholder={placeholder} />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={styleClass?.content}>
          <SelectPrimitive.Viewport className={styleClass?.viewport}>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={styleClass?.item}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export default Selectbox;
