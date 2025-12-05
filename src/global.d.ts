// src/global.d.ts

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