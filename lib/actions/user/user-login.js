'use server';
import { signIn } from '@/auth'; // Ensure you're importing from 'next-auth/react'

export const signInCredentials = async (formData) => {
  const { email, password } = formData;
  try {
    const result = await signIn("credentials", {
      email,
      password,
    });

    if (result?.error) {
      throw new Error(result.error); // Throw error if sign in fails
    }

    return result;
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error; // Re-throw error for handling in the LoginForm
  }
};
