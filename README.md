# Drill Room

Drill Room is a distraction-free workspace for practicing coding interviews. It has two standalone pages: a lightweight no-execution editor and a browser-based Python test runner.

## Choose a Room

- [`drill_room.html`](./drill_room.html) is the original dependency-free editor: syntax highlighting, timer, notes, and no code execution.
- [`drill_room_compiler.html`](./drill_room_compiler.html) is a reusable Python + `unittest` runner. Its problem, description, solution, visible tests, and notes are all editable and saved locally.

## Features

- Python syntax highlighting without autocomplete, linting, or execution in the lightweight editor
- Python standard-library `unittest` execution, structured failures, raw output, Stop, and a three-second timeout in the compiler
- Configurable 15, 25, 45, and 60 minute sessions
- Four-space indentation with smart Enter, Backspace, Tab, and Shift+Tab behavior
- Undo and redo support in the highlighted editor
- Local session persistence for the problem, code, notes, timer duration, and sound preference
- Copy code or copy a complete, line-numbered session for review
- Responsive layout for desktop and smaller screens
- No build step, account, analytics, or backend

## Use It

1. Download either [`drill_room.html`](./drill_room.html) or [`drill_room_compiler.html`](./drill_room_compiler.html).
2. Open it in Chrome, Edge, Firefox, or Safari.
3. Enter a problem name, choose a timer duration, and write your solution.

You can also clone the repository and open either page directly:

```bash
git clone https://github.com/evoltriet/drill-room.git
cd drill-room
```

The lightweight editor never needs a network connection. The compiler downloads a pinned Pyodide runtime the first time it loads, so it needs internet access. If a browser blocks workers from a `file://` URL, run `python -m http.server` in this folder and open `http://localhost:8000/drill_room_compiler.html` instead.

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

Session data stays in the browser's local storage under separate keys for each room. Drill Room has no backend and does not transmit code, notes, or problem names anywhere. The compiler fetches its Python runtime from jsDelivr, but your source and test data remain in the browser. Clearing site data removes saved sessions.

## Development

The project intentionally avoids a framework and build pipeline. Edit the relevant HTML page, then run the validation check:

```bash
node scripts/check.mjs
```

The check validates the inline JavaScript and the small set of DOM contracts the app relies on. A manual keyboard test checklist is included in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Contributing

Issues and pull requests are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a change. For security concerns, follow [SECURITY.md](./SECURITY.md).

## License

Drill Room is available under the [MIT License](./LICENSE).
