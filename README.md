# Vocabulator

A React application for learning new words, refreshing old ones, and expanding your vocabulary. Search for word definitions using the Free Dictionary API and save them as flashcards for practice.

## Features

- **Word Search**: Look up definitions for any English word using the Free Dictionary API
- **Multiple Definitions**: View all available definitions, parts of speech, and example sentences
- **Flashcard Collection**: Save definitions to your personal flashcard collection
- **Persistent Storage**: Flashcards are saved in browser localStorage and persist across sessions
- **Test Yourself**: Practice with your saved flashcards in individual or set mode
- **Duplicate Prevention**: Automatically prevents saving duplicate flashcards
- **User Feedback**: Visual notifications and button states provide clear feedback

## Quick Start

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd vocabulator
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

The app will open at http://localhost:3000. The page will reload automatically when you make edits.

### Other Commands

**Run tests**
```bash
npm test
```

**Create a production build**
```bash
npm run build
```

## How to Use

### Searching for Words

1. Navigate to the "New Word" section
2. Enter a word in the search box
3. Click "Define" or press Enter
4. View all available definitions with parts of speech and examples

### Saving Flashcards

1. After searching for a word, you'll see multiple definitions
2. Click "Save to Collection" on any definition you want to save
3. The button will change to "✓ Saved" and you'll see a confirmation notification
4. Duplicate flashcards are automatically prevented

### Testing Yourself

1. Navigate to the "Test Yourself" section
2. Choose between "Individual" (one card at a time) or "Set" (all cards at once) mode
3. Click on flashcards to flip between word and definition
4. If you haven't saved any flashcards yet, you'll see a message prompting you to add some

## Technical Details

### Dictionary API

The app uses the [Free Dictionary API](https://dictionaryapi.dev/) which:
- Requires no API keys or authentication
- Provides definitions, parts of speech, and example sentences
- Supports CORS, so no proxy is needed
- Is completely free to use

### Data Storage

Flashcards are stored in the browser's localStorage with the key `vocabulator_flashcards`. The storage format is:

```json
[
  {
    "word": "example",
    "definition": "a thing characteristic of its kind"
  }
]
```

**Note**: Data is stored locally in your browser. Clearing browser data will remove your flashcards.

### Project Structure

```
vocabulator/
├── public/              # Static assets and HTML entry point
├── src/
│   ├── components/
│   │   ├── common/      # Shared UI components (Notification)
│   │   ├── search/      # Word search and definitions
│   │   └── test/        # Flashcard testing components
│   ├── utils/           # Utility functions (flashcardStorage)
│   ├── App.js           # Main app component
│   └── index.js         # React entry point
├── package.json
└── README.md
```

## Tech Stack

- **React 18.3.1** - UI library
- **React Scripts 5.0.1** - Build tooling
- **Free Dictionary API** - Word definitions
- **localStorage** - Client-side data persistence

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request with a clear description of your changes.

## License

This project is provided as-is. Add a license if you intend to publish or share the source.
