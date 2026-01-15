
import { useState } from "react";

export default function Address() {
    const [addresses, setAddresses] = useState([
        {
         id:2021 ,
         label:"Home" ,
         detail:"456 Sukumvit road Bangkok"
        },
        {
         id:2022 ,
         label:"Home" ,
         detail:"99 Sathon Nuea Road Bangkok"
        },
        {
         id:2023 ,
         label:"Office" ,
         detail:"789 Lasalle Road Bangkok"
        },
    ]);

    //Add Address
    const [showForm, setShowForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        label: "",
        detail: "",
    });

    // Edit Address & Default
    const [editingId, setEditingId] = useState(null);
    const [editAddress, setEditAddress] = useState({
        label: "",
        detail: "",
    });
    const [defaultAddressId, setDefaultAddressId] = useState(2021);


    const handleAddAddress = () => {
        if(!newAddress.label || !newAddress.detail) return;

        setAddresses([
            ...addresses,
            {
                id: Date.now(),
                ...newAddress,
            },
        ]);
        setNewAddress({ label: "",detail: "" });
        setShowForm(false);
    };

    const handleSaveEdit = (id) => {
        setAddresses(
            addresses.map((a) =>
            a.id === id ? {...a, ...editAddress} : a)
        );
        setEditingId(null);
    };

    return (
        <div className="max-w-xl">
            <h2 className="text-xl font-bold mb-4">My Addresses</h2>

            {/* Address List */}
            <div className="space-y-3 mb-6">
                {addresses.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No addresses added yet.
                    </p>
                ) : (
                    addresses.map((addr) => (
                        <div
                            key={addr.id}
                            className={`border rounded-lg p-4 flex justify-between items-start cursor-pointer
                                ${defaultAddressId === addr.id ? "border-black bg-gray-50" : ""}`}
                        >

                            {/* Address Info */}
                            <div className="flex-1">
                                {editingId === addr.id ? (
                                    <>
                                        <input
                                            className="w-full border rounded p-2 mb-2"
                                            value={editAddress.label}
                                            onChange={(e) =>
                                                setEditAddress({
                                                    ...editAddress,
                                                    label: e.target.value,
                                                })
                                            }
                                        />
                                        <textarea 
                                            className="w-full border rounded p-2"
                                            rows={3}
                                            value={editAddress.detail}
                                            onChange={(e) =>
                                                setEditAddress({
                                                    ...editAddress,
                                                    detail: e.target.value,
                                                })
                                            }
                                        />
                                    </>
                                ) : (

                                    <>
                                        <p 
                                            className="font-semibold flex items-center gap-2">
                                            {addr.label}
                                            {defaultAddressId === addr.id && (
                                                <span className="text-xs bg-black text-white px-2 py-0.5 rounded">
                                                    Default
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-600">{addr.detail}</p>
                                    </>
                                )}

                            </div>

                            {/* Actions */}
                            <div className="flex flex-col items-end gap-2 ml-4">
                                {editingId === addr.id ? (
                                    <button 
                                        className="text-sm text-gray-600 hover:underline cursor-pointer"
                                        onClick={() => handleSaveEdit(addr.id)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                   <>
                                    <div className="flex gap-3">
                                        <button 
                                            className="text-sm text-blue-600 hover:underlin cursor-pointer"
                                            onClick={() => {
                                                setEditingId(addr.id);
                                                setEditAddress({
                                                    label: addr.label,
                                                    detail: addr.detail,
                                                });
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="text-sm text-blue-600 hover:underline cursor-pointer"
                                            onClick={() => 
                                                setAddresses(addresses.filter((a) => a.id !== addr.id))}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    {defaultAddressId !== addr.id && (
                                        <button 
                                            className="text-sm text-blue-600 hover:underline cursor-pointer"
                                            onClick={() => 
                                                setDefaultAddressId(addr.id)}
                                        >
                                            Use as shipping
                                        </button>
                                      )}
                                   </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add address Button */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="text-sm text-green-600 hover:underline cursor-pointer"
            >
                + Add Address
            </button>

            {/* Add Address Form */}
            {showForm && (
                <div className="mt-4 w-full  border rounded-lg p-4 space-y-3 bg-gray-50">
                    <div>
                        <label className="text-sm text-gray-500">
                            Label
                        </label>
                        <input 
                            className="w-full border rounded p-2 mt-1"
                            type="text"
                            value={newAddress.label}
                            onChange={(e) =>
                                setNewAddress({
                                ...newAddress,
                                label: e.target.value,
                            })
                        }
                        placeholder="Home / Office"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">
                            Address
                        </label>
                        <textarea
                            value={newAddress.detail}
                            onChange={(e) =>
                                setNewAddress({
                                    ...newAddress,
                                    detail: e.target.value,
                                })
                            }
                            className="w-full border rounded p-2 mt-1"
                            rows={3}
                            placeholder="Full address"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowForm(false)}
                            className="px-3 py-1 border rounded cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddAddress}
                            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer"
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}