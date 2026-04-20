# Filmoo

Filmoo is a movie download website built with a React frontend and Node.js backend. The platform allows users to browse, search, and download movies through a responsive web interface with admin management capabilities.

## Features

- **Movie Management** - Admin interface for adding, editing, and displaying movies
- **Responsive Design** - Mobile-friendly interface with custom breakpoints (xs: 480px, md: 900px, 3xl: 1600px)
- **File Upload** - Movie poster and media file uploads using Multer
- **Database Integration** - MySQL backend for storing movie metadata
- **Modern UI** - Material-UI components with Tailwind CSS styling
- **Search & Filter** - Category-based movie browsing and search functionality

## Tech Stack

**Frontend:**
- React 19.1.0 with Create React App
- Material-UI 7.1.0 for components
- Tailwind CSS 3.4.17 for styling
- React Router DOM 7.6.0 for navigation
- Axios for API calls

**Backend:**
- Node.js with Express.js
- MySQL 2.18.1 for database
- Multer 1.4.5-lts.2 for file uploads
- UUID v4 for unique identifiers
- CORS and cookie-parser for security

**Development Tools:**
- Nodemon for auto-restart
- ESLint with React configuration
- Auto-commit workflow scripts

## Installation

### Prerequisites
- Node.js 16+ and npm
- MySQL database server
- Environment variables configured

### Setup Steps

1. **Clone and install dependencies:**
```bash
git clone https://github.com/rohan2519y/Filmoo.git
cd Filmoo
```

2. **Backend setup:**
```bash
cd Filmoo_backend
npm install
```

3. **Frontend setup:**
```bash
cd ../Filmoo_frontend
npm install
```

4. **Environment configuration:**
Create `.env` files in both backend and frontend directories with required variables (see Configuration section).

## Usage

### Running the Application

1. **Start the backend server:**
```bash
cd Filmoo_backend
npm start
```

2. **Start the frontend development server:**
```bash
cd Filmoo_frontend
npm start
```

3. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001 (default)

### Admin Interface
The admin panel is located at `/admin` and provides movie management capabilities including:
- Adding new movies with poster uploads
- Editing existing movie details
- Displaying all movies in the database

## Configuration

### Backend Environment Variables
Create a `.env` file in the `Filmoo_backend` directory with:
```
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=filmoo_db
PORT=3001
```

### Frontend Environment Variables
Create a `.env` file in the `Filmoo_frontend` directory with:
```
REACT_APP_API_URL=http://localhost:3001
```

## Project Structure

```
Filmoo/
├── Filmoo_backend/
│   ├── api/
│   │   └── index.js          # API routes
│   ├── bin/
│   │   └── www               # Server configuration
│   ├── public/
│   │   └── images/           # Uploaded movie posters
│   ├── app.js                # Main Express app
│   ├── package.json
│   └── .gitignore
├── Filmoo_frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── index.js          # React entry point
│   │   ├── admin/
│   │   │   └── Movie/        # Admin movie management
│   │   └── userinterface/
│   │       └── components/   # User-facing components
│   ├── package.json
│   ├── tailwind.config.js
│   └── .gitignore
└── .gitattributes
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Code Style
- Use ESLint configuration provided
- Follow React component naming conventions
- Use Material-UI components for consistent UI

## License

This project does not have a specified license. Please contact the repository owner for usage permissions.
