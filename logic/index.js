import { api, images } from 'config'

const _DIRECTION = ['mobile', 'desktop']
const { imageSizes: _SIZES } = images

const mImageUrl = (path, size) => `${api.url}/img/${size}/resize/${path}`
const mImage = (path, componentName) => {
  const size = _SIZES[componentName].default
  return mImageUrl(path, size)
}
const mImageSet = (path, componentName) => {
  const sizes = _SIZES[componentName]
  const source = _DIRECTION.map(device => {
    if (!sizes.hasOwnProperty(device)) return
    const { media, size, extraSizes = null } = sizes

    const srcset = !extraSizes
      ? mImageUrl(path, size)
      : `${mImageUrl(path, size)}, ` +
        extraSizes
          .map(extraSize => {
            return `${mImageUrl(path, extraSize[0])} ${extraSize[1]}`
          })
          .join(', ')

    return { srcset, media }
  })

  return source
}

export { mImage, mImageSet }
