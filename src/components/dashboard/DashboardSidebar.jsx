export default function DashboardSidebar({activeTab, setActiveTab}) {
    return (
        <div className="w-56 border-r p-8 space-y-4">
            <button 
                onClick={() => setActiveTab("profile")}
                className={`block w-full text-left p-2 rounded ${
                    activeTab === "profile" ? "bg-gray-200" : ""
                }`}
            >
                Profile
            </button>

            <button 
                onClick={() => setActiveTab("orders")}
                className={`block w-full text-left p-2 rounded ${
                    activeTab === "orders" ? "bg-gray-200" : ""
                }`}
            >
                My Orders
            </button>

            <button 
                onClick={() => setActiveTab("addresses")}
                className={`block w-full text-left p-2 rounded ${
                    activeTab === "addresses" ? "bg-gray-200" : ""
                }`}
            >
                Addresses
            </button>
            {/* <button className="font-medium text-left w-full">Wishlist</button> */}
        </div>
    );
}