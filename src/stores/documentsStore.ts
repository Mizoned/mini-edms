import { defineStore } from 'pinia';
import DocumentService from '@/modules/documents/services/documentService'
import type Document from '@/modules/documents/interfaces/document'
import { useEmployeeStore } from '@/stores/employeesStore'
import { useAuthStore } from '@/stores/authStore'
import type CreateDocument from '@/modules/documents/interfaces/createDocument'
import type Employee from '@/modules/employees/interfaces/employee'
import EmployeeService from '@/service/employeeService'

interface IStore {
  authStore: any;
  isOpenModal: boolean;
  isOpenUpdateModal: boolean;
  isLoading: boolean;
  reviewers: Employee[],
  documents: Document[];
  userDocuments: Document[];
  reviewersDocuments: Document[];
  createForm: CreateDocument
}


export const useDocumentsStore = defineStore('documentStore', {
  state: (): IStore => ({
    authStore: useAuthStore(),
    isOpenModal: false,
    isOpenUpdateModal: false,
    reviewers: [],
    isLoading: false,
    documents: [],
    userDocuments: [],
    reviewersDocuments: [],
    createForm: {
      name: '',
      reviewerId: null,
      document: null
    }
  }),
  getters: {

  },
  actions: {
    openModal() {
      this.isOpenModal = true;
    },
    closeModal() {
      this.isOpenModal = false;
    },
    async acceptDocument(id: number) {
      return DocumentService.acceptDocument(id)
        .then((response) => {
          this.reviewersDocuments = [...this.reviewersDocuments].filter((d) => d.id !== id);
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async rejectDocument(id: number) {
      return DocumentService.rejectDocument(id)
        .then((response) => {
          this.reviewersDocuments = [...this.reviewersDocuments].filter((d) => d.id !== id);
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getUserDocuments() {
      return DocumentService.getUserDocuments(this.authStore.user.id)
        .then((response) => {
          this.userDocuments = response.data;
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getUserDocumentsReviewer() {
      return DocumentService.getUserDocumentsReviewer(this.authStore.user.id)
        .then((response) => {
          this.reviewersDocuments = response.data;
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getAll() {
      return DocumentService.getAll()
        .then((response) => {
          this.documents = response.data;
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getEmployees() {
      return EmployeeService.getAll()
        .then((response) => {
          this.reviewers = response.data.filter((r: Employee) => r.banned === false);
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async create() {
      const formData = new FormData();
      formData.append('name', this.createForm.name);
      formData.append('reviewerId', String(this.createForm.reviewerId));
      formData.append('document', this.createForm.document);

      return DocumentService.create(formData)
        .then((response) => {
          this.userDocuments.unshift(response.data);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
