# PRYDE Designs - Vue.js 3 Website

A modern, scalable Vue.js 3 website inspired by PRYDE Designs, built with Clean Architecture principles, SOLID design patterns, and best practices.

## Features

- Vue.js 3 with Composition API
- TypeScript for type safety
- Clean Architecture & SOLID Principles
- Pinia for state management
- Tailwind CSS for styling
- Vite for fast development and optimized builds

## Project Structure

The project follows Clean Architecture principles with clear separation of concerns:

```
src/
├── core/                      # Core Domain Layer
│   └── domain/
│       ├── entities/          # Domain entities (Service, PortfolioItem, Testimonial)
│       └── repositories/      # Repository interfaces
│
├── application/               # Application Layer
│   └── usecases/             # Business logic use cases
│
├── infrastructure/            # Infrastructure Layer
│   ├── datasources/          # Mock data sources
│   └── repositories/         # Repository implementations
│
├── presentation/              # Presentation Layer
│   ├── components/
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   └── sections/         # Page sections (Hero, Services, About, etc.)
│   ├── composables/          # Reusable composition functions
│   └── stores/               # Pinia stores
│
├── shared/                    # Shared Layer
│   ├── constants/            # Application constants
│   └── utils/                # Utility functions
│
├── assets/
│   └── styles/               # Global styles with Tailwind
│
└── main.ts                   # Application entry point
```

## Clean Architecture Overview

### Core Domain Layer
Contains business entities and repository interfaces. This layer has no dependencies on other layers.

**Key Principles:**
- Entities represent core business concepts
- Repository interfaces define data contracts
- Framework and database agnostic

### Application Layer
Contains business logic and use cases that orchestrate domain operations.

**Key Principles:**
- Use cases implement business rules
- Depends only on the core domain
- Independent of frameworks and UI

### Infrastructure Layer
Contains concrete implementations of interfaces defined in the core domain.

**Key Principles:**
- Implements repository interfaces
- Handles external concerns (APIs, databases)
- Can be easily swapped for different implementations

### Presentation Layer
Contains Vue.js components, stores, and composables.

**Key Principles:**
- Depends on application layer for business logic
- Handles UI concerns and user interactions
- Uses Pinia for state management

## SOLID Principles Applied

### Single Responsibility Principle (SRP)
- Each entity, use case, and component has one clear responsibility
- Examples: `ServiceUseCase` only handles service business logic

### Open/Closed Principle (OCP)
- Entities are open for extension through composition
- New functionality can be added without modifying existing code

### Liskov Substitution Principle (LSP)
- Repository implementations can be substituted without breaking the application
- All repository implementations follow their interface contracts

### Interface Segregation Principle (ISP)
- Repository interfaces are focused and specific
- Clients depend only on the methods they use

### Dependency Inversion Principle (DIP)
- High-level modules (application layer) depend on abstractions (interfaces)
- Low-level modules (infrastructure) implement those abstractions

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

1. Build the project:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Architecture Benefits

### Scalability
- Clear separation of concerns allows easy addition of new features
- Modular structure enables team collaboration
- Each layer can evolve independently

### Maintainability
- SOLID principles make code easy to understand and modify
- Type safety with TypeScript reduces bugs
- Consistent patterns across the codebase

### Testability
- Business logic is isolated in use cases
- Dependencies are injected, making unit testing easy
- Mock implementations can be used for testing

### Flexibility
- Infrastructure can be swapped without affecting business logic
- UI can change without impacting domain logic
- Easy to add new data sources or APIs

## Technology Stack

- **Framework:** Vue.js 3.5+
- **Language:** TypeScript 5.8+
- **Build Tool:** Vite 6+
- **State Management:** Pinia 2.3+
- **Styling:** Tailwind CSS 3.5+
- **Code Quality:** ESLint, Prettier

## License

This project is open source and available under the MIT License.

## Credits

Inspired by [PRYDE Designs](https://prydedesigns.com/) - a Denver-based web design and branding agency.
