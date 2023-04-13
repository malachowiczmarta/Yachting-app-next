export interface IOffer {
  id: string;
  title: string;
  category: string;
  description: string;
  mobile: string;
  email: string;
  price: number;
  location: string;
  fields?: string;
  status: string;
  users: string[];
  imageUrl: string;
  viewsCount: number;
}
export interface OfferResponse {
  fields: IOffer;
  createTime: string;
  id: string;
  users: string[];
}

export interface OffersResponse {
  offset: string | string[] | undefined;
  category: 'rent' | 'sale';
  records: Offer[];
}
