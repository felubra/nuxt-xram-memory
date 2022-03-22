# xRAM-Memory's website

This is the website of xRAM-Memory project, a search engine and archive of news about political subjects.

## Data entities

- Content types:
  - News: a archived news;
  - Document: a document that could be an image, an pdf capture or other file;
  - Static page: an arbitrary content page created in the backend; and
  - Photo album: a set of image documents in a gallery.

- Taxonomy types:
  - Keyword: simple words associated with a piece of content
  - Subject: an topic with an title e.g. "President Temer imprisonment' associated with pieces of content and with a
    dedicated page

## Project structure

This site was made using [Nuxt.js 2.x](https://nuxtjs.org/), a framework based on [Vue.js framework](https://vuejs.org/)
The following folder structure was adopted:

```
src
├── assets
│   └── styles - global stylesheets in sass and stylus
├── components - components sorted by feature/area of use
│   ├── common
│   ├── home
│   ├── nav
│   ├── news
│   ├── search
│   └── viewers
├── config - static configuration and constants
├── data-sources - data services
│   └── api - REST api for the Django backend
├── layouts - layout components
├── middleware - functions plugged in the request/response lifecycle
├── pages - page components
│   ├── album
│   │   └── _album_id.vue
│   ├── contact.vue
│   ├── document
│   │   └── _document_id.vue
│   ├── images.vue
│   ├── index.vue
│   ├── news
│   │   └── _slug.vue
│   ├── search.vue
│   ├── _slug.vue
│   ├── subject
│   │   └── _slug.vue
│   ├── subjects
│   └── subjects.vue
├── plugins - third-party libraries and custom components
│   ├── contrib
│   └── custom
├── static - static files like images, icons and metadata
└── store - [Vuex](https://vuex.vuejs.org/) store
```
## Running the project

### Locally

By default, the front-end expect that the following services are running in the following ports:
- [Django (API)](https://github.com/felubra/django-xram_memory): `http://localhost:8000`
- [Contact Message Relay](https://github.com/felubra/xram_memory-contact_message_relay): `http://localhost:3001`

The `.env.dist` file is a template for a `.env`file that should be copied into `./src` folder. This file contains the environment options that allow, e.g., changing the addresses of the services above.

Providing an `.env` file is not needed unless you want to change the default values.

After installing the dependecies with `yarn`, you can run the site with the following command:

```bash
yarn dev
```
or
```bash
npm run dev
```

### Via Docker

#TODO: