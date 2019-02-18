<template>
  <div>
    <NewsCard :label=true :footer=false :news-item="newsItem" />
    <NewsInfo :news-item="newsItem" />
  </div>
</template>

<script>
import NewsCard from '~/components/NewsCard'
import NewsInfo from '~/components/NewsInfo'
export default {
  components: {
    NewsCard,
    NewsInfo
  },
  computed: {
    newsItem() {
      return {
        url:
          'https://politica.estadao.com.br/noticias/geral,pivo-da-crise-no-governo-bebianno-tem-exoneracao-confirmada-pelo-planalto,70002726601',
        newspaper: {
          title: 'http://www1.folha.uol.com.br',
          url: 'http://www1.folha.uol.com.br'
        },
        featured: true,
        keywords: [],
        pdf_captures: [
          {
            pdf_capture_date: '2019-02-18T14:20:26.214143+00:00',
            pdf_document: {
              file_url:
                '/media/artifacts/documents/pdf_files/s__2019-02-18_112026201332.pdf',
              file_size: '858322'
            }
          }
        ],
        subjects: [],
        created_at: '2019-02-18T14:15:27.556044+00:00',
        language: '',
        published: true,
        title:
          'Três em dez praias são impróprias para banho no Brasil; pesquise',
        image_capture:
          '/media/artifacts/documents/image_files/s__2019-02-18_111932663354666993-970x600-1.jpeg.250x250_q85.jpg',
        id: 1408,
        modified_at: '2019-02-18T14:16:17.738846+00:00',
        published_date: '2017-02-18T02:00:00+00:00',
        teaser:
          'PublicidadeTrês em cada dez praias brasileiras ficaram impróprias para banho por mais de três meses ao longo de 2016.\nEspecialistas, contudo, não descartam contaminação até mesmo em praias consideradas limpas -embora a chance seja bem menor.\n"As classificações das praias são uma probabilidade.\nAssim como na Buraquinho, na Bahia, outras praias que ficam em foz de rios costumam ser impróprias.\nDiz ter investido R$ 450 mi em obras em orlas e mais R$ 58 milhões em obras de saneamento desde 2006.'
      }
    }
  }
}
</script>

<style scoped>
</style>
