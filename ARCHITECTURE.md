# Project Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                                                                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐              │
│  │   Light    │  │    Dark    │  │   System   │ Theme Toggle │
│  │   Theme    │  │   Theme    │  │   Theme    │              │
│  └────────────┘  └────────────┘  └────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     REACT APPLICATION                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     App.tsx (Routes)                      │  │
│  │                                                           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │  │
│  │  │  Public  │  │   Auth   │  │Protected │              │  │
│  │  │  Routes  │  │  Routes  │  │  Routes  │              │  │
│  │  └──────────┘  └──────────┘  └──────────┘              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│                            ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Redux Store (State)                      │  │
│  │                                                           │  │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐      │  │
│  │  │ Auth │  │Design│  │Categ.│  │Price │  │Purch.│ ...  │  │
│  │  │Slice │  │Slice │  │Slice │  │Slice │  │Slice │      │  │
│  │  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│                            ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Axios Instance (HTTP Client)                │  │
│  │                                                           │  │
│  │  • Request Interceptor  → Add Auth Token                │  │
│  │  • Response Interceptor → Refresh Token on 401          │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND API (Node.js)                         │
│                   http://localhost:5000                         │
│                                                                 │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│  │  Auth  │ │ Design │ │Category│ │ Pricing│ │Purchase│ ...  │
│  │  API   │ │  API   │ │  API   │ │  API   │ │  API   │      │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘      │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MongoDB Database                           │
└─────────────────────────────────────────────────────────────────┘
```

## Application Flow

### 1. Authentication Flow

```
User enters credentials
         │
         ▼
   LoginPage.tsx
         │
         ├─ handleSubmit()
         │
         ▼
   dispatch(login(data))
         │
         ▼
   authSlice.ts
         │
         ├─ createAsyncThunk
         │
         ▼
    axios.post('/api/v1/auth/login')
         │
         ▼
   Backend API
         │
         ├─ Validates credentials
         ├─ Returns accessToken
         ├─ Sets refresh token cookie
         │
         ▼
   authSlice fulfills
         │
         ├─ Stores token in Redux
         ├─ Stores token in localStorage
         ├─ Sets isAuthenticated = true
         │
         ▼
   Navigate to dashboard
```

### 2. Protected Route Flow

```
User tries to access /profile
         │
         ▼
   ProtectedRoute component
         │
         ├─ Check: isAuthenticated?
         │    │
         │    ├─ No → Redirect to /login
         │    │
         │    └─ Yes → Check: hasRequiredRole?
         │              │
         │              ├─ No → Redirect to /
         │              │
         │              └─ Yes → Render <Outlet />
         │
         ▼
   ProfilePage renders
```

### 3. Data Fetching Flow

```
Page component mounts (e.g., DesignsPage)
         │
         ▼
   useEffect(() => {
     dispatch(fetchDesigns())
   }, [])
         │
         ▼
   designSlice.ts
         │
         ├─ createAsyncThunk
         ├─ Sets loading = true
         │
         ▼
   axios.get('/api/v1/designs')
         │
         ├─ Request Interceptor adds token
         │
         ▼
   Backend API returns data
         │
         ▼
   designSlice fulfills
         │
         ├─ Stores data in Redux state
         ├─ Sets loading = false
         │
         ▼
   Component re-renders with data
         │
         ▼
   Display designs in UI
```

### 4. Token Refresh Flow

```
User makes API call
         │
         ▼
   axios.get('/api/v1/some-endpoint')
         │
         ├─ Request Interceptor adds token
         │
         ▼
   Backend API
         │
         ├─ Token expired?
         │    │
         │    ├─ No → Return data
         │    │
         │    └─ Yes → Return 401
         │
         ▼
   Response Interceptor catches 401
         │
         ├─ Check: Is this refresh token endpoint?
         │    │
         │    ├─ Yes → Don't retry (prevent loop)
         │    │
         │    └─ No → Attempt token refresh
         │              │
         │              ▼
         │        axios.post('/api/v1/auth/access-token')
         │              │
         │              ├─ Success → Store new token
         │              │            Retry original request
         │              │
         │              └─ Fail → Logout user
         │
         ▼
   Original request succeeds with new token
