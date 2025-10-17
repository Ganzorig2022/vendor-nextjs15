src/
├── app/                        # Next.js 15+ App Router
│   ├── (public)/               # Grouped routes (public)
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/            # Grouped routes (authenticated)
│   │   ├── dashboard/
│   │   └── settings/
│   ├── layout.tsx
│   └── page.tsx
│
├── modules/                    # Domain modules (DDD-inspired)
│   ├── user/
│   │   ├── api/
│   │   │   ├── user.service.ts     # API layer
│   │   │   └── user.queries.ts     # React Query hooks
│   │   ├── components/
│   │   │   └── UserCard.tsx
│   │   ├── store/
│   │   │   └── user.store.ts       # Zustand slice
│   │   ├── types/
│   │   │   └── user.types.ts
│   │   └── schema/
│   │       └── user.schema.ts      # Zod validation
│   │
│   └── auth/
│       ├── api/
│       ├── store/
│       └── schema/
│
├── core/                       # Core utilities (global, not domain specific)
│   ├── api/
│   │   ├── axios.client.ts         # Pre-configured axios instance
│   │   └── queryClient.ts          # React Query client config
│   ├── hooks/
│   │   ├── useToast.ts
│   │   └── useAxios.ts
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   └── ThemeProvider.tsx
│   ├── utils/
│   │   ├── date.ts
│   │   └── helpers.ts
│   └── constants/
│       └── env.ts
│
├── components/                 # Shared UI (cross-module)
│   ├── ui/                     # From Shadcn
│   ├── layout/
│   └── common/
│
├── lib/                        # Global lib setup (auth, db, etc.)
│   ├── auth/
│   ├── db/
│   └── middleware/
│
├── styles/                     # Tailwind configs and globals
│   ├── globals.css
│   └── tailwind.css
│
├── config/                     # ESLint, Prettier, Commitlint, etc.
│
└── types/                      # Global TypeScript types
    └── index.d.ts
