import Stripe from 'stripe';
import getOfferById from 'services/offers/get';
import airDB from 'services/airtableClient';
import { config } from '@/config';

export const finalize = async (offerId: string) => {
  let offer = await getOfferById(offerId);
  const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
  });
  const checkout = await stripe.checkout.sessions.retrieve(offer.stripeCheckoutId);

  if (offer.stripeCheckoutStatus === 'succeeded' || checkout.payment_status === 'unpaid') {
    return { offer, checkout };
  }
  const paymentIntent = await stripe.paymentIntents.retrieve(checkout.payment_intent as string);

  if (paymentIntent.status === 'succeeded') {
    offer = await airDB('offers').update([
      {
        id: offer.airtableId,
        fields: {
          stripeCheckoutStatus: paymentIntent.status,
          highlightTill: new Date(Date.now() + 1000 * 60 * 60 * 24 * offer.highlightDuration) // next X days in future
        }
      }
    ]);

    return { offer: offer[0].fields, checkout };
  }
  return { offer, checkout };
};

export default finalize;
