import * as English from './common/locales/en.json';
import type { WidgetConfig } from './common/visenze-core';

const DEFAULT_CONFIGS: WidgetConfig = {
  // ----ViSearch SDK and tracking parameters---- //
  appSettings: {
    appKey: '', // APP_KEY - required
    placementId: '', // PLACEMENT_ID - required
    country: '', // 2 DIGIT COUNTRY CODE
    uid: '', // UID,
    endpoint: '',
    gtmTracking: false, // If true, the widget will push result_load event to GTM objects
    // The visearch SDK by default resize image uploaded to 512 x 512
    // To change the max dimension of image, fill this params with {maxWidth: ${width value in px}, maxHeight: ${height value in px}}
    // eg: resizeSettings: {maxWidth: 1024, maxHeight: 1024},
    resizeSettings: {maxHeight: 100000, maxWidth: 100000},
  },
  // ----API additional parameters---- //
  searchSettings: {
    // Mapped metadata keys to be returned
    // eg: attrs_to_get: ['product_name', 'link' ,'sale_price', 'brand_name', 'merchant_category'],
    attrs_to_get: [],
    limit: 20, // The number of results returned
  },
  // ----Visual settings---- //
  displaySettings: {
    cssSelector: '',
    cameraButtonSelector: '',
    fileDropzoneImage: 'https://visenze-static.s3.amazonaws.com/demos/ms-adidas/upload-icon.png',
    // Field mapping for Product Card. Fields are based on the schema, you can't give a field which doesn't exist in the schema.
    productDetails: {
      mainImageUrl: '',
      productUrl: '',
      title: '',
      price: '',
      originalPrice: '',
      category: '',
      brand: '',
      gender: '',
      sizes: '',
      colors: '',
    },
    breakpoints: {
      mobile: {
        maxWidth: 767,
      },
      tablet: {
        maxWidth: 1023,
      },
      desktop: {
        minWidth: 1024,
      },
    },
    customizeStyle: '',
  },
  // ----Language settings---- //
  languageSettings: {
    locale: '',
    text: {
      en: English,
    },
  },
  // ----Callback settings---- //
  callbacks: {
    // This will fire whenever an event is sent to ViSenze Analytics, or when `send` is called
    // trackingCallback: (action, params) => {},
    // @param {action} the action that is being recorded
    // @param {params} the attached metadata related to the action
    trackingCallback: undefined,
    // This will fire whenever an event is sent to ViSenze Analytics, or when `send` is called
    // onProductClick: (productDetails, trackingData) => {},
    // @param {productDetails} the details of the product
    // @param {trackingData} relevant metadata attached to the action
    onProductClick: undefined,
    // This will fire whenever response from a search API call returned
    // onSearchCallback: (apiResoonse) => {},
    // @param {apiResponse} response from visearch API
    onSearchCallback: undefined,
  },
  searchBarResultsSettings: {
    enableImageUpload: true,
    enableFindSimilar: true,
    redirectUrl: 'http://localhost:8080/',
  },
  hideTrigger: false,
  debugMode: false,
  disableAnalytics: false,
  maxRetryCount: 1,
  vttSource: '',
};

export default DEFAULT_CONFIGS;
