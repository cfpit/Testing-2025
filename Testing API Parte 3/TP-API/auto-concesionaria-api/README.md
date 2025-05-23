# Auto-Concesionaria API

This project is a RESTful API for managing "Auto" and "Concesionaria" entities. It is built using Node.js and Express, and it connects to a MySQL database.

## Project Structure

```
auto-concesionaria-api
├── src
│   └── app.js          # Entry point of the application
├── database
│   └── setup.sql       # SQL script to set up the MySQL database
├── package.json         # NPM configuration file
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MySQL (version 5.7 or higher)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd auto-concesionaria-api
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Set up the MySQL database:

   - Open your MySQL client and run the SQL script located in `database/setup.sql` to create the necessary tables.

### Running the API

1. Start the server:

   ```
   npm start
   ```

2. The API will be running on `http://localhost:3000`.

### API Endpoints

#### Auto Endpoints

- **GET /auto**: Retrieve all autos.
- **GET /auto/:id**: Retrieve a specific auto by ID.
- **POST /auto**: Create a new auto.
- **PUT /auto/:id**: Update an existing auto by ID.
- **DELETE /auto/:id**: Delete an auto by ID.

#### Concesionaria Endpoints

- **GET /concesionaria**: Retrieve all concesionarias.
- **GET /concesionaria/:id**: Retrieve a specific concesionaria by ID.
- **POST /concesionaria**: Create a new concesionaria.
- **PUT /concesionaria/:id**: Update an existing concesionaria by ID.
- **DELETE /concesionaria/:id**: Delete a concesionaria by ID.

## License

This project is licensed under the MIT License.