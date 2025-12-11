# PG Management System - Backend API Documentation

## Base URL
```
http://localhost:8080/api
```

## Response Format
All API responses follow this standard JSON format:

```json
{
  "status": "success|error",
  "message": "Human readable message",
  "data": { /* response data */ },
  "timestamp": "2024-12-06T10:30:00"
}
```

---

## 1. ADMIN APIs

### Register Admin
**POST** `/admin/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "admin@pgm.com",
  "phone": "9876543210",
  "password": "secure_password_123"
}
```

Response (201 Created):
```json
{
  "status": "success",
  "message": "Admin registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "admin@pgm.com",
    "phone": "9876543210",
    "createdAt": "2024-12-06T10:30:00",
    "updatedAt": "2024-12-06T10:30:00"
  },
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Admin Login
**POST** `/admin/login?email=admin@pgm.com&password=secure_password_123`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "admin@pgm.com",
    "phone": "9876543210",
    "createdAt": "2024-12-06T10:30:00",
    "updatedAt": "2024-12-06T10:30:00"
  },
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Get Admin by ID
**GET** `/admin/{id}`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Admin retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "admin@pgm.com",
    "phone": "9876543210",
    "createdAt": "2024-12-06T10:30:00",
    "updatedAt": "2024-12-06T10:30:00"
  },
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Update Admin
**PUT** `/admin/{id}`

Request Body:
```json
{
  "name": "Jane Doe",
  "phone": "9876543211",
  "password": "new_password_456"
}
```

Response (200 OK):
```json
{
  "status": "success",
  "message": "Admin updated successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "admin@pgm.com",
    "phone": "9876543211",
    "createdAt": "2024-12-06T10:30:00",
    "updatedAt": "2024-12-06T10:35:00"
  },
  "timestamp": "2024-12-06T10:35:00"
}
```

---

### Delete Admin
**DELETE** `/admin/{id}`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Admin deleted successfully",
  "timestamp": "2024-12-06T10:36:00"
}
```

---

## 2. TENANT APIs

### Get All Tenants
**GET** `/tenants`

Response (200 OK):
```json
{
  "status": "success",
  "message": "All tenants retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Rajesh Kumar",
      "age": 22,
      "phone": "9876543210",
      "email": "rajesh@email.com",
      "roomNumber": "101",
      "joiningDate": "2024-01-15",
      "address": "123 Main Street, City",
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:00:00",
      "updatedAt": "2024-01-15T10:00:00"
    },
    {
      "id": 2,
      "name": "Priya Singh",
      "age": 21,
      "phone": "9876543211",
      "email": "priya@email.com",
      "roomNumber": "102",
      "joiningDate": "2024-02-20",
      "address": "456 Oak Avenue, City",
      "status": "ACTIVE",
      "createdAt": "2024-02-20T10:00:00",
      "updatedAt": "2024-02-20T10:00:00"
    }
  ],
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Get Tenant by ID
**GET** `/tenants/{id}`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Tenant retrieved successfully",
  "data": {
    "id": 1,
    "name": "Rajesh Kumar",
    "age": 22,
    "phone": "9876543210",
    "email": "rajesh@email.com",
    "roomNumber": "101",
    "joiningDate": "2024-01-15",
    "address": "123 Main Street, City",
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:00:00",
    "updatedAt": "2024-01-15T10:00:00"
  },
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Create Tenant
**POST** `/tenants`

Request Body:
```json
{
  "name": "Amit Patel",
  "age": 23,
  "phone": "9876543212",
  "email": "amit@email.com",
  "roomNumber": "103",
  "joiningDate": "2024-12-06",
  "address": "789 Pine Road, City"
}
```

Response (201 Created):
```json
{
  "status": "success",
  "message": "Tenant created successfully",
  "data": {
    "id": 3,
    "name": "Amit Patel",
    "age": 23,
    "phone": "9876543212",
    "email": "amit@email.com",
    "roomNumber": "103",
    "joiningDate": "2024-12-06",
    "address": "789 Pine Road, City",
    "status": "ACTIVE",
    "createdAt": "2024-12-06T10:30:00",
    "updatedAt": "2024-12-06T10:30:00"
  },
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Update Tenant
**PUT** `/tenants/{id}`

Request Body:
```json
{
  "phone": "9876543213",
  "address": "Updated Address, City",
  "status": "INACTIVE"
}
```

Response (200 OK):
```json
{
  "status": "success",
  "message": "Tenant updated successfully",
  "data": {
    "id": 1,
    "name": "Rajesh Kumar",
    "age": 22,
    "phone": "9876543213",
    "email": "rajesh@email.com",
    "roomNumber": "101",
    "joiningDate": "2024-01-15",
    "address": "Updated Address, City",
    "status": "INACTIVE",
    "createdAt": "2024-01-15T10:00:00",
    "updatedAt": "2024-12-06T11:00:00"
  },
  "timestamp": "2024-12-06T11:00:00"
}
```

---

### Delete Tenant
**DELETE** `/tenants/{id}`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Tenant deleted successfully",
  "timestamp": "2024-12-06T10:36:00"
}
```

---

### Get Tenants by Status
**GET** `/tenants/status/{status}`

Example: `GET /tenants/status/ACTIVE`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Tenants retrieved by status successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Rajesh Kumar",
      "age": 22,
      "phone": "9876543210",
      "email": "rajesh@email.com",
      "roomNumber": "101",
      "joiningDate": "2024-01-15",
      "address": "123 Main Street, City",
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:00:00",
      "updatedAt": "2024-01-15T10:00:00"
    }
  ],
  "timestamp": "2024-12-06T10:30:00"
}
```

