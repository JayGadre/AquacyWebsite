const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../../..');
const src = path.join(root, 'src');

function assert(condition, message) {
    if (!condition) {
        console.error('❌ FAIL:', message);
        process.exitCode = 1;
    } else {
        console.log('✅ PASS:', message);
    }
}

console.log('--- Empirical Verification for M5.2 Accessibility Enhancements ---\n');

// 1. Skip link and #main-content
const layoutTsx = fs.readFileSync(path.join(src, 'app/layout.tsx'), 'utf8');
assert(layoutTsx.includes('<a href="#main-content"'), 'Skip link targeting #main-content exists in layout.tsx');
assert(layoutTsx.includes('sr-only focus:not-sr-only'), 'Skip link has sr-only and focus classes');

const pageTsx = fs.readFileSync(path.join(src, 'app/page.tsx'), 'utf8');
assert(pageTsx.includes('id="main-content"'), 'Main page has element with id="main-content"');

// 2. ARIA labels on <nav> and <aside>
const sidebarTsx = fs.readFileSync(path.join(src, 'components/Sidebar/Sidebar.tsx'), 'utf8');
assert(sidebarTsx.includes('<aside') && sidebarTsx.includes('aria-label="Sidebar"'), 'Sidebar <aside> has aria-label="Sidebar"');
assert(sidebarTsx.includes('<nav') && sidebarTsx.includes('aria-label="Main Navigation"'), 'Sidebar <nav> has aria-label="Main Navigation"');

const navbarTsx = fs.readFileSync(path.join(src, 'components/Navbar/Navbar.tsx'), 'utf8');
assert(navbarTsx.includes('<nav aria-label="Top Navigation"'), 'Navbar <nav> has aria-label="Top Navigation"');

// 3. <dialog> usage for InquiryModal
const modalTsx = fs.readFileSync(path.join(src, 'components/InquiryModal/InquiryModal.tsx'), 'utf8');
assert(modalTsx.includes('<dialog'), 'InquiryModal uses <dialog> element');
assert(modalTsx.includes('dialogRef.current?.showModal()'), 'InquiryModal calls showModal() (not just show())');
assert(modalTsx.includes('dialogRef.current?.close()'), 'InquiryModal calls close()');

// 4. Escape listener in Sidebar
assert(sidebarTsx.includes("e.key === 'Escape'"), 'Sidebar handles Escape key');
assert(sidebarTsx.includes("document.addEventListener('keydown'"), 'Sidebar adds keydown event listener');

// 5. aria-hidden on icons
const footerTsx = fs.readFileSync(path.join(src, 'components/Footer/Footer.tsx'), 'utf8');
assert(footerTsx.includes('aria-hidden="true"'), 'Footer icons have aria-hidden="true"');
assert(modalTsx.includes('<svg aria-hidden="true"'), 'InquiryModal icons have aria-hidden="true"');

// 6. aria-describedby in settings form
const settingsTsx = fs.readFileSync(path.join(src, 'app/admin/settings/page.tsx'), 'utf8');
assert(settingsTsx.includes('aria-describedby='), 'Settings form uses aria-describedby');

const contactFormTsx = fs.readFileSync(path.join(src, 'components/ContactForm.tsx'), 'utf8');
assert(contactFormTsx.includes('aria-describedby='), 'ContactForm uses aria-describedby for errors');

console.log('\nVerification complete.');
