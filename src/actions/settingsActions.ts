'use server'

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const filePath = path.join(dataDir, 'settings.json');
  
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error reading settings:', error);
  }
  
  return { adminEmails: [] };
}

export async function saveSettings(formData: FormData) {
  const emailsString = formData.get('emails') as string;
  
  const adminEmails = emailsString
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length > 0);
    
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const filePath = path.join(dataDir, 'settings.json');
  
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, JSON.stringify({ adminEmails }, null, 2));
    
    // Invalidate the cache for settings page
    revalidatePath('/admin/settings');
    
    return { success: true };
  } catch (error) {
    console.error('Error saving settings:', error);
    return { success: false, error: 'Failed to save settings' };
  }
}
