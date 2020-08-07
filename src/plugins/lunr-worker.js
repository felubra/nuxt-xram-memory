import LunrWorker from '~/assets/js/lunr.worker.js'

export default (context, inject) => {
  inject('worker', {
    createWorker() {
      return new LunrWorker()
    }
  })
}
