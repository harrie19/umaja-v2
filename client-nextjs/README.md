# UMAJA Next.js Dashboard

Modern dashboard for monitoring UMAJA autonomous agents built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🤖 Real-time agent status monitoring
- 📊 Earnings tracking
- 📜 Live execution logs
- 💰 Ethical allocation display
- 📱 Mobile-responsive design
- 🎨 Beautiful gradient UI

## Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deploy

```bash
npm run build
# Deploy the `.next` folder
```

## Structure

```
client-nextjs/
├── app/
│   ├── page.tsx          # Main dashboard
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── AgentStatus.tsx   # Agent card component
│   └── LiveLogs.tsx      # Logs component
└── package.json
```

## Technology

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Backend (optional)

## License

Private
