# Publishing Guide

This guide explains how to publish individual packages in the monorepo.

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **NPM Token**: Generate a token at https://www.npmjs.com/settings/YOUR_USERNAME/tokens
3. **GitHub Secret**: Add the NPM token as `NPM_TOKEN` in repository secrets
   - Go to: Settings → Secrets and variables → Actions → New repository secret

## Method 1: Manual Workflow (GitHub UI) ⭐ Recommended

This is the easiest way to publish individual packages.

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select **"Publish Package (Manual)"** workflow
4. Click **"Run workflow"** button
5. Fill in the form:
   - **Package**: Select the package to publish
   - **Version bump**: Choose `patch`, `minor`, `major`, or `skip`
   - **NPM tag**: Usually `latest` (or `beta`, `next` for pre-releases)
6. Click **"Run workflow"**

The workflow will:
- Bump the version (if not skipped)
- Build the package
- Run tests
- Publish to npm
- Create a git tag
- Create a GitHub release

### When to use each version bump:
- **patch** (1.0.0 → 1.0.1): Bug fixes, small updates
- **minor** (1.0.0 → 1.1.0): New features, backwards-compatible
- **major** (1.0.0 → 2.0.0): Breaking changes
- **skip**: Publish without changing version (not recommended)

## Method 2: Tag-Based Publishing

Create a git tag following the pattern `<package-name>-v<version>`:

```bash
# Example: Publish core package version 1.0.0
git tag core-v1.0.0
git push origin core-v1.0.0

# Example: Publish English language plugin version 1.0.1
git tag lang-english-v1.0.1
git push origin lang-english-v1.0.1

# Example: Publish main package version 1.1.0
git tag profanity-checker-v1.1.0
git push origin profanity-checker-v1.1.0
```

The workflow will automatically:
- Detect the package from the tag name
- Build the package
- Publish to npm
- Create a GitHub release

## Method 3: Local Script

Use the provided script for local publishing:

```bash
# Basic usage
./scripts/publish-package.sh <package-name> <version-type> [npm-tag]

# Examples
./scripts/publish-package.sh core patch
./scripts/publish-package.sh lang-english minor
./scripts/publish-package.sh profanity-checker major
./scripts/publish-package.sh lang-french patch beta
```

**Prerequisites for local publishing:**
```bash
# Login to npm
npm login

# Or with scoped packages
npm login --scope=@profanity-checker
```

The script will:
1. Build all packages
2. Run tests
3. Bump the version
4. Create a git commit
5. Create a git tag
6. Ask for confirmation
7. Publish to npm
8. Push to GitHub

## Method 4: Manual Publishing (Advanced)

For complete control:

```bash
# 1. Build packages
pnpm build

# 2. Navigate to package
cd packages/core  # or any package

# 3. Bump version
npm version patch  # or minor, major

# 4. Go back to root
cd ../..

# 5. Publish specific package
pnpm --filter @profanity-checker/core publish --access public

# 6. Commit and push
git add .
git commit -m "chore: publish @profanity-checker/core v1.0.1"
git tag core-v1.0.1
git push && git push --tags
```

## Publishing Multiple Packages

### Publish all packages at once:
```bash
pnpm -r publish --access public
```

### Publish all language packages:
```bash
pnpm --filter "@profanity-checker/lang-*" publish --access public
```

### Publish with specific tag:
```bash
pnpm -r publish --access public --tag beta
```

## Version Management Strategies

### Option 1: Independent Versioning
Each package has its own version. Update only what changed.

**Pros**: Clear what changed in each package
**Cons**: More management overhead

### Option 2: Fixed/Locked Versioning
All packages share the same version.

**Pros**: Simpler to manage, clear releases
**Cons**: Unnecessary version bumps for unchanged packages

```bash
# Set all packages to same version
pnpm -r exec npm version 1.2.0 --no-git-tag-version
```

## NPM Tags

Tags help users install specific versions:

- `latest` (default): Stable production releases
- `beta`: Beta/pre-release versions
- `next`: Bleeding edge, experimental
- `canary`: Automated nightly builds

Users can install specific tags:
```bash
npm install @profanity-checker/core@beta
npm install @profanity-checker/core@latest
```

## Testing Before Publishing

Always test before publishing:

```bash
# Dry run (see what would be published)
pnpm --filter @profanity-checker/core publish --dry-run

# Test in another project locally
cd /path/to/test-project
npm install /path/to/profanity-checker/packages/core
```

## Common Issues

### Issue: Package already exists
**Solution**: Bump the version first

### Issue: 403 Forbidden
**Solutions**:
- Verify you're logged in: `npm whoami`
- Check npm token is valid
- Ensure package name is available
- Use `--access public` for scoped packages

### Issue: Git tag already exists
**Solution**: Delete the tag locally and remotely:
```bash
git tag -d core-v1.0.0
git push origin :refs/tags/core-v1.0.0
```

## Package Dependencies

The main `@profanity-checker/profanity-checker` package depends on:
- `@profanity-checker/core`
- All 23 language packages

When publishing the main package, ensure all dependencies are already published.

### Recommended Publishing Order:
1. Publish `@profanity-checker/core` first
2. Publish all language packages (`@profanity-checker/lang-*`)
3. Finally publish `@profanity-checker/profanity-checker`

Or use the manual workflow which handles this automatically.

## Rollback a Published Version

NPM allows unpublishing within 72 hours:

```bash
# Unpublish specific version
npm unpublish @profanity-checker/core@1.0.0

# Or deprecate instead (recommended)
npm deprecate @profanity-checker/core@1.0.0 "Broken build, use 1.0.1 instead"
```

## Best Practices

1. ✅ Always test before publishing (`pnpm build && pnpm test`)
2. ✅ Use semantic versioning correctly
3. ✅ Write meaningful git commit messages
4. ✅ Create GitHub releases for major versions
5. ✅ Use `--dry-run` to preview changes
6. ✅ Keep a CHANGELOG.md (consider using [changesets](https://github.com/changesets/changesets))
7. ✅ Use beta/next tags for pre-releases
8. ❌ Never force publish over existing versions
9. ❌ Don't publish with uncommitted changes
