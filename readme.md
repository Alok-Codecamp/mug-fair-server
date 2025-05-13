# Mug faire

# Live server: https://mug-fair-server.vercel.app

## Overview

### The "Mug Fair" is an online platform that allows users to browse, purchase, and review mugs. It also supports order management, user authentication, and administrative role assignment.

#Key Features:
Mug Collection:

GET /mugs: Retrieves all mugs from the database.

GET /mugs/:id: Fetches a specific mug by its ID.

POST /mugs: Adds a new mug to the collection (admin functionality).

Order Management:

GET /order: Retrieves all orders from the database (admin view).

GET /order/:email: Retrieves orders placed by a specific user identified by their email.

POST /order: Allows users to place an order for mugs.

DELETE /order/:id: Deletes an order by its ID.

User Management:

GET /users/:email: Retrieves user information by email and determines if the user is an admin based on their role.

POST /users: Adds a new user to the system.

PUT /users: Updates the role of a user (e.g., assigning admin rights).

Reviews:

GET /review: Retrieves all reviews from the database.

POST /review: Allows users to submit reviews for mugs they purchased.

## Workflow:

Mug Browsing: Users can view the list of available mugs and details for individual mugs.

Ordering: Users can place an order for mugs. The order information is stored in the database and associated with the user's email.

Reviews: After purchasing, users can submit reviews for the mugs they bought.

User Roles: Admin users can add new mugs, manage orders, and assign admin roles to other users. Regular users can place orders and submit reviews.

# Mug faire installation guide

## Prerequisites

Before you begin, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or access to a MongoDB cluster via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Installation Guide

Follow these steps to set up and run the **Mug Fair Server** locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
