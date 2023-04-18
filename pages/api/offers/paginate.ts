import paginateOffers from 'services/offers/paginate';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IOffer } from '@/types/offer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const { offset, category } = req.query;
      const offers = await paginateOffers(offset, category);
      res.status(200).json({
        offers: offers.records.map((offer: IOffer) => offer.fields),
        offset: offers.offset
      });

      break;
    }
    default:
      res.status(400);
  }
};
