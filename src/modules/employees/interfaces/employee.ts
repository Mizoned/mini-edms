import type Role from '@/modules/roles/interfaces/role'

export default interface Employee {
  id: number;
  fio: string;
  email: string;
  roles: Role[];
  banned: boolean;
}