import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5' }}>
      <p>&copy; 2025 MediReach. All rights reserved.</p>

      <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {/* WhatsApp */}
        <a
          href="https://wa.me/254795025076"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#25D366', fontSize: '1.8rem' }}
          title="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>

        {/* Gmail */}
        <a
          href="mailto:jaybashee139@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#EA4335', fontSize: '1.8rem' }}
          title="Send Email"
        >
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}