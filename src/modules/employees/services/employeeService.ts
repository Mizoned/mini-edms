import $api from '@/api';
import type CreateEmployee from '../interfaces/createEmployee';

export default class EmployeeService {
  static async create(employee: CreateEmployee) {
    return $api.post('/users', employee);
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