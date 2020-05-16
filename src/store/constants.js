export const EMPTY = 'empty' // sem índice - estado inicial
export const DOWNLOADING = 'downloading' // baixando o arquivo com o índice
export const LOADING = 'loading' // carregando o arquivo na memória
export const LOADED = 'loaded' // arquivo carregado - índice pronto para busca
export const LOAD_ERROR = 'load_error' // falha no carregamento do índice
export const DOWNLOAD_ERROR = 'download_error' // falha no download do arquivo do índice

/** Estados possíveis de download do índice */
export const LUNR_INDEX_STATUSES = [
  EMPTY,
  DOWNLOADING,
  LOADING,
  LOADED,
  LOAD_ERROR,
  DOWNLOAD_ERROR
]

/** Nomes de mutação */
export const LOAD_LUNR_INDEX = 'loadLunrIndex'
export const SET_LUNR_INDEX_STATUS = 'setLunrIndexStatus'
