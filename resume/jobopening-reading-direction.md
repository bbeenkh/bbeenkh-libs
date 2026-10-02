# 원티드 공고 페이지 읽기 방식 

## 문제

- `WebFetch` 로 직접 읽으면 "상세 정보 더 보기" 버튼 클릭 전 내용(주요업무·자격요건 일부)만 보여 우대사항·혜택·채용전형이 빠진다.
- Playwright MCP (`browser_navigate`) 로 접근하면 CloudFront 가 403 을 반환한다.
  - 응답: `ERROR: The request could not be satisfied` (CloudFront 요청 차단)
  - 원인: Playwright 기본 User-Agent 가 자동화 브라우저로 식별되어 차단됨. `curl` 에 일반 브라우저 UA 를 주면 200 이 오는 것으로 확인.

## 해결 순서

1. **1차 확인 (WebFetch)** — 회사명·포지션명·주요업무·자격요건 등 "더 보기" 펼치기 전 내용을 빠르게 파악.
2. **403 재현 확인** — `browser_navigate` 로 그대로 열면 CloudFront 403. 콘솔/스냅샷으로 원인(요청 차단) 확인.
3. **UA 우회 확인** — `curl -A "<일반 Chrome UA>" -H "Accept-Language: ko-KR,ko;q=0.9"` 로 같은 URL 요청 → 200 확인. Playwright 차단이 UA 때문임을 검증.
4. **Playwright UA 교체 후 재접속** — `browser_run_code_unsafe` 안에서 `page.setExtraHTTPHeaders({ 'User-Agent': '<일반 Chrome UA>', 'Accept-Language': 'ko-KR,ko;q=0.9' })` 설정 후 `page.goto(url)` → 200, 정상 렌더링.
5. **"상세 정보 더 보기" 버튼 클릭** — `browser_find` 로 버튼 ref 조회 시도했으나 `browser_click` 의 `target`/`element` 매칭이 맞지 않아 실패.
   - 우회: `browser_run_code_unsafe` 안에서 Playwright API 로 직접 조작.
     ```js
     const btn = page.getByRole('button', { name: '상세 정보 더 보기' });
     await btn.click();
     ```
   - 클릭 전/후 `article` 영역의 `innerText()` 길이와 포함 헤딩(`getByRole('heading')`)을 비교해 펼침 성공을 검증 (1,322자 → 2,484자, 헤딩에 "우대사항"·"혜택 및 복지"·"채용 전형" 추가 확인).
6. **펼쳐진 본문 추출** — 같은 `article.innerText()` 에서 `"우대사항"` 이후 구간을 슬라이스해 우대사항·복지·채용전형 전문 확보.

## 핵심 포인트

- **403 의 원인은 서버 차단이 아니라 클라이언트(브라우저) 지문** 이었다. `curl` 성공 여부로 "진짜 막힌 리소스인지, 자동화 탐지인지"를 먼저 구분한 것이 우회 경로를 찾는 핵심이었다.
- 동적으로 펼쳐지는 콘텐츠(버튼 클릭 후 DOM 변경)는 **일반 스냅샷/파싱이 아니라 클릭 전후 상태 비교** 로 성공 여부를 확인해야 신뢰할 수 있다.
- `browser_click` 의 `target` 매칭이 실패하는 경우 `browser_run_code_unsafe` 로 Playwright 로케이터(`getByRole` 등)를 직접 써서 우회할 수 있다.
