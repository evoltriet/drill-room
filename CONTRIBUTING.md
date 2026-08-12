# Contributing to Drill Room

Thanks for helping make focused interview practice more useful and accessible.

## Before You Start

- Search existing issues before opening a new one.
- Keep the application dependency-free unless a proposal clearly justifies changing that constraint.
- Preserve the core practice environment: no autocomplete, linting, code execution, accounts, or remote data collection.
- Keep changes focused and avoid unrelated visual or structural rewrites.

## Local Workflow

1. Fork and clone the repository.
2. Create a focused branch from `main`.
3. Edit `index.html` and any relevant documentation.
4. Run the validation check:

```bash
node scripts/check.mjs
```

5. Open `index.html` in a modern browser and manually test the affected behavior.

## Editor Test Checklist

- Type Python containing keywords, strings, numbers, comments, and function definitions; highlighting should update without moving the caret.
- Press `Enter` on an indented line; the new line should retain its indentation.
- Press `Enter` after a line ending in `:`; the new line should gain four spaces.
- Press `Backspace` in leading whitespace; one visual indentation level should be removed.
- Select multiple lines and test `Tab` and `Shift+Tab`.
- Test undo and redo after typing, pasting, indenting, and deleting a selection.
- Enter values in the problem, code, and notes fields, press `Ctrl+S` or `Cmd+S`, reload, and confirm they return.
- Test both wide and narrow browser windows for overlap or clipped controls.

## Pull Requests

Explain what changed, why it helps interview practice, and which checks you ran. Include screenshots only when the visual result matters. Keep pull requests small enough to review in one sitting.
