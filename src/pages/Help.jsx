import React from 'react';
import Layout from '../layouts/Layout';

const Help = () => (
  <Layout title="Help & Instructions">
    <div style={{ maxWidth: 700, margin: '40px auto', background: 'var(--bg-card)', borderRadius: 16, boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)', padding: 32, color: 'var(--text-primary)' }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>Help & Instructions</h1>
      <h2 style={{ fontWeight: 600, fontSize: 20, marginTop: 24 }}>1. Adding & Editing Transactions</h2>
      <p>Go to the Transactions page. Use the <b>Add Transaction</b> button to add a new transaction. You can edit or delete any transaction using the action buttons in the table.</p>
      <h2 style={{ fontWeight: 600, fontSize: 20, marginTop: 24 }}>2. Managing Cards</h2>
      <p>On the Dashboard, click <b>Edit Card</b> to update your card details. You can toggle between cards, edit their info, and save changes. Card data is securely stored in your browser.</p>
      <h2 style={{ fontWeight: 600, fontSize: 20, marginTop: 24 }}>3. Setting Goals</h2>
      <p>Navigate to the Goals page to add, edit, or delete your financial goals. Progress is tracked automatically as you update your goal values.</p>
      <h2 style={{ fontWeight: 600, fontSize: 20, marginTop: 24 }}>4. Dashboard Overview</h2>
      <p>The Dashboard gives you a summary of your balance, spending, savings, and recent transactions. You can also see your goals progress and manage your cards here.</p>
      <h2 style={{ fontWeight: 600, fontSize: 20, marginTop: 24 }}>5. Theme & Settings</h2>
      <p>Switch between light and dark mode using the settings. Your preference is saved automatically.</p>
      <h2 style={{ fontWeight: 600, fontSize: 20, marginTop: 24 }}>6. Data Persistence</h2>
      <p>All your data is stored locally in your browser. Logging out will clear all data. For privacy, your info never leaves your device.</p>
      <div style={{ marginTop: 40, color: 'var(--text-secondary)', fontSize: 14, textAlign: 'center' }}>
        Need more help? Contact support or check the documentation.
      </div>
    </div>
  </Layout>
);

export default Help; 