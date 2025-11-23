# Paycort - AI Tax Integration App

A smart AI tool that helps Nigerians see, track, and plan their taxes in real time powered by clarity, not confusion.

## 🚀 Features

- **Responsive Landing Page** - Optimized for all devices (320px to ultra-wide)
- **Waitlist Management** - Firebase integration for collecting early access signups
- **Smooth Animations** - Intersection Observer powered scroll animations
- **Form Validation** - Email duplicate checking and error handling
- **Modern UI/UX** - Glassmorphism navbar, smooth transitions, and interactive elements

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Firebase Firestore
- **Fonts:** Google Fonts (Poppins, Playfair Display)
- **Animations:** Custom CSS keyframes

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayasemota/paycort.git
   cd paycort
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Copy your Firebase config

4. **Create `.env.local` file**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Set up Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /paycortWaitlist/{document} {
         allow read: if false;
         allow create: if true;
         allow update, delete: if false;
       }
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /taxes/{taxId} {
         allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
       }
     }
   }
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open [http://localhost:3000](http://localhost:3000)**

## 🎨 Features Breakdown

### Landing Page
- Hero section with animated text
- About Us section with scroll animations
- How It Works cards with hover effects
- Waitlist form with Firebase integration
- Smooth scroll navigation

### Firebase Services
- **waitlistService** - Add, get, and check emails
- **userService** - User CRUD operations (future use)
- **taxService** - Tax record management (future use)

## 🔐 Security

- Firestore security rules implemented
- Email validation and duplicate checking
- Environment variables for sensitive data
- Input sanitization and validation

## 📱 Responsive Design

Fully responsive across all devices:
- Mobile: 320px+
- Tablet: 640px+
- Desktop: 1024px+
- Ultra-wide: 1536px+

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables (Vercel)
Add all `NEXT_PUBLIC_FIREBASE_*` variables in:
Settings → Environment Variables

## 📄 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎯 Roadmap

- [ ] Add authentication (Firebase Auth)
- [ ] User dashboard
- [ ] Tax calculation features
- [ ] Payment integration
- [ ] Email notifications
- [ ] Admin panel for waitlist management

## 👨‍💻 Author

**AY Asemota**

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Contact the author for contribution guidelines.

---

**Built with ❤️ by AY Asemota**