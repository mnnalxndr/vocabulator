# Vocabulator

A small React app for looking up and studying word definitions and creating flashcards.

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm start
```

Open http://localhost:3000 to view the app. The page reloads on edits.

3. Run tests

```bash
npm test
```

4. Create a production build

```bash
npm run build
```

## Project Structure

- `src/` — application source
- `src/components/` — React components (search, test, common UI)
- `src/utils/` — small helpers such as `flashcardStorage.js`
- `public/` — static assets and the HTML entry

## Notes

- This project was bootstrapped with Create React App.
- The app uses the browser's local storage (via `utils/flashcardStorage.js`) to persist flashcards.

## Contributing

Contributions are welcome. Open an issue or submit a PR with a clear description of the change.

## License

This project is provided as-is. Add a license if you intend to publish or share the source.

