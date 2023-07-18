// Type definitions for ws 8.5
// Project: https://github.com/websockets/ws
// Definitions by: Paul Loyd <https://github.com/loyd>
//                 Margus Lamp <https://github.com/mlamp>
//                 Philippe D'Alva <https://github.com/TitaneBoy>
//                 reduckted <https://github.com/reduckted>
//                 teidesu <https://github.com/teidesu>
//                 Bartosz Wojtkowiak <https://github.com/wojtkowiak>
//                 Kyle Hensel <https://github.com/k-yle>
//                 Samuel Skeen <https://github.com/cwadrupldijjit>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import { EventEmitter } from "events";
import {
    Agent,
    ClientRequest,
    ClientRequestArgs,
    IncomingMessage,
    OutgoingHttpHeaders,
    Server as HTTPServer,
} from "http";
import { Server as HTTPSServer } from "https";
import { Duplex, DuplexOptions } from "stream";
import { SecureContextOptions } from "tls";
import { URL } from "url";
import { ZlibOptions } from "zlib";
import * as net from 'net';
import * as tls from 'tls';

// can not get all overload of BufferConstructor['from'], need to copy all it's first arguments here
// https://github.com/microsoft/TypeScript/issues/32164
type BufferLike =
    | string
    | Buffer
    | DataView
    | number
    | ArrayBufferView
    | Uint8Array
    | ArrayBuffer
    | SharedArrayBuffer
    | ReadonlyArray<any>
    | ReadonlyArray<number>
    | { valueOf(): ArrayBuffer }
    | { valueOf(): SharedArrayBuffer }
    | { valueOf(): Uint8Array }
    | { valueOf(): ReadonlyArray<number> }
    | { valueOf(): string }
    | { [Symbol.toPrimitive](hint: string): string };

// WebSocket socket.
declare class WebSocket extends EventEmitter {
    /** The connection is not yet open. */
    static readonly CONNECTING: 0;
    /** The connection is open and ready to communicate. */
    static readonly OPEN: 1;
    /** The connection is in the process of closing. */
    static readonly CLOSING: 2;
    /** The connection is closed. */
    static readonly CLOSED: 3;

    binaryType: "nodebuffer" | "arraybuffer" | "fragments";
    readonly bufferedAmount: number;
    readonly extensions: string;
    /** Indicates whether the websocket is paused */
    readonly isPaused: boolean;
    readonly protocol: string;
    /** The current state of the connection */
    readonly readyState:
        | typeof WebSocket.CONNECTING
        | typeof WebSocket.OPEN
        | typeof WebSocket.CLOSING
        | typeof WebSocket.CLOSED;
    readonly url: string;

    /** The connection is not yet open. */
    readonly CONNECTING: 0;
    /** The connection is open and ready to communicate. */
    readonly OPEN: 1;
    /** The connection is in the process of closing. */
    readonly CLOSING: 2;
    /** The connection is closed. */
    readonly CLOSED: 3;

    onopen: ((event: WebSocket.Event) => void) | null;
    onerror: ((event: WebSocket.ErrorEvent) => void) | null;
    onclose: ((event: WebSocket.CloseEvent) => void) | null;
    onmessage: ((event: WebSocket.MessageEvent) => void) | null;

    constructor(address: null);
    constructor(address: string | URL, options?: WebSocket.ClientOptions | ClientRequestArgs);
    constructor(
        address: string | URL,
        protocols?: string | string[],
        options?: WebSocket.ClientOptions | ClientRequestArgs,
    );

