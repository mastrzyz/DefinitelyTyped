// Type definitions for esri-leaflet 3.0
// Project: http://esri.github.io/esri-leaflet
// Definitions by: strajuser <https://github.com/strajuser>
//                 Ryan Murphy <https://github.com/murphyryan1>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import * as L from 'leaflet';

declare module 'leaflet' {
    namespace esri {
        type CallbackHandler = (error: any, metadata: any) => void;

        interface LayerOptionsBase {
            /**
             * URL of the Map Service
             */
            url: string;
            /**
             * URL of an ArcGIS API for JavaScript proxy or ArcGIS Resource Proxy to use for proxying requests.
             */
            proxy?: string | undefined;
            /**
             * Dictates if the service should use CORS when making GET requests.
             */
            useCors?: boolean | undefined;
            /**
             * Will use this token to authenticate all calls to the service.
             */
            token?: string | undefined;
        }

        type Basemaps =
            | 'Streets'
            | 'Topographic'
            | 'NationalGeographic'
            | 'Oceans'
            | 'Gray'
            | 'DarkGray'
            | 'Imagery'
            | 'ShadedRelief'
            | 'Terrain'
            | 'USATopo'
            | 'OceansLabels'
            | 'GrayLabels'
            | 'DarkGrayLabels'
            | 'ImageryLabels'
            | 'ImageryClarity'
            | 'ImageryTransportation'
            | 'ShadedReliefLabels'
            | 'TerrainLabels';

        type LeafletGeometry = Marker | Polygon | Polyline | LatLngExpression | LatLngBounds | GeoJSON;
        type GeoJSONGeometry = GeoJSON.Point | GeoJSON.Polygon | GeoJSON.LineString;
        type Geometry = LeafletGeometry | GeoJSONGeometry;
        type SpatialReferenceExpression = number | SpatialReference;

        interface SpatialReference {
            wkid?: number | undefined;
            wkt?: string | undefined;
        }

        /**
         *
         * Options for `L.esri.BasemapLayer`
         */
        interface BasemapLayerOptions extends TileLayerOptions {
            /**
             * Will use this token to authenticate all calls to the service.
             */
            token?: string | undefined;

            /**
             * When true, will not show the deprecation warning in the developer console.
             */
            ignoreDeprecationWarning?: boolean | undefined;
        }

        /**
         * @deprecated use L.esri.Vector.vectorBasemapLayer instead
         *
         * `L.esri.BasemapLayer` is used to display Esri hosted basemaps and attributes data providers appropriately.
         * The Terms of Use for Esri hosted services apply to all Leaflet applications.
         */
        class BasemapLayer extends TileLayer {
            constructor(key: Basemaps, options?: BasemapLayerOptions);
        }

        /**
         * `L.esri.basemapLayer` is used to display Esri hosted basemaps and attributes data providers appropriately.
         * The Terms of Use for Esri hosted services apply to all Leaflet applications.
         */
        function basemapLayer(key: Basemaps, options?: BasemapLayerOptions): BasemapLayer;

        /**
         * Options for `L.esri.TiledMapLayer`
         */
        interface TiledMapLayerOptions extends TileLayerOptions, LayerOptionsBase {
            /**
             * If correctZoomLevels is enabled this controls the amount of tolerance for the difference at each scale
             * level for remapping tile levels.
             *
             * Default 0.1
             */
            zoomOffsetAllowance?: number | undefined;
        }

        /**
         * Access tiles from ArcGIS Online and ArcGIS Server to visualize and identify features. Copyright text from the
         * service is added to map attribution automatically.
         */
        class TiledMapLayer extends TileLayer {
            constructor(options: TiledMapLayerOptions);
            /**
             * Authenticates this service with a new token and runs any pending requests that required a token
             */
            authenticate(token: string): this;
            /**
             * Requests metadata about this Feature Layer. Callback will be called with error and metadata.
             */
            metadata(callback: CallbackHandler, context?: any): this;
            /**
             * Returns a new `L.esri.services.IdentifyFeatures` object that can be used to identify features on this
             * layer. Your callback function will be passed a GeoJSON FeatureCollection with the results or an error.
             */
            identify(): IdentifyFeatures;
            /**
             * Returns a new `L.esri.services.Find` object that can be used to find features. Your callback function
             * will be passed a GeoJSON FeatureCollection with the results or an error.
             */
            find(): Find;
            /**
             * Returns a new `L.esri.Query` object that can be used to query this service.
             */
            query(): Query;
        }

        /**
         * Access tiles from ArcGIS Online and ArcGIS Server to visualize and identify features. Copyright text from the
         * service is added to map attribution automatically.
         */
        function tiledMapLayer(options: TiledMapLayerOptions): TiledMapLayer;

        /**
         * Options for RasterLayer
         */
        interface RasterLayerOptions extends ImageOverlayOptions {
            /**
             * Server response content type.
             * @default 'image'
             */
            f?: string | undefined;
            /**
             * Position of the layer relative to other overlays.
             * @default 'front'
             */
            position?: string | undefined;
            /**
             * Closest zoom level the layer will be displayed on the map.
             */
            maxZoom?: number | undefined;
            /**
             * Furthest zoom level the layer will be displayed on the map.
             */
            minZoom?: number | undefined;
        }

        /**
         * A generic class representing an image layer. This class can be extended to provide support for making export requests from ArcGIS REST services.
         */
        abstract class RasterLayer extends ImageOverlay {
            /**
             * Redraws this layer below all other overlay layers.
             */
            bringToBack(): this;
            /**
             * Redraws this layer above all other overlay layers.
             */
            bringToFront(): this;
            /**
             * Returns the current opacity of the layer.
             */
            getOpacity(): number;
            /**
             * Sets the opacity of the layer.
             */
            setOpacity(opacity: number): this;
            /**
             * Returns the current time range being used for rendering. Array [from, to];
             */
            getTimeRange(): Date[];
            /**
             * Redraws the layer with the passed time range.
             */
            setTimeRange(from: Date, to: Date): this;
            /**
             * Used to make a fresh request to the service and draw the response.
             */
            redraw(): this;
            /**
             * Authenticates this service with a new token and runs any pending requests that required a token.
             */
            authenticate(token: string): this;
            /**
             * Requests metadata about this Feature Layer. Callback will be called with error and metadata.
             */
            metadata(callback: CallbackHandler, context?: any): this;
        }

