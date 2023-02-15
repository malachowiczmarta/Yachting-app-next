import toggleActive from 'services/offers/toggleActive';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PUT': {
      try {
        const session = await getSession({ req });
        if (!session || session?.user?.role !== 'admin') {
          return res.status(401).json({ error: 'not_authorized' });
        }
        const offer = await toggleActive(req.query.id as string);
        res.status(200).json({ status: 'updated', offer });
      } catch (error) {
        res.status(422).json({ status: 'not_updated', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
