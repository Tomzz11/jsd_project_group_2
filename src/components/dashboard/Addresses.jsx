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
         detail:"99 Lasalle Road Bangkok"
        },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        label: "",
        detail: "",
    });

    const handleAddAddress = () => {
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

    return (
        <div className="bg-white rounded-xl shadow p-6 max-w-xl">
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
                            className="border rounded-lg p-3"
                        >
                            <p className="font-semibold">{addr.label}</p>
                            <p className="text-sm text-gray-600">{addr.detail}</p>
                        </div>
                    ))
                )};
            </div>

            {/* Add address Button */}
            <button
                onClick={() => setShowForm(!showForm)}
            >
                + Add Address
            </button>

            {/* Add Address Form */}
            {showForm && (
                <div className="border rounded-lg p-4 space-y-3">
                    <div>
                        <label className="text-sm text-gray-500">
                            Label
                        </label>
                        <input
                            type="text"
                            value={newAddress.label}
                            onChange={(e) =>
                                setNewAddress({
                                ...newAddress,
                                label: e.target.value,
                            })
                        }
                        className="w-full border rounded p-2 mt-1"
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
                            className="px-3 py-1 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddAddress}
                            className="px-3 py-1 bg-black text-white rounded"
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}