export interface IEvent {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  slug: string;
  thumbnail: string;
  organizer: IUser;
  Ticket: ITicket[];
}

export interface IUser {
  username: string;
  avatar: string;
}

export interface ITicket {
  ticket_id: string;
  type: string;
  price: number;
  seats: number;
  createdAt: string;
  updatedAt: string;
  event_id: number;
  lastOrder: string;
}
