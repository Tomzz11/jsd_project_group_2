import React from 'react'

const Checkout = () => {
  return (
    <>
    
  <div class="grid grid-cols-2 gap-6 mt-8 mx-8">
    <div class="bg-orange-100 p-4 rounded text-2xl font-bold text-center">
      CART STAT
    </div>
    <div class="bg-orange-100 p-4 rounded text-2xl font-bold text-center">
      CHECKOUT
    </div>
  </div>

  <div class="mx-8 mt-8 bg-gray-200 p-6 rounded">

    <div class="bg-white p-4 rounded shadow">

      <table class="w-full border border-gray-400">
        <thead>
          <tr class="bg-gray-200 border-b border-gray-400">
            <th class="p-3 text-left font-bold">Product</th>
            <th class="p-3 text-left font-bold">Detail</th>
            <th class="p-3 text-right font-bold">Price</th>
          </tr>
        </thead>

        <tbody>
          <tr class="border-b border-gray-400">
            <td class="p-3 font-semibold">pet dog</td>
            <td class="p-3">...............................</td>
            <td class="p-3 text-right">100 บาท</td>
          </tr>

         
          <tr class="border-b border-gray-400">
            <td class="p-3 font-semibold">pet cat</td>
            <td class="p-3">...............................</td>
            <td class="p-3 text-right">200 บาท</td>
          </tr>


          <tr class="border-b border-gray-400 bg-gray-100">
            <td class="p-3 font-bold">Total</td>
            <td></td>
            <td class="p-3 text-right font-bold">300 บาท</td>
          </tr>

        </tbody>
      </table>

      <div class="flex justify-end mt-4">
    <a href="HistoryOrder.html" target="_blank">
        <button class="px-4 py-2 bg-orange-300 border rounded font-semibold hover:bg-gray-400">
          confirm payment
        </button>
    </a>
      </div>
    </div>
  </div>
    </>
  )
}

export default Checkout