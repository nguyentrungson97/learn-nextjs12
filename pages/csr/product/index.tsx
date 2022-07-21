import { GetStaticProps, GetStaticPropsContext } from 'next'
import * as React from 'react'
import Link from 'next/link'
export interface ProductListPageProps {}

export default function PostListPage({}: ProductListPageProps) {
  // console.log('posts', posts)
  const [products, setProducts] = React.useState([])

  const getData = (): any => {
    fetch('http://localhost:4000/api/product/list')
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
  }

  React.useEffect(() => {
    getData()
  }, [])

  return (
    <div className="max-w-5xl px-4 mx-auto mt-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl">Client-side rendering || Product list</h1>
      <div className="overflow-hidden bg-white shadow dark:bg-gray-800 sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-900">
          {products.map((product: any) => (
            <li key={product._id}>
              <Link href={`/csr/product/${product._id}`}>
                <a className="block hover:bg-gray-50 dark:hover:bg-gray-700">{product.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
