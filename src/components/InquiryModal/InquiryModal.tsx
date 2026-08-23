"use client";

import { useState } from 'react';
import styles from './InquiryModal.module.css';

interface InquiryModalProps {
  productName: string;
  buttonText?: string;
  buttonClassName?: string;
}

export default function InquiryModal({ productName, buttonText = "Send Inquiry", buttonClassName }: InquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    setIsSubmitted(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Extract data from the form
    const formData = new FormData(e.currentTarget);
    formData.append('product', productName);
    
    // Import and call the server action
    const { submitInquiry } = await import('@/actions/submitInquiry');
    await submitInquiry(formData);
    
    setIsSubmitted(true);
    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  return (
    <>
      <button onClick={openModal} className={buttonClassName || styles.inquiryBtn}>
        {buttonText}
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal}>
              &times;
            </button>
            
            {isSubmitted ? (
              <div className={styles.successMessage}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h2>Thank You!</h2>
                <p>Your inquiry for the <strong>{productName}</strong> has been sent successfully. We will get back to you shortly.</p>
              </div>
            ) : (
              <>
                <h2 className={styles.modalTitle}>Request a Quote</h2>
                <p className={styles.modalSubtitle}>Inquiring about: <strong>{productName}</strong></p>
                
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required placeholder="John Doe" />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" required placeholder="john@example.com" />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="mobile">Mobile Number</label>
                      <input type="tel" id="mobile" name="mobile" required placeholder="+1 234 567 8900" />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="requirement">Your Requirement</label>
                    <textarea 
                      id="requirement" 
                      name="requirement"
                      rows={4} 
                      required 
                      placeholder={`Please tell us about your requirements for the ${productName}...`}
                    ></textarea>
                  </div>
                  
                  <button type="submit" className={styles.submitBtn}>
                    Send Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
