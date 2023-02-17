import getAllProducts from 'services/products/getAll';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      try {
        const products = await getAllProducts();

        res.status(200).json({ products });
      } catch (error) {
        res.status(422).json({ products: [] });
      }
      break;
    }
    default:
      res.status(400);
  }
};
