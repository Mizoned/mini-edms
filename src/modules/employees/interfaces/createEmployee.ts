import type Role from '@/modules/roles/interfaces/role'
export default interface CreateEmployee {
  fio: string;
  email: string;
  password: string;
  roles: string[];
}