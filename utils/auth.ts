import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials"


export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  

  providers: [
    CredentialsProvider({
      //@ts-ignore
      async authorize(credentialss: {
        email: string;
        password: string;
      }) {
          const response = await fetch(
            process.env.BACKEND_URL + "api/v1/auth/login",
            {
              method: 'POST',
              body: JSON.stringify(credentialss),
              headers: {
                "Content-Type": "application/json"
              }
            }
          );

          const user = await response.json()
          console.log(user, "user");

          if (user) {
            return user;
          } else {
            return null;

          }

        
      },
    }),
  ],

  secret: "khjvysgdjhfaidfidgi9ergiehfugf",

  callbacks: {
    async jwt ({ token, user }) {
      if (user) {
        token.user = user.data;
        token.accessToken = user.data.auth;
        // token.refreshToken = user.refresh;
      }

      console.log(user, "user-packer");
      console.log(token, "user-pac");

      return token;
    },
   async session({session, token}){
    if(token){
      session.user.accessToken = token.accessToken as string;
    }
    return session;
   }
  },
  pages: {
    signIn: "/signin",
    error: "/signin"
  }
}