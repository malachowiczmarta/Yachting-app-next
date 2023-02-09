import createUser from 'services/users/create';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      try {
        const payload = req.body;
        const user = await createUser(payload);

        res.status(200).json({ status: 'created', user });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error: (error as Error).message });
      }
      break;
    }
    default:
      res.status(400);
  }
};
