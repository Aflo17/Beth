# Fit With Beth - Elite Personal Training Website

A modern, responsive website for elite personal training services built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Modern UI/UX**: Clean, professional design with smooth animations and micro-interactions
- **Contact Form Integration**: Direct webhook integration for lead capture
- **Performance Optimized**: Fast loading with optimized images and code splitting
- **SEO Ready**: Proper meta tags and semantic HTML structure

## 🚀 Live Demo

Visit the live site: [https://lucky-baklava-9d3ffd.netlify.app](https://lucky-baklava-9d3ffd.netlify.app)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Form Handling**: Make.com webhook integration

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd fit-with-beth
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
fit-with-beth/
├── public/
│   ├── beth-circular-logo.png    # Logo image
│   ├── beth-pro.jpg             # Professional photo
│   └── vite.svg                 # Vite favicon
├── src/
│   ├── App.tsx                  # Main application component
│   ├── index.css               # Global styles and Tailwind imports
│   ├── main.tsx                # Application entry point
│   └── vite-env.d.ts           # Vite type definitions
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

## 🎨 Design System

### Colors
- **Rose Gold**: Primary brand color (#D6A79E)
- **Soft Pink**: Secondary accent (#E8B7C4)
- **Warm Bronze**: Text and neutral tones (#A07B6F)
- **Glossy White**: Background (#F6F3F2)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 📝 Sections

1. **Hero Section**: Compelling headline with call-to-action
2. **Programs**: Four training program options
3. **About**: Trainer credentials and experience
4. **Transformations**: Client success stories and testimonials
5. **Contact**: Lead capture form with webhook integration

## 🔧 Configuration

### Webhook Integration
The contact form submits to a Make.com webhook. Update the webhook URL in `src/App.tsx`:

```typescript
const response = await fetch('YOUR_WEBHOOK_URL', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload)
});
```

### Form Data Structure
```typescript
{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  primaryGoal: string,
  preferredSchedule: string,
  additionalInfo: string,
  submittedAt: string,
  source: 'Fit With Beth Website'
}
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Manual Build
```bash
npm run build
```
The built files will be in the `dist` directory.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance Features

- Optimized images with proper sizing
- Lazy loading for images
- Smooth scrolling navigation
- Efficient CSS with Tailwind's purging
- Fast Vite build system

## 🔍 SEO Features

- Semantic HTML structure
- Proper heading hierarchy
- Meta descriptions and titles
- Alt text for all images
- Schema markup ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions about this project, please contact:
- Email: beth@fitwithbeth.com
- Phone: (555) 123-4567
- Instagram: @fitwithbeth

---

Built with ❤️ using React, TypeScript, and Tailwind CSS