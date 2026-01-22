import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
} from "lucide-react";
import { productAPI } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getById(id);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + delta, product?.stock || 99))
    );
  };

  const handleAddToCart = async () => {
    if (!product) return;

    // ✅ เช็คว่า login หรือยัง
    if (!user) {
      toast.error("กรุณาเข้าสู่ระบบ", {
        description: "คุณต้องเข้าสู่ระบบก่อนเพิ่มสินค้า",
      });
      navigate("/login", { state: { from: location } });
      return;
    }

    // ✅ Admin ไม่สามารถเพิ่มสินค้า
    if (isAdmin) {
      toast.error("Admin ไม่สามารถเพิ่มสินค้าลงตะกร้าได้");
      return;
    }

    const success = await addToCart(product, quantity);
    if (success) {
      toast.success(`เพิ่ม ${product.name} (${quantity} ชิ้น) ลงตะกร้าแล้ว!`);
    } else {
      toast.error("ไม่สามารถเพิ่มสินค้าได้");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg">Product not found</p>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }

  const images = product.images || [
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="min-h-screen from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="mb-6 gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-white">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="h-full w-full object-contain p-8"
                  />
                  {product.discount && (
                    <Badge className="absolute right-4 top-4 bg-red-500">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === idx
                      ? "border-primary scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.stock < 10 && product.stock > 0 && (
                  <Badge variant="destructive">
                    Only {product.stock} left!
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < (product.rating || 4)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews || 48} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ฿{Number(product.price).toLocaleString("th-TH")}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ฿{Number(product.originalPrice).toLocaleString("th-TH")}
                  </span>
                )}
              </div>
              <p className="text-sm text-green-600">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>

            {/* Stock Info */}
            <div className="text-sm text-gray-600">
              <span className="font-semibold">สินค้าคงเหลือ:</span>{" "}
              {product.stock || 0} ชิ้น
            </div>

            {/* ✅ ซ่อน Quantity Selector และ Add to Cart สำหรับ Admin */}
            {!isAdmin && (
              <>
                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-lg border">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= (product.stock || 99)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={handleAddToCart}
                    disabled={!product.stock}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                </div>
              </>
            )}

            {/* ✅ แสดงข้อความสำหรับ Admin */}
            {isAdmin && (
              <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-yellow-800 font-medium">
                  👑 คุณกำลังดูในฐานะ Admin
                </p>
                <p className="text-yellow-600 text-sm mt-1">
                  Admin ไม่สามารถเพิ่มสินค้าลงตะกร้าได้
                </p>
              </div>
            )}

            {/* Features */}
            <div className="space-y-3 rounded-lg bg-white p-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping on orders over ฿1,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Authentic products guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="prose max-w-none p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-semibold">Key Features:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>High-quality materials safe for pets</li>
                      <li>Durable and long-lasting</li>
                      <li>Easy to clean and maintain</li>
                      <li>Recommended by veterinarians</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold text-gray-600">Brand</dt>
                      <dd className="mt-1">{product.brand || "MaiPaws"}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-600">Category</dt>
                      <dd className="mt-1">{product.category}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-600">Stock</dt>
                      <dd className="mt-1">{product.stock || 0} ชิ้น</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-600">SKU</dt>
                      <dd className="mt-1">
                        {product._id?.slice(-8).toUpperCase()}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold">
                        {product.rating || 4.5}
                      </div>
                      <div className="flex justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < (product.rating || 4)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {product.reviews || 48} reviews
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-gray-500">
                    Reviews will be displayed here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;



