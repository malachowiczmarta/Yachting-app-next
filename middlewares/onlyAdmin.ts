import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const onlyAdmin = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session || session.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Please log in as admin to get access.'
      });
    }

    return handler(req, res);
  };
};

export default onlyAdmin;
