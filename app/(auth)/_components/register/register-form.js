'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { RegisterUser } from '@/lib/actions/user/user-register';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    // Show loading notification
    const loadingToast = toast.loading('Registering...');

    try {
      await RegisterUser({ name, email, password });
      toast.success('Registration successful!', { id: loadingToast });
      router.push('/login');
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error('Registration failed. Please try again.', { id: loadingToast });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } })}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === watch('password') || 'Passwords do not match'
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white rounded-lg p-2.5 mt-4"
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>

      <p className="mt-4 text-sm">
        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a>
      </p>
      <Toaster />
    </form>
  );
};

export default RegisterForm;
