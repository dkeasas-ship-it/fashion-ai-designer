# Installation Guide - Fashion AI Designer

## Prerequisites

- Node.js 18+
- MongoDB 5.0+
- npm or yarn
- Docker & Docker Compose (optional)

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fashion-ai-designer
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-key
CLOUDINARY_NAME=your-cloudinary-name
```

### 3. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Or using local MongoDB
mongod
```

### 4. Run Backend

```bash
npm run dev
```

Backend will start at: `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Frontend will start at: `http://localhost:3000`

## Docker Setup (Optional)

### Using Docker Compose

```bash
# Start all services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

Services:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### User Endpoints

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/measurements` - Save measurements

### Design Endpoints

- `POST /api/designs` - Create design
- `GET /api/designs` - Get all designs
- `GET /api/designs/:id` - Get design details
- `PUT /api/designs/:id` - Update design
- `DELETE /api/designs/:id` - Delete design

### AI Endpoints

- `POST /api/ai/generate-design` - Generate design with AI

### AR Endpoints

- `POST /api/ar/try-on` - Process AR try-on
- `GET /api/ar/try-ons/:designId` - Get AR try-ons

### Order Endpoints

- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status

## Troubleshooting

### MongoDB Connection Error

```
Make sure MongoDB is running on port 27017
```

### Port Already in Use

```bash
# Find process using port
lsof -i :5000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### CORS Issues

Update `CORS_ORIGIN` in backend `.env` file

## Next Steps

1. Test API endpoints using Postman or cURL
2. Integrate AI services (OpenAI API, Stable Diffusion)
3. Set up Cloudinary for image storage
4. Configure payment processing
5. Deploy to production