        /**
         * Options for `L.esri.DynamicMapLayer`
         */
        interface DynamicMapLayerOptions extends RasterLayerOptions, LayerOptionsBase {
            /**
             * Output format of the image.
             * @default 'png32'
             */
            format?: string | undefined;
            /**
             * Allow the server to produce transparent images.
             */
            transparent?: boolean | undefined;
            /**
             * Attribution from service metadata copyright text is automatically displayed in Leaflet's default control.
             * This property can be used for customization.
             */
            attribution?: string | undefined;
            /**
             * An array of Layer IDs like [3,4,5] to show from the service.
             */
            layers?: any[] | undefined;
            /**
             * SQL filters to define what features will be included in the image rendered by the service. An object is
             * used with keys that map each query to its respective layer.
             *
             * { 3: "STATE_NAME='Kansas'", 9: "POP2007>25000" }
             */
            layerDefs?: any;
            /**
             * JSON object literal used to manipulate the layer symbology defined in the service itself. Requires a 10.1
             * (or above) map service which supports dynamicLayers requests.
             */
            dynamicLayers?: any;
            /**
             * If enabled, appends a timestamp to each request to ensure a fresh image is created server-side.
             */
            disableCache?: boolean | undefined;
        }

        /**
         * Render and visualize Map Services from ArcGIS Online and ArcGIS Server. `L.esri.DynamicMapLayer` also
         * supports custom popups and identification of features.
         *
         * Map Services are used when its preferable to ask the server to draw layers at a particular location and scale
         * and pass back the image which was generated on the fly. They also expose capabilities for querying and
         * identifying individual features.
         */
        class DynamicMapLayer extends RasterLayer {
            constructor(options: DynamicMapLayerOptions);
            /**
             * Uses the provided function to create a popup that will identify features whenever the map is clicked.
             * Your function will be passed a GeoJSON FeatureCollection of the features at the clicked location and
             * should return the appropriate HTML. If you do not want to open the popup when there are no results,
             * return false.
             */
            bindPopup(
                fn: FeatureCallbackHandler | ((layer: Layer) => Content) | Content | Popup,
                popupOptions?: PopupOptions,
            ): this;
            /**
             * Removes a popup previously bound with bindPopup.
             */
            unbindPopup(): this;
            /**
             * Returns the current opacity of the layer.
             */
            getOpacity(): number;
            /**
             * Sets the opacity of the layer.
             */
            setOpacity(opacity: number): this;
            /**
             * Returns the array of visible layers specified in the layer constructor.
             */
            getLayers(): any[];
            /**
             * Redraws the layer to show the passed array of layer ids.
             */
            setLayers(layers: any[]): this;
            /**
             * Returns the current layer definition(s) being used for rendering.
             */
            getLayerDefs(): any;
            /**
             * Redraws the layer with the new layer definitions. Corresponds to the layerDefs option on the export API.
             */
            setLayerDefs(layerDefs: any): this;
            /**
             * Returns the current time options being used for rendering.
             */
            getTimeOptions(): any;
            /**
             * Sets the current time options being used to render the layer. Corresponds to the layerTimeOptions option
             * on the export API.
             */
            setTimeOptions(timeOptions: any): this;
            /**
             * Returns a JSON object representing the modified layer symbology being requested from the map service.
             */
            getDynamicLayers(): any;
            /**
             * Used to insert raw dynamicLayers JSON in situations where you'd like to modify layer symbology defined in
             * the service itself.
             */
            setDynamicLayers(layers: any): this;
            /**
             * Returns a new `L.esri.services.IdentifyFeatures` object that can be used to identify features on this
             * layer. Your callback function will be passed a GeoJSON FeatureCollection with the results or an error.
             */
            identify(): IdentifyFeatures;
            /**
             * Returns a new `L.esri.services.Find` object that can be used to find features. Your callback function
             * will be passed a GeoJSON FeatureCollection with the results or an error.
             */
            find(): Find;
            /**
             * Returns a new `L.esri.Query` object that can be used to query this service.
             */
            query(): Query;
        }

        /**
         * Render and visualize Map Services from ArcGIS Online and ArcGIS Server. L.esri.DynamicMapLayer also supports
         * custom popups and identification of features.
         *
         * Map Services are used when its preferable to ask the server to draw layers at a particular location and scale
         * and pass back the image which was generated on the fly. They also expose capabilities for querying and
         * identifying individual features.
         */
        function dynamicMapLayer(options: DynamicMapLayerOptions): DynamicMapLayer;

