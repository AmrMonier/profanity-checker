# Profanity Checker

A modular, multi-language profanity checker library built with TypeScript. Supports 23 languages with a plugin-based architecture.

## Features

- 🌍 **Multi-language support**: 23 languages available
- 🧩 **Modular architecture**: Import only the languages you need
- 🎯 **Tree-shakeable**: Optimized bundle sizes
- 📦 **Monorepo structure**: Clean separation of concerns
- 🔍 **Advanced filtering**: Check, match, and sanitize profane content
- 💪 **Type-safe**: Written in TypeScript with full type definitions

## Supported Languages

Arabic, Chinese, Czech, Danish, English, Esperanto, Finnish, French, German, Hindi, Hungarian, Italian, Japanese, Korean, Norwegian, Persian, Polish, Portuguese, Russian, Spanish, Swedish, Thai, Turkish

## Installation

### Install the main package (includes all languages):

```bash
npm install @profanity-checker/profanity-checker
# or
pnpm add @profanity-checker/profanity-checker
# or
yarn add @profanity-checker/profanity-checker
```

### Install only specific language packages:

```bash
# Install core + specific languages
npm install @profanity-checker/core @profanity-checker/lang-english @profanity-checker/lang-spanish
```

## Usage

### Basic Usage (All Languages)

```typescript
import { Filter, english, spanish, arabic } from '@profanity-checker/profanity-checker';

// Create a filter with specific languages
const filter = new Filter({
  languages: [english, spanish, arabic]
});

// Check if text contains profanity
console.log(filter.isProfane("what the fuck is going on?")); // true
console.log(filter.isProfane("Hello world")); // false
```

### Using Specific Language Packages

```typescript
import { Filter } from '@profanity-checker/core';
import english from '@profanity-checker/lang-english';
import french from '@profanity-checker/lang-french';

const filter = new Filter({
  languages: [english, french]
});

console.log(filter.isProfane("This is clean text")); // false
```

### Advanced Features

```typescript
import { Filter, english } from '@profanity-checker/profanity-checker';

const filter = new Filter({ languages: [english] });

// Get all profane words found in text
const matches = filter.getMatches("This fucking text has shit words");
console.log(matches); // ['fucking', 'shit']

// Clean/sanitize text by replacing profane words
const cleaned = filter.clean("This fucking text has shit words");
console.log(cleaned); // "This ******* text has **** words"

// Use custom replacement character
const cleaned2 = filter.clean("This fucking text", "#");
console.log(cleaned2); // "This ####### text"
```

### Available Language Imports

All languages are available as named exports:

```typescript
import {
  arabic,
  chinese,
  czech,
  danish,
  english,
  esperanto,
  finnish,
  french,
  german,
  hindi,
  hungarian,
  italian,
  japanese,
  korean,
  norwegian,
  persian,
  polish,
  portuguese,
  russian,
  spanish,
  swedish,
  thai,
  turkish,
  languages // Object containing all languages
} from '@profanity-checker/profanity-checker';
```

## API

### `Filter`

The main class for profanity checking.

#### Constructor

```typescript
new Filter(config?: FilterConfig)
```

- `config.languages`: Array of language plugins to use

#### Methods

##### `isProfane(text: string): boolean`

Check if the text contains any profane words.

##### `getMatches(text: string): string[]`

Get all profane words found in the text.

##### `clean(text: string, replacement?: string): string`

Sanitize text by replacing profane words. Default replacement character is `*`.

## Packages

This is a monorepo containing the following packages:

- `@profanity-checker/core` - Core filtering functionality
- `@profanity-checker/profanity-checker` - Main package with all languages
- `@profanity-checker/lang-*` - Individual language packages (23 total)

## Development

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm --filter @profanity-checker/profanity-checker test:watch

# Lint code
pnpm lint
```

### Project Structure

```
profanity-checker/
├── packages/
│   ├── core/                 # Core filtering logic
│   ├── profanity-checker/    # Main package
│   ├── lang-arabic/          # Arabic language plugin
│   ├── lang-english/         # English language plugin
│   └── ...                   # Other language plugins
├── pnpm-workspace.yaml
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Amr Monier

## Repository

https://github.com/AmrMonier/profanity-checker
