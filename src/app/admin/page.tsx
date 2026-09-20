import fs from 'fs';
import path from 'path';
import styles from './Dashboard.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Aquacy India',
  robots: {
    index: false,
    follow: false,
  },
};

interface Inquiry {
  id: string;
  date: string;
  name: string;
  email: string;
  mobile: string;
  product: string;
  requirement: string;
}

export default function AdminDashboard() {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const filePath = path.join(dataDir, 'inquiries.json');
  
  let inquiries: Inquiry[] = [];
  
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      inquiries = JSON.parse(fileData);
      
      // Sort newest first
      inquiries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  } catch (error) {
    console.error('Error reading inquiries:', error);
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Inquiries</h1>
        <p className={styles.subtitle}>View all leads collected from the website.</p>
      </header>

      {inquiries.length === 0 ? (
        <div className={styles.emptyState}>
          No inquiries received yet.
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Product</th>
                <th>Requirement</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>{new Date(inq.date).toLocaleDateString()}</td>
                  <td><strong>{inq.name}</strong></td>
                  <td>
                    <div>{inq.email}</div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{inq.mobile}</div>
                  </td>
                  <td><span className={styles.tag}>{inq.product}</span></td>
                  <td><p className={styles.requirement}>{inq.requirement}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
