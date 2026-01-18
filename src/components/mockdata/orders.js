export const orders = [
    {id: "2021", 
     date: "02 Nov 2025", 
     time: "11.42",
     status: "Completed",
     paymentStatus: "Paid (Simulated)",
     shippingAddress:{
      address:" 456",
      city: "Bangkok",
      postalCode: "12010",
      phone: "0812345678",
     },
     items: [
        { name: "Sheba Pouch Tuna and Salmon", price: 23, quantity: 1 },
        { name: "Me O Creammy Treat Salmon Flavor 15g. pack 20", price: 225, quantity: 2},
        {name: "Bearing Cat Litter Spray Cat Baby Powder Scented 250ml.", price: 161, quantity:1}
     ],
     subtotal: 634,
     shipping: 50,
     total:684, 
    },
    {id: "2022", 
     date: "15 Nov 2025", 
     time: "20.45",
     status: "Pending",
     paymentStatus: "Pending Payment",
     shippingAddress:{
      address: "123",
      city: "Bangkok",
      postalCode: "10240",
      phone: "0824567812"
     },
     items: [
      { name: "LovliTails Natural & Mild Dog Shampoo 450ml.", price: 399, quantity: 1 },
    ],
     subtotal: 399,
     shipping: 30,
     total: 429, 
    },
    {id: "2023", 
     date: "06 Dec 2025", 
     time: "19.15", 
     status: "Shipped",
     paymentStatus: "Paid (Simulated)",
     shippingAddress: {
      address: "789",
      city: "Bangkok",
      postalCode: "10123",
      phone: "0831478523"
     },
     items: [
      { name: "Bejiary Dog Leash Size 120cm. and Harness Size 20mm.", price:215, quantity: 1 },
    ],
     subtotal: 215,
     shipping: 30,
     total: 245, 
     },
      {id: "2024", 
     date: "12 Nov 2025", 
     time: "11.42",
     status: "Completed",
     paymentStatus: "Paid (Simulated)",
     shippingAddress:{
      address: "852",
      city: "Bangkok",
      postalCode: "10112",
      phone:"0857423698"
     },
     items: [
        { name: "Sheba Pouch Tuna and Salmon", price: 23, quantity: 1 },
        { name: "Me O Creammy Treat Salmon Flavor 15g. pack 20", price: 225, quantity: 2},
        {name: "Bearing Cat Litter Spray Cat Baby Powder Scented 250ml.", price: 161, quantity:1}
     ],
     subtotal: 634,
     shipping: 50,
     total:684, 
    },
];
