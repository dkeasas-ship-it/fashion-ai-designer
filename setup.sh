#!/bin/bash

# Fashion AI Designer - Setup Script

echo "🚀 Fashion AI Designer - Setup"
echo "================================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Install it or use Docker:"
    echo "   docker run -d -p 27017:27017 --name mongodb mongo"
fi

# Setup Backend
echo ""
echo "📦 Installing Backend Dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Setup Frontend
echo ""
echo "📦 Installing Frontend Dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

# Create env files
echo ""
echo "🔧 Creating environment files..."
cd ../backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created backend/.env (edit with your credentials)"
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Edit backend/.env with your API keys"
echo "2. Start MongoDB: docker run -d -p 27017:27017 --name mongodb mongo"
echo "3. In terminal 1: cd backend && npm run dev"
echo "4. In terminal 2: cd frontend && npm run dev"
echo ""
echo "🌐 Access the app at http://localhost:3000"
