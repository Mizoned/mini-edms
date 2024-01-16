import $api from '@/api';

export default class AuthService {
  static async signIn(email: string, password: string) {
    return $api.post('/auth/sign-in', { email, password });
  }
}