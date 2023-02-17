import { config } from '@/config';
import Stripe from 'stripe';

export const getCheckout = async (stripeCheckoutId: string) => {
  const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
  });
  const session = await stripe.checkout.sessions.retrieve(stripeCheckoutId);
  return session;
};

export default getCheckout;
