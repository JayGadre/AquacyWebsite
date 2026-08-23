'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const password = formData.get('password');
  
  // Hardcoded password for the demo/internal tool
  if (password === 'Jay40037419$$') {
    (await cookies()).set('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    redirect('/admin');
  }
  
  return { error: 'Invalid password' };
}

export async function logout() {
  (await cookies()).delete('admin_token');
  redirect('/admin/login');
}
