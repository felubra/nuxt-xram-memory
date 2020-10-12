export default ($axios) => ({
  News: {
    getBySlug (slug) {
      return $axios.$get(`/api/v1/news/${slug}`)
    }
  },
  Documents: {
    getById (id) {
      return $axios.$get(`/api/v1/document/${id}`)
    },
    getPages (documentId) {
      return $axios.$get(`/api/v1/document/${documentId}/pages`)
    }
  },
  Pages: {
    getBySlug (slug) {
      return $axios.$get(`/api/v1/page/${slug}`)
    },
    getAllPagesInMenu () {
      return $axios.$get('api/v1/pages?filterBy=in_menu')
    },
    getAllFeatured () {
      return $axios.$get('api/v1/pages?filterBy=featured')
    }
  },
  Albums: {
    all () {
      return $axios.$get('api/v1/albums')
    },
    getById (id) {
      return $axios.$get(`/api/v1/album/${id}`)
    }
  },
  Keywords: {
    all (max) {
      return $axios.$get(`/api/v1/keywords/top?max=${max}`)
    }
  },
  Subjects: {
    getBySlug (slug) {
      return $axios.$get(`api/v1/subject/${slug}`)
    },
    getItems (slug) {
      return $axios.$get(`api/v1/subject/${slug}/items`)
    },
    getInitials () {
      return $axios.$get('api/v1/subjects/initials')
    },
    getByInitial (initial) {
      return $axios.$get(`api/v1/subjects/initial/${initial}`)
    },
    getFeatured (limit = 5) {
      return $axios.$get(`api/v1/subjects/featured?limit=${limit}`)
    }
  }
})
