// src/global.d.ts

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

interface IosWebViewInterface {
    messageHandlers: {
        backModule: {
            postMessage(message: string): void;
        };
    };
}

interface AndroidWebViewInterface {
    backModule(message: string): void;
}

declare global {
    interface Window {
        webkit?: IosWebViewInterface;
        AndroidInterface?: AndroidWebViewInterface;
    }
}

export {};