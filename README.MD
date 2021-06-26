# VSF Magento Image

## Basic config

```json
"images": {
  "imageSizes": {
    "productTile": {
        "default": {
          "size": "/200/200"
        },
        "mobile": {
          "size": "/240/240",
          "media": "(max-width: 767px)"
        },
        "desktop": {
          "size": "/320/320",
          "extra_size": [["/480/480", "2x"]],
          "media": "(min-width: 768px)"
        }
      },
      "productGallery": {
        "default": {
          "size": "/390/390"
        },
        "mobile": {
          "size": "/291/291",
          "media": "(max-width: 767px)"
        },
        "desktop": {
          "size": "/480/480",
          "extra_size": [["/780/780", "2x"]],
          "media": "(min-width: 768px)"
        }
      }
  }
}
```
