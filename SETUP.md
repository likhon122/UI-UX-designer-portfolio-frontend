# Quick Setup Instructions

## Windows PowerShell

### Option 1: Run Setup Script (Recommended)

1. Right-click on `setup.ps1`
2. Select "Run with PowerShell"
3. Follow the prompts

If you get an execution policy error, run PowerShell as Administrator and execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Option 2: Manual Installation

Open PowerShell in the frontend directory and run:

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

## After Installation

1. Make sure your backend is running on `http://localhost:5000`
2. If your API URL is different, update `.env` file:
   ```
   VITE_API_BASE_URL=your-api-url-here
   ```
3. Open browser to `http://localhost:3000`

## Default Login Credentials

Check your backend for the super admin credentials set during seeding.

## Troubleshooting

### Port 3000 already in use

The app will automatically try port 3001, 3002, etc.

### API Connection Issues

- Check that backend is running
- Verify API_BASE_URL in `.env`
- Check browser console for errors

### Dependencies Error

Try:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── store/          # Redux store and slices
│   ├── lib/            # Utilities and axios setup
│   ├── config/         # API configuration
│   ├── types/          # TypeScript types
│   └── hooks/          # Custom React hooks
├── .env                # Environment variables
├── package.json        # Dependencies
└── README.md          # Full documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Support

For detailed documentation, see `README.md`
