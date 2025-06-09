# UCAS Comments App

This Next.js application allows staff to manage UCAS comments for students. It features:

- Google single sign-on using **NextAuth.js**.
- Data storage in **Firebase** Firestore.
- CSV import for large lists of students.
- Search interface to view student subjects and comments.
- Tailwind CSS styling for a simple UI.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the Firebase and Google OAuth credentials.

## Development

```bash
npm install
npm run dev
```

The app will run on `http://localhost:3000`.