        /**
         * Options for FeatureLayer
         */
        interface FeatureLayerOptions extends LayerOptionsBase {
            /**
             * Function that will be used for creating layers for GeoJSON points. If the option is not specified, simple
             * markers will be created). For point layers, custom panes should be passed through pointToLayer (example here).
             */
            pointToLayer?: ((feature: any, latLng: LatLngExpression) => void) | undefined;
            /**
             * Function that will be used to get style options for vector layers created for GeoJSON features.
             */
            style?: ((feature: any, layer: Layer) => void) | undefined;
            /**
             * Provides an opportunity to introspect individual GeoJSON features in the layer.
             */
            onEachFeature?: ((feature: any, layer: Layer) => void) | undefined;
            /**
             * An optional expression to filter features server side. String values should be denoted using single
             * quotes ie: where: "FIELDNAME = 'field value'"; More information about valid SQL syntax can be found here.
             */
            where?: string | undefined;
            /**
             * Closest zoom level the layer will be displayed on the map. example: maxZoom:19
             */
            maxZoom?: number | undefined;
            /**
             * Furthest zoom level the layer will be displayed on the map. example: minZoom:3
             */
            minZoom?: number | undefined;
            /**
             * Will remove layers from the internal cache when they are removed from the map.
             */
            cacheLayers?: boolean | undefined;
            /**
             * An array of fieldnames to pull from the service. Includes all fields by default. You should always
             * specify the name of the unique id for the service. Usually either `FID` or `OBJECTID`.
             */
            fields?: string[] | undefined;
            /**
             * When paired with to defines the time range of features to display. Requires the Feature Layer to be time
             * enabled.
             */
            from?: Date | undefined;
            /**
             * When paired with from defines the time range of features to display. Requires the Feature Layer to be
             * time enabled.
             */
            to?: Date | undefined;
            /**
             * The name of the field to lookup the time of the feature. Can be an object like
             * {start:'startTime', end:'endTime'} or a string like 'created'.
             */
            timeField?: any;
            /**
             * Determines where features are filtered by time. By default features will be filtered by the server. If
             * set to 'client' all features are requested and filtered by the app before display.
             */
            timeFilterMode?: 'server' | 'client' | undefined;
            /**
             * How much to simplify polygons and polylines. A higher value gives better performance, a lower value
             * gives a more accurate representation.
             */
            simplifyFactor?: number | undefined;
            /**
             * How many digits of precision to request from the server. Wikipedia has a great reference of digit
             * precision to meters.
             */
            precision?: number | undefined;
            /**
             * The vector renderer to use to draw the service. Usually L.svg() is preferable but setting to `L.canvas()`
             * can have performance benefits for large polygon layers.
             */
            renderer?: SVG | Canvas | undefined;
            /**
             * Set this to false if your own service supports GeoJSON as an output format but you'd like to ask for
             * Geoservices JSON instead.
             */
            isModern?: boolean | undefined;
            /**
             * When utilizing esri-leaflet-renderers '2.0.2' or above, this option makes it possible to override the
             * symbology defined by the service itself.
             */
            ignoreRenderer?: boolean | undefined;

            /**
             * If you pass an api key in your options it will be included in all requests to the service.
             */
            apiKey?: string | undefined;
        }

        type StyleCallback = (feature: any) => any;

        // TODO: VirtualGrid extends support

        /**
         * `L.esri.FeatureLayer` is used to visualize, style, query and edit vector geographic data hosted in both
         * ArcGIS Online and published using ArcGIS Server. Copyright text from the service is added to map attribution
         * automatically.
         *
         * Feature Layers reference an individual data source in either a parent Map Service or Feature Service that can
         * contain multiple layers. You can see a sample Map Service URL below:
         * http://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer
         *
         * This particular service includes two different data sources. The URL for the 'Hurricane Tracks' feature layer
         * will end in a number (representing its position among the other layers).
         * http://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/1
         *
         * Feature Layer URLs always end in a number (ex: /FeatureServer/{LAYER_ID} or /MapServer/{LAYER_ID}).
         *
         * You can create a new empty feature service with a single layer on the ArcGIS for Developers website or you
         * can use ArcGIS Online to create a Feature Service from a CSV or Shapefile
         *
         * `L.esri.FeatureLayer` divides the current map extent into a grid of individual cells and uses them to fire
         * queries to fetch nearby features. This technique is comparable to `MODE_ONDEMAND` in the ArcGIS API for
         * JavaScript.
         */
        class FeatureLayer extends Layer {
            constructor(options: FeatureLayerOptions);
            /**
             * Sets the given path options to each layer that has a setStyle method. Can also be a Function that will
             * receive a feature argument and should return Path Options
             *
             * `featureLayer.setStyle({ color: 'white' })`
             * `featureLayer.setStyle(function(feature){ return { weight: feature.properties.pixelWidth };})`
             */
            setStyle(style: PathOptions | StyleCallback): this;
            /**
             * Changes the style on a specfic feature.
             */
            setFeatureStyle(id: string | number, style: PathOptions | StyleCallback): this;
            /**
             * Given the ID of a feature, reset that feature to the original style.
             */
            resetStyle(): this;
            /**
             * Calls the passed function against every feature. The function will be passed the layer that represents
             * the feature.
             *
             * featureLayer.eachFeature(function(layer){ console.log(layer.feature.properties.NAME); });
             */
            eachFeature(fn: (feature: any) => void, context?: any): this;
            /**
             * Calls the passed function against every feature that is currently being displayed.
             */
            eachActiveFeature(fn: (feature: any) => void, context?: any): this;
            /**
             * Given the id of a Feature return the layer on the map that represents it. This will usually be a Leaflet
             * vector layer like Polyline or Polygon, or a Leaflet Marker.
             */
            getFeature(id: string | number): Layer;
            /**
             * Returns the current where setting
             */
            getWhere(): string;
            /**
             * Sets the new where option and refreshes the layer to reflect the new where filter. Accepts an optional
             * callback and function context.
             */
            setWhere(where: string, callback?: FeatureCallbackHandler, context?: any): this;
            /**
             * Returns the current time range as an array like [from, to]
             */
            getTimeRange(): Date[];
            /**
             * Sets the current time filter applied to features. An optional callback is run upon completion if
             * timeFilterMode is set to 'server'. Also accepts function context as the last argument.
             */
            setTimeRange(from: Date, to: Date, callback?: FeatureCallbackHandler, context?: any): this;
            /**
             * Adds a new feature to the feature layer. this also adds the feature to the map if creation is successful.
             *
             * Requires authentication as a user who has permission to edit the service in ArcGIS Online or the user who
             * created the service.
             *
             * Requires the Create capability be enabled on the service. You can check if creation exists by checking
             * the metadata of your service under capabilities.
             */
            // TODO: GeoJSONFeature<GeoJSON.GeometryObject>
            addFeature(feature: any, callback?: ResponseCallbackHandler, context?: any): this;
            /**
             * Update the provided feature on the Feature Layer. This also updates the feature on the map.
             *
             * Requires authentication as a user who has permission to edit the service in ArcGIS Online or the user who
             * created the service.
             *
             * Requires the Update capability be enabled on the service. You can check if this operation exists by
             * checking the metadata of your service under capabilities.
             */
            // TODO: GeoJSONFeature<GeoJSON.GeometryObject>
            updateFeature(feature: any, callback?: ResponseCallbackHandler, context?: any): this;
            /**
             * Remove the feature with the provided id from the feature layer. This will also remove the feature from
             * the map if it exists.
             *
             * Requires authentication as a user who has permission to edit the service in ArcGIS Online or the user who
             * created the service.
             *
             * Requires the Delete capability be enabled on the service. You can check if this operation exists by
             * checking the metadata of your service under capabilities.
             */
            deleteFeature(id: string | number, callback?: ResponseCallbackHandler, context?: any): this;
            /**
             * Removes an array of features with the provided ids from the feature layer. This will also remove the
             * features from the map if they exist.
             *
             * Requires authentication as a user who has permission to edit the service in ArcGIS Online or the user who
             * created the service.
             *
             * Requires the Delete capability be enabled on the service. You can check if this operation exists by
             * checking the metadata of your service under capabilities.
             */
            deleteFeatures(ids: string[] | number[], callback?: ResponseCallbackHandler, context?: any): this;
            /**
             * Redraws a feature with the provided id from the feature layer.
             */
            redraw(id: string | number): this;
            /**
             * Redraws all features from the feature layer that exist on the map.
             */
            refresh(): this;
            /**
             * Authenticates this service with a new token and runs any pending requests that required a token.
             */
            authenticate(token: string): this;
            /**
             * Requests metadata about this Feature Layer. Callback will be called with error and metadata.
             */
            metadata(callback: CallbackHandler, context?: any): this;
            /**
             * Returns a new `L.esri.services.IdentifyFeatures` object that can be used to identify features on this
             * layer. Your callback function will be passed a GeoJSON FeatureCollection with the results or an error.
             */
            identify(): IdentifyFeatures;
            /**
             * Returns a new `L.esri.services.Find` object that can be used to find features. Your callback function
             * will be passed a GeoJSON FeatureCollection with the results or an error.
             */
            find(): Find;
            /**
             * Returns a new `L.esri.Query` object that can be used to query this service.
             */
            query(): Query;
        }

