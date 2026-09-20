'use client'

import { useState } from 'react';
import { login } from '@/actions/auth';
import styles from './Login.module.css';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Admin Login</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              aria-invalid={!!error}
              aria-describedby={error ? "login-error" : undefined}
              placeholder="Enter admin password"
            />
          </div>
          
          {error && <p id="login-error" className={styles.error}>{error}</p>}
          
          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
