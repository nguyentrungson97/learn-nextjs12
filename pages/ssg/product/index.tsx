import { GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'
import Link from 'next/link'
export interface ProductListPageProps {
  products: any[]
}

export default function PostListPage({ products }: ProductListPageProps) {
  // console.log('posts', posts)

  return (
    <div className="max-w-5xl px-4 mx-auto mt-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl">Static-Site Genaration || Product list</h1>
      <div className="overflow-hidden bg-white shadow dark:bg-gray-800 sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-900">
          {products.map((product) => (
            <li key={product._id}>
              <Link href={`/ssg/product/${product._id}`}>
                <a className="block hover:bg-gray-50 dark:hover:bg-gray-700">{product.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<ProductListPageProps> = async (
  context: GetStaticPropsContext
) => {
  const response = await fetch('http://localhost:4000/api/product/list')
  const data = await response.json()

  console.log(data)

  return {
    props: {
      products: data.products,
    },
  }
}