        /**
         * `L.esri.FeatureLayer` is used to visualize, style, query and edit vector geographic data hosted in both
         * ArcGIS Online and published using ArcGIS Server. Copyright text from the service is added to map attribution
         * automatically.
         *
         * Feature Layers reference an individual data source in either a parent Map Service or Feature Service that can
         * contain multiple layers. You can see a sample Map Service URL below:
         * http://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer
         *
         * This particular service includes two different data sources. The URL for the 'Hurricane Tracks' feature layer
         * will end in a number (representing its position among the other layers).
         * http://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/1
         *
         * Feature Layer URLs always end in a number (ex: /FeatureServer/{LAYER_ID} or /MapServer/{LAYER_ID}).
         *
         * You can create a new empty feature service with a single layer on the ArcGIS for Developers website or you
         * can use ArcGIS Online to create a Feature Service from a CSV or Shapefile
         *
         * L.esri.FeatureLayer divides the current map extent into a grid of individual cells and uses them to fire
         * queries to fetch nearby features. This technique is comparable to MODE_ONDEMAND in the ArcGIS API for
         * JavaScript.
         */
        function featureLayer(options: FeatureLayerOptions): FeatureLayer;

        type FeatureCallbackHandler = (error?: any, featureCollection?: any, response?: any) => void;
        type ResponseCallbackHandler = (error?: any, response?: any) => void;

        /**
         * Options for `L.esri.ImageMapLayer`
         */
        interface ImageMapLayerOptions extends ImageOverlayOptions, LayerOptionsBase {
            /**
             * If there are multiple bands, you can specify which bands to export
             */
            bandIds?: string | undefined;

            /**
             * The pixel value representing no information.
             */
            noData?: number | undefined;

            /**
             * Interpretation of the noData setting.
             */
            noDataInterpretation?: string | undefined;

            /**
             * Leave pixelType as unspecified, or UNKNOWN, in most exportImage use cases, unless such pixelType is
             * desired. Possible values: C128, C64, F32, F64, S16, S32, S8, U1, U16, U2, U32, U4, U8, UNKNOWN.
             */
            pixelType?: string | undefined;

            /**
             * A JSON representation of a raster function
             */
            renderingRule?: object | undefined;

            /**
             * A JSON representation of a mosaic rule
             */
            mosaicRule?: object | undefined;

            /**
             * Furthest zoom level the layer will be displayed on the map.
             */
            minZoom?: number | undefined;

            /**
             * Closest zoom level the layer will be displayed on the map.
             */
            maxZoom?: number | undefined;

            /**
             * Server response content type "json" | "image". Default is 'image'
             */
            f?: 'json' | 'image' | undefined;

            /**
             * Output format of the image. Default is 'jpegpng
             */
            format?: string | undefined;

            /**
             * Legacy option to control draw order. For best results, use pane. Default is 'front'
             */
            position?: string | undefined;

            /**
             * Used to filter what is drawn from the service based on a time range.
             */
            to?: Date | undefined;

            /**
             * Used to filter what is drawn from the service based on a time range.
             */
            from?: Date | undefined;
        }

        /**
         * Render and visualize Image Services from ArcGIS Online and ArcGIS Server.
         * Image Services provide access to raster data through a web service.
         */

        class ImageMapLayer extends RasterLayer {
            constructor(options: ImageMapLayerOptions);

