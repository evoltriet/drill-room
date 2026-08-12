# Drill Room

Drill Room is a distraction-free workspace for practicing coding interviews. It combines a lightweight Python editor, a configurable countdown timer, and a separate area for narrating tradeoffs, edge cases, and complexity.

The entire application lives in one dependency-free HTML file. Download it, open it in a modern browser, and start practicing.

## Features

- Python syntax highlighting without autocomplete, linting, or execution
- Configurable 15, 25, 45, and 60 minute sessions
- Four-space indentation with smart Enter, Backspace, Tab, and Shift+Tab behavior
- Undo and redo support in the highlighted editor
- Local session persistence for the problem, code, notes, timer duration, and sound preference
- Copy code or copy a complete, line-numbered session for review
- Responsive layout for desktop and smaller screens
- No dependencies, build step, account, analytics, or network requests

## Use It

1. Download [`index.html`](./index.html).
2. Open it in Chrome, Edge, Firefox, or Safari.
3. Enter a problem name, choose a timer duration, and write your solution.

You can also clone the repository and open `index.html` directly:

```bash
git clone https://github.com/evoltriet/drill-room.git
cd drill-room
```

No installation or local server is required.

## Keyboard Controls

| Shortcut | Behavior |
| --- | --- |
| `Tab` | Insert four spaces, or indent selected lines |
| `Shift+Tab` | Remove one leading indentation level from selected lines |
| `Enter` | Continue the current indentation and indent after a Python `:` |
| `Backspace` | Remove one indentation level while the caret is in leading whitespace |
| `Ctrl+Z` / `Cmd+Z` | Undo an editor change |
| `Ctrl+Y` / `Cmd+Shift+Z` | Redo an editor change |
| `Ctrl+S` / `Cmd+S` | Save the current session immediately |

Drill Room also saves automatically shortly after fields change.

## Privacy

Session data stays in the browser's local storage under `drill-room.session.v1`. Drill Room has no backend and does not transmit code, notes, or problem names anywhere. Clearing site data in the browser removes the saved session.

## Development

The project intentionally avoids a framework and build pipeline. Edit `index.html`, then run the zero-dependency validation check:

```bash
node scripts/check.mjs
```

The check validates the inline JavaScript and the small set of DOM contracts the app relies on. A manual keyboard test checklist is included in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Contributing

Issues and pull requests are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a change. For security concerns, follow [SECURITY.md](./SECURITY.md).

## License

Drill Room is available under the [MIT License](./LICENSE).
