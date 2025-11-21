# Ace Linters

**Ace Linters** is a powerful plugin for [Acode Editor](https://github.com/Acode-Foundation/Acode) that integrates the [ace-linters](https://github.com/mkslanc/ace-linters) library to provide advanced language features like code linting, formatting, and autocompletion.

## 🚀 Features

* **Linting**: Detects syntax errors and potential bugs in real-time.
* **Code Formatting**: Beautifies code with standard indentation rules.
* **Autocompletion**: Provides code suggestions while typing.
* **Hover Tooltips**: Displays variable types, documentation, and color previews when clicking/hovering code.
* **Document Highlighting**: Automatically highlights all references of the selected variable in the file.

## 📦 Supported Languages & Capabilities

| Language | Linting | Formatting | Autocomplete | Hover Info | Doc Highlight |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **JavaScript / TS** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **HTML** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **CSS / SCSS / LESS** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **JSON / JSON5** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **YAML** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Lua** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Python** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **XML** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **PHP** | ✅ | ❌ | ❌ | ❌ | ❌ |

## 📥 Installation

1. Open **Acode Editor**.
2. Navigate to **Settings** → **Plugins**.
3. Click on the **Search** icon.
4. Search for **"Ace Linters"**.
5. Click **Install**.
6. **Restart** Acode to apply changes.

## 🛠 Usage

### Linting
Linting is active automatically. Open any supported file, and syntax errors will be highlighted in the gutter (sidebar) with red/yellow icons. Tap the error icon to see the specific error message.

### Autocomplete & Hover
* **Autocomplete:** Suggestions will appear automatically as you type (e.g., typing `Math.` in JS or `color:` in CSS).
* **Hover:** Tap or click on a variable/property to see its definition or type information.
* **Document highlighting:** Click on a variable or tag to see other occurrences highlight automatically.

### Formatting
Ace Linters registers itself as a formatter for supported languages.
1. Open a file.
2. Open the 3-dot menu.
3. Select **Format**.

## 📄 License

This project is licensed under the **MIT** License.
