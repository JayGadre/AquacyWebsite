'use server'

import fs from 'fs';
import path from 'path';

export async function submitInquiry(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const mobile = formData.get('mobile');
  const requirement = formData.get('requirement');
  const product = formData.get('product');
  
  const inquiry = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    name,
    email,
    mobile,
    product,
    requirement
  };
  
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const filePath = path.join(dataDir, 'inquiries.json');
  
  let inquiries = [];
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      inquiries = JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error reading inquiries:', error);
  }
  
  inquiries.push(inquiry);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2));
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return { success: false };
  }
  
  return { success: true };
}
