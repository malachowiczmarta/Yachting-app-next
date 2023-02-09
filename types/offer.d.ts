import { IOffer } from '@/pages/offers';

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
