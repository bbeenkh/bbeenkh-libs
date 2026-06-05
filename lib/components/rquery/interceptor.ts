import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export interface InterceptorOptions {
  /**
   * 요청마다 호출되어 Bearer 토큰 문자열을 반환하는 함수.
   * 서버 환경(SSR)과 클라이언트 환경 모두 지원하기 위해 async로 작성한다.
   * 토큰이 없으면 undefined/null을 반환하면 Authorization 헤더를 설정하지 않는다.
   * @example
   * getToken: async () => {
   *   if (typeof window === 'undefined') {
   *     const session = await getServerSession();
   *     return session?.accessToken;
   *   }
   *   return getAuthState().token;
   * }
   */
  getToken?: () => Promise<string | null | undefined> | string | null | undefined;

  /**
   * HTTP 401 Unauthorized 응답 시 호출되는 핸들러.
   * 기본 동작: 없음 (소비 측에서 구현).
   * @example
   * onUnauthorized: () => {
   *   logout();
   *   window.location.href = '/login';
   * }
   */
  onUnauthorized?: () => void;

  /**
   * HTTP 403 Forbidden 응답 시 호출되는 핸들러.
   * @example
   * onForbidden: () => {
   *   openInvalidUserRoleDialog();
   * }
   */
  onForbidden?: () => void;
}

/**
 * Axios 인스턴스에 공통 인터셉터를 등록한다.
 *
 * - **Request**: `getToken`이 제공된 경우 `Authorization: Bearer <token>` 헤더를 주입한다.
 * - **Response (success)**: 응답을 그대로 통과시킨다.
 * - **Response (error)**:
 *   - `401` → `onUnauthorized` 호출
 *   - `403` → `onForbidden` 호출
 *   - 그 외 → `Promise.reject`로 에러를 전파한다.
 *
 * @param axiosInstance - 인터셉터를 등록할 Axios 인스턴스
 * @param options - 토큰 getter 및 에러 핸들러 옵션
 *
 * @example
 * const instance = axios.create({ baseURL, withCredentials: true });
 * setInterceptors(instance, {
 *   getToken: async () => getAuthState().token,
 *   onUnauthorized: () => { logout(); router.push('/login'); },
 *   onForbidden: () => openInvalidUserRoleDialog(),
 * });
 */
export function setInterceptor(
  axiosInstance: AxiosInstance,
  options: InterceptorOptions = {},
): void {
  const { getToken, onUnauthorized, onForbidden } = options;

  // Request interceptor: Bearer 토큰 주입
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (getToken) {
        // token 획득, 환경에 따라 자율적으로 토큰 획득
        const token = 'TOKEN'
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor: 에러 상태 코드별 처리
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;

      if (status === 401) {
        onUnauthorized?.();
      } else if (status === 403) {
        onForbidden?.();
      }

      return Promise.reject(error);
    },
  );
}
