"use client"
import BreadCrumbs from '@/components/CustomUI/BreadCrumbs'
import StarRating from '@/components/CustomUI/StarRating'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Variants from './components/Variants'
import { HeartIcon, MinusIcon, PlusIcon, Share2Icon, ShoppingCartIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '@/store/cartSlice'
import { productType } from '@/components/products/ProductSection'
import { RootState } from '@/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { updateUserCart } from '@/app/actions/UserActions'
import toast from 'react-hot-toast'
import { getProductBySlug } from '@/app/actions/ProductsAction'

const ProductDetails = () => {
  const { category, productSlug } = useParams<{ category: string, productSlug: string }>()
  const [previewImageIndex, setPreviewImageIndex] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [existsInCart, setExistsInCart] = useState<boolean>(false)

  const { items: cartItems } = useSelector((state: RootState) => state.cart)
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: productData, status } = useQuery({
    queryKey: ["fetch-product", productSlug],
    queryFn: async () => {
      try {
        const res = await getProductBySlug(productSlug);
        console.log("Fetch_Res", res)
        return res.response as productType
      } catch (error) {
        console.error('Error fetching Product:', error);
        throw new Error('Failed to fetch Product data');
      }
    },
    enabled: !!productSlug
  })

  useEffect(() => {
    console.log(status, !!productData?.productID)
    if (status === "error" || (status === "success" && !productData.productID)) {
      toast.error("Product not Found!")
      router.push("/notfound");
    }
  }, [status, productData, router]);

  useEffect(() => {
    setExistsInCart(cartItems.some(item => item.product.productID === productData?.productID))
  }, [cartItems, productData?.productID])

  const updateQuantity = (type: "increment" | "decrement") => {
    if (type === 'increment') {
      if (quantity >= 30) return
      setQuantity(prev => prev + 1)
    } else {
      if (quantity <= 1) return
      setQuantity(prev => prev - 1)
    }
  }

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!productData) {
        throw new Error('Product data is not available');
      }

      if (!user?.id) {
        throw new Error('User ID is not available');
      }

      const flatProductData = {
        userId: user.id,
        items: {
          productId: productData.productID,
          quantity: quantity,
          unitRate: productData.price.current,
          price: productData.price.current * quantity
        }
      }
      const res = await updateUserCart(flatProductData)
      return res
    },
    onSuccess: () => {
      if (!productData) {
        throw new Error('Product data is not available');
      }

      // Update Cart Redux store
      dispatch(cartActions.updateCart({
        productId: productData.productID,
        product: productData,
        quantity: quantity,
        unitRate: productData.price.current,
        price: productData.price.current * quantity
      }))

      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Product added to cart successfully')
    },
    onError: (error) => {
      console.log("Cart_Update_Error:", error)
      toast.error('Failed to add product to cart')
    }
  })

  const handleAddToCart = () => {
    if (!user) {
      console.log({ user })
      router.push("/login")
      return
    }

    addToCartMutation.mutate()
  }

  if (status === 'pending') {
    return <div>Loading...</div>
  }

  if (status === 'error' && !productData?.productID) {
    console.error("ERROR")
    return null
  }

  return (
    <main className='main_style'>
      <section className="flex justify-evenly gap-10">
        {/* Left section - Product Preview images */}
        <div className="w-1/2 flex justify-center items-start gap-4">
          <div className="flex flex-col gap-2">
            {productData?.images?.map((img, index) => (
              <Image
                key={index}
                src={img?.imageUrl}
                alt={img?.altText}
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
                placeholder='blur'
                blurDataURL={img?.blurData}
                onClick={() => setPreviewImageIndex(index)}
                className='!relative rounded-md' />
            ))}
          </div>

          <Image
            src={productData?.images[previewImageIndex]?.imageUrl}
            alt={productData?.images[previewImageIndex]?.altText}
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
            placeholder='blur'
            blurDataURL={productData?.images[previewImageIndex]?.blurData}
            className='!relative rounded-md' />
        </div>

        {/* Right section - Product Details */}
        <div className="w-max h-full">
          <BreadCrumbs
            className='text-[0.9em]'
            routes={[
              `${category}`,
              `${category}/${productSlug}`
            ]} />

          <h1 className='text-[1.5em]'>{productData.longTitle}</h1>

          <div className='flex items-center gap-1'>
            <span className='text-[0.9em] pt-1'>{productData?.ratings?.average?.toFixed(1)}</span>
            <StarRating rating={productData?.ratings?.average || 0} />
            <span className='text-[0.8em]'>({productData?.ratings?.reviewCount?.toLocaleString("en-US", {
              notation: "compact",
              compactDisplay: "short"
            })})</span>
          </div>

          <div className="p-1 px-2 flex items-center gap-2">
            <h3 className='font-sans text-[1.8em] font-bold'>{productData?.price?.current?.toLocaleString("en-IN", {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}</h3>

            <span className='font-sans line-through'>MRP : {productData?.price?.original?.toLocaleString("en-IN", {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}</span>

            <div className='flex_center gap-1 font-bold text-red-500'>
              <span> -{productData?.price?.discount}%</span>
            </div>
          </div>

          <Variants variants={productData?.variants} activeVariant={productData?.features?.variant} />

          <div className="flex gap-4 py-2">
            <span>Availability : </span>
            {productData?.stock?.isInStock ?
              <span className="text-[1.2em] text-green-600 font-bold">In Stock</span>
              :
              <span className="text-[1.2em] text-red-600 font-bold">Out of Stock</span>
            }
          </div>

          <div className="">
            <span className="font-bold capitalize">Quantity</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size={'icon'}
                disabled={existsInCart}
                onClick={() => updateQuantity("decrement")}
                className="bg-background border-primaryClr font-bold w-8 h-8"
              >
                <MinusIcon size={20} />
              </Button>

              <span className="p-4 select-none min-w-14 text-center">{quantity}</span>

              <Button
                variant="outline"
                size={'icon'}
                disabled={existsInCart}
                onClick={() => updateQuantity("increment")}
                className="bg-background border-primaryClr font-bold w-8 h-8"
              >
                <PlusIcon size={20} />
              </Button>
            </div>
            {quantity === 30 && <span className="text-[0.9em] text-yellow-700">Maximum limit is 30</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 w-fit gap-4 py-2">
            <Button variant={'secondary'} className="flex_center gap-3 bg-secondaryClr hover:bg-secondaryClr_Alt w-full">
              <HeartIcon />
              <span>Add to WishList</span>
            </Button>
            <Button variant={'secondary'} className="flex_center gap-3 bg-secondaryClr hover:bg-secondaryClr_Alt w-full">
              <Share2Icon />
              <span>Share</span>
            </Button>
            <Button
              onClick={handleAddToCart}
              variant={'secondary'}
              disabled={existsInCart}
              className="sm:col-span-2 gap-3 bg-primaryClr hover:bg-primaryClr_Alt text-white w-full">
              <ShoppingCartIcon />
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="pt-8">
        <h2 className='font-bold text-[1.4em]'>Product Description</h2>
      </section>
    </main>
  )
}

export default ProductDetails