---

## 3. ROOM APIs

### Get All Rooms
**GET** `/rooms`

Response (200 OK):
```json
{
  "status": "success",
  "message": "All rooms retrieved successfully",
  "count": 3,
  "data": [
    {
      "id": 1,
      "roomNumber": "101",
      "type": "Double",
      "capacity": 2,
      "occupiedBeds": 2,
      "rent": 15000.0,
      "status": "OCCUPIED",
      "description": "Comfortable double room with attached bathroom",
      "createdAt": "2024-01-01T10:00:00",
      "updatedAt": "2024-01-01T10:00:00"
    },
    {
      "id": 2,
      "roomNumber": "102",
      "type": "Single",
      "capacity": 1,
      "occupiedBeds": 0,
      "rent": 10000.0,
      "status": "AVAILABLE",
      "description": "Single room with window view",
      "createdAt": "2024-01-01T10:00:00",
      "updatedAt": "2024-01-01T10:00:00"
    }
  ],
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Get Room by ID
**GET** `/rooms/{id}`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Room retrieved successfully",
  "data": {
    "id": 1,
    "roomNumber": "101",
    "type": "Double",
    "capacity": 2,
    "occupiedBeds": 2,
    "rent": 15000.0,
    "status": "OCCUPIED",
    "description": "Comfortable double room with attached bathroom",
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2024-01-01T10:00:00"
  },
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Create Room
**POST** `/rooms`

Request Body:
```json
{
  "roomNumber": "103",
  "type": "Double",
  "capacity": 2,
  "occupiedBeds": 0,
  "rent": 12000.0,
  "description": "Newly renovated double room"
}
```

Response (201 Created):
```json
{
  "status": "success",
  "message": "Room created successfully",
  "data": {
    "id": 3,
    "roomNumber": "103",
    "type": "Double",
    "capacity": 2,
    "occupiedBeds": 0,
    "rent": 12000.0,
    "status": "AVAILABLE",
    "description": "Newly renovated double room",
    "createdAt": "2024-12-06T10:30:00",
    "updatedAt": "2024-12-06T10:30:00"
  },
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Update Room
**PUT** `/rooms/{id}`

Request Body:
```json
{
  "occupiedBeds": 1,
  "status": "OCCUPIED"
}
```

Response (200 OK):
```json
{
  "status": "success",
  "message": "Room updated successfully",
  "data": {
    "id": 1,
    "roomNumber": "101",
    "type": "Double",
    "capacity": 2,
    "occupiedBeds": 1,
    "rent": 15000.0,
    "status": "OCCUPIED",
    "description": "Comfortable double room with attached bathroom",
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2024-12-06T11:00:00"
  },
  "timestamp": "2024-12-06T11:00:00"
}
```

---

### Delete Room
**DELETE** `/rooms/{id}`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Room deleted successfully",
  "timestamp": "2024-12-06T10:36:00"
}
```

---

### Get Rooms by Status
**GET** `/rooms/status/{status}`

Example: `GET /rooms/status/AVAILABLE`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Rooms retrieved by status successfully",
  "count": 1,
  "data": [
    {
      "id": 2,
      "roomNumber": "102",
      "type": "Single",
      "capacity": 1,
      "occupiedBeds": 0,
      "rent": 10000.0,
      "status": "AVAILABLE",
      "description": "Single room with window view",
      "createdAt": "2024-01-01T10:00:00",
      "updatedAt": "2024-01-01T10:00:00"
    }
  ],
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Get Rooms by Type
**GET** `/rooms/type/{type}`

Example: `GET /rooms/type/Single`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Rooms retrieved by type successfully",
  "count": 2,
  "data": [
    {
      "id": 2,
      "roomNumber": "102",
      "type": "Single",
      "capacity": 1,
      "occupiedBeds": 0,
      "rent": 10000.0,
      "status": "AVAILABLE",
      "description": "Single room with window view",
      "createdAt": "2024-01-01T10:00:00",
      "updatedAt": "2024-01-01T10:00:00"
    }
  ],
  "timestamp": "2024-12-06T10:30:00"
}
```

