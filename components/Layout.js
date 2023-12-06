import Head from 'next/head'
import Bottom from './Bottom'
import Header from './Header'
import Logo from './Logo'

export default function Layout({title, keywords, description, url, image, type, children}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='og:description' content={description} />
                <meta name='og:keywords' content={keywords} />
                <meta name='og:url' content={url} />
                <meta name='og:image' content={image} />
                <meta name='og:type' content={type} />
                <meta name='og:locale' content='es_PR' />
                <meta name="twitter:image" content={image} />
                <meta name="google-adsense-account" content="ca-pub-1228324154278252" />
                <link rel="apple-touch-icon" sizes="57x57" href="/images/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/images/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/images/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192"  href="/images/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
                <link rel="manifest" href="/images/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/images/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <Header />
            <div className='container-fluid'>
                <div className='row gy-0'>
                    <Logo />
                    {children}
            </div>
            </div>
            <Bottom />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Ultrahumano',
    keywords: 'noticias, reseñas, opiniones, videos juegos, cine, television, comics, anime, manga',
    description: 'Tu lugar para lo mas reciente en cultura pop.',
    url: 'https://ultrahumano.com', 
    image: 'https://ultrahumano.com/images/apple-icon-180x180.png', 
    type: 'website'
}