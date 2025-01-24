"use server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from 'next/dist/server/api-utils'
import { NextApiRequest, NextApiResponse } from 'next'


export const signUp = async (params: AuthCredentials, req: NextApiRequest, res: NextApiResponse) => {
  const { fullname, email, password, universityId, universityCard } = params;

 

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length > 0) {
    return { success: false, message: "User already exists" };
  }
  const hashedPassword = await hash(password, 12);

  try {
    await db.insert(users).values({
      fullname,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    await signInWithCredentials({ email, password } );

    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occured" };
  }
};

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
  req: NextApiRequest, 
  res: NextApiResponse 
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if(!success){
  
   return redirect(res, 302, "/too-fast");
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, message: result.error };
    }

    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occured" };
  }
};
