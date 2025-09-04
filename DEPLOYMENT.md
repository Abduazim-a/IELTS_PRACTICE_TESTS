# 🚀 Deployment Guide - IELTS Practice Tests

## Quick Start (Choose One Method)

### Method 1: Vercel (Recommended - Easiest)

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version` and `npm --version`

2. **Prepare your project**
   ```bash
   npm install
   npm run build
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Deploy automatically!

**Result**: Your site will be live at `https://your-project-name.vercel.app`

---

### Method 2: Netlify

1. **Prepare your project** (same as above)
2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Connect your repository
   - Build settings: `npm run build`, Publish directory: `build`

**Result**: Your site will be live at `https://random-name.netlify.app`

---

### Method 3: GitHub Pages

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ielts-practice.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: GitHub Actions
   - The workflow will auto-deploy

**Result**: Your site will be live at `https://yourusername.github.io/ielts-practice`

---

## 🎯 Step-by-Step Instructions

### Prerequisites
- Node.js installed
- Git installed
- GitHub account

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Test Locally
```bash
npm start
```
Visit `http://localhost:3000` to test

### Step 3: Build for Production
```bash
npm run build
```
This creates optimized files in the `build` folder

### Step 4: Deploy (Choose your platform)

#### Option A: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Your site is live!

#### Option B: Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod --dir=build`
3. Your site is live!

#### Option C: Manual Upload
1. Upload the `build` folder contents to any web hosting service
2. Examples: Hostinger, GoDaddy, Bluehost, etc.

---

## 🌐 Custom Domain Setup

### With Vercel/Netlify:
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In your hosting platform:
   - Go to Domain settings
   - Add your custom domain
   - Update DNS records as instructed
3. SSL certificate is automatically provided

### Example Domains:
- `ielts-practice.com`
- `my-ielts-tests.com`
- `english-practice.net`

---

## 📊 Performance Optimization

Your app is already optimized with:
- ✅ React production build
- ✅ Code splitting
- ✅ Minified assets
- ✅ Responsive design
- ✅ Fast loading

---

## 🔧 Environment Variables (Optional)

If you want to make the allowed phone numbers configurable:

1. Create `.env` file:
```
REACT_APP_ALLOWED_NUMBERS=777771968,910122461
```

2. Update `VerificationPage.tsx`:
```typescript
const allowedNumbers = process.env.REACT_APP_ALLOWED_NUMBERS?.split(',') || ['777771968', '910122461'];
```

---

## 🚨 Important Notes

1. **Phone Numbers**: Currently hardcoded in the app
2. **Security**: This is a frontend-only app - no backend security
3. **Data**: No user data is stored permanently
4. **Updates**: Push to GitHub to auto-deploy updates

---

## 🎉 You're Live!

Once deployed, your IELTS Practice Tests website will be accessible to anyone with the URL. Users can:
- Enter their phone number to verify access
- Practice Listening, Reading, and Writing tests
- Switch between light/dark themes
- Navigate through different test formats

**Share your live URL with students and teachers!**
