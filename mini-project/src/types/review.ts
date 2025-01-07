export interface IFormReview {
  rating: number;
  review: string;
}

export interface IUserser {
  user_id: number;
  username: string;
}

export interface IReview {
  rating: number;
  review: string;
  createdAt: string;
  user: IUserser;
}
