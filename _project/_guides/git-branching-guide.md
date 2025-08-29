# Git Branching Standards and Best Practices Guide

## Table of Contents
- [Branch Naming Conventions](#branch-naming-conventions)
- [Popular Branching Strategies](#popular-branching-strategies)
- [Best Practices](#best-practices)
- [Branch Management](#branch-management)
- [Common Patterns](#common-patterns)
- [Tools and Resources](#tools-and-resources)

## Branch Naming Conventions

### Standard Prefixes
Use descriptive prefixes to categorize your branches:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New features or enhancements | `feature/user-authentication` |
| `bugfix/` | Bug fixes | `bugfix/login-validation-error` |
| `hotfix/` | Urgent production fixes | `hotfix/security-vulnerability` |
| `release/` | Release preparation | `release/v2.1.0` |
| `chore/` | Maintenance, refactoring, tooling | `chore/update-dependencies` |
| `docs/` | Documentation updates | `docs/api-documentation` |
| `test/` | Adding or updating tests | `test/unit-tests-auth` |

### Naming Rules
- **Use lowercase** with hyphens (kebab-case)
- **Be descriptive** but concise (aim for 2-4 words)
- **Include ticket numbers** when applicable: `feature/JIRA-123-oauth-integration`
- **Avoid special characters** except hyphens and forward slashes
- **Use present tense** for action-oriented names

### Examples of Good Branch Names
```
feature/shopping-cart
bugfix/checkout-payment-error
hotfix/memory-leak-fix
release/v3.2.0
chore/eslint-configuration
docs/readme-update
test/integration-tests-api
```

### Examples of Poor Branch Names
```
fix-stuff          # Too vague
Feature/NewLogin   # Inconsistent casing
bug_fix_123        # Use hyphens, not underscores
temp               # Not descriptive
john-working       # Personal names
```

## Popular Branching Strategies

### 1. Git Flow
**Best for:** Large teams, scheduled releases, complex projects

#### Branch Structure:
- **`main`** - Production-ready code, tagged releases
- **`develop`** - Integration branch, latest development changes
- **`feature/*`** - New features, branch from develop, merge back to develop
- **`release/*`** - Release preparation, branch from develop, merge to main and develop
- **`hotfix/*`** - Emergency fixes, branch from main, merge to main and develop

#### Workflow:
```
main ──────●────────●────────●──── (production releases)
           │        │        │
develop ───┴──●──●──┴──●──●──┴──── (integration)
              │  │     │  │
feature/x ────┴──┘     │  │
feature/y ─────────────┴──┘
```

### 2. GitHub Flow
**Best for:** Continuous deployment, smaller teams, web applications

#### Branch Structure:
- **`main`** - Always deployable, production code
- **`feature/*`** - All work branches directly from main

#### Workflow:
1. Create branch from main
2. Make changes and commit
3. Open pull request
4. Deploy from branch for testing
5. Merge to main after review

### 3. GitLab Flow
**Best for:** Different deployment environments, staged releases

#### Branch Structure:
- **`main`** - Development work
- **`pre-production`** - Staging environment
- **`production`** - Production environment
- **`feature/*`** - Feature development

#### Workflow:
```
main ──────●──●──●──●────────────── (development)
           │  │  │  │
pre-prod ──┴──┴──●──┴──●─────────── (staging)
                 │     │
production ──────┴─────┴─────────── (live)
```

### 4. Forking Workflow
**Best for:** Open source projects, external contributors

- Contributors fork the repository
- Work in their own fork
- Submit pull requests to main repository
- Maintainers review and merge

## Best Practices

### Branch Creation
- **Start from the right base:** Feature branches from `develop`, hotfixes from `main`
- **Keep branches small:** Focus on single features or fixes
- **Update branch names:** If scope changes significantly, consider renaming

### Development Workflow
- **Sync regularly:** Pull latest changes from base branch frequently
```bash
git checkout main
git pull origin main
git checkout feature/my-feature
git merge main  # or git rebase main
```

- **Commit frequently:** Small, logical commits with clear messages
- **Test before merging:** Ensure all tests pass and code works

### Code Review Process
- **Always use pull/merge requests** for code review
- **Write clear PR descriptions** with context and testing instructions
- **Review your own code first** before requesting review
- **Address feedback promptly** and professionally

### Branch Cleanup
- **Delete merged branches** to keep repository clean
```bash
# Delete local branch
git branch -d feature/completed-feature

# Delete remote branch
git push origin --delete feature/completed-feature
```

- **Use automated cleanup:** Set up tools to delete stale branches
- **Archive important branches:** Tag before deletion if needed for reference

## Branch Management

### Protecting Important Branches
Configure branch protection rules for `main` and `develop`:
- Require pull request reviews
- Require status checks to pass
- Restrict who can push directly
- Require branches to be up to date

### Continuous Integration
- **Run tests on all branches** automatically
- **Block merges** if tests fail
- **Use status checks** in pull requests
- **Deploy feature branches** to staging environments

### Semantic Versioning
Tag releases with semantic versioning:
```bash
git tag -a v1.2.3 -m "Release version 1.2.3"
git push origin v1.2.3
```

## Common Patterns

### Feature Flags
Use feature flags instead of long-lived feature branches:
```javascript
if (featureFlag.isEnabled('new-checkout-flow')) {
  // New feature code
} else {
  // Existing code
}
```

### Release Branches
Create release branches for final preparation:
```bash
git checkout -b release/v2.1.0 develop
# Final bug fixes, version bumps, changelog updates
git checkout main
git merge --no-ff release/v2.1.0
git tag v2.1.0
```

### Hotfix Process
For urgent production fixes:
```bash
git checkout -b hotfix/critical-bug main
# Make minimal fix
git checkout main
git merge --no-ff hotfix/critical-bug
git tag v2.0.1
git checkout develop
git merge --no-ff hotfix/critical-bug
```

## Tools and Resources

### Git Aliases
Add these to your `.gitconfig`:
```ini
[alias]
    co = checkout
    br = branch
    st = status
    cm = commit -m
    po = push origin
    lo = log --oneline --graph --decorate
```

### Useful Commands
```bash
# List all branches
git branch -a

# Clean up merged branches
git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d

# Show branch history
git log --graph --pretty=oneline --abbrev-commit

# Compare branches
git diff main..feature/my-branch
```

### Recommended Tools
- **GitKraken, SourceTree, or Tower** - GUI Git clients
- **GitHub Desktop** - Simple Git interface
- **Conventional Commits** - Standardized commit messages
- **Husky** - Git hooks for automation
- **Branch naming linters** - Enforce naming conventions

### Further Reading
- [Git Flow Original Article](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [GitLab Flow Documentation](https://docs.gitlab.com/ee/topics/gitlab_flow.html)
- [Atlassian Git Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Pro Git Book](https://git-scm.com/book) - Free comprehensive Git guide

## Quick Reference Cheat Sheet

### Common Branch Operations
```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# List branches
git branch -a

# Delete branch
git branch -d branch-name

# Rename current branch
git branch -m new-branch-name

# Push new branch to remote
git push -u origin feature/new-feature
```

### Merging vs Rebasing
- **Merge:** Preserves branch history, creates merge commits
- **Rebase:** Creates linear history, cleaner but rewrites history

Choose based on team preferences and project requirements.

---

*Remember: The best branching strategy is the one your team consistently follows. Start simple and evolve your practices as your project grows.*