```

## Component Structure

### Public Layout

```
┌────────────────────────────────────────────────────┐
│                    Navbar                          │
│  Logo | Designs | Pricing | Theme | Login/Profile │
├────────────────────────────────────────────────────┤
│                                                    │
│                                                    │
│                  Page Content                      │
│                   (Outlet)                         │
│                                                    │
│                                                    │
├────────────────────────────────────────────────────┤
│                     Footer                         │
│           Links | Copyright | Social               │
└────────────────────────────────────────────────────┘
```

### Dashboard Layout

```
┌────────────────────────────────────────────────────┐
│              Dashboard Navbar                      │
│      Logo | Theme Toggle | Logout                  │
├──────────────┬─────────────────────────────────────┤
│              │                                     │
│   Sidebar    │        Page Content                │
│              │         (Outlet)                    │
│  - Profile   │                                     │
│  - Purchases │                                     │
│  - Dashboard │                                     │
│  - Designs   │                                     │
│  - etc.      │                                     │
│              │                                     │
│              │                                     │
└──────────────┴─────────────────────────────────────┘
```

## File Structure Tree

```
frontend/
│
├── public/                      # Static assets
│
├── src/
│   │
│   ├── main.tsx                 # Entry point
│   │   └── Wraps app with:
│   │       - Redux Provider
│   │       - React Router
│   │       - Theme Provider
│   │
│   ├── App.tsx                  # Main routing
│   │   └── Routes:
│   │       - Public routes (/, /designs, etc.)
│   │       - Auth routes (/login, /signup, etc.)
│   │       - Protected routes (customer, admin)
│   │
│   ├── components/
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── PublicLayout.tsx      (Navbar + Outlet + Footer)
│   │   │   ├── DashboardLayout.tsx   (Navbar + Sidebar + Outlet)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── DashboardNavbar.tsx
│   │   │
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── card.tsx
│   │   │   ├── toast.tsx
│   │   │   └── toaster.tsx
│   │   │
│   │   └── theme-provider.tsx  # Theme context
│   │
│   ├── pages/
│   │   │
│   │   ├── public/             # Public pages
│   │   │   ├── HomePage.tsx          ✅ Complete
│   │   │   ├── DesignsPage.tsx       ✅ Complete
│   │   │   ├── DesignDetailPage.tsx  ✅ Complete
│   │   │   └── PricingPage.tsx       ✅ Complete
│   │   │
│   │   ├── auth/               # Authentication pages
│   │   │   ├── LoginPage.tsx         ✅ Complete
│   │   │   ├── SignUpPage.tsx        📝 Placeholder
│   │   │   ├── VerifyEmailPage.tsx   📝 Placeholder
│   │   │   ├── ForgetPasswordPage.tsx 📝 Placeholder
│   │   │   └── ResetPasswordPage.tsx  📝 Placeholder
│   │   │
│   │   ├── customer/           # Customer dashboard
│   │   │   ├── ProfilePage.tsx       📝 Placeholder
│   │   │   ├── MyPurchasesPage.tsx   📝 Placeholder
│   │   │   └── CheckoutPage.tsx      📝 Placeholder
│   │   │
│   │   └── admin/              # Admin dashboard
│   │       ├── AdminDashboard.tsx         📝 Placeholder
│   │       ├── ManageDesignsPage.tsx      📝 Placeholder
│   │       ├── ManageCategoriesPage.tsx   📝 Placeholder
│   │       ├── ManagePricingPlansPage.tsx 📝 Placeholder
│   │       ├── ManagePurchasesPage.tsx    📝 Placeholder
│   │       ├── ManageReviewsPage.tsx      📝 Placeholder
│   │       ├── ManageUsersPage.tsx        📝 Placeholder
│   │       └── ManageAdminsPage.tsx       📝 Placeholder
│   │
│   ├── store/                  # Redux state management
│   │   │
│   │   ├── index.ts            # Store configuration
│   │   ├── hooks.ts            # Typed hooks
│   │   │
│   │   └── slices/             # Redux slices
│   │       ├── authSlice.ts         ✅ Complete (8 actions)
│   │       ├── designSlice.ts       ✅ Complete (5 actions)
│   │       ├── categorySlice.ts     ✅ Complete (4 actions)
│   │       ├── pricingPlanSlice.ts  ✅ Complete (4 actions)
│   │       ├── purchaseSlice.ts     ✅ Complete (6 actions)
│   │       └── reviewSlice.ts       ✅ Complete (4 actions)
│   │
│   ├── config/
│   │   └── api.config.ts       # API endpoint definitions
│   │       └── API_BASE_URL variable (change once, affects all)
│   │
│   ├── lib/
│   │   ├── axios.ts            # HTTP client with interceptors
│   │   └── utils.ts            # Utility functions
│   │
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   │       └── All interfaces for API data
│   │
│   └── hooks/
│       └── use-toast.ts        # Toast notification hook
│
├── .env                        # Environment variables
│   └── VITE_API_BASE_URL=http://localhost:5000
│
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite build config
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
│
├── README.md                   # Main documentation
├── PROJECT_STATUS.md           # Progress report
├── IMPLEMENTATION_GUIDE.md     # Step-by-step guide
├── QUICK_START.md              # Getting started
├── CHECKLIST.md                # Development checklist
├── ARCHITECTURE.md             # This file
├── SETUP.md                    # Setup instructions
└── setup.ps1                   # Automated setup script
```

## Redux Store Structure

```javascript
{
  auth: {
    user: User | null,
    accessToken: string | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  },

  design: {
    designs: Design[],
    currentDesign: Design | null,
    loading: boolean,
    error: string | null,
    pagination: {
      currentPage: number,
      totalPages: number,
      totalItems: number,
      itemsPerPage: number
    }
  },

  category: {
    categories: Category[],
    currentCategory: Category | null,
    loading: boolean,
    error: string | null
  },

  pricingPlan: {
    plans: PricingPlan[],
    currentPlan: PricingPlan | null,
    loading: boolean,
    error: string | null
  },

  purchase: {
    purchases: Purchase[],
    myPurchases: Purchase[],
    revenue: RevenueData | null,
    loading: boolean,
    error: string | null
  },

  review: {
    reviews: Review[],
    currentReview: Review | null,
    loading: boolean,
    error: string | null
  }
}
```

## API Endpoints Map

```
API_BASE_URL = http://localhost:5000
API_VERSION = /api/v1

