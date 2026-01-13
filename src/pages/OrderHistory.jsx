import React from 'react'

const OrderHistory = () => {
  return (
    <>
    <div class="bg-orange-100 p-6 mt-4 mx-4 rounded">
    <h1 class="text-3xl font-bold text-center">HISTORY ORDER</h1>
  </div>

  <div class="flex gap-6 mt-6 mx-4">
    <div class="bg-orange-100 text-center py-3 flex-1 font-semibold rounded">
      Pending
    </div>
    <div class="bg-orange-100 text-center py-3 flex-1 font-semibold rounded">
      Paid
    </div>
    <div class="bg-orange-100 text-center py-3 flex-1 font-semibold rounded">
      Delivered
    </div>
  </div>

 
  <div class="bg-white/60 p-6 mt-6 mx-4 rounded">

    <div class="bg-white p-4 rounded shadow flex items-center justify-between mb-4">
      <div class="flex items-center gap-4">
        <div class="w-32 h-24 bg-gray-300 flex items-center justify-center">
          Image
        </div>
        <div class="text-gray-700">
          <p>รายละเอียด</p>
        </div>
      </div>
      <div class="font-bold text-gray-800">Paid</div>
    </div>

    <div class="bg-white p-4 rounded shadow flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-32 h-24 bg-gray-300 flex items-center justify-center">
          Image
        </div>
        <div class="text-gray-700">
          <p>รายละเอียด</p>
        </div>
      </div>
      <div class="font-bold text-gray-800">Pending</div>
    </div>

  </div>
  </>
  )
}
export default OrderHistory