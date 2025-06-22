import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/libs/mongodb";

export const authOptions: AuthOptions = {
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
      // ✅ เพิ่ม custom sendVerificationRequest
      async sendVerificationRequest({ identifier, url, provider }) {
        const { createTransport } = await import("nodemailer");

        const transport = createTransport(provider.server);
        await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: "Sign in to YourApp",
          text: `Sign in to YourApp: ${url}`,
          html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #4CAF50;">Sign in to YourApp</h2>
            <p>Click the button below to sign in:</p>
            <a href="${url}" style="display: inline-block; padding: 10px 20px; margin-top: 10px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
              Sign In
            </a>
            <p style="margin-top: 20px;">If the button doesn't work, copy and paste the following link into your browser:</p>
            <p style="word-break: break-word;">${url}</p>
          </div>`,
        });
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signup", 
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