            /**
             * Uses the provided function to create a popup that will identify pixel value(s) whenever the map is clicked.
             * Your function will be passed an object with a `pixel` property that is a GeoJSON Point with the pixel
             * value(s) at the clicked location and should return the appropriate HTML. If you do not want to open the
             * popup when there are no results, return false.
             *
             * NOTE: by default, if the layer has a mosaic rule applied, then the same rule will be applied to the
             * identify request. Conversely, if the layer has a rendering rule applied, that rule is NOT applied to the
             * layer so that the raw pixel value can be returned. If you need specific control over how these rules
             * (and/or other identify parameters) are passed to the identify service, use L.esri.IdentifyImage.
             */
            bindPopup(
                fn: LayerCallbackHandler | ((layer: Layer) => Content) | string | HTMLElement | Popup,
                popupOptions?: PopupOptions,
            ): this;

            /**
             * Removes a popup previously bound with bindPopup.
             */
            unbindPopup(): this;

            /**
             * Returns the current band value(s).
             */
            getBandIds(): string;

            /**
             * Specify a single band to export, or you can change the band combination (red, green, blue) by
             * specifying the band number.
             */
            setBandIds(bandIds: string | string[]): this;

            /**
             * Returns the current no data value.
             */
            getNoData(): string;

            /**
             * Specify a single value, or an array of values to treat as no data. No data will values will be rendered transparent.
             * The optional `noDataInterpretation` can be either `esriNoDataMatchAny` | `esriNoDataMatchAll`. The
             * default is `esriNoDataMatchAny` when `noData` is a number, and `esriNoDataMatchAll` when noData is an array.
             * See Image Service Export Image documentation for more details
             */
            setNoData(noData: number | number[], noDataInterpretation?: string): this;

            /**
             * Returns the current no data interpretation value.
             */
            getNoDataInterpretation(): string;

            /**
             * Returns the current pixel type.
             */
            getPixelType(): string;

            /**
             * The pixel type, also known as data type, pertains to the type of values stored in the raster, such as
             * signed integer, unsigned integer, or floating point. Possible values: `C128`, `C64`, `F32`, `F64`,
             * `S16`, `S32`, `S8`, `U1`, `U16`, `U2`, `U32`, `U4`, `U8`, `UNKNOWN`.
             */
            setPixelType(
                pixelType:
                    | 'C128'
                    | 'C64'
                    | 'F32'
                    | 'F64'
                    | 'S16'
                    | 'S32'
                    | 'S8'
                    | 'U1'
                    | 'U16'
                    | 'U2'
                    | 'U32'
                    | 'U4'
                    | 'U8'
                    | 'UNKNOWN',
            ): this;

            /**
             * Returns a new `L.esri.Query` object that can be used to query this service.
             */
            query(): Query;

            /**
             * Returns the current rendering rule of the layer.
             */
            getRenderingRule(): object;

            /**
             * Redraws the layer with the passed rendering rule.
             */
            setRenderingRule(renderingRule: object): this;

            /**
             * Returns the current mosaic rule of the layer.
             */
            getMosaicRule(): object;

            /**
             * Redraws the layer with the passed mosaic rule.
             */
            setMosaicRule(mosaicRule: object): this;
        }

        /**
         * Extends L.esri.RasterLayer
         *
         * Render and visualize Image Services from ArcGIS Online and ArcGIS Server.
         * Image Services provide access to raster data through a web service.
         */
        function imageMapLayer(options: ImageMapLayerOptions): ImageMapLayer;

        type LayerCallbackHandler = (error?: any, layer?: any, response?: any) => void;

        /**
         * Options for `L.esri.Service`
         */
        interface ServiceOptions {
            /**
             * URL of the ArcGIS service you would like to consume.
             */
            url?: string | undefined;
            /**
             * URL of an ArcGIS API for JavaScript proxy or ArcGIS Resource Proxy to use for proxying POST requests.
             */
            proxy?: string | undefined;
            /**
             * If this service should use CORS when making GET requests.
             */
            useCors?: boolean | undefined;
            /**
             * Operation timeout
             */
            timeout?: number | undefined;
            /**
             * Will include credentials for CORS requests
             */
            withCredentials?: boolean | undefined;
        }

        /**
         * A generic class representing a hosted resource on ArcGIS Online or ArcGIS Server. This class can be extended
         * to provide support for making requests and serves as a standard for authentication and proxying.
         */
        abstract class Service extends Evented {
            /**
             * Makes a GET request to the service. The service's URL will be combined with the path option and
             * parameters will be serialized to a query string. Accepts an optional function context for the callback.
             */
            get(url: string, params?: any, callback?: CallbackHandler, context?: any): this;
            /**
             * Makes a POST request to the service. The service's URL will be combined with the path option and
             * parameters will be serialized. Accepts an optional function context for the callback.
             */
            post(url: string, params?: any, callback?: CallbackHandler, context?: any): this;
            /**
             * Authenticates this service with a new token and runs any pending requests that required a token.
             */
            authenticate(token: string): this;
            /**
             * Requests metadata about this Feature Layer. Callback will be called with error and metadata.
             */
            metadata(callback: CallbackHandler, context?: any): this;
        }

        /**
         * `L.esri.MapService` is an abstraction for interacting with Map Services running on ArcGIS Online and ArcGIS
         * Server that allows you to make requests to the API, as well as query and identify published features.
         */
        class MapService extends Service {
            constructor(options: ServiceOptions);
            /**
             * Returns a new `L.esri.services.IdentifyFeatures` object that can be used to identify features on this
             * layer. Your callback function will be passed a GeoJSON FeatureCollection with the results or an error.
             */
            identify(): IdentifyFeatures;
            /**
             * Returns a new `L.esri.services.Find` object that can be used to find features. Your callback function
             * will be passed a GeoJSON FeatureCollection with the results or an error.
             */
            find(): Find;
            /**
             * Returns a new `L.esri.Query` object that can be used to query this service.
             */
            query(): Query;
        }

        /**
         * `L.esri.MapService` is an abstraction for interacting with Map Services running on ArcGIS Online and ArcGIS
         * Server that allows you to make requests to the API, as well as query and identify published features.
         */
        function mapService(options: ServiceOptions): MapService;

