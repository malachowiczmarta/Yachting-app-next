import airDB from 'services/airtableClient';
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().valid('rent', 'sale').required(),
  mobile: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  imageUrl: Joi.string()
});

const schemaViews = Joi.object({
  viewsCount: Joi.number().greater(0).required()
});

const updateOffer = async (airtableId: string, payload: any) => {
  const validatedOffer = await schema.validateAsync(payload);
  const offer = await airDB('offers').update([
    {
      id: airtableId,
      fields: { ...validatedOffer }
    }
  ]);

  return offer;
};

export const updateViews = async (airtableId: string, payload: any) => {
  const validatedOffer = await schemaViews.validateAsync(payload);
  const offer = await airDB('offers').update([
    {
      id: airtableId,
      fields: { ...validatedOffer }
    }
  ]);

  return offer;
};

export default updateOffer;
