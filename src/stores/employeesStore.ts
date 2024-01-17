import { defineStore } from 'pinia';
import EmployeeService from '@/modules/employees/services/employeeService';
import type Employee from '@/modules/employees/interfaces/employee'
import type CreateEmployee from '@/modules/employees/interfaces/createEmployee'

interface IStore {
  isOpenModal: boolean;
  isOpenUpdateModal: boolean;
  isLoading: boolean;
  accessToken: string;
  tmpUpdateEmployeeId: number | null;
  employees: Employee[];
  employeesCreateForm: CreateEmployee;
  employeesUpdateForm: CreateEmployee;
}
export const useEmployeeStore = defineStore('employeeStore', {
  state: (): IStore => ({
    isOpenModal: false,
    isOpenUpdateModal: false,
    isLoading: false,
    accessToken: '',
    employees: [],
    employeesCreateForm: {
      fio: '',
      email: '',
      password: '',
      roles: []
    },
    tmpUpdateEmployeeId: null,
    employeesUpdateForm: {
      fio: '',
      email: '',
      password: '',
      roles: []
    }
  }),
  getters: {
    bannedEmployees: (state: IStore) => {
      return [...state.employees].filter((e: Employee) => e.banned == true);
    },
    unbannedEmployees: (state: IStore) => {
      return [...state.employees].filter((e: Employee) => e.banned == false);
    }
  },
  actions: {
    openModal() {
      this.isOpenModal = true;
    },
    closeModal() {
      this.isOpenModal = false;
    },
    openUpdateModal() {
      this.isOpenUpdateModal = true;
    },
    closeUpdateModal() {
      this.isOpenUpdateModal = false;
    },
    async create() {
      return EmployeeService.create(this.employeesCreateForm)
        .then((response) => {
          this.employees.push(response.data as Employee);
          return Promise.resolve(response);
        }).catch((error) => {
          return Promise.reject(error);
        });
    },
    async update() {
      if(this.tmpUpdateEmployeeId !== null) {
        return EmployeeService.update(this.tmpUpdateEmployeeId, this.employeesUpdateForm)
          .then((response) => {
            const employee = response.data as Employee;
            this.updateEmployeeById(employee.id, employee);
            return Promise.resolve(response);
          }).catch((error) => {
            return Promise.reject(error);
          });
      }
    },
    async getAll() {
      return EmployeeService.getAll()
        .then((response) => {
          this.employees = response.data as Employee[];
        }).catch((error) => {
          return Promise.reject(error);
        });
    },
    async block(id: number) {
      return await EmployeeService.block(id)
        .then((response) => {
          this.changeBannedForEmployee(id, true);
        }).catch((error) => {
          return Promise.reject(error);
        });
    },
    async unblock(id: number) {
      return await EmployeeService.unblock(id)
        .then((response) => {
          this.changeBannedForEmployee(id, false);
        }).catch((error) => {
          return Promise.reject(error);
        });
    },
    changeBannedForEmployee(id: number, banned: boolean): void {
      const indexEmployee: number = this.employees.findIndex((e: Employee) => e.id === id);

      if (indexEmployee !== -1) {
        this.employees[indexEmployee].banned = banned;
      }
    },
    updateEmployeeById(id: number, employee: Employee) {
      const indexEmployee: number = this.employees.findIndex((e: Employee) => e.id === id);

      if (indexEmployee !== -1) {
        this.employees[indexEmployee] = employee;
      }
    }
  }
})
