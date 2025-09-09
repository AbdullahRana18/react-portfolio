# Abdullah Rana - Personal Portfolio

A modern, responsive personal portfolio website built with React, Tailwind CSS, and Framer Motion.

🔗 **Live Demo** → [View Portfolio](https://react-portfolio-ebon-six.vercel.app/)


## 🚀 Features

- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Modern UI**: Clean, minimal, and professional design
- **Interactive Elements**: Hover effects, scroll animations, and smooth transitions
- **Contact Form**: Functional contact form (ready for Formspree integration)
- **SEO Optimized**: Meta tags and semantic HTML structure

## 🛠 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation component
│   ├── Hero.jsx            # Hero section
│   ├── About.jsx           # About section
│   ├── Skills.jsx          # Skills section
│   ├── Projects.jsx        # Projects showcase
│   ├── Experience.jsx      # Work experience
│   ├── Education.jsx       # Educational background
│   ├── Contact.jsx         # Contact form and info
│   └── Footer.jsx          # Footer component
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd abdullah-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Customization

### Personal Information

Update the following files with your personal information:

1. **Hero Section** (`src/components/Hero.jsx`):
   - Name, role, tagline
   - Contact information
   - Social media links

2. **About Section** (`src/components/About.jsx`):
   - Personal description
   - Stats and achievements

3. **Skills Section** (`src/components/Skills.jsx`):
   - Add/remove skill categories
   - Update skill levels and technologies

4. **Projects Section** (`src/components/Projects.jsx`):
   - Add your projects
   - Update project details, technologies, and links

5. **Experience Section** (`src/components/Experience.jsx`):
   - Add work experience
   - Update job details and achievements

6. **Education Section** (`src/components/Education.jsx`):
   - Update educational background
   - Add academic achievements

7. **Contact Section** (`src/components/Contact.jsx`):
   - Update contact information
   - Configure form submission (Formspree integration)

### Styling

The project uses Tailwind CSS for styling. You can customize:

- Colors in `tailwind.config.js`
- Global styles in `src/index.css`
- Component-specific styles in individual component files

### Animations

Animations are powered by Framer Motion. You can customize:

- Animation variants in each component
- Transition durations and easing
- Hover and scroll-triggered animations

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

The portfolio includes a built-in dark mode toggle that:

- Persists user preference in localStorage
- Smoothly transitions between themes
- Updates all components automatically

## 📧 Contact Form

The contact form is ready for integration with Formspree:

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form
3. Update the form action in `src/components/Contact.jsx`
4. Replace the simulated submission with actual Formspree integration

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### Other Platforms

The project can be deployed to any static hosting platform that supports React applications.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Contact

**Abdullah Rana**
- Email: 15341@kiet.edu.pk
- Phone: +92-321-8293386
- Location: Karachi, Pakistan
- GitHub: [@abdullah-rana](https://github.com/abdullah-rana)
- LinkedIn: [abdullah-rana](https://linkedin.com/in/abdullah-rana)

---

Made with ❤️ by Abdullah Rana
