# 📘 Minecraft Plugin Docs – TODO

A GitBook-style documentation site for my Minecraft plugins using:

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)

---

## 🧭 Core Layout

- [x] Create responsive layout
  - [x] Sidebar on the left (acts like a card)
    - [x] Logo
    - [x] Plugin name
    - [x] Nav links
  - [x] Main content area on the right
- [x] Optional top nav with:
  - [x] Theme switcher
  - [x] Search input
  - [x] GitHub repo link

---

## 📄 Pages & Routing

- [x] Use Next.js App Router
- [x] Set up dynamic routing for docs  
  `app/docs/[...slug]/page.tsx`
- [x] Add MDX support with:
  - `@next/mdx` and
  - `next-mdx-remote`
- [x] Create directory structure:
  ```
  /docs
    ├── getting-started.mdx
    ├── config.mdx
    ├── commands.mdx
    └── permissions.mdx
  ```
- [x] Add fallback 404 page

---

## ✨ Features

- [x] Syntax highlighting for code blocks
- [x] Table of contents (auto-generated from headings)
- [x] Breadcrumb navigation
- [x] Sticky sidebar with scrollspy

---

## 🎨 Styling

- [x] Use Tailwind CSS for layout and spacing
- [x] Apply Shadcn `typography` styles to MDX content
- [x] Use `lucide-react` icons in sidebar and nav
- [x] Ensure mobile responsiveness:
  - [x] Collapsible sidebar
  - [x] Mobile-friendly typography

---

## 🔍 Extras

- [x] Search (Algolia DocSearch or Fuse.js)
- [x] Plugin switcher (multi-plugin documentation support)