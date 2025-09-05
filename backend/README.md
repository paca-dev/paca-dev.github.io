# PACA-Dev Backend API

Backend API for the PACA-Dev job board platform, providing endpoints for job management, user profiles, CV processing, and newsletter subscriptions.

## Features

- **Job Management**: CRUD operations for job postings with advanced filtering
- **User Profiles**: Firebase authentication integration with user preferences
- **CV Processing**: Text-based CV upload with skill extraction and job matching
- **Newsletter**: Subscription management with preference controls
- **Security**: Rate limiting, CORS, helmet protection, and Firebase auth

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Firebase Admin SDK
- **Security**: Helmet, CORS, Rate limiting
- **Validation**: Mongoose validators, custom validation

## API Endpoints

### Jobs (`/api/jobs`)
- `GET /` - List jobs with filtering and pagination
- `GET /:id` - Get single job details
- `POST /` - Create new job (auth required)
- `PUT /:id` - Update job (auth + ownership required)
- `DELETE /:id` - Delete job (auth + ownership required)
- `GET /stats/overview` - Get job statistics

### Users (`/api/users`)
- `GET /profile` - Get current user profile
- `PUT /profile` - Update user profile
- `POST /jobs/:jobId/save` - Save a job
- `DELETE /jobs/:jobId/save` - Unsave a job
- `GET /jobs/saved` - Get saved jobs
- `POST /jobs/:jobId/apply` - Apply to a job
- `GET /applications` - Get user applications

### CV (`/api/cv`)
- `POST /upload` - Upload/update CV with skill extraction
- `GET /me` - Get current user's CV
- `GET /matches` - Get job matches based on CV

### Newsletter (`/api/newsletter`)
- `POST /subscribe` - Subscribe to newsletter
- `POST /unsubscribe` - Unsubscribe from newsletter
- `PUT /preferences` - Update subscription preferences
- `GET /stats` - Get newsletter statistics

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Configure Firebase Admin SDK:
   - Download your Firebase service account key
   - Place it in `config/firebase-service-account.json`
   - Or set `GOOGLE_APPLICATION_CREDENTIALS` environment variable

4. Start MongoDB (locally or use MongoDB Atlas)

5. Run the development server:
   ```bash
   npm run dev
   ```

## Data Models

### Job
- Basic job information (title, company, location, type, salary)
- Requirements, benefits, and tags
- Remote work options and expiration dates
- Application tracking and featured status

### User
- Firebase authentication integration
- CV storage with skill extraction
- Job preferences and notification settings
- Saved jobs and application history

### Newsletter
- Email subscription management
- Granular preference controls
- Unsubscribe token system

## Security Features

- Firebase Authentication for all protected routes
- Rate limiting (100 requests per 15 minutes per IP)
- CORS protection with configurable origins
- Helmet for security headers
- Input validation and sanitization
- Ownership checks for job modifications

## Deployment

The API is designed to be deployed on any Node.js hosting platform:

- **Heroku**: Use the included Procfile
- **Railway**: Works out of the box
- **DigitalOcean App Platform**: Node.js runtime
- **AWS Elastic Beanstalk**: Upload as zip

Environment variables must be configured in your hosting platform.

## Development

- Use `npm run dev` for development with nodemon
- Follow RESTful conventions for new endpoints
- Add proper error handling and validation
- Write tests for new features (Jest recommended)
- Update this README for new endpoints or features