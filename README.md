# FltFlex- A Fitness Equipment Selling Website
###   [Live Website](https://fitflex-equipment-selling.netlify.app)
<!--
### **Submission : (Please check my submissions:)**

- Frontend Live Link: [Live Website](https://fitflex-equipment-selling.netlify.app)
- Backend Live Link: [Backend Link](https://fit-flex-server-ochre.vercel.app/)
- GitHub Repository URL (Frontend): https://github.com/ashiqee/L2B3-assignment-4-ZFitX-0920
- GitHub Repository URL (Backend): https://github.com/ashiqee/ZfitX-Backend
-->

**Objective:**  FitFlex is building an innovative e-commerce platform dedicated to fitness enthusiasts, utilizing cutting-edge technologies like React, Redux, Mongoose, and Express. The website will deliver a smooth and intuitive shopping experience, featuring dynamic product listings, immersive product detail pages, and a seamless, user-friendly cart system. Administrators will benefit from powerful product management tools, while users will enjoy advanced functionalities like lightning-fast, debounced search, and smart page refresh warnings for an optimized experience. For secure and hassle-free payments, optional Stripe integration will be available. This project is designed to create a modern, high-performance online store, offering everything fitness lovers need in one place.

## Technical Stack
- Frontend: React, Redux for state management.
- Backend: Node.js, Express, Mongoose, CORS.
- Database: MongoDB for storing product and user data.
- TypeScript: Ensures robust type safety and code quality.

## Core Features
#### 1. Homepage
- Header with logo and site name
- Navigation links
- Banner Section
- Categories section with clickable images/icons
- Featured products
- Benefits section
- Image gallery in a mosaic view
- Footer with contact and social media links

#### 2. Products Page

- Product listings with images, names, prices, category, quantity, add to card button and details button
- Search bar
- Filters for multiple categories
- Sorting options
- Clear filter button

#### 3. Product Details Page

- Product information (name, price, stock, description, images, category)
- Add to cart button with quantity management
- Related category products are shown below in the details.
- Pagination. 

#### 4. Cart Page
- List of cart items with quantity controls
- Button to remove items
- Dynamic pricing details
- Proceed to the checkout button

#### 5. Checkout Page

- User details collection (name, email, phone number, address)
- Payment method.
- Place order functionality with stock management

#### 6. Product Management
- Product list table with action buttons
- Update and delete functionality with confirmation prompts
- Add new product form
- pagination view all products.

#### 7. About Us Page
- Company overview, 
- team introduction,
- customer testimonials
- Contact information with basic animations and gradients

<!---
#### 8. Order Management
 - Order list table with order details
   ---->

### Additional Features
- Debounced API Calls: Reduces API call frequency during searches
- Page Refresh Warning: Warns users before refreshing if the cart is not empty
- Pagination: Custom implementation for product listings


## Table of Contents for using

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)


## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn
- MongoDB (running locally or a connection URI to a remote instance)

## Installation

1. Clone the repository:

```bash
   <!-- Frontend clone  -->
   git clone https://github.com/ashiqee/L2B3-assignment-4-ZFitX-0920.git
```

 ```bash
   <!-- Backend clone  -->
   git clone https://github.com/ashiqee/ZfitX-Backend.git
```


2. Install dependencies:

### usi npm:

```tsc
npm i
```

## Configuration

1. Create a `.env.local` file in the root directory of the project and add the following enviroment variables:


Frontend .env.local
```bash
VITE_PAYMENT_GATEWAY=
```

Banckend .env
```bash

NODE_ENV = development
PORT=5000
DATABASE_URL = 
STRIPE_SECRET_KEY=
```

### Running the Application both

1. To compile and run the TypeScript application in development mode with hot-reloading, use:

```bash
npm run dev
```

2. To build the application for production

```bash
npm run build
```

Visit: http://localhost:5173/

This project aims to create a modern, efficient, and user-centric online store for fitness enthusiasts, providing a smooth and enjoyable shopping experience while ensuring secure and reliable transactions.
