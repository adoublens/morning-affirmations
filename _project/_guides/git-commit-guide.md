# Git Commit Convention

This project uses a simple, emoji-enhanced commit message convention to maintain clean and readable git history.

## Commit Format

```
<emoji> <type>: <description>
```

## Commit Types

| Emoji | Type | Description | Example |
|-------|------|-------------|---------|
| ✨ | `feat:` | New features | `✨ feat: add dark mode toggle` |
| 🐛 | `fix:` | Bug fixes | `🐛 fix: resolve login validation error` |
| ⚡ | `improve:` | Improvements to existing features | `⚡ improve: optimize database queries` |
| 📚 | `docs:` | Documentation updates | `📚 docs: update README installation steps` |
| 🔧 | `chore:` | Maintenance tasks, dependencies, build config | `🔧 chore: update dependencies` |

## Quick Reference

Copy and paste these emojis: `✨🐛⚡📚🔧`

## Git Aliases (Optional)

Add these helpful aliases to your git config:

```bash
# Show commit types reference
git config --global alias.types '!echo "✨ feat: | 🐛 fix: | ⚡ improve: | 📚 docs: | 🔧 chore:"'

# Quick emoji reference
git config --global alias.emojis '!echo "✨🐛⚡📚🔧"'
```

Usage:
- `git types` - displays the full reference
- `git emojis` - displays just the emojis for quick copy-paste

## Benefits

- **Visual scanning** - quickly identify commit types in `git log --oneline`
- **Consistent history** - standardized format across all commits
- **Future-proof** - compatible with Conventional Commits standard
- **Simple** - only 5 categories to remember

## Examples

```bash
git commit -m "✨ feat: add user authentication system"
git commit -m "🐛 fix: resolve memory leak in data processing"
git commit -m "⚡ improve: reduce API response time by 40%"
git commit -m "📚 docs: add installation guide to README"
git commit -m "🔧 chore: bump Node.js version to 18.x"
```

---

*This convention is based on [Conventional Commits](https://www.conventionalcommits.org/) and [Gitmoji](https://gitmoji.dev/) standards.*