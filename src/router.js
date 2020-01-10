import Vue from 'vue'
import Router from 'vue-router'

import Album from '~/pages/album/_album_id'
import Document from '~/pages/document/_document_id'
import News from '~/pages/news/_slug'
import Subject from '~/pages/subject/_slug'
import Subjects from '~/pages/subjects/'
import Slug from '~/pages/_slug'
import Contact from '~/pages/contact'
import Images from '~/pages/images'
import Index from '~/pages/index'
import Search from '~/pages/search'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/contato',
        component: Contact,
        name: 'contact',
        alias: '/contact'
      },
      {
        path: '/imagens',
        component: Images,
        name: 'images',
        alias: '/images'
      },
      {
        path: '/busca',
        component: Search,
        name: 'search',
        alias: '/search'
      },
      {
        path: '/assuntos',
        component: Subjects,
        name: 'subjects',
        alias: '/subjects'
      },
      {
        path: '/album/:album_id?',
        component: Album,
        name: 'album-album_id'
      },
      {
        path: '/documento/:document_id?',
        component: Document,
        name: 'document-document_id',
        alias: '/document/:document_id?'
      },
      {
        path: '/noticia/:slug?',
        component: News,
        name: 'news-slug',
        alias: '/news/:slug?'
      },
      {
        path: '/assunto/:slug?',
        component: Subject,
        name: 'subject-slug',
        alias: '/subject/:slug?'
      },
      {
        path: '/',
        component: Index,
        name: 'index'
      },
      {
        path: '/:slug',
        component: Slug,
        name: 'slug'
      }
    ]
  })
}
