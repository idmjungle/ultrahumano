import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "../styles/fonts.css";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const Router = useRouter();

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));

    // setLoading(true);
  }, []);

  return (
    <>
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-1228324154278252"
        async="true"
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />

      <LoadingScreen ready={loading} />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
