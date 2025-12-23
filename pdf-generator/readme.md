# Puppeteer PDF Generator (Docker)

Generate a PDF from any public URL using Puppeteer, fully isolated in Docker.
The URL and output filename are configurable at runtime.

---

## Requirements

- Docker
- Docker daemon running

No Node.js, Chromium, or system dependencies are required on the host.

---

## Project structure

```text
.
├── Dockerfile
├── package.json
├── generate.js
└── README.md
```

---

## Build the Docker image

From the project root:

```bash
docker build -t cv-pdf .
```

---

## Basic usage

Generate a PDF using default values:

```bash
docker run --rm -v "$(pwd):/output" cv-pdf
```

Defaults:
- URL: https://cv.deverage.ch
- Output file: CV_Muller_Celien.pdf
- Output directory inside container: /output

The generated PDF will appear in the current directory on the host.

---

## Command line arguments

You can override the URL and output filename using CLI arguments.

### Set the URL

```bash
docker run --rm -v "$(pwd):/output" cv-pdf   --url "https://example.com"
```

### Set the output filename

```bash
docker run --rm -v "$(pwd):/output" cv-pdf   --out "my_file.pdf"
```

### Set both

```bash
docker run --rm -v "$(pwd):/output" cv-pdf   --url "https://example.com"   --out "example.pdf"
```

---

## Environment variables (alternative)

Configuration can also be provided using environment variables.

```bash
docker run --rm -v "$(pwd):/output"   -e URL="https://example.com"   -e OUT_FILE="example.pdf"   cv-pdf
```

Available variables:
- URL       target page to render
- OUT_FILE output PDF filename
- OUT_DIR  output directory (default: /output)

---


## Notes: missing icons (LinkedIn, GitHub)

Depending on the website and how icons are loaded, Puppeteer can sometimes generate the PDF before those assets are fully available. The result is a PDF where some icons (for example LinkedIn or GitHub) are missing.

If this happens, simply rerun the command. In some cases, a couple of runs are needed until the icons are correctly loaded and embedded in the PDF.
