import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

//// Product card ที่ไปแสดง ที่หน้า HOME 
const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { user, isAdmin } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const categoryLabels = {
    dog: '🐕 สุนัข',
    cat: '🐱 แมว',
    bird: '🐦 นก',
    fish: '🐟 ปลา',
    other: '🐾 อื่นๆ'
  };

  return (
    // <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="bg-white rounded-xl">
      <Link to={`/product/${product._id}`}>
        {/* Product Image */}
        {/* สินค้า แต่ละอัน  */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
           {/* Category Badge */}
           <span className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
            {categoryLabels[product.category] || product.category}
          </span> 

          {/* Stock Badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              เหลือ {product.stock} ชิ้น
            </span> 
          )} 
          {product.stock === 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              สินค้าหมด
            </span>
          )}
        </div>

        
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              ฿{product.price?.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div>
        {/* <div className="px-4 pb-4 flex gap-2">   */}
        <Link
          to={`/product/${product._id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FaEye />
          <span>ดูรายละเอียด</span>
        </Link>
        
        {user && !isAdmin && product.stock > 0 && (
          <button
            onClick={handleAddToCart}
            disabled={isInCart(product._id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
              isInCart(product._id)
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            <FaShoppingCart />
            <span>{isInCart(product._id) ? 'อยู่ในตะกร้า' : 'เพิ่มลงตะกร้า'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
