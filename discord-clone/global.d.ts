// global.d.ts
interface ClerkDebug {
    frontendApi: string;
    isSignedIn: boolean;
    proxyUrl: string;
    isInterstitial: boolean;
    reason: string;
    message: string;
    publishableKey: string;
    isSatellite: boolean;
    domain: string;
}

interface Window {
    __clerk_debug?: ClerkDebug;
}
