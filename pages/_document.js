// import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const addEL = (e) => {
    e.preventDefault();
    alert("test");
  };

  return (
    <Html>
      <Head>
        <Script
          async
          strategy="beforeInteractive"
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        ></Script>
        <Script id="show-banner" strategy="beforeInteractive">
          {`window.googletag = window.googletag || {cmd: []};
            googletag.cmd.push(function() {
            googletag.defineSlot('/22709598084/TOP_GAM_ADSENSE_responsive', [[336, 280], 'fluid'], 'div-gpt-ad-1666968727085-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
          `}
        </Script>
        <Script
          id="Adsense-id"
          data-ad-client="ca-pub-7006648733841921"
          //   async="true"
          strategy="beforeInteractive"
          crossorigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
        <script
          //   async
          crossorigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7006648733841921"
        ></script>
        <Script id="aadrole" strategy="beforeInteractive">
          {`
        adroll_adv_id = "KQHTOOBUABA7RH2HAG6L47"; adroll_pix_id = "FZ7FRKTLVJCU5BXSRIMPYM"; adroll_version = "2.0";  (function(w, d, e, o, a) { w.__adroll_loaded = true; w.adroll = w.adroll || []; w.adroll.f = [ 'setProperties', 'identify', 'track' ]; var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id + "/roundtrip.js"; for (a = 0; a < w.adroll.f.length; a++) { w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) { return function() { w.adroll.push([ n, arguments ]) } })(w.adroll.f[a]) }  e = d.createElement('script'); o = d.getElementsByTagName('script')[0]; e.async = 1; e.src = roundtripUrl; o.parentNode.insertBefore(e, o); })(window, document); adroll.track("pageView");
        `}
        </Script>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-3FQ8TMKYFR"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3FQ8TMKYFR', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
        {/* <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-3FQ8TMKYFR');
              `,
          }}
        /> */}
       {/* <Script
          id="offfurreton-com"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `        
              (function(d,z,s){
                s.src='https://'+d+'/400/'+z;
                try{
                  (document.body||document.documentElement).appendChild(s)
                }
                catch(e){
                }
              }
              )('offfurreton.com',5516260, document.createElement('script'))`,
          }}
        /> */}

        {/* multi tag ad <Script 
id="https://inklinkor.com/tag.min.js"
strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `        
(function(s,u,z,p){
s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);
}
)(document.createElement('script'),'https://inklinkor.com/tag.min.js',5517255,document.body||document.documentElement)`,
  }}
/>*/}
        {/* Native Banner (Interstitial)*/}
        <script
          async="async"
          data-cfasync="false"
          src="//arsnivyr.com/1?z=5519047"
        ></script>
        {/* OnClick (Popunder) 
<Script 
id="https://inklinkor.com/tag.min.js"
strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(s,u,z,p){
s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);
}
)(document.createElement('script'),'https://inklinkor.com/tag.min.js',5517274,document.body||document.documentElement)`,
  }}
/> */}
        {/* Push Notification Ad (propaller) 
<script src="https://dibsemey.com/pfe/current/tag.min.js?z=5524181" data-cfasync="false" async></script>*/}
        {/* Vigenette Ad (propaller) 
<Script
          id="gloaphoo.net"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `        
              (function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)
                }
                catch(e){
                }
              }
              )('gloaphoo.net',5516273,document.createElement('script'))`,
          }}
        />*/}
        {/* Direct Link Ad (propaller)

<Script
          id="thaudray.com"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
//thaudray.com/4/5519043
`,
          }}
        />*/}
        <meta name="propeller" content="fbacef6fa9bcd14b32d00e977aa69329" />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* <Script id="show-ad-manager" strategy="beforeInteractive">
          {`
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1666968727085-0'); });
          `}
        </Script> */}
      </body>
    </Html>
  );
}
