import Stripe from 'stripe';
import getOfferById from 'services/offers/get';
import getProduct from 'services/products/get';
import airDB from 'services/airtableClient';
import Joi from 'joi';
import { config } from '@/config';

const schema = Joi.object({
  id: Joi.required(),
  offerId: Joi.number().greater(0).required(),
  quantity: Joi.number().greater(0).required()
});

interface IPayload {
  id: string;
  offerId: number;
  quantity: number;
}

export const createCheckout = async (payload: IPayload) => {
  const orderItem = await schema.validateAsync(payload);
  const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
  });
  const product = await getProduct(orderItem.id);
  const lineItems = [
    {
      price_data: {
        currency: product.priceCurrency,
        product_data: {
          name: product.name,
          metadata: {
            productId: product.id,
            duration: product.duration
          }
        },
        unit_amount: product.priceCents
      },
      quantity: orderItem.quantity
    }
  ];

  const paymentObject = {
    payment_method_types: ['card', 'p24'] as any,
    payment_intent_data: {
      metadata: {
        offerId: orderItem.offerId
      }
    },
    line_items: lineItems,
    mode: 'payment' as any,
    success_url: `http://localhost:3000/offers/${orderItem.offerId}/paymentStatus`,
    cancel_url: `http://localhost:3000/offers/${orderItem.offerId}/paymentStatus`
  };

  const session = await stripe.checkout.sessions.create(paymentObject);
  const offer = await getOfferById(orderItem.offerId);

  await airDB('offers').update([
    {
      id: offer.airtableId,
      fields: {
        stripeCheckoutId: session.id,
        stripeCheckoutStatus: session.payment_status,
        highlightDuration: product.duration
      }
    }
  ]);
  return session;
};

export default createCheckout;
