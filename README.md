# Smart Meet - Server Side

The backend server for **Smart Meet** is designed to handle user authentication, room management, and booking functionalities efficiently and securely. It provides the necessary APIs to support both user and admin roles.

---

## Features

### User Authentication
- Secure login and registration using JWT.
- Role-based access control (user/admin).

### Room Management
- CRUD operations for meeting rooms.
- Availability tracking for specific time slots.

### Booking Management
- Endpoints for booking meeting rooms.
- Features to view, update, and cancel bookings.

### Search, Filter, and Sort
- Search rooms by name.
- Filter rooms by capacity and price.
- Sort rooms by price per slot (ascending/descending).

### Admin Panel Support
- APIs for managing room details.
- View booking history.

### Error Handling
- Comprehensive error responses for invalid operations.

---

## Technologies Used

- **Node.js:** Backend runtime environment.
- **Express.js:** Web framework for building RESTful APIs.
- **MongoDB:** NoSQL database for efficient data storage.
- **Mongoose:** Object data modeling (ODM) library.
- **TypeScript:** For type-safe and maintainable code.
- **JWT:** Secure authentication and authorization.

---

## API Endpoints

### User Management
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Login a user.


### Room Management
- `GET /api/slots/availability`: Retrieve all rooms with optional search and filters.
- `POST /api/rooms`: Add a new room (admin only).
- `PUT /api/rooms/:id`: Update room details (admin only).
- `DELETE /api/rooms/:id`: Delete a room (admin only).
- 
### Slot Management
- `GET /api/rooms`: Retrieve all slots with optional search and filters.
- `POST /api/slots`: Add a new slot (admin only).


### Booking Management
- `POST /api/bookings`: Book a room for a specific time slot.
- `GET /api/bookings`: Retrieve all bookings for the authenticated user or admin.
- `DELETE /api/bookings/:id`: Cancel a booking.

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   [it clone (https://github.com/Akahad1/assignment-3.git)]
   cd smart-meet-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGO_URI=<your_mongo_database_uri>
   JWT_SECRET=<your_jwt_secret>
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Access the API at `http://localhost:5000`.

---

## Deployment

The server can be deployed on platforms like:
- **Heroku**
- **Vercel**
- **AWS**
- **Render**

Ensure to set the appropriate environment variables for production.

---



---

## Contact

For any inquiries or issues, feel free to reach out at: [ashrafulkarim234@gmail.com].

