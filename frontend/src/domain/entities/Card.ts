export enum Category {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FOURTH = 'FOURTH',
  FIFTH = 'FIFTH',
  SIXTH = 'SIXTH',
  SEVENTH = 'SEVENTH',
  DONE = 'DONE',
}

export interface Card {
  id: string;
  question: string;
  answer: string;
  tag?: string;
  category: Category;
}

export interface CardUserData {
  question: string;
  answer: string;
  tag?: string;
}
