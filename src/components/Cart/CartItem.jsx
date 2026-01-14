export default function CartItem({ item, onIncrease, onDecrease, onRemove}) {
    return (
    <div className="flex items-center gap-6 rounded-lg border p-4 bg-white">

      {/* IMAGE (ซ้ายสุด) */}
      <div className="w-20 h-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="flex-1">
        <p className="font-medium text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-500">฿{item.price.toFixed(2)} / item</p>
      </div>

      {/* QUANTITY */}
      <div className="flex items-center gap-2">
        <button
          className="h-8 w-8 rounded border hover:bg-gray-100"
          onClick={() => onDecrease(item.id)}
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          className="h-8 w-8 rounded border hover:bg-gray-100"
          onClick={() => onIncrease(item.id)}
        >
          +
        </button>
      </div>

      {/* TOTAL + REMOVE */}
      <div className="text-right min-w-22.5">
        <p className="font-semibold text-gray-800">
          ฿{(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          className="text-red-500 text-sm hover:underline"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>

    </div>
  );

}