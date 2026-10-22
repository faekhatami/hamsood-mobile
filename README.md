# Hamsood Mobile

Hamsood is a mobile application built with React Native, Expo, TypeScript, and Expo Router.

## Project Status

The project is currently under development.

### Store Creation
- The store creation screens and navigation flow are implemented.
- Form data is managed through a shared context.
- A mapper prepares the form data as a backend-friendly payload.
- Basic client-side validation is implemented.
- The payload is currently logged to the console for inspection.

**Important:** The mobile app is not connected to a real backend API yet. The request/response contract, authentication, and file uploads still need to be coordinated with the backend developer.

### Other Flows
- The store page and add-product flow are preliminary UI flows.
- They are not yet fully integrated with the application's main business logic or backend.

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router

## Prerequisites

Install the following before running the project:

- Node.js, using a version compatible with the project's Expo SDK
- npm
- Android Studio and an Android emulator, or a compatible physical device

## Getting Started

Clone the repository:

```bash
git clone https://github.com/faekhatami/hamsood-mobile.git
cd hamsood-mobile
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Follow the terminal instructions to open the app on a supported device or emulator.

## Store Creation Data Flow

Store creation form data is managed in:

`src/features/store-creation/store-creation-context.tsx`

The backend payload mapper is in:

`src/features/store-creation/store-creation.mapper.ts`

The mapper prepares a payload containing:

- `categoryId`
- `businessName`
- `username`
- `description`
- `province`
- `county`
- `licenses` — an array of license type and description objects

UI-only license identifiers are excluded from the payload, and text fields are trimmed before submission.

The current implementation logs the prepared payload instead of sending an HTTP request.

## Backend Integration

Before implementing the API request, coordinate the following:

- API endpoint and HTTP method
- Final request DTO and field names
- Category, province, county, and license type identifiers
- Authentication and store ownership
- Username validation and uniqueness
- Success and error response formats
- Image and document upload requirements

See the repository's GitHub Issues for the current integration discussion.

## Validation

Run the TypeScript check:

```bash
npx tsc --noEmit
```

## Repository

https://github.com/faekhatami/hamsood-mobile
