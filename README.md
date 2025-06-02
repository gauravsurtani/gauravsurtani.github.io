# Professional Resume Website

A modern, responsive professional resume website built with Next.js and Tailwind CSS.

## Features

- Clean, minimalist design
- Fully responsive layout
- ATS-friendly structure
- Modern UI components with React Icons
- Print-friendly styling
- SEO optimized
- TypeScript support

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Icons

## Getting Started

1. Make sure you have Node.js installed (version 18 or higher)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
```bash
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

1. Update your personal information in `src/components/Resume.tsx`
2. Modify the styling using Tailwind CSS classes
3. Add or remove sections as needed
4. Customize the layout and metadata in `src/app/layout.tsx`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This site can be deployed to any platform that supports Next.js applications, such as:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any hosting provider with Node.js support

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout and metadata
│   ├── page.tsx         # Main page component
│   └── globals.css      # Global styles
└── components/
    └── Resume.tsx       # Main resume component
```

## License

MIT
