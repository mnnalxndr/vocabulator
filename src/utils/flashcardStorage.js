const STORAGE_KEY = 'vocabulator_flashcards';

/**
 * Retrieve all flashcards from localStorage
 * @returns {Array} Array of flashcards [{ word: string, definition: string }, ...]
 */
export const getFlashcards = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const flashcards = JSON.parse(stored);
    // Validate that it's an array
    if (!Array.isArray(flashcards)) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return flashcards;
  } catch (error) {
    console.error('Error reading flashcards from localStorage:', error);
    // If corrupted data, clear it
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // Ignore errors when clearing
    }
    return [];
  }
};

/**
 * Check if a flashcard already exists
 * @param {string} word - The word
 * @param {string} definition - The definition
 * @returns {boolean} True if duplicate exists
 */
export const isFlashcardDuplicate = (word, definition) => {
  const flashcards = getFlashcards();
  return flashcards.some(
    (card) => card.word.toLowerCase() === word.toLowerCase() && 
              card.definition.toLowerCase() === definition.toLowerCase()
  );
};

/**
 * Save a new flashcard to localStorage
 * @param {string} word - The word
 * @param {string} definition - The definition
 * @returns {object} { success: boolean, message: string }
 */
export const saveFlashcard = (word, definition) => {
  try {
    // Check if localStorage is available
    if (typeof Storage === 'undefined') {
      return {
        success: false,
        message: 'localStorage is not available in this browser'
      };
    }

    // Validate input
    if (!word || !definition) {
      return {
        success: false,
        message: 'Word and definition are required'
      };
    }

    // Check for duplicates
    if (isFlashcardDuplicate(word, definition)) {
      return {
        success: false,
        message: 'This flashcard already exists in your collection'
      };
    }

    // Get existing flashcards
    const flashcards = getFlashcards();

    // Add new flashcard
    flashcards.push({
      word: word.trim(),
      definition: definition.trim()
    });

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));

    return {
      success: true,
      message: 'Flashcard saved successfully!'
    };
  } catch (error) {
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      return {
        success: false,
        message: 'Storage limit exceeded. Please delete some flashcards.'
      };
    }
    
    console.error('Error saving flashcard:', error);
    return {
      success: false,
      message: 'Failed to save flashcard. Please try again.'
    };
  }
};

/**
 * Delete a flashcard from localStorage
 * @param {string} word - The word
 * @param {string} definition - The definition
 * @returns {object} { success: boolean, message: string }
 */
export const deleteFlashcard = (word, definition) => {
  try {
    const flashcards = getFlashcards();
    const filtered = flashcards.filter(
      (card) => !(card.word.toLowerCase() === word.toLowerCase() && 
                  card.definition.toLowerCase() === definition.toLowerCase())
    );

    if (filtered.length === flashcards.length) {
      return {
        success: false,
        message: 'Flashcard not found'
      };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return {
      success: true,
      message: 'Flashcard deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    return {
      success: false,
      message: 'Failed to delete flashcard. Please try again.'
    };
  }
};
