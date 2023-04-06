import cloudinary from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

// @ts-ignore
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const timestamp = Number(new Date());
  const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_KEY;
  // @ts-ignore
  const sig = await cloudinary.utils.api_sign_request({ timestamp }, process.env.CLOUDINARY_SECRET);

  res.status(200).json({ timestamp, sig, api_key });
};
