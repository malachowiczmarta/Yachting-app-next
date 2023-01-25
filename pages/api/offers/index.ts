import getRecentOffers from 'services/offers/getRecent';
import createOffer from 'services/offers/create';

interface Req {
  method: string;
  body: any;
}
interface Res {
  status: (code: number) => any;
  json: (data: any) => any;
}

export default async (req: Req, res: Res) => {
  switch (req.method) {
    case 'GET': {
      const offers = await getRecentOffers(4);
      res.status(200).json(offers);

      break;
    }
    case 'POST': {
      const payload = req.body;
      console.log('payload on backend', payload);
      const offer = await createOffer(payload);
      res.status(200).json({ status: 'created', offer });

      break;
    }
    default:
      res.status(400);
  }
};
