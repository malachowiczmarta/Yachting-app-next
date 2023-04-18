import airDB from 'services/airtableClient';
import Joi from 'joi';
import { IOffer } from '@/types/offer';

const schema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().valid('rent', 'sale').required(),
  mobile: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.number().greater(0).required()
});

const create = async (payload: IOffer, userId: string) => {
  const validatedOffer = await schema.validateAsync(payload);
  const offer = await airDB('offers').create([
    {
      fields: {
        ...payload,
        users: [userId],
        price: Number(payload.price),
        status: 'inactive'
      }
    }
  ]);

  return offer;
};

export default create;
