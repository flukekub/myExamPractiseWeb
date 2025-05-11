


export interface Exam {
    _id: string;
    name: string;
    imageUrl: string;
    answer: string;
    subject: string;
    type: string;
    difficulty: string;
  }

export interface Score {
    score: number;
    total: number;
    type: string;
    subject: string;
    createdAt: string;
}