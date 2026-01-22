import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import MyOrders from "./MyOrders";
import UserProfile from "./UserProfile";
import Addresses from "./Addresses";

export default function UserDashboard() {
  const [searchParams] = useSearchParams();
  
  const getInitialTab = () => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && ["profile", "orders", "addresses"].includes(tabFromUrl)) {
      return tabFromUrl;
    }
    return "profile";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-100 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow flex">
        {/* Sidebar */}
        <div className="w-64 border-r pt-8 px-6">
          <DashboardSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 pt-8 px-8">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-130">
            {activeTab === "profile" && <UserProfile />}
            {activeTab === "orders" && <MyOrders />}
            {activeTab === "addresses" && <Addresses />}
          </div>
        </div>
      </div>
    </div>
  );
}