        /**
         * `L.esri.Task` is a generic class that provides the foundation for calling operations on ArcGIS Online and
         * ArcGIS Server Services like query, find and identify.
         */
        class Task extends Class {
            constructor(options: ServiceOptions | Service);
            /**
             * Makes a request to the associated service. The service's URL will be combined with the path option and
             * parameters will be serialized. Accepts an optional function context for the callback.
             */
            request(url: string, params?: any, callback?: any, context?: any): this;
            /**
             * Adds a token to this request if the service requires authentication. Will be added automatically if used
             * with a service.
             */
            token(token: string): this;

            format(returnUnformattedValues: boolean): this;

            /**
             * Adds an api key to this request if the service requires authentication. Will be added automatically if
             * used with a service.
             */
            apiKey(apiKey: string): this;
        }

        /**
         * `L.esri.Task` is a generic class that provides the foundation for calling operations on ArcGIS Online and
         * ArcGIS Server Services like query, find and identify.
         */
        function task(options: ServiceOptions | Service): Task;

        /**
         * `L.esri.ImageService` is an abstraction for interacting with Image Services running on ArcGIS Online and
         * ArcGIS Server that allows you to make requests to the API, as well as query and identify features on the
         * service.
         */
        class ImageService extends Service {
            constructor(options: ServiceOptions);
            /**
             * Returns a new `L.esri.Query` object that can be used to query this service.
             */
            query(): Query;
        }

        /**
         * `L.esri.ImageService` is an abstraction for interacting with Image Services running on ArcGIS Online and
         * ArcGIS Server that allows you to make requests to the API, as well as query and identify features on the
         * service.
         */
        function imageService(options: ServiceOptions): ImageService;

        /**
         * `L.esri.FeatureLayerService` is an abstraction for interacting with Feature Layers running on ArcGIS Online
         * and ArcGIS Server that allows you to make requests to the API, as well as query, add, update and remove
         * features from the service.
         */
        class FeatureLayerService extends Service {
            constructor(options: ServiceOptions);
            /**
             * Returns a new `L.esri.Query` object that can be used to query this layer.
             */
            query(): Query;
            /**
             * Adds a new feature to the feature layer. this also adds the feature to the map if creation is successful.
             *
             * Requires authentication as a user who has permission to edit the service in ArcGIS Online or the user
             * who created the service.
             *
             * Requires the Create capability be enabled on the service. You can check if creation exists by checking
             * the metadata of your service under capabilities.
             */
            // TODO: GeoJSONFeature<GeoJSON.GeometryObject>
            addFeature(feature: any, callback?: ResponseCallbackHandler, context?: any): this;
            /**
             * Update the provided feature on the Feature Layer. This also updates the feature on the map.
             *
             * Requires authentication as a user who has permission to edit the service in ArcGIS Online or the user who
             * created the service.
             *
             * Requires the Update capability be enabled on the service. You can check if this operation exists by
             * checking the metadata of your service under capabilities.
             */
            // TODO: GeoJSONFeature<GeoJSON.GeometryObject>
            updateFeature(feature: any, callback?: ResponseCallbackHandler, context?: any): this;
            /**
             * Remove the feature with the provided id from the feature layer. This will also remove the feature from
             * the map if it exists.
             *
             * Requires authentication as a user who has permission to edit the service in ArcGIS Online or the user who
             * created the service.
             *
             * Requires the Delete capability be enabled on the service. You can check if this operation exists by
             * checking the metadata of your service under capabilities.
             */
            deleteFeature(id: string | number, callback?: ResponseCallbackHandler, context?: any): this;
            /**
             * Removes an array of features with the provided ids from the feature layer. This will also remove the
             * features from the map if they exist.
             *
             * Requires authentication as a user who has permission to edit the service in ArcGIS Online or the user who
             * created the service.
             *
             * Requires the Delete capability be enabled on the service. You can check if this operation exists by
             * checking the metadata of your service under capabilities.
             */
            deleteFeatures(ids: string[] | number[], callback?: ResponseCallbackHandler, context?: any): this;
        }

        /**
         * `L.esri.FeatureLayerService` is an abstraction for interacting with Feature Layers running on ArcGIS Online
         * and ArcGIS Server that allows you to make requests to the API, as well as query, add, update and remove
         * features from the service.
         */
        function featureLayerService(options: ServiceOptions): FeatureLayerService;

