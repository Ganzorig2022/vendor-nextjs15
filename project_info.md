I want to re-create my existing nextjs project. Below are things I want to include:

For project structure and architecture

- Modular architecture with clear separation of concerns.

  Choose the best, suitable, scalable and modern robust architecture patterns for a scalable web application at best practices. Here are some examples you can consider:

- MVC (Model-View-Controller) design pattern
- Clean code principles
- SOLID principles
- Layered architecture
- Domain-Driven Design (DDD) concepts

For dependency management

- Use pnpm as the package manager

For language and type safety

- TypeScript (latest version)
- Zod

For javascript libraries and frameworks

- For nextjs, use nextjs suitable concepts and best practices.
- Nextjs latest stable version
- React latest stable version
- Node.js version 22

For styling and UI components

- Tailwind CSS v4
- Shadcn UI componentns

For state management

- Zustand (latest version)

For data fetching and API handling

- Tanstack React Query (latest version)
- Axios client

For routing and navigation

- Nextjs built-in routing
- Nextjs dynamic routing
- Nextjs folder groups

For linting, formatting, and code quality

- ESLint with Airbnb style guide
- Prettier for code formatting

For git and version control

- Commitlint for commit message linting


# Next.js Enterprise Architecture Diagram

📦 src/
│
├── app/                         # [Presentation Layer]
│   ├── (public)/                # Unauthenticated routes
│   ├── (protected)/             # Authenticated routes
│   └── layout.tsx               # Shared layout/UI shell
│
├── components/                  # Shared UI components (Shadcn/Tailwind)
│
├── modules/                     # [Domain Layer] ← Domain-Driven Design boundary
│   ├── user/
│   │   ├── api/                 # Infrastructure interface for data fetching
│   │   │   ├── user.service.ts  # Axios calls → backend REST/GraphQL
│   │   │   └── user.queries.ts  # React Query hooks (useUserQuery)
│   │   ├── store/               # Local state via Zustand
│   │   ├── schema/              # Zod schemas (data contracts)
│   │   ├── types/               # TS interfaces/models
│   │   ├── components/          # Feature-specific UI
│   │   └── index.ts             # Public API of this domain
│   │
│   ├── auth/
│   │   ├── api/
│   │   ├── store/
│   │   └── schema/
│   │
│   └── ...
│
├── core/                        # [Infrastructure Layer]
│   ├── api/
│   │   ├── axios.client.ts      # Configured Axios instance
│   │   └── queryClient.ts       # React Query client setup
│   ├── hooks/                   # Reusable logic across domains
│   ├── providers/               # React Context providers (Query, Theme)
│   ├── utils/                   # Generic utilities
│   └── constants/               # App-wide constants
│
├── lib/                         # Cross-cutting infra (auth, db, middlewares)
│
├── styles/                      # Tailwind global styles
│
├── config/                      # ESLint, Prettier, Commitlint configs
│
└── types/                       # Global types (e.g., Env, Common)
