# VSF Magento Image

## Config

### Base

Everything except component name and its default property is optional!

```json
{
  "images": {
    "imageSizes": {
      "[component name or just desired name for this sizing]": {
        "default": {
          "size": "<x>/<y>"
        },
        "mobile": {
          "size": "<x>/<y>",
          "media": "<media_query>",
          "extra_sizes": "[["<x>/<y>", "<size>"], [...]]" // OPTIONAL
        },
        "desktop": {
          "size": "[X]/[Y]",
          "media": "([max-width/min-width]: [size]])",
          "extra_sizes": "[["<x>/<y>", "<size>"], [...]]" // OPTIONAL
        }
      }
    }
  }
}
```

### Example

```json
{
  "images": {
    "imageSizes": {
      "productTile": {
        "default": {
          "size": "200/200"
        },
        "mobile": {
          "size": "240/240",
          "media": "(max-width: 767px)"
        },
        "desktop": {
          "size": "320/320",
          "extra_size": [["480/480", "2x"]],
          "media": "(min-width: 768px)"
        }
      },
      "productGallery": {
        "default": {
          "size": "390/390"
        },
        "mobile": {
          "size": "291/291",
          "media": "(max-width: 767px)"
        },
        "desktop": {
          "size": "480/480",
          "extra_size": [["780/780", "2x"]],
          "media": "(min-width: 768px)"
        }
      }
    }
  }
}
```

## Usage

### As module

You can use it within 2 global functions after registering in `client.ts` as a module.

```js
import { VsfMagentoImage } from './vsf-magento-image'

export function registerClientModules() {
  //...
  registerModule(VsfMagentoImage)
}
```

#### \$mImage(path, componentName)

It returns parsed URL for path and set up sizing for specified component name (or just sizing name)

```
https://someurl/img/[X]/[Y]/resize/[PATH]
https://someurl/img/343/343/resize/pub/media/amasty/blog/image.png

```

#### \$mImageSet(path, componentName)

It returns **source set** with parsed URLs for paths and set up sizing for specified component name (or just sizing name) and its extra sizes with medias.

```
[
  {
    "srcset":"https://someurl/img/[X]/[Y]/resize/[PATH]",
    "media":"[MEDIA]"
  },
  {
    "srcset":"https://someurl/img/[EXTRA_X]/[EXTRA_Y]/resize/[PATH], https://someurl/img/[EXTRA_X]/[EXTRA_Y]/resize/[PATH] [SIZE]",
    "media":"[MEDIA]"
  }
]
[
  {
    "srcset":"https://someurl/img/343/343/resize/pub/media/amasty/blog/image.png",
    "media":"(max-width: 767px)"
  },
  {
    "srcset":"https://someurl/img/432/432/resize/pub/media/amasty/blog/image.png, https://someurl/img/720/720/resize/pub/media/amasty/blog/image.png 2x",
    "media":"(min-width: 768px)"
  }
]
```

### As component

Usage is the same as above, but if u decided to use it as a component, you have to input in it **componentName**, so you want have to call it every time you use this function.

```js
import magentoImage from 'modules/vsf-magento-image/mixins/magentoImage.js'

export default {
  //...
  mixins: [magentoImage('component name'))]
}
```

so **\$mImage(path, componentName)** is now just **mImage(path)**. **\$mImageSet** works the same.

## Recommendation

We highly recommend to use it with [nuiPicture](https://github.com/naked-ui/vue)! You can create wrapping mixin for it:

```js
export default component => ({
  methods: {
    imageSet(url, alt) {
      const src = this.$mImage(url, component)
      const sources = this.$mImageSet(url, component)

      return {
        src,
        alt,
        sources
      }
    }
  }
})
```

so its usage is so simply:

```html
<nuiPicture
  :image="imageSet('some/path/image.png', 'some alt name')"
  width="100"
  height="100"
/>
```
