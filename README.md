# 🍽️ Bitzy - Cloud Kitchen Web Application

> A modern, type-safe cloud kitchen web app built with Next.js 15, TypeScript, and Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-green)](https://nodejs.org/)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📦 What's Included

- ✅ **Complete folder structure** with 36+ TypeScript files
- ✅ **Type-safe architecture** with branded types
- ✅ **State management** using Zustand
- ✅ **5 core features**: Menu, Cart, Orders, Checkout, Auth
- ✅ **Responsive UI** with Tailwind CSS
- ✅ **API services** ready for backend integration
- ✅ **Comprehensive documentation** (5 guides)

## 🏗️ Project Structure

```
src/
├── app/              # Next.js pages & API routes
├── components/       # Reusable UI components
├── features/         # Feature-based modules
├── stores/          # Zustand state management
├── types/           # TypeScript type definitions
├── services/        # API client services
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── lib/             # Third-party integrations
└── config/          # App configuration
```

## 📚 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Detailed architecture overview
- **[DEV_GUIDE.md](DEV_GUIDE.md)** - Developer quick reference
- **[DATA_FLOW.md](DATA_FLOW.md)** - Data flow diagrams
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Folder structure
- **[FILE_INVENTORY.md](FILE_INVENTORY.md)** - Complete file list
- **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** - Setup summary

## 🎯 Features

### 📋 Menu Browsing
Browse menu items organized by categories with search and filters.

### 🛒 Shopping Cart
Add items to cart, adjust quantities, and view totals in real-time.

### 📦 Order Management
View order history, track status, and manage deliveries.

### 💳 Checkout
Complete checkout flow with address and payment information.

### 🔐 Authentication
User authentication and profile management (scaffold ready).

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.6 (App Router + Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State**: Zustand 4.5
- **Validation**: Zod 3.23
- **Icons**: Lucide React
- **Runtime**: Node.js 22 LTS

## 📜 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type checking
```

## 🎨 Architecture Highlights

### Type-Safe Foundation
All data structures are strongly typed with TypeScript:
- Branded ID types for entity safety
- Money type in smallest unit (cents)
- Timestamped mixin for audit trails
- Paginated response wrapper

### Feature-Based Structure
Each feature has its own isolated module:
- Types, services, components colocated
- Easy to test and maintain
- Clear boundaries between features

### State Management
Zustand provides lightweight, hook-based state:
- No boilerplate
- TypeScript-first
- DevTools integration ready

## 🔧 Development

### Adding a New Feature

1. **Define types** in `src/types/[feature].ts`
2. **Create service** in `src/services/[feature].ts`
3. **Build components** in `src/features/[feature]/components/`
4. **Add store** (if needed) in `src/stores/[feature]Store.ts`
5. **Create page** in `src/app/[feature]/page.tsx`

See [DEV_GUIDE.md](DEV_GUIDE.md) for detailed instructions.

### Code Style

- Use TypeScript for all files
- Follow existing naming conventions
- Use `@/` path alias for imports
- Add `'use client'` only when needed
- Keep components small and focused

## 🚧 Roadmap

### Phase 1: Backend
- [ ] Set up Prisma with PostgreSQL
- [ ] Implement CRUD API routes
- [ ] Add data validation

### Phase 2: Authentication
- [ ] Integrate auth provider
- [ ] Add protected routes
- [ ] User session management

### Phase 3: Core Features
- [ ] Connect menu to real data
- [ ] Implement cart persistence
- [ ] Add order placement logic

### Phase 4: Payment
- [ ] Integrate payment provider
- [ ] Add order confirmation
- [ ] Email notifications

### Phase 5: Admin Panel
- [ ] Menu management UI
- [ ] Order management
- [ ] Analytics dashboard

## 🧪 Testing (Coming Soon)

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run E2E tests
npm run test:watch  # Watch mode
```

## 📈 Performance

- ⚡ **Turbopack** for lightning-fast HMR
- 🎯 **Server Components** by default
- 📦 **Automatic code splitting**
- 🖼️ **Optimized images** with Next.js Image
- 🚀 **Built-in caching** strategies

## 🌐 Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Vercel](https://vercel.com/) - Deployment platform

---

**Built with ❤️ for cloud kitchens everywhere**

*Last updated: November 11, 2025*

