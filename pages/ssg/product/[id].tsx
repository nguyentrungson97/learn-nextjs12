import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
export interface ProductPageProps {
  product: any
}

export default function PostDetailPage({ product }: ProductPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  if (!product) return null

  return (
    
    <div className="max-w-5xl px-4 mx-auto mt-10 sm:px-6 lg:px-8">

      <h1 className="text-2xl">Product Detail Page</h1>

      <p>{product.title}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('\nGET STATIC PATHS')
  const response = await fetch('http://localhost:4000/api/product/list')
  const data = await response.json()

  console.log(data)

  return {
    paths: data.products.map((product: any) => ({ params: { id: product._id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ProductPageProps> = async (
  context: GetStaticPropsContext
) => {
  console.log('\nGET STATIC PROPS', context.params?.id)

  const productId = context.params?.id
  if (!productId) return { notFound: true }

  const response = await fetch(`http://localhost:4000/api/product/${productId}`)
  const data = await response.json()

  return {
    props: {
      product: data.products,
    },
  }
}
