import Vue from 'vue'
import { mImage, mImageSet } from './logic'
import { once } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'

export const KEY = 'vsf-magento-image'

export const VsfMagentoImage: StorefrontModule = function ({ appConfig }) {
  if (!appConfig.images.imageSizes) {
    Logger.warn('VSF Magento Image extensions is not working. Ensure you\'ve defined "imageSizes" in config.', 'VSF-Magento-Image')()
    return
  }
  once('__VUE_EXTEND_VMI__', () => {
    Vue.prototype.$mImage = (path: string, componentName: string): string => mImage(path, componentName)
    Vue.prototype.$mImageSet = (path: string, componentName: string): any => mImageSet(path, componentName)
  })
}
