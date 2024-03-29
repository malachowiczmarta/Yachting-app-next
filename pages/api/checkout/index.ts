import { NextApiRequest, NextApiResponse } from 'next';
import createCheckout from 'services/checkout/create';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      try {
        const orderItem = req.body;
        console.log('orderItem', orderItem);
        const checkout = await createCheckout(orderItem);

        res.status(200).json({ status: 'created', checkout });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
