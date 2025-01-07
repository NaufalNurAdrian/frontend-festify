export interface IOrderDetail {
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

export interface ITransaction {
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
    };
  };
}
