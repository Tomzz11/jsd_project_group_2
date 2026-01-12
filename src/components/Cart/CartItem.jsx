export default function CartItem({ item, onIncrease, onDecrease, onRemove}) {
    return (
    <div className="flex items-center justify-between rounded-lg border p-4 bg-white">

      {/* IMAGE (ซ้ายสุด) */}
      <div className="w-16 h-16 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full rounded-md object-cover"
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-500">${item.price}</p>
      </div>

      {/* QUANTITY */}
      <div className="flex items-center gap-2">
        <button
          className="px-2 border rounded"
          onClick={() => onDecrease(item.id)}
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          className="px-2 border rounded"
          onClick={() => onIncrease(item.id)}
        >
          +
        </button>
      </div>

      {/* TOTAL + REMOVE */}
      <div className="text-right min-w-22.5">
        <p className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
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