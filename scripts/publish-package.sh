#!/bin/bash
set -e

# Script to publish individual packages
# Usage: ./scripts/publish-package.sh <package-name> <version-type> [tag]
# Example: ./scripts/publish-package.sh core patch
# Example: ./scripts/publish-package.sh lang-english minor beta

PACKAGE=$1
VERSION_TYPE=$2
NPM_TAG=${3:-latest}

if [ -z "$PACKAGE" ] || [ -z "$VERSION_TYPE" ]; then
  echo "Usage: $0 <package-name> <version-type> [npm-tag]"
  echo ""
  echo "Examples:"
  echo "  $0 core patch"
  echo "  $0 lang-english minor"
  echo "  $0 profanity-checker major latest"
  echo ""
  echo "Available packages:"
  echo "  - core"
  echo "  - profanity-checker"
  echo "  - lang-arabic, lang-chinese, lang-czech, lang-danish"
  echo "  - lang-english, lang-esperanto, lang-finnish, lang-french"
  echo "  - lang-german, lang-hindi, lang-hungarian, lang-italian"
  echo "  - lang-japanese, lang-korean, lang-norwegian, lang-persian"
  echo "  - lang-polish, lang-portuguese, lang-russian, lang-spanish"
  echo "  - lang-swedish, lang-thai, lang-turkish"
  echo ""
  echo "Version types: patch, minor, major"
  echo "NPM tags: latest (default), beta, next, etc."
  exit 1
fi

PACKAGE_DIR="packages/$PACKAGE"

if [ ! -d "$PACKAGE_DIR" ]; then
  echo "Error: Package '$PACKAGE' not found in packages/"
  exit 1
fi

echo "📦 Publishing @profanity-checker/$PACKAGE"
echo ""

# Build all packages first
echo "🔨 Building packages..."
pnpm build

# Run tests
echo "🧪 Running tests..."
pnpm test || echo "⚠️  Tests failed but continuing..."

# Bump version
echo "⬆️  Bumping version ($VERSION_TYPE)..."
cd "$PACKAGE_DIR"
npm version $VERSION_TYPE --no-git-tag-version
NEW_VERSION=$(node -p "require('./package.json').version")
cd ../..

echo "📝 New version: $NEW_VERSION"

# Commit version change
git add "$PACKAGE_DIR/package.json"
git commit -m "chore: bump @profanity-checker/$PACKAGE to v$NEW_VERSION"

# Create tag
TAG_NAME="$PACKAGE-v$NEW_VERSION"
git tag "$TAG_NAME"

echo "🏷️  Created tag: $TAG_NAME"

# Ask for confirmation
echo ""
read -p "Ready to publish @profanity-checker/$PACKAGE@$NEW_VERSION with tag '$NPM_TAG'. Continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Publish cancelled"
  git tag -d "$TAG_NAME"
  git reset --soft HEAD~1
  exit 1
fi

# Publish to npm
echo "🚀 Publishing to npm..."
pnpm --filter "@profanity-checker/$PACKAGE" publish --access public --tag "$NPM_TAG"

# Push commits and tags
echo "📤 Pushing to GitHub..."
git push
git push origin "$TAG_NAME"

echo ""
echo "✅ Successfully published @profanity-checker/$PACKAGE@$NEW_VERSION"
echo "📦 Install with: npm install @profanity-checker/$PACKAGE@$NEW_VERSION"
echo "🏷️  Git tag: $TAG_NAME"
