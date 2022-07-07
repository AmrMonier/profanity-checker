# Profanity Check

This is a multi-language profanity check for validating text is clear and doesn't contain any profane words

## Supported languages
  - Arabic
  - Chinese
  - Czech
  - Danish
  - English
  - Esperanto
  - Finnish
  - French
  - German
  - Hindi
  - Hungarian
  - Italian
  - Japanese
  - Korean
  - Norwegian
  - Persian
  - Polish
  - Portuguese
  - Russian
  - Turkish
  - Swedish
  - Thai


## Installation
By default ```profanity-check``` supports **English** languages however you can as many language as you wish through the configuration object
```
import {Filter} from 'profanity-check'
const defaultFilter = new Filter()
// or
const multiLanguageFilter = new Filter({languages: ["arabic", "english", "french"]})

console.log(defaultFilter.isProfane("what the fuck is going on?")) // true
console.log(multiLanguageFilter.isProfane("انها عاهرة")) // true
```
## Todo
- add sanitizing function to replace bad words with symbols