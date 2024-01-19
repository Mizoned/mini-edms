import $api from '@/api';
import type CreateDocument from '@/modules/documents/interfaces/createDocument'

export default class DocumentService {
  static async create(document: any) {
    return $api.post('/documents', document);
  }

  static async update(id: number, document: CreateDocument) {
    return $api.put(`/documents/${id}`, document);
  }

  static async getUserDocuments(id: number) {
    return $api.get(`/documents/users/${id}`);
  }

  static async getUserDocumentsReviewer(id: number) {
    return $api.get(`/documents/reviewers/${id}`);
  }

  static async acceptDocument(id: number) {
    return $api.put(`/documents/accept/${id}`);
  }

  static async rejectDocument(id: number) {
    return $api.put(`/documents/reject/${id}`);
  }

  static async getAll() {
    return $api.get('/documents');
  }

  static async getById(id: number) {
    return $api.get(`/documents/${id}`);
  }
}