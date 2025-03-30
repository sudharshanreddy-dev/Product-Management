# Product Management App

A full-stack application built with NestJS (backend) and React (frontend) for managing products with user authentication.

## Features

- User authentication (JWT)
- Product CRUD operations
- Product filtering and searching
- Pagination and sorting
- Responsive UI with Material-UI

## Tech Stack

### Backend:
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger Documentation

### Frontend:
- React with Vite
- Material-UI (MUI)
- Zustand state management
- Axios for API calls
- React Router

## Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/product-management-app.git
cd product-management-app
```

### 2. Backend Setup

```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Set up environment variables
Create a `.env` file based on `.env.example`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/productdb?schema=public"
JWT_SECRET="your-secret-key"
PORT=3000
```

#### Run database migrations
```bash
npx prisma migrate dev
```

#### Start the development server
```bash
npm run start:dev
```


### 3. Frontend Setup

```bash
cd ../frontend
```

#### Install dependencies
```bash
npm install
```

#### Set up environment variables
Create a `.env` file:

```
VITE_API_URL=http://localhost:3000
```

#### Start the development server
```bash
npm run dev
```

Frontend will be available at [http://localhost:5173](http://localhost:5173)

## Project Structure
```
product-management-app/
├── backend/               # NestJS backend
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── product/      # Product module
│   │   ├── prisma/       # Database schema
│   │   └── main.ts       # App entry point
│   ├── prisma/schema.prisma  # Database models
│   └── .env.example      # Environment variables template
│
├── frontend/             # React frontend
│   ├── src/
│   │   ├── api/         # API service functions
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Zustand state stores
│   │   └── App.jsx      # Main component
│   └── .env             # Frontend environment variables
│
└── README.md            # This file
```

## API Endpoints

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | /auth/signup        | User registration   |
| POST   | /auth/signin        | User login          |
| POST   | /auth/logout        | User logout         |
| GET    | /products           | Get all products (paginated) |
| POST   | /products           | Create new product  |
| GET    | /products/:id       | Get single product  |
| PATCH  | /products/:id       | Update product      |
| DELETE | /products/:id       | Delete product      |
| GET    | /products/search    | Search products     |
| GET    | /products/filter    | Filter products     |

## Available Scripts

### Backend:
- `npm run start:dev` - Start development server
- `npx prisma migrate dev` - Run database migrations
- `npm run build` - Compile TypeScript
- `npm run format` - Format code with Prettier

### Frontend:
- `npm run dev` - Start Vite development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Backend:
1. Set up a production database.
2. Configure environment variables.
3. Build and run:

```bash
npm run build
npm run start:prod
```

### Frontend:
1. Update `VITE_API_URL` to point to the production backend.
2. Build and deploy:

```bash
npm run build
# Deploy the generated 'dist' folder to your hosting provider
```

## Troubleshooting

### Database connection issues:
- Verify PostgreSQL is running.
- Check `.env` `DATABASE_URL` is correct.
- Run `npx prisma migrate dev` to apply migrations.

### Authentication problems:
- Ensure `JWT_SECRET` matches between frontend and backend.
- Check cookies are being sent with requests.

### Frontend not connecting to backend:
- Verify `VITE_API_URL` is correct.
- Check CORS settings in backend.
