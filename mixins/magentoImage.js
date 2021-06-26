import { mImage, mImageSet } from '../logic'

export default componentName => ({
  methods: {
    mImage(path) {
      return mImage(path, componentName)
    },
    mImageSet(path) {
      return mImageSet(path, componentName)
    }
  }
})
