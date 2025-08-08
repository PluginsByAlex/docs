# 📘 Minecraft Plugin Docs – TODO

A GitBook-style documentation site for my Minecraft plugins using:

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)

---

## 🧭 Core Layout

- [ ] Create responsive layout
  - [ ] Sidebar on the left (acts like a card)
    - [ ] Logo
    - [ ] Plugin name
    - [ ] Nav links
  - [ ] Main content area on the right
- [ ] Optional top nav with:
  - [ ] Theme switcher
  - [ ] Search input
  - [ ] GitHub repo link

---

## 📄 Pages & Routing

- [ ] Use Next.js App Router
- [ ] Set up dynamic routing for docs  
  `app/docs/[...slug]/page.tsx`
- [ ] Add MDX support with:
  - `@next/mdx` or
  - `next-mdx-remote`
- [ ] Create directory structure:
  ```
  /docs
    ├── getting-started.mdx
    ├── config.mdx
    ├── commands.mdx
    └── permissions.mdx
  ```
- [ ] Add fallback 404 page

---

## ✨ Features

- [ ] Syntax highlighting for code blocks
- [ ] Table of contents (auto-generated from headings)
- [ ] Breadcrumb navigation
- [ ] Sticky sidebar with scrollspy

---

## 🎨 Styling

- [ ] Use Tailwind CSS for layout and spacing
- [ ] Apply Shadcn `typography` styles to MDX content
- [ ] Use `lucide-react` icons in sidebar and nav
- [ ] Ensure mobile responsiveness:
  - [ ] Collapsible sidebar
  - [ ] Mobile-friendly typography

---

## 🔍 Extras

- [ ] Search (Algolia DocSearch or Fuse.js)
- [ ] Plugin switcher (multi-plugin documentation support)