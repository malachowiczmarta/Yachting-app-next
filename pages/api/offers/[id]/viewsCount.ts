import { updateViews } from 'services/offers/update';
import getOfferById from 'services/offers/get';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let offer = await getOfferById(req.query.id as string);

  switch (req.method) {
    case 'PUT': {
      try {
        offer = await updateViews(offer.airtableId, { viewsCount: offer.viewsCount + 1 });
        res.status(200).json({ status: 'updated' });
      } catch (error) {
        res.status(422).json({ status: 'not_updated', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