        /**
         * `L.esri.Query` is an abstraction for the query API included in Feature Layers and Image Services. It provides
         * a chainable API for building request parameters and executing queries.
         *
         * Note Depending on the type of service you are querying (Feature Layer, Map Service, Image Service) and the
         * version of ArcGIS Server that hosts the service some of these options may not be available.
         */
        class Query extends Task {
            constructor(options: ServiceOptions);
            /**
             * Queries features from the service within (fully contained by) the passed geometry object. geometry can be
             * an instance of `L.Marker`, `L.Polygon`, `L.Polyline`, `L.LatLng`, `L.LatLngBounds` and `L.GeoJSON`. It
             * can also accept valid GeoJSON Point, Polyline, Polygon objects and GeoJSON Feature objects containing
             * Point, Polyline, Polygon.
             */
            within(geometry: Geometry): this;
            /**
             * Queries features from the service that fully contain the passed geometry object. geometry can be an
             * instance of `L.Marker`, `L.Polygon`, `L.Polyline`, `L.LatLng`, `L.LatLngBounds` and `L.GeoJSON`. It can
             * also accept valid GeoJSON Point, Polyline, Polygon objects and GeoJSON Feature objects containing Point,
             * Polyline, Polygon.
             */
            contains(geometry: Geometry): this;
            /**
             * Queries features from the service that intersect (touch anywhere) the passed geometry object. geometry
             * can be an instance of `L.Marker`, `L.Polygon`, `L.Polyline`, `L.LatLng`, `L.LatLngBounds` and
             * `L.GeoJSON`. It can also accept valid GeoJSON Point, Polyline, Polygon objects and GeoJSON Feature
             * objects containing Point, Polyline, Polygon.
             */
            intersects(geometry: Geometry): this;
            /**
             * Queries features from the service that have a bounding box that intersects the bounding box of the passed
             * geometry object. geometry can be an instance of `L.Marker`, `L.Polygon`, `L.Polyline`, `L.LatLng`,
             * `L.LatLngBounds` and `L.GeoJSON`. It can also accept valid GeoJSON Point, Polyline, Polygon objects and
             * GeoJSON Feature objects containing Point, Polyline, Polygon.
             */
            bboxIntersects(geometry: Geometry): this;
            /**
             * Queries features from the service that overlap (touch but are not fully contained by) the passed geometry
             * object. geometry can be an instance of `L.Marker`, `L.Polygon`, `L.Polyline`, `L.LatLng`,
             * `L.LatLngBounds` and `L.GeoJSON`. It can also accept valid GeoJSON Point, Polyline, Polygon objects and
             * GeoJSON Feature objects containing Point, Polyline, Polygon.
             */
            overlap(geometry: Geometry): this;
            /**
             * Queries features a given distance in meters around a LatLng.
             *
             * Only available for Feature Layers hosted on ArcGIS Online or ArcGIS Server 10.3 that include the
             * capability supportQueryWithDistance.
             */
            nearby(latlng: LatLng, distance: number): this;
            /**
             * Adds a where clause to the query. String values should be denoted using single quotes ie:
             *
             * `query.where("FIELDNAME = 'field value'");`
             *
             * More info about valid SQL can be found here.
             */
            where(where: string): this;
            /**
             * Define the offset of the results, when combined with limit can be used for paging.
             *
             * Only available for Feature Layers hosted on ArcGIS Online or ArcGIS Server 10.3.
             */
            offset(offset: number): this;
            /**
             * Limit the number of results returned by this query, when combined with offset can be used for paging.
             *
             * Only available for Feature Layers hosted on ArcGIS Online or ArcGIS Server 10.3.
             */
            limit(limit: number): this;
            /**
             * Queries features within a given time range. Only available for Layers/Services with timeInfo in their
             * metadata.
             */
            between(from: Date, to: Date): this;
            /**
             * An array of associated fields to request for each feature.
             */
            fields(fields: string | string[]): this;
            /**
             * Return geometry with results. Default is true.
             */
            returnGeometry(returnGeometry: boolean): this;
            /**
             * Simplify the geometries of the output features for the current map view. the factor parameter controls
             * the amount of simplification between 0 (no simplification) and 1 (the most basic shape possible).
             */
            simplify(map: Map, factor: number): this;
            /**
             * Sort output features using values from an individual field. "ASC" (ascending) is the default sort order,
             * but "DESC" can be passed as an alternative. This method can be called more than once to apply advanced
             * sorting.
             */
            orderBy(fieldName: string, order: string): this;
            /**
             * Return only specific feature IDs if they match other query parameters.
             */
            featureIds(ids: any[]): this;
            /**
             * Return only this many decimal points of precision in the output geometries.
             */
            precision(precision: number): this;
            /**
             * Used to select which layer inside a Map Service to perform the query on.
             *
             * Only available for Map Services.
             */
            layer(layer: number | string): this;
            /**
             * Override the default pixelSize when querying an Image Service.
             *
             * Only available for Image Services.
             */
            pixelSize(point: Point): this;
            /**
             * Executes the query request with the current parameters, features will be passed to callback as a GeoJSON
             * FeatureCollection. Accepts an optional function context.
             */
            run(callback: FeatureCallbackHandler, context?: any): this;
            /**
             * Executes the query request with the current parameters, passing only the number of features matching the
             * query to callback as an Integer. Accepts an optional function context.
             */
            count(callback: FeatureCallbackHandler, context?: any): this;
            /**
             * Executes the query request with the current parameters, passing only an array of the feature ids matching
             * the query to callbackcallback. Accepts an optional function context.
             */
            ids(callback: FeatureCallbackHandler, context?: any): this;
            /**
             * Executes the query request with the current parameters, passing only the LatLngBounds of all features
             * matching the query in the callback. Accepts an optional function context. Only available for Feature
             * Layers hosted on ArcGIS Online or ArcGIS Server 10.3.1.
             */
            bounds(callback: FeatureCallbackHandler, context?: any): this;
            /**
             * The WKID of a datum transformation for the server to apply when reprojecting output features.
             */
            transform(datumTranformation: SpatialReferenceExpression): this;
            /**
             * Ensures that no geometry or duplicate field values will be returned in the subsequent request.
             */
            distinct(): this;
        }

        /**
         * `L.esri.Query` is an abstraction for the query API included in Feature Layers and Image Services. It provides
         * a chainable API for building request parameters and executing queries.
         *
         * Note Depending on the type of service you are querying (Feature Layer, Map Service, Image Service) and the
         * version of ArcGIS Server that hosts the service some of these options may not be available.
         */
        function query(options: ServiceOptions): Query;

        /**
         * `L.esri.IdentifyFeatures` is an abstraction for the Identify API found in Map Services. It provides a
         * chainable API for building request parameters and executing the request.
         */
        class IdentifyFeatures extends Task {
            constructor(options: ServiceOptions | ImageService);
            /**
             * The map to identify features on.
             */
            on(map: Map): this;
            /**
             * Identifies features at a given LatLng geometry can also be an instance of `L.Marker`, `L.Polygon`,
             * `L.Polyline`, `L.LatLngBounds`, `L.GeoJSON` or a valid GeoJSON object literal.
             */
            at(geometry: Geometry): this;
            /**
             * Add a layer definition to the query.
             */
            layerDef(id: number, where: string): this;
            /**
             * Identifies features within a given time range.
             */
            between(from: Date, to: Date): this;
            /**
             * By default, only the topmost feature will be identified, but it is possible to specify both an
             * alternative strategy and array of individual layers. See the REST API documentation for more information
             * about valid combinations.
             *
             * ex: `.layers('all:0')`.
             */
            layers(layers: string | string[]): this;
            /**
             * Return only this many decimal points of precision in the output geometries.
             */
            precision(precision: number): this;
            /**
             * Buffer the identify area by a given number of screen pixels.
             */
            tolerance(precision: number): this;
            /**
             * Return geometry with results. Default is true.
             */
            returnGeometry(returnGeometry: boolean): this;
            /**
             * Simplify the geometries of the output features for the current map view. the factor parameter controls
             * the amount of simplification between `0` (no simplification) and `1` (the most basic shape possible).
             */
            simplify(map: Map, factor: number): this;
            /**
             * Executes the identify request with the current parameters, identified features will be passed to callback
             * as a GeoJSON FeatureCollection. Accepts an optional function context
             */
            run(callback: FeatureCallbackHandler, context?: any): this;
        }

