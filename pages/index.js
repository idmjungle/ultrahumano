import Layout from '@/components/Layout'
import Slider from '@/components/Slider'
import HomeLatest from '@/components/HomeLatest'
import { API_URL } from "@/config/index";

export default function HomePage({posts,slides}) {
  return (
    <Layout>
      <Slider slides={slides} />
      <HomeLatest posts={posts} />
    </Layout>
  )
}


export async function getStaticProps() {
  const pres = await fetch(`https://data.ultrahumano.com/wordpress/wp-json/wp/v2/posts?_fields=id,excerpt,title,slug,acf,categories,x_categories,x_featured_media_large`)
  const posts = await pres.json()
  const sres = await fetch(`https://data.ultrahumano.com/wordpress/wp-json/wp/v2/posts?categories=1&per_page=4&_fields=author,id,excerpt,title,slug,acf,categories,x_categories,x_featured_media_large`)
  const slides = await sres.json()


  return {
    props: {posts,slides},
    revalidate: 1
  }
}