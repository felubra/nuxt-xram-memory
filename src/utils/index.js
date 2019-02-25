export const getMediaUrl = function(path) {
  try {
    return `${process.env.mediaUrl}${path}`
  } catch {
    return path
  }
}
