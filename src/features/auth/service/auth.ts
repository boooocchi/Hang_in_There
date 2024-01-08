import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import prisma from '@/lib/prisma';

type SignupPropsType = {
  email: string;
  password: string;
  userName: string;
};

export const signupHandler = async ({ email, password, userName }: SignupPropsType) => {
  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      userName,
      password: hashedPassword,
    },
  });

  // Sign the JWT token with the user's ID
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  // You should return user and token instead of trying to use `res` here
  // because this function is not middleware and does not have access to the response object.
  return { user, token };
};