---

## 4. PAYMENT APIs

### Get All Payments
**GET** `/payments`

Response (200 OK):
```json
{
  "status": "success",
  "message": "All payments retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "tenantId": 1,
      "amount": 15000.0,
      "paymentDate": "2024-12-01",
      "method": "TRANSFER",
      "status": "COMPLETED",
      "paymentType": "Monthly",
      "notes": "December rent payment",
      "createdAt": "2024-12-01T10:00:00",
      "updatedAt": "2024-12-01T10:00:00"
    },
    {
      "id": 2,
      "tenantId": 2,
      "amount": 10000.0,
      "paymentDate": "2024-12-02",
      "method": "CASH",
      "status": "COMPLETED",
      "paymentType": "Monthly",
      "notes": "December rent payment",
      "createdAt": "2024-12-02T10:00:00",
      "updatedAt": "2024-12-02T10:00:00"
    }
  ],
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Get Payment by ID
**GET** `/payments/{id}`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Payment retrieved successfully",
  "data": {
    "id": 1,
    "tenantId": 1,
    "amount": 15000.0,
    "paymentDate": "2024-12-01",
    "method": "TRANSFER",
    "status": "COMPLETED",
    "paymentType": "Monthly",
    "notes": "December rent payment",
    "createdAt": "2024-12-01T10:00:00",
    "updatedAt": "2024-12-01T10:00:00"
  },
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Create Payment
**POST** `/payments`

Request Body:
```json
{
  "tenantId": 1,
  "amount": 15000.0,
  "paymentDate": "2024-12-06",
  "method": "TRANSFER",
  "status": "COMPLETED",
  "paymentType": "Monthly",
  "notes": "November rent payment"
}
```

Response (201 Created):
```json
{
  "status": "success",
  "message": "Payment created successfully",
  "data": {
    "id": 3,
    "tenantId": 1,
    "amount": 15000.0,
    "paymentDate": "2024-12-06",
    "method": "TRANSFER",
    "status": "COMPLETED",
    "paymentType": "Monthly",
    "notes": "November rent payment",
    "createdAt": "2024-12-06T10:30:00",
    "updatedAt": "2024-12-06T10:30:00"
  },
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Update Payment
**PUT** `/payments/{id}`

Request Body:
```json
{
  "status": "FAILED",
  "notes": "Payment failed - retry needed"
}
```

Response (200 OK):
```json
{
  "status": "success",
  "message": "Payment updated successfully",
  "data": {
    "id": 1,
    "tenantId": 1,
    "amount": 15000.0,
    "paymentDate": "2024-12-01",
    "method": "TRANSFER",
    "status": "FAILED",
    "paymentType": "Monthly",
    "notes": "Payment failed - retry needed",
    "createdAt": "2024-12-01T10:00:00",
    "updatedAt": "2024-12-06T11:00:00"
  },
  "timestamp": "2024-12-06T11:00:00"
}
```

---

### Delete Payment
**DELETE** `/payments/{id}`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Payment deleted successfully",
  "timestamp": "2024-12-06T10:36:00"
}
```

---

### Get Payments by Tenant ID
**GET** `/payments/tenant/{tenantId}`

Example: `GET /payments/tenant/1`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Payments retrieved by tenant successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "tenantId": 1,
      "amount": 15000.0,
      "paymentDate": "2024-12-01",
      "method": "TRANSFER",
      "status": "COMPLETED",
      "paymentType": "Monthly",
      "notes": "December rent payment",
      "createdAt": "2024-12-01T10:00:00",
      "updatedAt": "2024-12-01T10:00:00"
    }
  ],
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Get Payments by Status
**GET** `/payments/status/{status}`

Example: `GET /payments/status/COMPLETED`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Payments retrieved by status successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "tenantId": 1,
      "amount": 15000.0,
      "paymentDate": "2024-12-01",
      "method": "TRANSFER",
      "status": "COMPLETED",
      "paymentType": "Monthly",
      "notes": "December rent payment",
      "createdAt": "2024-12-01T10:00:00",
      "updatedAt": "2024-12-01T10:00:00"
    }
  ],
  "timestamp": "2024-12-06T10:30:00"
}
```

