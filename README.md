# UI/UX Designer Portfolio - Full Stack Application

A professional, production-ready UI/UX designer portfolio and marketplace built with React, TypeScript, Redux Toolkit, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

### Frontend

- ✅ **Full Backend API Integration** - All endpoints from backend are integrated
- ✅ **Authentication System** - Login, Sign Up, Email Verification, Password Reset
- ✅ **Dark/Light Theme Toggle** - Complete theme system with system preference detection
- ✅ **Protected Routes** - Role-based access control (Customer, Admin, SuperAdmin)
- ✅ **Redux Toolkit State Management** - Centralized state with async thunks
- ✅ **Dynamic API Configuration** - Change base URL from one place
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **shadcn/ui Components** - Beautiful, accessible UI components
- ✅ **Form Validation** - React Hook Form with Zod validation
- ✅ **Toast Notifications** - User feedback for all actions

### Pages & Features

#### Public Pages

- **Home/Landing Page** - Hero section, featured designs, pricing plans
- **Designs Gallery** - Browse all available designs with filters
- **Design Details** - Detailed view with reviews and purchase options
- **Pricing Plans** - View all available plans
- **About & Contact** - Company information

#### Customer Pages

- **Profile** - View and edit user profile
- **My Purchases** - View purchase history
- **Checkout** - Purchase designs with pricing plans
- **Reviews** - Leave reviews for purchased designs

#### Admin Pages

- **Dashboard** - Overview with revenue statistics
- **Manage Designs** - Create, edit, delete designs
- **Manage Categories** - Create and manage design categories
- **Manage Pricing Plans** - Create and update pricing plans
- **Manage Purchases** - View all purchases, update payment status
- **Manage Reviews** - Moderate user reviews
- **Manage Users** - View all users and customers
- **Manage Admins** - Create new admins (SuperAdmin only)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:5000` (or update `.env` file)

## 🛠️ Installation

### 1. Install Dependencies

```powershell
cd frontend
npm install
```

### 2. Configure API URL

Create or edit `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

**Important:** This is the ONLY place you need to change the API URL. All API calls will use this base URL automatically.

### 3. Start Development Server

```powershell
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Layout components (Navbar, Footer, Sidebar)
│   │   ├── auth/            # Authentication components
│   │   ├── designs/         # Design-related components
│   │   ├── admin/           # Admin dashboard components
│   │   └── theme-provider.tsx
│   ├── pages/
│   │   ├── auth/            # Login, Sign Up, etc.
│   │   ├── public/          # Home, Designs, etc.
│   │   ├── customer/        # Customer dashboard
│   │   └── admin/           # Admin dashboard
│   ├── store/
│   │   ├── slices/          # Redux slices
│   │   ├── hooks.ts         # Redux hooks
│   │   └── index.ts         # Store configuration
│   ├── lib/
│   │   ├── axios.ts         # Axios instance with interceptors
│   │   └── utils.ts         # Utility functions
│   ├── config/
│   │   └── api.config.ts    # API endpoints configuration
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── .env                     # Environment variables
├── .env.example             # Environment variables example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Configuration

### Changing API URL

Edit the `.env` file:

```env
VITE_API_BASE_URL=https://your-production-api.com
```

This single change will update ALL API calls throughout the application.

### Theme Configuration

The application supports three theme modes:

- **Light Mode**
- **Dark Mode**
- **System** (auto-detects OS preference)

Theme preference is stored in localStorage and persists across sessions.

## 🔐 Authentication Flow

1. **Sign Up** → User receives verification email
2. **Email Verification** → Click link in email to verify
3. **Login** → Credentials validated, tokens issued
4. **Access Token** → Stored in localStorage
5. **Refresh Token** → Stored in HTTP-only cookie
6. **Auto Refresh** → Access token automatically refreshed when expired
7. **Logout** → Tokens cleared, redirected to login

### Protected Routes

- **Public Routes** - Accessible by everyone
- **Customer Routes** - Requires customer authentication
- **Admin Routes** - Requires admin/superAdmin authentication
- **SuperAdmin Routes** - Requires superAdmin authentication only

## 📦 Available Scripts

```powershell
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production

# Preview
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 🎨 Styling

### Tailwind CSS

The application uses Tailwind CSS for styling with custom theme configuration.

### shadcn/ui Components

Pre-built, accessible components that can be customized:

- Button, Input, Label
- Card, Dialog, Alert
- Select, Checkbox, Switch
- Toast, Dropdown, Tabs
- And many more...

### Theme Colors

Colors are defined in CSS variables and automatically adjust for dark mode:

- Primary, Secondary, Accent
- Destructive, Muted
- Card, Popover, Border
- And more...

## 🔌 API Integration

### Redux Slices

- **authSlice** - Authentication, user management
- **designSlice** - Design CRUD operations
- **categorySlice** - Category management
- **pricingPlanSlice** - Pricing plan operations
- **purchaseSlice** - Purchase creation and management
- **reviewSlice** - Review CRUD operations

### API Endpoints

All endpoints are configured in `src/config/api.config.ts`:

```typescript
// Example usage
import { API_ENDPOINTS } from '@/config/api.config';

// Login
POST API_ENDPOINTS.AUTH.LOGIN

// Get all designs
GET API_ENDPOINTS.DESIGN.ALL

// Get single design
GET API_ENDPOINTS.DESIGN.SINGLE(id)
```

## 🚦 Error Handling

- **API Errors** - Displayed via toast notifications
- **Form Validation** - Real-time validation with error messages
- **Network Errors** - Auto-retry with exponential backoff
- **Token Expiration** - Automatic token refresh
- **404 Pages** - Custom not found pages

## 🔒 Security Features

- **HTTP-Only Cookies** - Refresh token stored securely
- **CORS Protection** - Configured in Vite proxy
- **XSS Protection** - React's built-in protection
- **Input Validation** - Client-side validation with Zod
- **Role-Based Access** - Protected routes by user role

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🧪 Testing

```powershell
# Run tests (when configured)
npm run test
```

## 📄 License

This project is proprietary software.

## 👥 User Roles

### Customer

- Browse and purchase designs
- Leave reviews
- View purchase history
- Update profile

### Admin

- All customer features
- Manage designs (CRUD)
- Manage categories
- Manage pricing plans
- View all purchases
- Moderate reviews

### SuperAdmin

- All admin features
- Create new admins
- Manage admin positions
- View revenue statistics
- Full system access

## 🎯 Key Features Detail

### 1. Dynamic API Configuration

Change the base URL once in `.env` and all API calls update automatically. No need to search through code files.

### 2. Automatic Token Refresh

Access tokens are automatically refreshed using refresh tokens when they expire. Users stay logged in seamlessly.

### 3. Theme Persistence

Theme preference is saved to localStorage and applied on every page load. System preference is detected automatically.

### 4. Form Validation

All forms use React Hook Form with Zod validation for type-safe, performant form handling.

### 5. Optimistic Updates

UI updates immediately while API calls happen in the background for a snappy user experience.

### 6. Error Recovery

Network errors trigger automatic retries. Token errors trigger re-authentication. All errors show user-friendly messages.

## 🤝 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using React, TypeScript, Redux Toolkit, Tailwind CSS, and shadcn/ui**
