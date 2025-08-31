# Document Management Setup Guide

## Overview
This app now supports PDF document upload, viewing, and tracking. Admins can upload PDFs via your external S3 server, and users can view them with view history tracking.

## Database Changes
- New `Document` model added
- `WatchHistory` extended to track both movies and documents
- Run migrations: `npx prisma migrate dev`

## Environment Variables
Create a `.env.local` file in your project root and add:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/idmb-next"

# S3 Upload Server (your external upload server endpoint)
NEXT_PUBLIC_S3_UPLOAD_ENDPOINT="https://your-s3-upload-server.com/upload"
```

**Important**: You must create this `.env.local` file before trying to upload PDFs!

## S3 Upload Server Requirements
Your external upload server must:
1. Accept POST requests with FormData containing `file` and `fileName`
2. Return JSON response: `{ "url": "https://your-bucket.s3.amazonaws.com/file.pdf" }`
3. Make the uploaded PDF publicly accessible

## Features
- **Admin Upload**: `/upload` page now has PDF upload section
- **Document Viewer**: `/document/[id]` renders PDFs in iframe
- **Document List**: `/documents` shows all documents with admin delete buttons
- **View Tracking**: Automatically records when users view documents
- **Navigation**: Documents link added to header

## API Endpoints
- `GET /api/documents` - List all documents
- `POST /api/documents` - Create document (admin only)
- `GET /api/documents/[id]` - Get specific document
- `DELETE /api/documents/[id]` - Delete document (admin only)

## Usage Flow
1. Admin uploads PDF via `/upload` → PDF goes to your S3 server → Document record created
2. Users browse documents at `/documents`
3. Users view PDFs at `/document/[id]` → View tracked in `watch_history`
4. Admins can delete documents from the documents list

## Security
- Only admins can upload/delete documents
- All users can view documents
- View tracking requires authentication

## Troubleshooting

### "Unexpected token '<', \"<!DOCTYPE \"... is not valid JSON" Error
This error usually means:
1. Missing `.env.local` file with `NEXT_PUBLIC_S3_UPLOAD_ENDPOINT`
2. Your S3 upload server is returning HTML instead of JSON
3. The upload endpoint URL is incorrect

### "S3 upload endpoint тохируулаагүй байна" Error
Create `.env.local` file in your project root with:
```bash
NEXT_PUBLIC_S3_UPLOAD_ENDPOINT="https://your-s3-upload-server.com/upload"
```

### PDF Upload Fails
1. Check your S3 upload server is running
2. Verify it accepts POST requests with FormData
3. Ensure it returns `{ "url": "https://..." }` JSON response
4. Check browser console for detailed error messages
