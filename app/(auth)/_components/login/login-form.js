'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { signInCredentials } from '@/lib/actions/user/user-login';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signInCredentials({ email, password });
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error("Error during login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white rounded-lg p-2.5 mt-4"
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      <p className="mt-4 text-sm">
        Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register here</a>
      </p>
      <Toaster />
    </form>
  );
};

export default LoginForm;
