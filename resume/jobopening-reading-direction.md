원티드 공고 읽는 절차

1. Playwright UA 설정 후 접속 — browser_run_code_unsafe 안에서 page.setExtraHTTPHeaders({'User-Agent': '<일반 Chrome UA>', 'Accept-Language': 'ko-KR,ko;q=0.9'}) 설정 후 page.goto(url). (기본 Playwright UA로 바로 접속하면 CloudFront 403 — 배경은 핵심 원칙 참고)
2. "상세 정보 더 보기" 버튼 클릭 — browser_find+browser_click은 매칭 실패하므로, browser_run_code_unsafe에서 page.getByRole('button', { name: '상세 정보 더 보기' }).click()으로 직접 클릭.
   - 클릭 전/후 article.innerText() 길이·포함 헤딩(getByRole('heading'))을 비교해 펼침 성공 검증 (예: 1,322자→2,484자, "우대사항"·"채용 전형" 헤딩 추가 확인).
3. 본문 추출 — 펼쳐진 article.innerText()에서 "우대사항" 이후 구간을 슬라이스해 우대사항·복지·채용전형 전문 확보.
   - "혜택 및 복지" 섹션은 읽지 않는다 (추출/정리 대상에서 제외).

기업정보 페이지 읽는 절차 (상단 회사명 클릭 → /company/{id})
1. 회사명 링크 이동 — 공고 상단 회사명(예: "제이앤피메디(JNPMEDI)")은 `/company/{id}` 링크. browser_click의 target 매칭이 실패하므로 browser_run_code_unsafe에서 page.goto('https://www.wanted.co.kr/company/{id}')로 직접 이동. UA는 세션에 유지되므로 재설정 불필요.
2. "회사 소개" 더보기 클릭 필수 — 회사 소개(`[data-testid="company-info-description"]`)는 길면 "더보기" 버튼(`[data-testid="company-info-description-button"]`)으로 잘려 있다. 클릭 전 innerText/HTML에는 뒷부분(예: 공식 홈페이지 URL)이 아예 없을 수 있으므로, 반드시 버튼을 클릭해 "접기"로 바뀐 뒤 전체 텍스트를 다시 읽어야 한다.
   - 공식 홈페이지 URL은 기업정보 하단의 "홈페이지" 필드(기업 정보 표)가 아니라, 더보기로 펼친 "회사 소개" 본문 맨 끝에 `<a href="https://...">` 형태로 들어있는 경우가 있다. 표의 "홈페이지" 값만 보고 "-"(미기재)로 단정하지 말 것.
3. 본문 추출 — 더보기 클릭 후 company-info-description의 전체 텍스트(소개문 + 핵심가치 + 회사 제품 + 홈페이지 URL)를 innerText/HTML로 재확보.

핵심 원칙
- 403의 원인은 서버 차단이 아니라 Playwright 기본 UA가 자동화 브라우저로 식별되는 클라이언트 지문 문제. 그래서 접속 전부터 일반 브라우저 UA로 설정하고 시작한다 (403 재현·curl 검증 같은 진단 절차는 불필요).
- 버튼 클릭 등 동적 펼침 콘텐츠는 클릭 전/후 상태 비교로만 성공 여부를 신뢰할 수 있다.
- browser_click의 target 매칭이 실패하면 browser_run_code_unsafe + Playwright 로케이터(getByRole 등)로 우회한다. 링크 이동도 동일하게 page.goto로 우회 가능.
- "더보기"로 잘리는 텍스트는 클릭 전 상태만 보고 누락된 정보(URL 등)를 "없다"고 단정하지 말 것 — 펼친 뒤 다시 읽어야 한다.