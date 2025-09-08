"use server";

import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface SessionData {
  isLoggedIn?: boolean;
}

export const handleSignIn = async (formData: FormData) => {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (email !== "admin@gmail.com" || password !== "admin") {
    return redirect("/login");
  }

  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.isLoggedIn = true;
  await session.save();

  return redirect("/admin");
};

export const handleSignOut = async () => {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.destroy();
  return redirect("/login");
};
