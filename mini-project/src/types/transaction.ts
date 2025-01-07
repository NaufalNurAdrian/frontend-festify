interface IEvent {
  title: string;
  thumbnail: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
}

interface ITicket {
  ticket_id: number;
  type: string;
  price: number;
  seats: number;
  event: IEvent;
}

interface IOrderDetail {
  qty: number;
  ticketId: {
    ticket_id: number;
    type: string;
    price: number;
    event: {
      title: string;
      thumbnail: string;
      startTime: string;
      endTime: string;
      location: string;
    };
  };
}

interface ITransaction {
  transaction_id: string;
  expiredAt: string;
  totalPrice: number;
  finalPrice: number;
  OrderDetail: IOrderDetail[];
  user: {
    coupon: {
      coupon_id: number;
      discountAmount: number;
      expiresAt: string;
      used: string;
    },
    points: number
  }; // Array of order details
}
