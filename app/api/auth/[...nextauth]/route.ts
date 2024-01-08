import { authOptions } from "@/utils/auth";
import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
  interface Session {
    user: User & {
      accessToken: string;
      role: string
    }
  }
  interface User{
    data: {
      auth: string
    }
  }
}



const handler = NextAuth(authOptions);

// const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}



