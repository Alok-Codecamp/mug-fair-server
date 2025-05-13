# Mug Fair

**Live Server**: [https://mug-fair-server.vercel.app](https://mug-fair-server.vercel.app)

## Overview

**Mug Fair** is an online platform that provides users with the ability to browse, purchase, and review mugs. The platform also supports order management, user authentication, and administrative role assignments, making it ideal for both customers and administrators.

### Key Features:

#### Mug Collection:

- **GET /mugs**  
  Retrieves all mugs available in the store.
- **GET /mugs/:id**  
  Fetches detailed information for a specific mug by its ID.
- **POST /mugs**  
  Adds a new mug to the collection. (Admin functionality)

#### Order Management:

- **GET /order**  
  Retrieves a list of all orders in the system. (Admin view)

- **GET /order/:email**  
  Retrieves all orders placed by a specific user, identified by their email address.

- **POST /order**  
  Allows users to place an order for mugs.

- **DELETE /order/:id**  
  Deletes an order by its ID. (Admin functionality)

#### User Management:

- **GET /users/:email**  
  Retrieves user information by email and determines if the user holds an admin role.
- **POST /users**  
  Creates a new user in the system.

- **PUT /users**  
  Updates the role of a user (e.g., assigns admin rights). (Admin functionality)

#### Reviews:

- **GET /review**  
  Retrieves all reviews for mugs available in the system.
- **POST /review**  
  Allows users to submit reviews for mugs they’ve purchased.

---

## Workflow:

1. **Mug Browsing**:  
   Users can browse a list of available mugs and view detailed information for each mug.

2. **Ordering**:  
   Users can place an order for mugs. Order information is stored in the database and linked to the user’s email.

3. **Reviewing**:  
   After purchasing a mug, users are encouraged to submit a review based on their experience.

4. **User Roles**:
   - **Admin Users**: Can add new mugs, manage orders, and assign admin roles to other users.
   - **Regular Users**: Can place orders and submit reviews.

---

## Installation Guide

To set up and run the **Mug Fair Server** locally, follow the instructions below.

### Prerequisites

Ensure that the following software is installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB cluster via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Step-by-Step Installation

1. **Clone the repository**:  
   Clone the repository to your local machine using the following command:
   ```bash
   git clone <repository-url>
   ```
