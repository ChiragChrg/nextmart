"use client"
import BreadCrumbs from '@/components/CustomUI/BreadCrumbs'
import { useParams } from 'next/navigation'
import React from 'react'

const ProductDetails = () => {
  const { category, productName } = useParams<{ category: string, productName: string }>()

  return (
    <main>
      <BreadCrumbs routes={[
        `${category}`,
        `${category}/${productName}`
      ]} />
    </main>
  )
}

export default ProductDetails