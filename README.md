# library-api

##  API to manage a library's book inventory

## Getting Started

### 1. To start bring up the Databases:
```docker-compose up -d```

### 2. Add the provided .env file to you project
### 3. Install dependencies
```npm instsall```
### 4. Run Migrations
```npm run migrations```
### 5. Seed Database
```npm run seeds```
### 6. Run the app
#### For development
```npm run dev```
#### For testing
```npm run test```
#### Otherwise
```npm start```

## Librarian Endpoints:
#### For all librarian endpoins use the header
```is_admin: true```
#### Endpoint to add a book (by ISBN) to the library.
```POST /api/v1/admin/books```
#### Endpoint to remove a book (by ISBN) from the library
```DELETE /api/v1/admin/books/:isbn```
#### Endpoint that generates a list of all overdue books.
```GET /api/v1/admin/books/overdue```

## User Endpoints:
#### For all librarian endpoins use the header
```is_customer: true```
#### Endpoint to check out a book; provide ISBN in the body of the request
```POST /api/v1/checkout```
#### Endpoint to return a checked out book; provide ISBN in the body of the request
```POST /api/v1/checkout/return```
#### Endpoint that returns all currently checked out books for that user.
```GET /api/v1/checkout/checkouts```