import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongodb";


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url, provider }) {
        const { createTransport } = await import("nodemailer");
        const transport = createTransport(provider.server as any);
        await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: "Sign in to OnlineExam",
          text: `Sign in to OnlineExam: ${url}`,
          html: `<p>Click the link to sign in:</p><p><a href="${url}">${url}</a></p>`,
        });
      },
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  secret: process.env.NEXTAUTH_SECRET,
});