    close(code?: number, data?: string | Buffer): void;
    ping(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    pong(data?: any, mask?: boolean, cb?: (err: Error) => void): void;
    // https://github.com/websockets/ws/issues/2076#issuecomment-1250354722
    send(data: BufferLike, cb?: (err?: Error) => void): void;
    send(
        data: BufferLike,
        options: { mask?: boolean | undefined; binary?: boolean | undefined; compress?: boolean | undefined; fin?: boolean | undefined },
        cb?: (err?: Error) => void,
    ): void;
    terminate(): void;

    /**
     * Pause the websocket causing it to stop emitting events. Some events can still be
     * emitted after this is called, until all buffered data is consumed. This method
     * is a noop if the ready state is `CONNECTING` or `CLOSED`.
     */
    pause(): void;
    /**
     * Make a paused socket resume emitting events. This method is a noop if the ready
     * state is `CONNECTING` or `CLOSED`.
     */
    resume(): void;

    // HTML5 WebSocket events
    addEventListener(
        method: "message",
        cb: (event: WebSocket.MessageEvent) => void,
        options?: WebSocket.EventListenerOptions,
    ): void;
    addEventListener(
        method: "close",
        cb: (event: WebSocket.CloseEvent) => void,
        options?: WebSocket.EventListenerOptions,
    ): void;
    addEventListener(
        method: "error",
        cb: (event: WebSocket.ErrorEvent) => void,
        options?: WebSocket.EventListenerOptions,
    ): void;
    addEventListener(
        method: "open",
        cb: (event: WebSocket.Event) => void,
        options?: WebSocket.EventListenerOptions,
    ): void;

    removeEventListener(method: "message", cb: (event: WebSocket.MessageEvent) => void): void;
    removeEventListener(method: "close", cb: (event: WebSocket.CloseEvent) => void): void;
    removeEventListener(method: "error", cb: (event: WebSocket.ErrorEvent) => void): void;
    removeEventListener(method: "open", cb: (event: WebSocket.Event) => void): void;

    // Events
    on(event: "close", listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
    on(event: "error", listener: (this: WebSocket, err: Error) => void): this;
    on(event: "upgrade", listener: (this: WebSocket, request: IncomingMessage) => void): this;
    on(event: "message", listener: (this: WebSocket, data: WebSocket.RawData, isBinary: boolean) => void): this;
    on(event: "open", listener: (this: WebSocket) => void): this;
    on(event: "ping" | "pong", listener: (this: WebSocket, data: Buffer) => void): this;
    on(
        event: "unexpected-response",
        listener: (this: WebSocket, request: ClientRequest, response: IncomingMessage) => void,
    ): this;
    on(event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void): this;

    once(event: "close", listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
    once(event: "error", listener: (this: WebSocket, err: Error) => void): this;
    once(event: "upgrade", listener: (this: WebSocket, request: IncomingMessage) => void): this;
    once(event: "message", listener: (this: WebSocket, data: WebSocket.RawData, isBinary: boolean) => void): this;
    once(event: "open", listener: (this: WebSocket) => void): this;
    once(event: "ping" | "pong", listener: (this: WebSocket, data: Buffer) => void): this;
    once(
        event: "unexpected-response",
        listener: (this: WebSocket, request: ClientRequest, response: IncomingMessage) => void,
    ): this;
    once(event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void): this;

    off(event: "close", listener: (this: WebSocket, code: number, reason: Buffer) => void): this;
    off(event: "error", listener: (this: WebSocket, err: Error) => void): this;
    off(event: "upgrade", listener: (this: WebSocket, request: IncomingMessage) => void): this;
    off(event: "message", listener: (this: WebSocket, data: WebSocket.RawData, isBinary: boolean) => void): this;
    off(event: "open", listener: (this: WebSocket) => void): this;
    off(event: "ping" | "pong", listener: (this: WebSocket, data: Buffer) => void): this;
    off(
        event: "unexpected-response",
        listener: (this: WebSocket, request: ClientRequest, response: IncomingMessage) => void,
    ): this;
    off(event: string | symbol, listener: (this: WebSocket, ...args: any[]) => void): this;

    addListener(event: "close", listener: (code: number, reason: Buffer) => void): this;
    addListener(event: "error", listener: (err: Error) => void): this;
    addListener(event: "upgrade", listener: (request: IncomingMessage) => void): this;
    addListener(event: "message", listener: (data: WebSocket.RawData, isBinary: boolean) => void): this;
    addListener(event: "open", listener: () => void): this;
    addListener(event: "ping" | "pong", listener: (data: Buffer) => void): this;
    addListener(
        event: "unexpected-response",
        listener: (request: ClientRequest, response: IncomingMessage) => void,
    ): this;
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;

    removeListener(event: "close", listener: (code: number, reason: Buffer) => void): this;
    removeListener(event: "error", listener: (err: Error) => void): this;
    removeListener(event: "upgrade", listener: (request: IncomingMessage) => void): this;
    removeListener(event: "message", listener: (data: WebSocket.RawData, isBinary: boolean) => void): this;
    removeListener(event: "open", listener: () => void): this;
    removeListener(event: "ping" | "pong", listener: (data: Buffer) => void): this;
    removeListener(
        event: "unexpected-response",
        listener: (request: ClientRequest, response: IncomingMessage) => void,
    ): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
}

declare const WebSocketAlias: typeof WebSocket;
interface WebSocketAlias extends WebSocket {} // tslint:disable-line no-empty-interface

declare namespace WebSocket {
    /**
     * Data represents the raw message payload received over the WebSocket.
     */
    type RawData = Buffer | ArrayBuffer | Buffer[];

    /**
     * Data represents the message payload received over the WebSocket.
     */
    type Data = string | Buffer | ArrayBuffer | Buffer[];

    /**
     * CertMeta represents the accepted types for certificate & key data.
     */
    type CertMeta = string | string[] | Buffer | Buffer[];

    /**
     * VerifyClientCallbackSync is a synchronous callback used to inspect the
     * incoming message. The return value (boolean) of the function determines
     * whether or not to accept the handshake.
     */
    type VerifyClientCallbackSync<Request extends IncomingMessage = IncomingMessage> = (info: {
        origin: string;
        secure: boolean;
        req: Request;
    }) => boolean;

    /**
     * VerifyClientCallbackAsync is an asynchronous callback used to inspect the
     * incoming message. The return value (boolean) of the function determines
     * whether or not to accept the handshake.
     */
    type VerifyClientCallbackAsync<Request extends IncomingMessage = IncomingMessage> = (
        info: { origin: string; secure: boolean; req: Request },
        callback: (res: boolean, code?: number, message?: string, headers?: OutgoingHttpHeaders) => void,
    ) => void;

    interface ClientOptions extends SecureContextOptions {
        protocol?: string | undefined;
        followRedirects?: boolean | undefined;
        generateMask?(mask: Buffer): void;
        handshakeTimeout?: number | undefined;
        maxRedirects?: number | undefined;
        perMessageDeflate?: boolean | PerMessageDeflateOptions | undefined;
        localAddress?: string | undefined;
        protocolVersion?: number | undefined;
        headers?: { [key: string]: string } | undefined;
        origin?: string | undefined;
        agent?: Agent | undefined;
        host?: string | undefined;
        family?: number | undefined;
        checkServerIdentity?(servername: string, cert: CertMeta): boolean;
        rejectUnauthorized?: boolean | undefined;
        maxPayload?: number | undefined;
        skipUTF8Validation?: boolean | undefined;
    }

    interface PerMessageDeflateOptions {
        serverNoContextTakeover?: boolean | undefined;
        clientNoContextTakeover?: boolean | undefined;
        serverMaxWindowBits?: number | undefined;
        clientMaxWindowBits?: number | undefined;
        zlibDeflateOptions?: {
            flush?: number | undefined;
            finishFlush?: number | undefined;
            chunkSize?: number | undefined;
            windowBits?: number | undefined;
            level?: number | undefined;
            memLevel?: number | undefined;
            strategy?: number | undefined;
            dictionary?: Buffer | Buffer[] | DataView | undefined;
            info?: boolean | undefined;
        } | undefined;
        zlibInflateOptions?: ZlibOptions | undefined;
        threshold?: number | undefined;
        concurrencyLimit?: number | undefined;
    }

    interface Event {
        type: string;
        target: WebSocket;
    }

    interface ErrorEvent {
        error: any;
        message: string;
        type: string;
        target: WebSocket;
    }

    interface CloseEvent {
        wasClean: boolean;
        code: number;
        reason: string;
        type: string;
        target: WebSocket;
    }

    interface MessageEvent {
        data: Data;
        type: string;
        target: WebSocket;
    }

    interface EventListenerOptions {
        once?: boolean | undefined;
    }

    interface ServerOptions<
        U extends typeof WebSocket.WebSocket = typeof WebSocket.WebSocket,
        V extends typeof IncomingMessage = typeof IncomingMessage,
    > {
        host?: string | undefined;
        port?: number | undefined;
        backlog?: number | undefined;
        server?: HTTPServer<V> | HTTPSServer<V> | undefined;
        verifyClient?:
            | VerifyClientCallbackAsync<InstanceType<V>>
            | VerifyClientCallbackSync<InstanceType<V>>
            | undefined;
        handleProtocols?: (protocols: Set<string>, request: InstanceType<V>) => string | false;
        path?: string | undefined;
        noServer?: boolean | undefined;
        clientTracking?: boolean | undefined;
        perMessageDeflate?: boolean | PerMessageDeflateOptions | undefined;
        maxPayload?: number | undefined;
        skipUTF8Validation?: boolean | undefined;
        WebSocket?: U | undefined;
    }

    interface AddressInfo {
        address: string;
        family: string;
        port: number;
    }

    /**
     * HyBi Receiver implementation.
     *
     * @extends Writable
     */
    class Receiver {
        /**
         * Creates a Receiver instance.
         *
         * @param {Object} [options] Options object
         * @param {String} [options.binaryType=nodebuffer] The type for binary data
         * @param {Object} [options.extensions] An object containing the negotiated
         *     extensions
         * @param {Boolean} [options.isServer=false] Specifies whether to operate in
         *     client or server mode
         * @param {Number} [options.maxPayload=0] The maximum allowed message length
         * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
         *     not to skip UTF-8 validation for text and close messages
         */
        constructor(options?: {
            binaryType?: string | undefined;
            extensions?: Object | undefined;
            isServer?: boolean | undefined;
            maxPayload?: number | undefined;
            skipUTF8Validation?: boolean | undefined;
        } | undefined);
        _binaryType: string;
        _extensions: Object;
        _isServer: boolean;
        _maxPayload: number;
        _skipUTF8Validation: boolean;
        _bufferedBytes: number;
        _buffers: any[];
        _compressed: boolean;
        _payloadLength: number;
        _mask: any;
        _fragmented: number;
        _masked: boolean;
        _fin: boolean;
        _opcode: number;
        _totalPayloadLength: number;
        _messageLength: number;
        _fragments: any[];
        _state: number;
        _loop: boolean;
        /**
         * Implements `Writable.prototype._write()`.
         *
         * @param {Buffer} chunk The chunk of data to write
         * @param {String} encoding The character encoding of `chunk`
         * @param {Function} cb Callback
         * @private
         */
        private _write;
        /**
         * Consumes `n` bytes from the buffered data.
         *
         * @param {Number} n The number of bytes to consume
         * @return {Buffer} The consumed bytes
         * @private
         */
        private consume;
        /**
         * Starts the parsing loop.
         *
         * @param {Function} cb Callback
         * @private
         */
        private startLoop;
        /**
         * Reads the first two bytes of a frame.
         *
         * @return {(RangeError|undefined)} A possible error
         * @private
         */
        private getInfo;
        /**
         * Gets extended payload length (7+16).
         *
         * @return {(RangeError|undefined)} A possible error
         * @private
         */
        private getPayloadLength16;
        /**
         * Gets extended payload length (7+64).
         *
         * @return {(RangeError|undefined)} A possible error
         * @private
         */
        private getPayloadLength64;
        /**
         * Payload length has been read.
         *
         * @return {(RangeError|undefined)} A possible error
         * @private
         */
        private haveLength;
        /**
         * Reads mask bytes.
         *
         * @private
         */
        private getMask;
        /**
         * Reads data bytes.
         *
         * @param {Function} cb Callback
         * @return {(Error|RangeError|undefined)} A possible error
         * @private
         */
        private getData;
        /**
         * Decompresses data.
         *
         * @param {Buffer} data Compressed data
         * @param {Function} cb Callback
         * @private
         */
        private decompress;
        /**
         * Handles a data message.
         *
         * @return {(Error|undefined)} A possible error
         * @private
         */
        private dataMessage;
        /**
         * Handles a control message.
         *
         * @param {Buffer} data Data to handle
         * @return {(Error|RangeError|undefined)} A possible error
         * @private
         */
        private controlMessage;
    }

    /**
     * HyBi Sender implementation.
     */
    class Sender {
       /**
        * Frames a piece of data according to the HyBi WebSocket protocol.
        *
        * @param {(Buffer|String)} data The data to frame
        * @param {Object} options Options object
        * @param {Boolean} [options.fin=false] Specifies whether or not to set the
        *     FIN bit
        * @param {Function} [options.generateMask] The function used to generate the
        *     masking key
        * @param {Boolean} [options.mask=false] Specifies whether or not to mask
        *     `data`
        * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
        *     key
        * @param {Number} options.opcode The opcode
        * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
        *     modified
        * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
        *     RSV1 bit
        * @return {(Buffer|String)[]} The framed data
        * @public
        */
       public static frame(data: (Buffer | string), options: {
           fin?: boolean | undefined;
           generateMask?: Function | undefined;
           mask?: boolean | undefined;
           maskBuffer?: any;
           opcode: number;
           readOnly?: boolean | undefined;
           rsv1?: boolean | undefined;
       }): (Buffer | string)[];
       /**
        * Creates a Sender instance.
        *
        * @param {(net.Socket|tls.TLSSocket)} socket The connection socket
        * @param {Object} [extensions] An object containing the negotiated extensions
        * @param {Function} [generateMask] The function used to generate the masking
        *     key
        */
       constructor(socket: (net.Socket | tls.TLSSocket), extensions?: Object | undefined, generateMask?: Function | undefined);
       _extensions: Object;
       _generateMask: Function | undefined;
       _maskBuffer: any;
       _socket: any;
       _firstFragment: boolean;
       _compress: boolean;
       _bufferedBytes: number;
       _deflating: boolean;
       _queue: any[];
       /**
        * Sends a close message to the other peer.
        *
        * @param {Number} [code] The status code component of the body
        * @param {(String|Buffer)} [data] The message component of the body
        * @param {Boolean} [mask=false] Specifies whether or not to mask the message
        * @param {Function} [cb] Callback
        * @public
        */
       public close(code?: number | undefined, data?: (string | Buffer), mask?: boolean | undefined, cb?: Function | undefined): void;
       /**
        * Sends a ping message to the other peer.
        *
        * @param {*} data The message to send
        * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
        * @param {Function} [cb] Callback
        * @public
        */
       public ping(data: any, mask?: boolean | undefined, cb?: Function | undefined): void;
       /**
        * Sends a pong message to the other peer.
        *
        * @param {*} data The message to send
        * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
        * @param {Function} [cb] Callback
        * @public
        */
       public pong(data: any, mask?: boolean | undefined, cb?: Function | undefined): void;
       /**
        * Sends a data message to the other peer.
        *
        * @param {*} data The message to send
        * @param {Object} options Options object
        * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
        *     or text
        * @param {Boolean} [options.compress=false] Specifies whether or not to
        *     compress `data`
        * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
        *     last one
        * @param {Boolean} [options.mask=false] Specifies whether or not to mask
        *     `data`
        * @param {Function} [cb] Callback
        * @public
        */
       public send(data: any, options: {
           binary?: boolean | undefined;
           compress?: boolean | undefined;
           fin?: boolean | undefined;
           mask?: boolean | undefined;
       }, cb?: Function | undefined): void;
       /**
        * Dispatches a message.
        *
        * @param {(Buffer|String)} data The message to send
        * @param {Boolean} [compress=false] Specifies whether or not to compress
        *     `data`
        * @param {Object} options Options object
        * @param {Boolean} [options.fin=false] Specifies whether or not to set the
        *     FIN bit
        * @param {Function} [options.generateMask] The function used to generate the
        *     masking key
        * @param {Boolean} [options.mask=false] Specifies whether or not to mask
        *     `data`
        * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
        *     key
        * @param {Number} options.opcode The opcode
        * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
        *     modified
        * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
        *     RSV1 bit
        * @param {Function} [cb] Callback
        * @private
        */
       private dispatch;
       /**
        * Executes queued send operations.
        *
        * @private
        */
       private dequeue;
       /**
        * Enqueues a send operation.
        *
        * @param {Array} params Send operation parameters.
        * @private
        */
       private enqueue;
       /**
        * Sends a frame.
        *
        * @param {Buffer[]} list The frame to send
        * @param {Function} [cb] Callback
        * @private
        */
       private sendFrame;
    }

    // WebSocket Server
    class Server<
        T extends typeof WebSocket.WebSocket = typeof WebSocket.WebSocket,
        U extends typeof IncomingMessage = typeof IncomingMessage,
    > extends EventEmitter {
        options: ServerOptions<T, U>;
        path: string;
        clients: Set<InstanceType<T>>;

        constructor(options?: ServerOptions<T, U>, callback?: () => void);

        address(): AddressInfo | string;
        close(cb?: (err?: Error) => void): void;
        handleUpgrade(
            request: InstanceType<U>,
            socket: Duplex,
            upgradeHead: Buffer,
            callback: (client: InstanceType<T>, request: InstanceType<U>) => void,
        ): void;
        shouldHandle(request: InstanceType<U>): boolean | Promise<boolean>;

        // Events
        on(event: "connection", cb: (this: Server<T>, socket: InstanceType<T>, request: InstanceType<U>) => void): this;
        on(event: "error", cb: (this: Server<T>, error: Error) => void): this;
        on(event: "headers", cb: (this: Server<T>, headers: string[], request: InstanceType<U>) => void): this;
        on(event: "close" | "listening", cb: (this: Server<T>) => void): this;
        on(event: string | symbol, listener: (this: Server<T>, ...args: any[]) => void): this;

        once(event: "connection", cb: (this: Server<T>, socket: InstanceType<T>, request: InstanceType<U>) => void): this;
        once(event: "error", cb: (this: Server<T>, error: Error) => void): this;
        once(event: "headers", cb: (this: Server<T>, headers: string[], request: InstanceType<U>) => void): this;
        once(event: "close" | "listening", cb: (this: Server<T>) => void): this;
        once(event: string | symbol, listener: (this: Server<T>, ...args: any[]) => void): this;

        off(event: "connection", cb: (this: Server<T>, socket: InstanceType<T>, request: InstanceType<U>) => void): this;
        off(event: "error", cb: (this: Server<T>, error: Error) => void): this;
        off(event: "headers", cb: (this: Server<T>, headers: string[], request: InstanceType<U>) => void): this;
        off(event: "close" | "listening", cb: (this: Server<T>) => void): this;
        off(event: string | symbol, listener: (this: Server<T>, ...args: any[]) => void): this;

        addListener(event: "connection", cb: (client: InstanceType<T>, request: InstanceType<U>) => void): this;
        addListener(event: "error", cb: (err: Error) => void): this;
        addListener(event: "headers", cb: (headers: string[], request: InstanceType<U>) => void): this;
        addListener(event: "close" | "listening", cb: () => void): this;
        addListener(event: string | symbol, listener: (...args: any[]) => void): this;

        removeListener(event: "connection", cb: (client: InstanceType<T>, request: InstanceType<U>) => void): this;
        removeListener(event: "error", cb: (err: Error) => void): this;
        removeListener(event: "headers", cb: (headers: string[], request: InstanceType<U>) => void): this;
        removeListener(event: "close" | "listening", cb: () => void): this;
        removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    }

    const WebSocketServer: typeof Server;
    interface WebSocketServer extends Server {} // tslint:disable-line no-empty-interface
    const WebSocket: typeof WebSocketAlias;
    interface WebSocket extends WebSocketAlias {} // tslint:disable-line no-empty-interface

    // WebSocket stream
    function createWebSocketStream(websocket: WebSocket, options?: DuplexOptions): Duplex;
}

export = WebSocket;
