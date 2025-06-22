import { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from "@/lib/prisma";
import jwt from 'jsonwebtoken';
import { hashPassword } from "@/lib/auth";

function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) return `+84${cleaned.slice(1)}`;
  return phone;
}

const options: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { phone, password } = credentials as {
          phone: string;
          password: string;
        };

        const normalizedPhone = normalizePhone(phone);
        console.log("[AUTH] Input phone:", phone);
        console.log("[AUTH] Normalized phone:", normalizedPhone);

        const user = await prisma.users.findFirst({
          where: { phone: normalizedPhone },
        });

        console.log("[AUTH] Found user:", user?.id || null);

        if (!user) throw new Error("Số điện thoại hoặc mật khẩu không đúng");
        if (!user.authentication) throw new Error("Thiếu dữ liệu đăng nhập");

        const { password: storedPassword, salt } = user.authentication;
        const hashedInputPassword = hashPassword(salt, password);

        console.log("[AUTH] Hash input vs stored:", hashedInputPassword, storedPassword);

        if (hashedInputPassword !== storedPassword) {
          throw new Error("Số điện thoại hoặc mật khẩu không đúng");
        }

        return {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          phone: user.phone,
          coinPoint: user.coinPoint,
          questLog: user.questLog,
        };
      },
    }),
  ],

  callbacks: {
    async signIn(params) {
      console.log('[AUTH] signIn callback params:', params);
      if (!params?.user?.id || parseInt(params?.user?.id) === -1) {
        const payload = jwt.sign(
          { email: params?.user?.email, name: params?.user?.name },
          process.env.NEXT_PUBLIC_JWT_SECRET,
          { expiresIn: '1h' }
        );
        return `/auth/register/?payload=${payload}`;
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      console.log('[AUTH] jwt callback token:', token);
      console.log('[AUTH] jwt callback user:', user);

      if (trigger === 'update' && session?.avatar) {
        token.avatar = session.avatar;
        return { ...token, ...session.user };
      }

      if (user) {
        token.id = user.id;
        token.coinPoint = user.coinPoint;
        token.avatar = user.avatar;
        token.username = user.username;
        token.phone = user.phone;
        token.questLog = user.questLog;
      }

      return token;
    },

    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.avatar = token.avatar as string;
        session.user.phone = token.phone as string;
        session.user.coinPoint = token.coinPoint as number;
        session.user.questLog = token.questLog as any[];
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
  },
};

export default options;
