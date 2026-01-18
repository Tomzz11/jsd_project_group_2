// components/Cart/CartSummary.jsx
import { Button } from '@/components/ui/button';

const CartSummary = ({ total, onCheckout }) => {
  const shipping = total >= 1000 ? 0 : 50;
  const finalTotal = total + shipping;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        Order Summary
      </h2>

      <div className="space-y-2">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            ฿{total.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `฿${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {/* Free Shipping Notice */}
        {total < 1000 && total > 0 && (
          <p className="text-xs text-blue-600">
            ซื้อเพิ่มอีก ฿{(1000 - total).toFixed(2)} เพื่อจัดส่งฟรี!
          </p>
        )}

        <div className="border-t pt-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">
              ฿{finalTotal.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={onCheckout}
        className="w-full"
        size="lg"
        disabled={total <= 0}
      >
        Proceed to Checkout
      </Button>

      {/* Payment Methods */}
      <div className="mt-4 border-t pt-4">
        <p className="mb-2 text-xs text-gray-500">We accept</p>
        <div className="flex gap-2">
          <div className="flex h-8 w-12 items-center justify-center rounded border bg-white text-xs">
            VISA
          </div>
          <div className="flex h-8 w-12 items-center justify-center rounded border bg-white text-xs">
            MC
          </div>
          <div className="flex h-8 w-12 items-center justify-center rounded border bg-white text-xs">
            QR
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;