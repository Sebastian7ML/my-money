# My Money - Personal Finance Dashboard

A modern, professional Next.js application for managing personal finances. Built with TypeScript, Tailwind CSS, and Server Components for optimal performance.

## ✨ Features

- **Dashboard**: View all accounts with real-time balance updates
- **Transaction Management**: 
  - ✅ Add new transactions
  - ✅ Edit existing transactions
  - ✅ Delete transactions
- **Automatic Balance Updates**: Account balances sync instantly when transactions change
- **Mock Data**: Pre-populated with sample data for testing
- **Global State Management**: In-memory store persists data across requests during development
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── transactions/
│   │   │   ├── route.ts          # POST /api/transactions (create)
│   │   │   └── [id]/route.ts     # PUT/DELETE /api/transactions/[id]
│   │   └── debug/
│   │       └── state/route.ts    # GET /api/debug/state (inspect global state)
│   ├── add/
│   │   └── page.tsx              # Add transaction page
│   ├── edit/[id]/
│   │   └── page.tsx              # Edit transaction page (dynamic route)
│   ├── layout.tsx                # Root layout with navbar
│   ├── page.tsx                  # Dashboard (home)
│   ├── loading.tsx               # Loading skeleton UI
│   └── globals.css               # Global styles
├── components/
│   ├── AccountCard.tsx           # Display single account with balance
│   ├── EditTransactionForm.tsx   # Form for editing transactions
│   ├── Skeleton.tsx              # Loading placeholder component
│   ├── TransactionForm.tsx       # Form for adding transactions
│   └── TransactionList.tsx       # List of transactions with edit/delete buttons
├── lib/
│   ├── actions.ts                # Server actions (create/update/delete)
│   ├── data.ts                   # Data fetching & in-memory store
│   ├── mock-data.ts              # Sample data (accounts, transactions, categories)
│   └── utils.ts                  # Utility functions (formatCurrency)
├── types/
│   └── index.ts                  # TypeScript interfaces (Transaction, Account, Category)
└── hooks/
    └── (empty for future custom hooks)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git Bash (recommended for Windows)

### Installation

1. Clone or navigate to the project:
```bash
cd my-money
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 How to Use

### Adding a Transaction
1. Click the **"Add Transaction"** button on the dashboard
2. Fill in the form:
   - **Description**: What the transaction is for (e.g., "Coffee")
   - **Amount**: In euros (e.g., 5.50)
   - **Account**: Which account to debit/credit
   - **Category**: Income or expense category
3. Click **"Add Transaction"** to save

### Editing a Transaction
1. Click the **"Edit"** button next to any transaction in the list
2. Modify the details
3. Click **"Update Transaction"** to save
4. Account balance will update automatically

### Deleting a Transaction
1. Click the **"Delete"** button next to any transaction
2. The transaction is removed and account balance updates instantly

### Viewing Accounts
- The dashboard displays all accounts with current balances
- Balances update in real-time when you add, edit, or delete transactions

## 🛠️ Technical Details

### Data Flow

**Adding a Transaction:**
1. User fills form on `/add` page → Client component (`TransactionForm`)
2. Form calls server action `createTransaction()` from `src/lib/actions.ts`
3. Server action calls `addTransaction()` in `src/lib/data.ts`
4. Transaction stored in `global.transactionsStore` (in-memory)
5. Account balance updated in `global.accountsStore`
6. User redirected to dashboard

**Editing a Transaction:**
1. User navigates to `/edit/[id]` → Server fetches transaction via `getTransaction(id)`
2. `EditTransactionForm` makes `PUT /api/transactions/[id]` request
3. API route unwraps `params` (Promise), calls server action `updateTransaction()`
4. Old transaction effect reversed, new effect applied
5. Account balances updated, user redirected to dashboard

**Deleting a Transaction:**
1. User clicks Delete → `TransactionList` makes `DELETE /api/transactions/[id]` request
2. API route calls server action `deleteTransaction()`
3. Transaction removed from store, balance reversed
4. Page auto-refreshes with `router.refresh()`

### Key Implementation Details

**Global State:**
- Uses Next.js's `declare global` to define `transactionsStore` and `accountsStore`
- Initialized on first module load with mock data
- `ensureStoresInitialized()` called before every operation to handle edge cases
- ⚠️ **Development only**: In production, use a real database (PostgreSQL, MongoDB, etc.)

**API Routes:**
- `[id]` parameter is a **Promise** in Next.js 13.4+
- Must be awaited: `const { id } = await params;`
- Returns JSON with appropriate status codes (200, 404, 500)

**Server Actions vs. API Routes:**
- Server actions used internally (called by API routes and client components)
- API routes provide HTTP endpoints for consistency and debugging
- EditTransactionForm and TransactionList use fetch to API routes

**Balance Calculations:**
- Amounts stored in **cents** (integers) to avoid floating-point errors
- Currency formatting handled by `formatCurrency()` utility
- Balance updates are immediate and atomic

## 📝 Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🔍 Debug Endpoints

### View Global State
```
GET http://localhost:3000/api/debug/state
```
Returns JSON with current `transactions` and `accounts` arrays. Useful for:
- Verifying transaction IDs after adding
- Checking account balances
- Debugging data consistency issues

## 📚 Data Model

### Transaction
```typescript
{
  id: string;                    // Format: "txn_<timestamp>"
  amount: number;                // In cents (e.g., 500 = €5.00)
  description: string;           // "October Salary", "Coffee", etc.
  date: string;                  // ISO 8601 format
  accountId: string;             // References an Account
  categoryId: string;            // References a Category
}
```

### Account
```typescript
{
  id: string;                    // e.g., "acc_1"
  name: string;                  // "Main Checking", "Savings", etc.
  balance: number;               // In cents, updates with transactions
}
```

### Category
```typescript
{
  id: string;                    // e.g., "cat_1"
  name: string;                  // "Salary", "Groceries", "Rent", etc.
  type: 'income' | 'expense';    // Transaction type
}
```

## 🎨 UI Components

- **AccountCard**: Displays account name and balance with color-coded text (green for positive, red for negative)
- **TransactionList**: Shows recent transactions with edit/delete buttons, amount formatting
- **TransactionForm**: Client component for adding transactions with validation
- **EditTransactionForm**: Client component for editing with prefilled values
- **Skeleton**: Animated placeholder while data loads

## 🚨 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Delete returns 404 | ID not in global store | Ensure `ensureStoresInitialized()` is called |
| Edit form shows "Transaction not found" | `params` not awaited in API route | Await params: `const { id } = await params;` |
| Edit page won't load | Dynamic route not awaiting params | Check `src/app/edit/[id]/page.tsx` uses `await params` |
| Balances don't update | Balance calculation logic issue | Verify `updateAccountBalance()` is called |
| Transaction IDs mismatch | Different stores in different requests | Call `ensureStoresInitialized()` early in each function |

## 🔄 Next Steps (Future Enhancements)

- [ ] Replace in-memory store with PostgreSQL database
- [ ] Add user authentication (NextAuth.js)
- [ ] Implement transaction filtering and search
- [ ] Add data export (CSV, PDF)
- [ ] Create budget tracking and analytics
- [ ] Add recurring transactions
- [ ] Mobile app with React Native
- [ ] Multi-currency support

## 📄 License

This project is open source and available for educational purposes.

---

**Built with:** Next.js 14+ | TypeScript | Tailwind CSS | React 19