Authentication:
├── POST   /api/v1/auth/signup              (signUp)
├── POST   /api/v1/auth/register-user       (registerUser - verify email)
├── POST   /api/v1/auth/login               (login)
├── POST   /api/v1/auth/logout              (logout)
├── POST   /api/v1/auth/forget-password     (forgetPassword)
├── PATCH  /api/v1/auth/reset-password      (resetPassword)
├── PATCH  /api/v1/auth/change-password     (changePassword)
└── POST   /api/v1/auth/access-token        (refresh token)

User:
├── GET    /api/v1/user                     (fetchCurrentUser)
└── PATCH  /api/v1/user                     (updateUser)

Designs:
├── GET    /api/v1/designs                  (fetchDesigns - paginated)
├── GET    /api/v1/designs/:id              (fetchDesignById)
├── POST   /api/v1/admin/designs            (createDesign - admin)
├── PATCH  /api/v1/admin/designs/:id        (updateDesign - admin)
└── DELETE /api/v1/admin/designs/:id        (deleteDesign - admin)

Categories:
├── GET    /api/v1/category                 (fetchCategories)
├── GET    /api/v1/category/:id             (fetchCategoryById)
├── POST   /api/v1/admin/category           (createCategory - admin)
└── PATCH  /api/v1/admin/category/:id       (updateCategory - admin)

Pricing Plans:
├── GET    /api/v1/pricing-plans            (fetchPricingPlans)
├── GET    /api/v1/pricing-plans/:id        (fetchPricingPlanById)
├── POST   /api/v1/admin/pricing-plans      (createPricingPlan - admin)
└── PATCH  /api/v1/admin/pricing-plans/:id  (updatePricingPlan - admin)

Purchases:
├── POST   /api/v1/purchase                 (createPurchase - customer)
├── GET    /api/v1/purchase                 (fetchMyPurchases - customer)
├── GET    /api/v1/admin/purchases          (fetchAllPurchases - admin)
├── GET    /api/v1/admin/purchases/:id      (fetchPurchaseById - admin)
├── PATCH  /api/v1/admin/purchases/:id      (updatePurchase - admin)
└── GET    /api/v1/admin/revenue            (fetchRevenue - admin)

Reviews:
├── POST   /api/v1/review                   (createReview - customer)
├── GET    /api/v1/review/design/:designId  (fetchDesignReviews)
├── GET    /api/v1/review/:id               (fetchReviewById)
└── DELETE /api/v1/review/:id               (deleteReview - admin/owner)

Admins:
├── GET    /api/v1/admin                    (fetchAdmins - admin)
├── POST   /api/v1/admin                    (createAdmin - superAdmin)
└── PATCH  /api/v1/admin/change-position/:id (changePosition - superAdmin)

Customers:
└── GET    /api/v1/customer                 (fetchCustomers - admin)
```

## Technology Stack Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                         │
├─────────────────────────────────────────────────────┤
│  React 18.2.0           - UI Library                │
│  TypeScript 5.2.2       - Type Safety               │
│  Vite 5.1.4             - Build Tool                │
│  Redux Toolkit 2.2.1    - State Management          │
│  React Router 6.22.1    - Routing                   │
│  Tailwind CSS 3.4.1     - Styling                   │
│  shadcn/ui              - Component Library         │
│  Axios 1.6.7            - HTTP Client               │
│  React Hook Form 7.50.1 - Form Handling            │
│  Zod 3.22.4             - Validation                │
│  Lucide React 0.344.0   - Icons                     │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                    Backend                          │
├─────────────────────────────────────────────────────┤
│  Node.js + Express    - Server                      │
│  TypeScript           - Type Safety                 │
│  MongoDB + Mongoose   - Database                    │
│  JWT                  - Authentication              │
│  Bcrypt               - Password Hashing            │
│  Zod                  - Validation                  │
│  Multer               - File Upload                 │
│  Nodemailer           - Email Service               │
└─────────────────────────────────────────────────────┘
```

