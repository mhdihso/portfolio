# Mehdi Hosseini - Portfolio

A Markdown-first personal portfolio built with [Quartz 5](https://quartz.jzhao.xyz/). The website content lives entirely in `content/`; Quartz builds it into a static site.

## Content map

| What you want to change | Where |
| --- | --- |
| Home / short introduction | `content/index.md` |
| Bio, skills, education | `content/about/bio.md` |
| Work experience | `content/experience/` and `content/experience/index.md` |
| Academic projects | `content/projects/` |
| Contact details | `content/connect/index.md` |
| Blog posts | `content/blog/` |
| Images and documents | `content/media/` |
| Reusable post templates | `content/templates/` |
| Colours and typography | `quartz.config.yaml` |

## Write a blog post

1. Copy `content/templates/blog-post.md` into `content/blog/` with a dated name such as `2026-08-query-planning.md`.
2. Set its `title`, `description`, `date`, and `tags` in the frontmatter.
3. Keep `draft: true` while writing. Set `draft: false` to publish it.
4. Add a link to it in `content/blog/index.md` if you want a hand-curated post list.

Use `[[folder/page|Link label]]` for internal links. Quartz resolves these links and shows backlinks automatically.

## Add experience or a project

1. Copy `content/templates/experience.md` to `content/experience/` or `content/projects/`.
2. Replace the example text with results, responsibilities, and the tools used.
3. Set `draft: false` when ready.
4. Link it from the appropriate `index.md` page.

## Add media

Place images in `content/media/images/` and PDFs in `content/media/documents/`.

```md
![What the reader should see](../media/images/example.webp)
[Download a PDF](/media/documents/file.pdf)
```

Use meaningful filenames, compressed images, and clear alt text. Do not commit private material or large videos.

## Run locally

Quartz 5 requires Node 22+ and npm 10.9.2+.

```sh
npm install
npx quartz plugin install --from-config
npx quartz build --serve
```

Open `http://localhost:8080`. The server rebuilds as you edit Markdown.

## Deploy with GitHub Pages

1. Create an empty GitHub repository (for example `portfolio`).
2. Set `configuration.baseUrl` in `quartz.config.yaml` to `mhdihso.github.io/portfolio`. If you publish at `mhdihso.github.io`, use `mhdihso.github.io` instead.
3. In GitHub: **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. The included `.github/workflows/deploy-pages.yml` deploys every push to `main`.
4. Commit and push the repository. The current Quartz deployment reference is <https://quartz.jzhao.xyz/hosting>.

Before publishing, review `content/connect/index.md`: the email address and downloadable CV are public by design.
