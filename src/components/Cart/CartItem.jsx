// components/Cart/CartItem.jsx
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const productId = item?.productId; // ✅ สำคัญ
  const price = Number(item?.price) || 0;
  const quantity = Number(item?.quantity) || 1;
  const subtotal = price * quantity;

  if (!productId) return null; // กันเคสข้อมูลไม่ครบ

  return (
    <div className="flex gap-4 rounded-lg border bg-white p-4">
      {/* Product Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={item?.image || "/placeholder.png"}
          alt={item?.name || "Product"}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {item?.name || "Unknown Product"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              ฿
              {price.toLocaleString("th-TH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(productId)} // ✅ ใช้ productId
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Quantity Controls and Subtotal */}
        <div className="mt-auto flex items-center justify-between">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDecrease(productId)} // ✅
              disabled={quantity <= 1}
              className="h-8 w-8"
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-12 text-center font-medium">{quantity}</span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => onIncrease(productId)} // ✅
              disabled={quantity >= (Number(item?.stock) || 99)}
              className="h-8 w-8"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="font-semibold text-gray-900">
              ฿
              {subtotal.toLocaleString("th-TH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        {/* Stock Warning */}
        {item?.stock && quantity >= Number(item.stock) && (
          <p className="mt-2 text-xs text-orange-600">
            สินค้าเหลือเพียง {item.stock} ชิ้น
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
