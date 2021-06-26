import { api, images } from 'config'

const _DIRECTION = ['mobile', 'desktop']
const { imageSizes: _SIZES } = images

const mImageUrl = (path, size) => `${api.url}/img/${size}/resize/${path}`

const extraSizesMap = (path, extraSizes) =>
  extraSizes
    .map(extraSize => {
      return `${mImageUrl(path, extraSize[0])} ${extraSize[1]}`
    })
    .join(', ')

const mImage = (path, componentName) => {
  const size = _SIZES[componentName].default.size
  return mImageUrl(path, size)
}

const mImageSet = (path, componentName) => {
  const sizes = _SIZES[componentName]
  const source = _DIRECTION
    .map(device => {
      if (!sizes.hasOwnProperty(device)) return
      const { media, size, extraSizes = null } = sizes[device]

      const primaryUrl = mImageUrl(path, size)

      const srcset = extraSizes
        ? `${primaryUrl}, ` + extraSizesMap(path, extraSizes)
        : primaryUrl

      return { srcset, media }
    })
    .filter(device => !!device)
  return source
}

export { mImage, mImageSet }
