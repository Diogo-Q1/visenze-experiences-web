import type { Root } from 'react-dom/client';
import type { ProductSearchResponse, ViSearchClient } from 'visearch-javascript-sdk';
import type { ErrorHandler, SuccessHandler } from './types/function';

// model

type Primitive = boolean | string | number;

export enum WidgetType {
  CAMERA_SEARCH = 'camera_search',
  SIMILAR_SEARCH = 'similar_search',
  SEARCH_RESULTS_PAGE = 'search_results_page',
  SHOPPING_ASSISTANT = 'shopping_assistant',
  RECOMMEND_ME = 'recommend_me',
  MORE_LIKE_THIS = 'more_like_this',
  SHOP_THE_LOOK = 'shop_the_look',
  EMBEDDED_GRID = 'embedded_grid',
  SHOPPABLE_LOOKBOOK = 'shoppable_lookbook',
  SHOPPABLE_INSTAGRAM_FEED = 'shoppable_instagram_feed',
  ICON_TRIGGERED_GRID = 'icon_triggered_grid',
  SEARCH_BAR = 'search_bar',
  EMBEDDED_SEARCH_RESULTS = 'embedded_search_results'
}

interface GenericWidgetClient {
  /**
   * Widget type
   */
  widgetType?: WidgetType;
  /**
   * Widget placement id.
   */
  placementId?: number;
  /**
   * Gets the query id of the API call results in the last click event
   */
  getLastClickQueryId: () => string;
  /**
   * Gets the last API call query id.
   */
  getLastQueryId: () => Promise<string>;
  /**
   * Sends an event to ViSenze Analytics
   * @param action - action name
   * @param params - query parameters
   * @param callback - callback to be executed upon event sent
   * @param failure - callback to be executed upon event sent failure
   *
   * @example
   * // Sends an add to cart event.
   * ```
   * widgetClient.sendEvent('add_to_cart', {pid: 'my_product_id'});
   * ```
   */
  send: (
    action: string,
    params: Record<string, any>,
    callback?: SuccessHandler,
    failure?: ErrorHandler,
  ) => Promise<void>;
  /**
   * Sends an event to ViSenze Analytics
   * @param action - action name
   * @param params - query parameters
   * @param callback - callback to be executed upon event sent
   * @param failure - callback to be executed upon event sent failure
   *
   * @example
   * // Sends an add to cart event.
   * ```
   * widgetClient.sendEvent('add_to_cart', {pid: 'my_product_id'});
   * ```
   */
  sendEvent: (
    action: string,
    params: Record<string, any>,
    callback?: SuccessHandler,
    failure?: ErrorHandler,
  ) => Promise<void>;
  /**
   * Sends batch events to ViSenze Analytics
   * @param action - action name
   * @param params - list of query parameters for events
   * @param callback - callback to be executed upon event sent
   * @param failure - callback to be executed upon event sent failure
   *
   * @example
   * // Sends transaction batch events.
   * ```
   * widgetClient.sendEvents('transaction', [
   *   {pid: 'my_product_id', value: 50},
   *   {pid: 'my_product_id_2', value: 100}
   * ]);
   * ```
   */
  sendEvents: (
    action: string,
    events: Record<string, string>[],
    callback?: SuccessHandler,
    failure?: ErrorHandler,
  ) => Promise<void>;
}

// widget-client

/**
 * Widget client for ViSenze widgets.
 */
