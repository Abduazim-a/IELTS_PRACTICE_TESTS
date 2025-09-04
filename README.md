# IELTS Practice Tests

A comprehensive React + TailwindCSS application for IELTS practice tests with advanced features and phone number verification.

## 🚀 Features

### Core Features
- **Phone Number Verification**: Secure access with authorized phone numbers
- **Three Practice Sections**: Listening, Reading, and Writing
- **Test Formats**: Choose between "Part by Part" and "Full Test" formats
- **Multiple Tests**: Access to 8 different tests per section
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Works perfectly on desktop and mobile devices

### Advanced Features
- **⏱️ Timer System**: Real-time countdown timers for each test
- **📊 Progress Tracking**: Save and track test scores and performance
- **📈 Test History**: View all completed tests with detailed statistics
- **🎯 Band Score Calculator**: Automatic IELTS band score calculation
- **💡 Study Tips**: Section-specific study strategies and tips
- **📱 Modern UI**: Clean, professional interface with TailwindCSS
- **💾 Data Persistence**: All progress saved in localStorage

## Allowed Phone Numbers

The following phone numbers are authorized to access the application:
- +998 777 77 19 68
- +998 910 12 24 61

Users only need to enter the 7 digits after +998 (e.g., "7777719" for the first number).

## 🚀 Quick Deployment (GitHub Pages)

### Option 1: One-Click Deploy (Recommended)

1. **Fork this repository** on GitHub
2. **Go to Settings** → **Pages**
3. **Source**: Select "GitHub Actions"
4. **Push any change** to trigger deployment
5. **Your site is live** at `https://yourusername.github.io/ielts-practice`

### Option 2: Manual Setup

1. **Install Node.js** from [nodejs.org](https://nodejs.org/)
2. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ielts-practice.git
   cd ielts-practice
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run locally**:
   ```bash
   npm start
   ```
5. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 Other Deployment Options

### Vercel (Free & Fast)
1. Push to GitHub
2. Connect to [vercel.com](https://vercel.com)
3. Auto-deploys on every push

### Netlify (Free)
1. Push to GitHub  
2. Connect to [netlify.com](https://netlify.com)
3. Auto-deploys with custom domain support

## Project Structure

```
src/
├── components/
│   ├── VerificationPage.tsx    # Phone number verification
│   ├── MainPage.tsx           # Main page with section selection
│   ├── SectionPage.tsx        # Section-specific test selection
│   └── TestPage.tsx           # Individual test display
├── contexts/
│   └── ThemeContext.tsx       # Theme management
├── App.tsx                    # Main app component with routing
├── index.tsx                  # App entry point
└── index.css                  # TailwindCSS imports
```

## Usage Flow

1. **Verification**: Enter your phone number (7 digits after +998)
2. **Main Page**: Choose between Listening, Reading, or Writing sections
3. **Test Format**: Select "Part by Part" or "Full Test"
4. **Test Selection**: Choose from available tests (Test 1-8)
5. **Test Display**: View the selected test (placeholder content)

## Theme System

- Toggle between light and dark modes using the theme button in the header
- Theme preference is saved in localStorage
- Smooth transitions between themes

## Technologies Used

- **React 18** with TypeScript
- **React Router** for navigation
- **TailwindCSS** for styling
- **Context API** for theme management
- **localStorage** for persistence

## Customization

### Adding New Authorized Numbers

Edit the `allowedNumbers` array in `src/components/VerificationPage.tsx`:

```typescript
const allowedNumbers = ['777771968', '910122461', 'your_new_number'];
```

### Styling

The app uses TailwindCSS with custom color schemes for each section:
- Listening: Blue theme
- Reading: Green theme  
- Writing: Purple theme

### Adding New Tests

Modify the test array in `src/components/SectionPage.tsx`:

```typescript
{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((testNumber) => (
  // Test button component
))}
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is for educational purposes.
