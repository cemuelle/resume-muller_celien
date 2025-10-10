# CV Template (HTML + JSON)

A minimalist and multilingual CV (resume) template built using **HTML**, **CSS**, and **JavaScript**.  
Content, structure, and icons are fully configurable through JSON files.

---

## 🧩 Project Structure

```
index.html
favicon.ico
cv_photo.jpg
icons.json
style.css
lang/
  lang-en.json
  lang-fr.json
  lang-de.json 
```

---

## 🚀 Getting Started

### 1. Open the CV
Just open `index.html` in a web browser. It runs entirely client-side.

### 2. Language Detection
The CV automatically loads in your browser's language (`fr`, `en` or `de`).  
You can manually switch language via the 🌐 button.

### 3. Theme Switching
Click the 🌓 button to toggle between **light** and **dark** modes.  
Your preference is saved in local storage.

---

## 🌐 Language Files (`lang-xx.json`)

Each language file defines the entire CV content. Example:

```json
{
  "htmlLang": "en",
  "docTitle": "CV - John Doe",
  "name": "John Doe",
  "title_description": "Software Engineer | Data Specialist",
  "adjectives": "Curious, focused, and adaptive",
  "photo": "cv_photo.jpg",

  "info": [
    { "label": "Mail", "value": "john@example.com", "type": "email" },
    { "label": "Phone", "value": "+41 79 123 45 67", "type": "tel" },
    { "label": "Website", "value": "https://example.com", "type": "url" }
  ],

  "links": [
    { "label": "LinkedIn", "url": "https://linkedin.com/in/johndoe", "icon": "linkedin" },
    { "label": "GitHub", "url": "https://github.com/johndoe", "icon": "github" }
  ],

  "sections": [
    { "title": "Experience", "type": "timeline", "items": [...] },
    { "title": "Skills", "type": "badges", "items": [...] },
    ...
  ],

  "footer": "© 2025 John Doe. All rights reserved.",
  "theme_button": "🌓 Theme",
  "lang_button": "🌐 Language"
}
```

### `info` Field Types

| Type | Description | Example |
|------|--------------|----------|
| `"email"` | Creates a mailto link | [john@example.com](mailto:john@example.com) |
| `"tel"` | Clickable phone link | [+41791234567](tel:+41791234567) |
| `"url"` | Opens external link | [https://example.com](https://example.com) |
| *(none)* | Plain text | `Lausanne, Switzerland` |

---

## 🧱 Section Types

Each entry in `"sections"` represents a CV block. Supported `type` values:

| Type | Description | Example Use |
|------|--------------|-------------|
| `timeline` | Two-column grid (period + text) | Education, experience |
| `badges` | Inline rounded tags | Skills, languages |
| `list` | Bulleted list | Projects, achievements |
| `lines` | Multi-line text | Quick facts |
| `section` | Single text block | Interests, summary |

Example (timeline):

```json
{
  "title": "Professional experience",
  "type": "timeline",
  "items": [
    { "period": "2020 - 2025", "text": "Software Engineer at ExampleCorp" },
    { "period": "2018 - 2020", "text": "Intern at DataWorks" }
  ]
}
```

Example (badges):

```json
{
  "title": "Technical skills",
  "type": "badges",
  "items": ["Python", "Docker", "Linux"]
}
```

---

## 🎨 Icons (`icons.json`)

Icons are defined once and referenced by name in each language file.

```json
{
  "linkedin": {
    "viewBox": "0 0 448 512",
    "path": "M100.28 448H7.4V148.9h92.88z..."
  },
  "github": {
    "viewBox": "0 0 16 16",
    "path": "M8 0C3.58 0 0 3.58..."
  }
}
```

Add new icons by exporting SVG path data and adding an entry with:
- `viewBox` from the original SVG
- `path` string

Use them with `"icon": "yourIconName"` in your JSON links.

---

## 🧰 Customization

| Area | How to modify |
|------|----------------|
| **Photo** | Replace `cv_photo.jpg` or update the `"photo"` path |
| **Colors** | Adjust CSS variables in `<style>` inside `index.html` |
| **Languages** | Add more `lang-xx.json` files |
| **Icons** | Extend `icons.json` |
| **Fonts** | Update font-family in CSS |
| **Theme preference** | Stored in `localStorage` under `"theme"` |

---

## 🧩 Technical Details

- **No dependencies**: Works offline in any modern browser.
- **Responsive layout**: Automatically adapts for mobile screens.
- **Internationalization**: Uses `lang-xx.json` for dynamic content loading.
- **Timeline alignment**: Auto-aligns period column widths.

---

## ⚙️ Internal Logic Overview

- `index.html` dynamically loads:
  - `icons.json` once on startup.
  - `lang-xx.json` depending on user choice or browser settings.
- The rendering process:
  1. Load JSON.
  2. Render name, photo, info, links, and sections.
  3. Align timeline columns.
  4. Apply theme and language buttons.

---

## 🧠 Tips for Maintenance

- Keep your JSON minimal and consistent.
- Avoid HTML injection except for safe `<br>` or `<i>` tags in text.
- To reset preferences, clear browser local storage for this page.

---

## 🧾 License

```
GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007
```

This project is licensed under the GNU GPL v3.  
You may redistribute and/or modify it under the same license.

For full license text: https://www.gnu.org/licenses/gpl-3.0.html