# 🏗️ Frontend Architecture - Black Therapy Network

## 🌟 Tech Stack Overview

### Core Framework
- 🔷 Next.js 14 (App Router)
- 📘 TypeScript
- ⚛️ React 18
- 🎨 Tailwind CSS

### 📦 Key Packages & Integrations

#### Authentication & Security 🔐
- `next-auth` v5 (Beta) for authentication
- JWT token management
- Role-based access control (admin/therapist/client)
- Protected route middleware

#### API Communication 🌐
- Axios custom instance
- Automatic token injection
- Request/Response interceptors
- Error handling middleware

#### File Storage 📂
- AWS S3 Integration
  - `@aws-sdk/client-s3`
  - `@aws-sdk/s3-request-presigner`
- Signed URL generation for secure uploads
- File type validation
- Image optimization

#### Real-time Features 🔄

##### Video Calls 📹
- VideoSDK.live integration
- Features:
  - 1:1 video calls
  - Camera controls
  - Microphone controls
  - Screen sharing
  - Meeting room persistence

##### Chat System 💬
- Socket.io for real-time messaging
- Features:
  - Online status
  - Typing indicators
  - File sharing
  - Read receipts

#### Payment Processing 💳
- Stripe integration
- Secure payment processing
- Subscription management
- Payment history

### 📱 UI/UX Components

#### Form Management 📝
- `react-hook-form` for form handling
- Form validation
- Error handling
- Dynamic form fields

#### Date & Time 📅
- `react-big-calendar` for scheduling
- `date-fns` for date manipulation
- Timezone handling
- Appointment management

#### Media Handling 🎥
- `react-player` for video playback
- Custom video controls
- Responsive design
- Lazy loading

### 🏢 Project Structure

```
src/
├── 🔐 auth/                  # Authentication configuration
├── 🎯 actions/               # Server actions
├── 📱 app/                   # Next.js app router
│   ├── 🌐 (website)/        # Public routes
│   ├── 👑 admin/            # Admin dashboard
│   ├── 👤 customer/         # Client portal
│   └── 👨‍⚕️ therapist/        # Therapist dashboard
├── 🧩 components/            # Shared components
├── ⚙️ config/                # Configuration files
├── 🛠️ utils/                # Utility functions
└── 🔌 services/             # API services
```

### 🔄 State Management
- React Context for global state
- SWR for data fetching
- Local storage for persistence
- Form state management

### 🌐 API Integration
- Custom Axios instance
- Request/Response interceptors
- Error handling
- Authentication headers
- Role-based API access

### 📡 WebSocket Architecture
- Real-time connection management
- Room-based communication
- Event handling system
- Reconnection strategy
- Online status tracking

### 🎥 Video Call Implementation
- Room creation and management
- Participant handling
- Media stream control
- Screen sharing capability
- Recording features

### 🔒 Security Features
- CSRF protection
- XSS prevention
- Secure cookie handling
- Input sanitization
- File upload validation

### 🚀 Performance Optimizations
- Image optimization
- Code splitting
- Dynamic imports
- Caching strategies
- Lazy loading

### 📱 Responsive Design
- Mobile-first approach
- Breakpoint system
- Fluid typography
- Flexible layouts

### 🧪 Testing Strategy
- Unit testing
- Integration testing
- E2E testing
- Component testing

## 🔄 Development Workflow
1. Feature branch creation
2. Development with TypeScript
3. Testing implementation
4. Code review
5. Deployment pipeline

## 📚 Documentation Guidelines
- Component documentation
- API documentation
- Type definitions
- Usage examples
