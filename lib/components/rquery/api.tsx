import axios, { AxiosInstance } from 'axios';
import { setInterceptor } from './interceptor';

/**
 * API base url (실제로는 env에 존재함)
 */
const BASE_URL = 'https://api.example.com';

/**
 * 싱글턴 axios 인스턴스 — 모듈이 처음 로드될 때 한 번만 생성된다.
 * 모든 API 서브클래스가 이 인스턴스를 공유한다.
 * TODO: ky 사용하는걸로 개선하는거 고려
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

setInterceptor(axiosInstance);

/**
 * API 베이스 클래스
 * - 싱글턴 axios 인스턴스를 공유하므로 서브클래스를 몇 개 만들어도 인스턴스는 1개
 */
class API {
  protected $axios: AxiosInstance = axiosInstance;
}

/**
 * UserAPI 예시
 * - API를 상속받아 도메인별 메서드를 작성한다
 */
class UserAPI extends API {
  async fetchUser(userId: number) {
    const res = await this.$axios.get(`/users/${userId}`);
    return res.data;
  }

  async fetchUserList() {
    const res = await this.$axios.get('/users');
    return res.data;
  }
}

export { axiosInstance };
export default UserAPI;
