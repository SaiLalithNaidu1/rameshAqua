# Components Folder Structure

This document describes the organized structure of the React components in this project.

## 📁 Folder Structure

```
src/components/
├── index.js                 # Main export file for all components
├── auth/                    # Authentication related components
│   ├── index.js            # Auth components exports
│   ├── LoginScreen.jsx     # Login/Sign-in component
│   └── LoginScreen.css     # Login styles
├── layout/                  # Layout and navigation components
│   ├── index.js            # Layout components exports
│   ├── Header.jsx          # Main navigation header
│   ├── Header.css          # Header styles
│   └── Header.jsx.backup   # Header backup file
├── pages/                   # Full page components
│   ├── index.js            # Page components exports
│   ├── HomeScreen.jsx      # Main home page
│   ├── HomeScreen.css      # Home page styles
│   ├── CategoriesPage.jsx  # Categories listing page
│   ├── CategoriesPage.css  # Categories page styles
│   ├── ProductsPage.jsx    # Products listing page
│   └── ProductsPage.css    # Products page styles
├── products/                # Product related components
│   ├── index.js            # Product components exports
│   ├── CategoryCard.jsx    # Category display card
│   ├── CategoryCard.css    # Category card styles
│   ├── ProductCard.jsx     # Product display card
│   └── ProductCard.css     # Product card styles
└── common/                  # Reusable/shared components
    ├── index.js            # Common components exports
    ├── Carousel.jsx        # Image carousel component
    ├── Carousel.css        # Carousel styles
    ├── CompanyCategories.jsx # Company categories section
    └── CompanyCategories.css # Company categories styles
```

## 🚀 Import Examples

### Importing Individual Components
```javascript
// From specific folders
import { LoginScreen } from '../components/auth';
import { Header } from '../components/layout';
import { HomeScreen, CategoriesPage, ProductsPage } from '../components/pages';
import { CategoryCard, ProductCard } from '../components/products';
import { Carousel, CompanyCategories } from '../components/common';

// From main index (if needed)
import { LoginScreen, Header, HomeScreen } from '../components';
```

### Component Organization Logic

#### 🔐 **auth/** - Authentication Components
- Components related to user authentication
- Login, Register, Password Reset, etc.
- User profile and account management

#### 🧭 **layout/** - Layout & Navigation
- Header, Footer, Sidebar components
- Navigation menus and breadcrumbs
- Layout wrappers and containers

#### 📄 **pages/** - Full Page Components
- Complete page components that combine multiple smaller components
- Route-level components
- Main application screens

#### 🛍️ **products/** - Product Related Components
- Product cards, category cards
- Product listings and details
- Shopping cart components
- Product-specific UI elements

#### 🔄 **common/** - Reusable Components
- Generic components used across multiple pages
- Carousels, modals, buttons, form elements
- Utility components
- Shared UI components

## ✅ Benefits of This Structure

1. **Better Organization**: Logical grouping of related components
2. **Easier Maintenance**: Find and update components faster
3. **Cleaner Imports**: Use barrel exports (index.js) for cleaner import statements
4. **Scalability**: Easy to add new components in appropriate folders
5. **Team Collaboration**: Clear structure for multiple developers
6. **Code Reusability**: Common components are easily identifiable and reusable

## 🔧 Adding New Components

When adding new components, follow these guidelines:

1. **Authentication components** → `auth/`
2. **Layout/Navigation components** → `layout/`
3. **Full page components** → `pages/`
4. **Product-related components** → `products/`
5. **Reusable/Generic components** → `common/`

Don't forget to:
1. Add the component to the appropriate `index.js` file
2. Update imports in files that use the component
3. Keep related CSS files in the same folder as the component

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.jsx`)
- **Styles**: Same name as component (e.g., `ProductCard.css`)
- **Exports**: camelCase in index.js files
- **Folders**: lowercase (e.g., `auth`, `layout`, `products`)

This structure promotes maintainability and follows React best practices for component organization.