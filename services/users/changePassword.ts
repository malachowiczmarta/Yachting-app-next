import airDB from 'services/airtableClient';
import Joi from 'joi';
import crypto from 'crypto';

type Payload = {
  resetToken: string;
  password: string;
};

const schema = Joi.object({
  resetToken: Joi.string().required(),
  password: Joi.string().required()
});

const changePassword = async (payload: Payload) => {
  const { password, resetToken } = await schema.validateAsync(payload);

  let [user] = await airDB('users')
    .select({ filterByFormula: `resetToken="${resetToken}"` })
    .firstPage();

  if (!user) {
    throw new Error('wrong_token');
  }

  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, `sha512`)
    .toString(`hex`);

  // @ts-ignore
  user = await airDB('users').update([
    {
      id: user.id,
      fields: {
        resetToken: null,
        passwordHash,
        passwordSalt
      }
    }
  ]);

  return {
    // @ts-ignore
    id: user[0].id,
    // @ts-ignore
    email: user[0].fields.email,
    // @ts-ignore
    fullName: user[0].fields.fullName,
    // @ts-ignore
    role: user[0].fields.role
  };
};

export default changePassword;
