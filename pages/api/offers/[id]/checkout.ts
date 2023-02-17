import finalizeCheckout from 'services/checkout/finalize';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PUT': {
      try {
        const { checkout, offer } = await finalizeCheckout(req.query.id as string);

        res.status(200).json({ checkout, offer });
      } catch (error) {
        res.status(422).json({ checkout: null, offer: null, error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
