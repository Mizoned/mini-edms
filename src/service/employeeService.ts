import $api from '@/api';

export default class EmployeeService {
  static async create(fio: string, email: string, password: string, roles: string[], ) {
    return $api.post('/users', { fio, email, password, roles });
  }

  static async getAll() {
    return $api.get('/users');
  }

  static async block(id: number) {
    return $api.post(`/users/block/${id}`);
  }

  static async unblock(id: number) {
    return $api.post(`/users/unblock/${id}`);
  }
}