# Promotional Banking System

A React-based banking promotion system with a Node.js backend that manages account relationships and promotional benefits.

## Features

- ✅ Create new account entries with introducer relationships
- ✅ Automatic beneficiary calculation based on account number (odd/even)
- ✅ Delete account entries and their related introducer entries
- ✅ Real-time table updates with delete functionality
- ✅ Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 18.2, Tailwind CSS 3.2, Axios, React Icons
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Development**: React Hot Toast for notifications

## Getting Started

1. Clone the repository to your local machine.
    ```sh
    git clone <repository-url>
    ```

2. Install the required packages.
    ```sh
    npm install
    ```

3. Set up environment variables:
   - Create `.env` in root directory: `PORT=3001`
   - Create `server/.env`: `PORT=5000` and `MONGODB_URL=your_mongodb_connection_string`

4. Start the backend server.
    ```sh
    cd server
    npm start
    ```

5. Start the frontend development server.
    ```sh
    npm start
    ```

6. Open the project in your browser at [`http://localhost:3001`](http://localhost:3001)

## API Endpoints

### Create Promotion Entry
- **Method**: `POST`
- **URL**: `http://localhost:5000/anydesk/banking/promotion/create`
- **Body**:
  ```json
  {
    "accountNumber": "12345",
    "introducer": "67890"
  }
  ```
- **Response**: Returns created promotion record with calculated beneficiary

### Delete Promotion Entry
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/anydesk/banking/promotion/delete`
- **Body**:
  ```json
  {
    "accountNumber": "12345"
  }
  ```
- **Response**: Deletes the account and all entries where this account is the introducer

## Business Logic

- **Odd Account Numbers**: Beneficiary = Introducer
- **Even Account Numbers**: Beneficiary = Introducer's beneficiary (inherits from introducer)
- **Default Introducer**: Use "0" for accounts without an introducer
- **Cascade Delete**: Deleting an account also removes all accounts that have it as an introducer

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or a pull request.