        /**
         * `L.esri.IdentifyFeatures` is an abstraction for the Identify API found in Map Services. It provides a
         * chainable API for building request parameters and executing the request.
         */
        function identifyFeatures(options: ServiceOptions | ImageService): IdentifyFeatures;

        /**
         * `L.esri.Find` is an abstraction for the find API included in Map Services. It provides a chainable API for
         * building request parameters and executing find tasks.
         */
        class Find extends Task {
            constructor(options: ServiceOptions | MapService);
            /**
             * Text that is searched across the layers and fields the user specifies.
             */
            text(text: string): this;
            /**
             * When true find task will search for a value that contains the searchText. When false it will do an exact
             * match on the searchText string. Default is true.
             */
            contains(contains: boolean): this;
            /**
             * An array or comma-separated list of field names to search. If not specified, all fields are searched.
             */
            fields(fields: string | string[]): this;
            /**
             * The well known ID (ex. 4326) for the results.
             */
            spatialReference(sr: number): this;
            /**
             * Add a layer definition to the find task.
             */
            layerDef(id: number, where: string): this;
            /**
             * Layers to perform find task on. Accepts an array of layer IDs or comma-separated list.
             */
            layers(layers: string | string[]): this;
            /**
             * Return geometry with results. Default is true.
             */
            returnGeometry(returnGeometry: boolean): this;
            /**
             * Specifies the maximum allowable offset to be used for generalizing geometries returned by the find task.
             */
            maxAllowableOffset(maxAllowableOffset: number): this;
            /**
             * Specifies the number of decimal places in returned geometries.
             */
            precision(precision: number): this;
            /**
             * Include Z values in the results. Default value is true. This parameter only applies if
             * `returnGeometry=true`.
             */
            returnZ(returnZ: boolean): this;
            /**
             * Includes M values if the features have them. Default value is false. This parameter only applies if
             * `returnGeometry=true`.
             */
            returnM(returnM: boolean): this;
            /**
             * Property used for adding new layers or modifying the data source of existing ones in the current map
             * service.
             */
            dynamicLayers(dynamicLayers: any): this;
            /**
             * Simplify the geometries of the output features for the current map view. the factor parameter controls
             * the amount of simplification between `0` (no simplification) and `1`
             * (simplify to the most basic shape possible).
             */
            simplify(map: Map, factor: number): this;
            /**
             * Executes the find request with the current parameters, features will be passed to callback as a GeoJSON
             * FeatureCollection. Accepts an optional function context.
             */
            run(callback: FeatureCallbackHandler, context?: any): this;
        }

        /**
         * L.esri.Find is an abstraction for the find API included in Map Services. It provides a chainable API for
         * building request parameters and executing find tasks.
         */
        function find(options: ServiceOptions | MapService): Find;

        class IdentifyImage extends Task {
            constructor(options: ServiceOptions | ImageService);

            /**
             * Identify the pixel value at a given LatLng
             */
            at(latlng: LatLng): this;

            /**
             * Identifies pixel values within a given time range.
             */
            between(from: Date, to: Date): this;

            /**
             * Returns the current rendering rule of the task.
             */
            getRenderingRule(): object;

            /**
             * Sets the rendering rule to apply when getting a pixel value.
             */
            setRenderingRule(renderingRule: object): this;

            /**
             * Returns the current mosaic rule of the task.
             */
            getMosaicRule(): object;

            /**
             * Sets the mosaic rule to apply when getting a pixel value.
             */
            setMosaicRule(mosaicRule: object): this;

            /**
             * Sets the pixel size to use when getting a pixel value. Either an array ([x,y]) or string ('x,y').
             * If not set, it will use the pixel size defined by the service.
             */
            setPixelSize(pixelSize: string[] | string): this;

            /**
             * Returns the current pixel size of the task.
             */
            getPixelSize(): object;

            /**
             * Indicates whether or not to return raster catalog items. Set it to `false` when catalog items are not
             * needed to improve the identify operation's performance significantly. When set to `false`, neither the
             * geometry nor attributes of catalog items will be returned. Default is `false`.
             */
            returnCatalogItems(returnCatalogItems: boolean): this;

            /**
             * Return catalog footprints (geometry) with catalog item results. Default is `false`.
             */
            returnGeometry(returnGeometry: boolean): this;

            /**
             * Executes the identify request with the current parameters, identified pixel value will be passed to
             * callback as a GeoJSON Point. Accepts an optional function context
             */
            run(callback: IdentifyImageCallbackHandler, context?: any): this;
        }

        interface IdentifyImageResponseProperties {
            OBJECTID: string;
            name: string;
            value: any;
        }
        interface IdentifyImageResponse {
            pixel: GeoJSON.Feature<GeoJSON.Point, IdentifyImageResponseProperties>;
            catalogItems: GeoJSON.FeatureCollection<GeoJSON.Point>;
        }
        type IdentifyImageCallbackHandler = (
            err: any,
            identifyImageResponse: IdentifyImageResponse,
            rawResponse: any,
        ) => void;

        /**
         * Accepts either an `options` object or an instance of ImageService.
         */
        function identifyImage(options: ServiceOptions | ImageService): IdentifyImage;
    }
}

export = L.esri;
