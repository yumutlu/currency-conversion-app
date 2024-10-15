# Currency Conversion App

A cross-platform React Native app to display a list of currency conversion rates of USD to various other currencies.

## Features

- Fetches real-time currency conversion rates from FloatRates API
- Displays a list of all conversion rates
- Highlights currencies with the highest and lowest conversion rates
- Automatically updates rates every 10 seconds
- Supports pull-to-refresh for manual updates
- Persists data using Zustand with AsyncStorage

## Technologies Used

- React Native
- Expo
- TypeScript
- Zustand (for state management)
- Axios (for API requests)
- Jest and React Native Testing Library (for testing)

## Setup and Installation

1. Ensure you have Node.js and npm installed on your machine.
2. Install Expo CLI globally:
   ```
   npm install -g expo-cli
   ```
3. Clone this repository:
   ```
   git clone https://github.com/yourusername/currency-conversion-app.git
   cd currency-conversion-app
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Start the Expo development server:
   ```
   npx expo start
   ```

## Running Tests

To run the test suite, execute the following command:

```
npm test
```

## Project Structure

- `/src`: Contains the main source code
  - `/api`: API-related code
  - `/components`: React components
  - `/store`: Zustand store
  - `/styles`: Shared styles and theme
- `/app`: Next.js app directory (if applicable)
- `/__tests__`: Test files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
