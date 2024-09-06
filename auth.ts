import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password.");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await getUserFromDb(email, hashedPassword);

        if (!user) {
          // If no user is found, throw an error
          throw new Error("User not found.");
        }

        // Return the user object
        return user;
      },
    }),
  ],
});