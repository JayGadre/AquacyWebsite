import Link from 'next/link';
import { logout } from '@/actions/auth';
import styles from './AdminLayout.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar} aria-label="Sidebar">
        <div className={styles.logo}>
          <h2>Aquacy Admin</h2>
        </div>
        
        <nav className={styles.nav} aria-label="Admin Navigation">
          <Link href="/admin" className={styles.navLink}>
            Inquiries
          </Link>
          <Link href="/admin/settings" className={styles.navLink}>
            Email Settings
          </Link>
        </nav>
        
        <div className={styles.logoutWrapper}>
          <form action={logout}>
            <button type="submit" className={styles.logoutBtn}>
              Logout
            </button>
          </form>
        </div>
      </aside>
      
      <main id="main-content" className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
