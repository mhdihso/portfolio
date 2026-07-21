---
draft: true
---

# Media library

Keep all portfolio assets here so Markdown remains the single source of truth for content and asset references.

- `images/` - diagrams, screenshots, and post images. Prefer WebP or compressed PNG/JPEG; use meaningful lower-case names such as `duckdb-query-plan.webp`.
- `documents/` - PDFs such as the CV. The current CV is `cv_2026.pdf`.

Reference an image from a page with a relative Markdown link:

```md
![Alt text describing the image](../media/images/my-image.webp)
```

For a PDF download, link with a site-root path:

```md
[Download the CV](/media/documents/cv_2026.pdf)
```

Do not place large raw video files in the repository. Upload them to a video host and embed or link them instead.
