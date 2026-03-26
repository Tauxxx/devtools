# DevTools

A collection of essential, privacy-first web tools for developers. Built with React, TypeScript, and Vite.

## Features

All tools run entirely on the client-side (in your browser). Your data never leaves your computer, ensuring complete privacy and fast response times.

- **JSON Beautify / Minify**: Format, validate, and compress JSON data.
- **Hash Generator**: Generate MD5, SHA-1, SHA-256, SHA-512, and SHA-3 hashes from text.
- **Password Generator**: Create secure, random passwords with customizable length and character sets.
- **UUID Generator**: Generate universally unique identifiers (UUID v4), individually or in bulk.
- **JWT Decoder**: Decode JSON Web Tokens to inspect their header and payload.
- **URL Encoder/Decoder**: Safely encode or decode URL components.
- **HTML Entities**: Encode or decode HTML entities in text.
- **Base64 Encoder**: Encode or decode text to Base64 format (with UTF-8 support).
- **Serialize/Unserialize**: Convert PHP-like serialized data to readable JSON and vice-versa.
- **Dark Mode & Responsive UI**: Seamlessly switch between Light and Dark themes. The layout is fully adaptive, featuring a slide-in mobile navigation menu for optimal experience on any device.
- **Demo Data**: Test out any tool instantly with one-click dummy data injection.

## Tech Stack

- React 18+
- TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM
- Vitest & React Testing Library
- ESLint, Prettier, Husky

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server:

```bash
npm run dev
```

### Testing

Run the test suite:

```bash
npm run test
```

### Building

Build the project for production:

```bash
npm run build
```

## Architecture

This project follows a clean, feature-based architecture. Each tool is self-contained within the `src/features/` directory, possessing its own components, utilities, and tests. Shared components (like Buttons and Textareas) reside in the `src/shared/` directory.

## License

MIT