export interface WidgetClient extends GenericWidgetClient {
  /**
   * Visearch client.
   */
  visearch: ViSearchClient;
  /**
   * Tracking metadata from the last search result.
   */
  lastTrackingMetadata: Record<string, Primitive> | undefined;
  /**
   * Widget type
   */
  widgetType?: WidgetType;
  /**
   * Widget deploy type id for tag deployment.
   */
  deployTypeId: number | undefined;
  set: (key: string, val: any) => void /**
   *
   * @param roots - render root for the widget.
   */;
  setRenderRoots: (roots: Root[]) => void;
  /**
   * Search by product id.
   * @param pid - product id
   * @param params - search query parameters
   * @param handleSuccess - callback to be executed upon search success
   * @param handleError - callback to be executed upon search failure
   */
  searchById: (pid: string, params: Record<string, any>, handleSuccess: SuccessHandler, handleError: ErrorHandler) => void;
  /**
   * Multisearch by product image.
   * @param params - search query parameters
   * @param handleSuccess - callback to be executed upon search success
   * @param handleError - callback to be executed upon search failure
   */
  multisearchByImage: (params: Record<string, any>, handleSuccess: SuccessHandler, handleError: ErrorHandler) => void;
  /**
   * Multisearch autocomplete.
   * @param params - search query parameters
   * @param handleSuccess - callback to be executed upon search success
   * @param handleError - callback to be executed upon search failure
   */
  multisearchAutocomplete: (
    params: Record<string, any>,
    handleSuccess: SuccessHandler,
    handleError: ErrorHandler,
  ) => void;
  /**
   * Triggers rendering for the widgets.
   *
   * For recommendations widget, this will also trigger a search.
   */
  rerender: (...args: any) => void;
  /**
   * Opens the widget popup for search widget.
   */
  openWidget: ((params: object) => void) | undefined;
  /**
   * Destroys the widget object and reference.
   */
  disposeWidget: () => void;
}

export interface WidgetInitOptions {
  config: WidgetConfig;
  widgetType: WidgetType | undefined;
  widgetDirectory: string;
  deployTypeId: number | undefined;
}

export interface WidgetFont {
  fontSize: number;
  fontWeight: number;
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type TargetElement = 'widgetTitle' | 'callsToActionText' | 'productCardTitle' | 'productCardPrice' | 'searchBarText';

type FontConfig = {
  [D in DeviceType]: {
    [T in TargetElement]: WidgetFont;
  };
};

export type ColourType = 'text' | 'background';
export type ColourName = 'primary' | 'buttonPrimary' | 'buttonSecondary';

type ColourConfig = {
  [T in ColourType]: {
    [N in ColourName]: string;
  };
};

type IconName = 'cameraButton' | 'upload' | 'moreLikeThis';

interface ImageWithLabel {
  url: string;
  label: string;
}

export interface WidgetConfig {
  appSettings: {
    appKey?: string;
    placementId?: string | number;
    strategyId?: string | number;
    country?: string;
    uid?: string;
    gtmTracking?: boolean;
    endpoint?: string;
    resizeSettings?: {
      maxWidth: number;
      maxHeight: number;
    };
    disableCache?: boolean;
  };
  displaySettings: {
    cssSelector: string;
    cameraButtonSelector: string;
    productDetails: {
      mainImageUrl: string;
      productUrl: string;
      title: string;
      price: string;
      originalPrice: string;
      category: string;
      brand: string;
      gender: string;
      sizes: string;
      colors: string;
    };
    fileDropzoneImage: string;
    breakpoints: WidgetBreakpointConfig;
    customizeStyle: string;
  };
  searchSettings: Record<string, any>;
  languageSettings: {
    locale: string;
    text: Record<string, Record<string, string>>;
  };
  searchBarResultsSettings: {
    enableImageUpload: boolean;
    enableFindSimilar: boolean;
    redirectUrl: string;
  }
  callbacks: {
    trackingCallback?: (action: string, params: Record<string, any>) => void;
    onProductClick?: (productDetails: Record<string, any>, trackingMeta: Record<string, any>) => void;
    onSearchCallback?: (apiResponse: ProductSearchResponse) => void;
  };
  customizations?: {
    fonts: FontConfig;
    colours: ColourConfig;
    icons: {
      [I in IconName]: string;
    };
    images: ImageWithLabel[];
  };
  hideTrigger: boolean;
  debugMode: boolean;
  disableAnalytics: boolean;
  maxRetryCount: number;
  vttSource: string;
}

interface MediaQueryFeatures {
  minHeight?: number | string;
  maxHeight?: number | string;
  minDeviceHeight?: number | string;
  maxDeviceHeight?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minDeviceWidth?: number | string;
  maxDeviceWidth?: number | string;
}

export type RecursivePartial<T> = T extends never[] ? T : { [P in keyof T]?: RecursivePartial<T[P]> };

export type ProductDetailField = keyof {
  mainImageUrl: string;
  productUrl: string;
  title: string;
  price: string;
  originalPrice: string;
};

export interface WidgetBreakpointConfig {
  mobile: MediaQueryFeatures;
  tablet: MediaQueryFeatures;
  desktop: MediaQueryFeatures;
}
