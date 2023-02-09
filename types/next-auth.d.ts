import NextAuth from 'next-auth';
import 'next-auth/jwt';
import { UserRole } from './user';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: {
      role: UserRole;
      email: string;
      role: unknown;
      id: string;
    };
  }
  interface JWT {
    role: UserRole;
    name: string;
    id: string;
  }
  interface User {
    fullName: string;
    role: UserRole;
  }
}
