export default function DashboardSidebar({activeTab, setActiveTab}) {
    return (
        <div className="w-64  p-6 flex flex-col">

            {/* Side Title */}
            <h2 
                className="mb-6 text-2xl font-semibold text-gray-700"
            >
                My Account
            </h2>
            
            {/* Menu */}
            <div>
                <button 
                    onClick={() => setActiveTab("profile")}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                        activeTab === "profile" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                    }`}
                >
                    Profile
                </button>
            </div>

            <button 
                onClick={() => setActiveTab("orders")}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "orders" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                }`}
            >
                My Orders
            </button>

            <button 
                onClick={() => setActiveTab("addresses")}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "addresses" ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                }`}
            >
                Addresses
            </button>
            {/* <button className="font-medium text-left w-full">Wishlist</button> */}
        </div>
    );
}