export default interface CreateDocument {
  name: string;
  reviewerId: number | null;
  document: any;
}