---

### Get Payments by Date Range
**GET** `/payments/date-range?startDate=2024-12-01&endDate=2024-12-31`

Response (200 OK):
```json
{
  "status": "success",
  "message": "Payments retrieved by date range successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "tenantId": 1,
      "amount": 15000.0,
      "paymentDate": "2024-12-01",
      "method": "TRANSFER",
      "status": "COMPLETED",
      "paymentType": "Monthly",
      "notes": "December rent payment",
      "createdAt": "2024-12-01T10:00:00",
      "updatedAt": "2024-12-01T10:00:00"
    }
  ],
  "timestamp": "2024-12-06T10:30:00"
}
```

---

## Error Response Examples

### 400 Bad Request - Validation Error
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation failed",
  "validationErrors": {
    "email": "Email should be valid",
    "phone": "Phone must be 10 digits",
    "age": "Age must be at least 18"
  },
  "timestamp": "2024-12-06T10:30:00"
}
```

### 400 Bad Request - Duplicate Entry
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Email already registered",
  "timestamp": "2024-12-06T10:30:00"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Tenant not found with id: 999",
  "timestamp": "2024-12-06T10:30:00"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "statusCode": 500,
  "message": "Internal server error: Database connection failed",
  "timestamp": "2024-12-06T10:30:00"
}
```

---

## Data Validation Rules

### Admin
- **name**: Non-blank, max 100 characters
- **email**: Valid email format, unique
- **phone**: 10 digits, unique
- **password**: Non-blank, min 8 characters recommended

### Tenant
- **name**: Non-blank, max 100 characters
- **age**: Between 18-100 years
- **phone**: 10 digits, unique
- **email**: Valid email format, unique
- **roomNumber**: Non-blank
- **joiningDate**: Must be a valid date
- **address**: Non-blank

### Room
- **roomNumber**: Non-blank, unique
- **type**: "Single" or "Double"
- **capacity**: Minimum 1
- **occupiedBeds**: Non-negative, cannot exceed capacity
- **rent**: Must be greater than 0

### Payment
- **tenantId**: Must be valid
- **amount**: Must be greater than 0
- **paymentDate**: Must be a valid date
- **method**: "CASH", "CHEQUE", "TRANSFER", "CARD", or "UPI"
- **status**: "PENDING", "COMPLETED", "FAILED", or "CANCELLED"

---

## Status Enums

### Tenant Status
- `ACTIVE` - Tenant is currently active
- `INACTIVE` - Tenant is inactive

### Room Status
- `AVAILABLE` - Room is available for occupancy
- `OCCUPIED` - Room is currently occupied
- `MAINTENANCE` - Room is under maintenance

### Payment Status
- `PENDING` - Payment is pending
- `COMPLETED` - Payment is completed
- `FAILED` - Payment has failed
- `CANCELLED` - Payment is cancelled

### Payment Methods
- `CASH` - Cash payment
- `CHEQUE` - Cheque payment
- `TRANSFER` - Bank transfer
- `CARD` - Card payment
- `UPI` - UPI payment

---

## Setup Instructions

1. **Create MySQL Database**
   ```sql
   CREATE DATABASE pgm_database;
   ```

2. **Update application.properties**
   - Set database username and password
   - Ensure MySQL server is running on port 3306

3. **Run the application**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Test the APIs**
   - Use Postman, curl, or the provided frontend
   - Base URL: `http://localhost:8080/api`

---
