// ContactIcons.jsx
import React from 'react';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const ContactIcons = () => {
  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
      {/* WhatsApp */}
      <a
        href="https://wa.me/254795025076"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#25D366', fontSize: '2.5rem' }}
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Gmail */}
      <a
        href="mailto:jaybashee139@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#EA4335', fontSize: '2.5rem' }}
        title="Send Email"
      >
        <FaEnvelope />
      </a>
    </div>
  );
};

export default ContactIcons;