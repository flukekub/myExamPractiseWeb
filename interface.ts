export interface Exam {
  _id: string;
  name: string;
  imageData: { type: string; data: number[] };
  imageType: string;
  answerImageData: { type: string; data: number[] };
  answerImageType: string;
  answer: string;
  subject: string;
  type: string;
  choices: string;
  difficulty: string;
}
export interface Score {
  score: number;
  total: number;
  type: string;
  subject: string;
  createdAt: string;
}

export interface Subject {
  _id: string;
  title: string;
  description: string;
}

export interface Pagination {
  next?: {
    limit: number;
    page: number;
  };
  prev?:{
    limit: number;
    page: number;
  };
}

export const defaultPagination: Pagination = {
  next: undefined,
  prev: undefined,
};