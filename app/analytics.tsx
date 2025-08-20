"use client";

import Script from "next/script";

export function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}

export function PlausibleAnalytics({ domain }: { domain: string }) {
  return (
    <Script
      strategy="afterInteractive"
      data-domain={domain}
      src="https://plausible.io/js/plausible.js"
    />
  );
}
