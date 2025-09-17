# OptimalWay Store - React + Redux Toolkit

Small products management app built with React, Redux Toolkit and React Router. Implements listing with filters/search, create/edit/delete, basic form validation, and an in-memory async repository.

## Scripts

- npm install
- npm run dev
- npm run build
- npm run preview

## Tech choices

- State: Redux Toolkit for predictable state, slices, and thunks. Scales with feature-based slices and RTK Query if moving to real API.
- Persistence: In-memory repository with async latency simulation. Replace with real API by swapping repo functions or adopting RTK Query services.
- Routing: React Router for pages: list, create, edit.

## How to integrate a real API

- Replace `src/features/products/productsRepo.js` with HTTP calls (fetch/axios). Keep the same function signatures.
- Handle loading/error states already present in the slice. Consider RTK Query for caching and automatic request lifecycle.

## Structure

- src/store/store.js — Redux store
- src/features/products/productsSlice.js — slice + thunks
- src/features/products/productsRepo.js — in-memory repo
- src/pages/ProductsListPage.jsx — list with filters/search
- src/pages/ProductCreatePage.jsx — create
- src/pages/ProductEditPage.jsx — edit
- src/components/ProductForm.jsx — form with validation

## Notes

- UI and copy are in English per requirement.
- Basic accessibility: labels tied to inputs, buttons have text.
