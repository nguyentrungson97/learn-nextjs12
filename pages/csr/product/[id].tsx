import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'

export interface ProductPageProps {
  title: string
  description: string
  price: string
}

export default function PostDetailPage({}) {
  const router = useRouter()

  const productId = router.query.id

  const [product, setProduct] = React.useState<ProductPageProps>()

  const getData = (): any => {
    fetch(`http://localhost:4000/api/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.products))
  }

  React.useEffect(() => {
    getData()
  }, [productId])

  return (
    <div className="max-w-5xl px-4 mx-auto mt-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl">Product Detail Page</h1>

      <p>{product?.title}</p>
      <p>{product?.description}</p>
      <p>{product?.price}</p>
    </div>
  )
}
