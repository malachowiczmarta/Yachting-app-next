import Stripe from 'stripe';
import { finalize } from 'services/checkout/finalize';
import { NextApiRequest, NextApiResponse } from 'next';

async function buffer(readable: NextApiRequest) {
  const chunks = [];
  for await (const chunk of readable) {
    // @ts-ignore

    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2022-11-15'
  });
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET ?? '');
    if (event.type === 'payment_intent.succeeded') {
      // @ts-ignore
      const offerId = event.data.object.metadata.offerId;
      await finalize(offerId);
      console.log(`event processed...`);
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error`);
  }
};