## Development Workflow

```
1. Setup
   │
   ├─ Install dependencies (npm install)
   ├─ Configure .env
   ├─ Start backend server
   └─ Start frontend dev server

2. Development Cycle
   │
   ├─ Pick a page from CHECKLIST.md
   ├─ Read IMPLEMENTATION_GUIDE.md for that page
   ├─ Write the component code
   ├─ Test in browser
   ├─ Check Redux DevTools for state
   ├─ Fix any issues
   └─ Check off in CHECKLIST.md

3. Testing
   │
   ├─ Test page functionality
   ├─ Test API integration
   ├─ Test error handling
   ├─ Test loading states
   ├─ Test on mobile
   └─ Test in different themes

4. Deployment
   │
   ├─ Run npm run build
   ├─ Test production build
   ├─ Deploy backend API
   ├─ Update VITE_API_BASE_URL
   ├─ Deploy frontend
   └─ Test production deployment
```

## Security Architecture

```
┌─────────────────────────────────────────────────────┐
│              Authentication Layer                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. User Login                                      │
│     │                                               │
│     ├─> Backend validates credentials              │
│     │                                               │
│     ├─> Returns access token (JWT)                 │
│     │   - Short lived (15 min)                     │
│     │   - Stored in Redux + localStorage           │
│     │                                               │
│     └─> Sets refresh token (HTTP-only cookie)      │
│         - Long lived (7 days)                      │
│         - Cannot be accessed by JavaScript         │
│                                                     │
│  2. API Request                                     │
│     │                                               │
│     ├─> Axios interceptor adds access token        │
│     │   to Authorization header                    │
│     │                                               │
│     └─> Backend verifies token                     │
│         - Valid → Process request                  │
│         - Invalid → Return 401                     │
│                                                     │
│  3. Token Refresh (on 401)                         │
│     │                                               │
│     ├─> Frontend calls /access-token endpoint      │
│     │   with refresh token cookie                  │
│     │                                               │
│     ├─> Backend validates refresh token            │
│     │   - Valid → Return new access token          │
│     │   - Invalid → User must login again          │
│     │                                               │
│     └─> Retry original request with new token      │
│                                                     │
│  4. Protected Routes                                │
│     │                                               │
│     ├─> ProtectedRoute checks:                     │
│     │   1. Is user authenticated?                  │
│     │   2. Does user have required role?           │
│     │                                               │
│     ├─> Not authenticated → Redirect to /login     │
│     │                                               │
│     └─> Wrong role → Redirect to /                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Role-Based Access Control

```
┌───────────────────────────────────────────────────────┐
│                    User Roles                         │
├───────────────────────────────────────────────────────┤
│                                                       │
│  Guest (Not Logged In)                                │
│  └─ Can access:                                       │
│     - Home page                                       │
│     - Designs page                                    │
│     - Design detail page                              │
│     - Pricing page                                    │
│     - Login/Signup pages                              │
│                                                       │
│  Customer (Logged In)                                 │
│  └─ Can access:                                       │
│     - All guest pages                                 │
│     - Profile page                                    │
│     - My purchases page                               │
│     - Checkout page                                   │
│     - Create reviews                                  │
│                                                       │
│  Admin (Admin Role)                                   │
│  └─ Can access:                                       │
│     - All customer pages                              │
│     - Admin dashboard                                 │
│     - Manage designs                                  │
│     - Manage categories                               │
│     - Manage pricing plans                            │
│     - Manage purchases                                │
│     - Manage reviews                                  │
│     - Manage users                                    │
│                                                       │
│  SuperAdmin (SuperAdmin Role)                         │
│  └─ Can access:                                       │
│     - All admin pages                                 │
│     - Manage admins (create, change position)         │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## Summary

This architecture provides:

- ✅ **Clean separation of concerns** - Components, state, API, types are all separated
- ✅ **Type safety** - Full TypeScript coverage
- ✅ **Scalability** - Easy to add new features following established patterns
- ✅ **Maintainability** - Consistent code structure and naming
- ✅ **Security** - Protected routes, token refresh, role-based access
- ✅ **Developer experience** - Hot reload, TypeScript autocomplete, Redux DevTools
- ✅ **User experience** - Theme toggle, toast notifications, loading states

The foundation is solid. Follow the patterns to complete the remaining pages! 🚀
