# Budget Tracker

A modern, premium, and halal-friendly budget tracking web app built with React and Vite.

## ✨ Features

- **Modern, Glassy UI:** Beautiful glassmorphism, gradients, and soft shadows throughout.
- **Mobile-First Experience:** Fully responsive, with sticky action buttons and touch feedback.
- **Real-Time Data:** All dashboards, analytics, and budgets update instantly from your data.
- **Sticky Action Buttons:** Key actions (Add, Quick Add, Edit) are always accessible on mobile.
- **SweetAlert2 Confirmations:** All destructive actions (delete, logout) use branded, modern confirmation dialogs.
- **Theme-Based Branding:** All dialogs and UI elements use your primary and accent colors.
- **Halal Finance Focus:** Includes Zakat calculator, halal practices, and avoids haram features.
- **Local Storage Persistence:** All data is stored locally for privacy and speed.
- **Accessibility:** Keyboard navigation, focus states, and accessible tooltips.
- **No Real Payment Processing:** Card UI is for demo/visual purposes only.

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the app:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at `http://localhost:5173` by default.

3. **(Optional) Enable HTTPS for local dev:**
   - For payment/card UI, browsers may warn if not using HTTPS. See the README section below for HTTPS setup using [mkcert](https://github.com/FiloSottile/mkcert).

## 🛠️ Customization

- **Theme Colors:** Edit `src/index.css` to change primary/accent colors.
- **Branding:** Favicon uses a 💸 emoji by default. Replace in `index.html` as desired.
- **SweetAlert2:** All confirmations use your theme colors for a consistent look.
- **Sample Data:** The app seeds with halal-friendly sample data if local storage is empty.

## 📱 Mobile Experience

- Sticky action bars for all major actions on mobile.
- Responsive tables collapse to cards/lists.
- Sidebar is easy to open/close on mobile.

## 🔒 HTTPS for Local Dev (Optional)

If you want to avoid browser warnings for card/payment UI:

1. Install [mkcert](https://github.com/FiloSottile/mkcert) and generate a local certificate.
2. Update `vite.config.js` to use the generated cert and key.
3. Restart the dev server and use `https://localhost:5173`.

## 🧩 Main Pages

- **Dashboard:** Overview, cards, quick add, recent transactions, goals progress.
- **Transactions:** Add, edit, delete, and view all transactions.
- **Budget:** Real-time budget tracking by category and period.
- **Goals:** Set, track, and complete financial goals.
- **Analytics:** Visualize your spending, income, and trends.
- **Settings:** Theme, notifications, data import/export.
- **Halal Guide & Zakat Calculator:** Islamic finance tools and education.
- **Help:** Usage instructions and tips.

## 📝 License

MIT
