import NextAuth from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      //   role: 'admin' | 'regular';
      //   id: string;
      role: unknown;
      id: unknown;
    };
  }
  interface JWT {
    role: 'admin' | 'regular';
    name: string;
    id: string;
  }
  interface User {
    fullName: string;
    role: 'admin' | 'regular';
  }
}
