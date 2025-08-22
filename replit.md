# PokerEvents Application

## Overview

PokerEvents is a full-stack web application for organizing and managing poker game events. The application allows users to create poker events, view them in calendar format, track participation, and maintain leaderboards. Built with a modern React frontend and Express.js backend, it features a poker-themed UI design and comprehensive event management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: Radix UI components with shadcn/ui component system for consistent, accessible design
- **Styling**: Tailwind CSS with custom poker-themed color scheme and CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Routing**: React Router DOM for client-side navigation
- **Forms**: React Hook Form with Hookform resolvers for form validation

### Backend Architecture  
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage)

### Data Storage Solutions
- **Database**: PostgreSQL configured with Drizzle ORM
- **ORM**: Drizzle ORM with Zod integration for type-safe database operations
- **Connection**: Neon Database serverless driver for PostgreSQL connectivity
- **Schema**: Shared schema definition between frontend and backend
- **Migrations**: Drizzle Kit for database schema management

### Authentication and Authorization
- Currently uses mock authentication in the frontend
- User schema defined with username/password fields
- Session management structure in place (connect-pg-simple for PostgreSQL sessions)

### Component Architecture
- **Design System**: Custom poker-themed component library built on Radix UI primitives
- **Layout**: Responsive design with header navigation and view switching
- **Event Management**: Dedicated components for event creation, display, and participation tracking
- **Calendar**: Custom calendar view implementation for event visualization
- **Leaderboard**: Sortable player statistics and rankings display

### Development Environment
- **Replit Integration**: Configured for Replit development environment with error overlay and cartographer plugin
- **Hot Reloading**: Vite HMR for instant development feedback
- **TypeScript**: Strict type checking with path aliases for clean imports
- **ESLint/Prettier**: Code formatting and linting (configuration implied by project structure)

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: TypeScript ORM with PostgreSQL dialect
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Styling
- **Radix UI**: Comprehensive set of accessible React components
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Runtime styling utility for component variants

### Development Tools
- **Vite**: Fast build tool and development server
- **Replit Plugins**: Development environment enhancements and error handling
- **React Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **date-fns**: Date manipulation and formatting utilities

### Build and Deployment
- **esbuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer
- **TypeScript**: Type checking and compilation