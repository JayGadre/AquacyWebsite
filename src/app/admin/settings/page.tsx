'use client'

import { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '@/actions/settingsActions';
import styles from './Settings.module.css';

export default function SettingsPage() {
  const [emails, setEmails] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      const settings = await getSettings();
      if (settings && settings.adminEmails) {
        setEmails(settings.adminEmails.join(', '));
      }
      setIsLoading(false);
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await saveSettings(formData);
    
    if (result.success) {
      setStatus({ type: 'success', message: 'Settings saved successfully!' });
    } else {
      setStatus({ type: 'error', message: result.error || 'Failed to save settings' });
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading settings...</div>;
  }

  return (
    <div className={styles.settings}>
      <header className={styles.header}>
        <h1 className={styles.title}>Email Settings</h1>
        <p className={styles.subtitle}>Configure who receives the daily inquiry reports.</p>
      </header>

      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="emails">Admin Email Addresses</label>
            <p id="emails-help" className={styles.helpText}>Enter email addresses separated by commas. These addresses will receive the daily digest of new inquiries.</p>
            <textarea 
              id="emails" 
              name="emails" 
              aria-describedby="emails-help"
              rows={4} 
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="admin@example.com, sales@example.com"
            />
          </div>

          {status && (
            <div className={`${styles.alert} ${status.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
              {status.message}
            </div>
          )}

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn}>
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
