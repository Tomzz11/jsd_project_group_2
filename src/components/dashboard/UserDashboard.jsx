import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import MyOrders from "./MyOrders";
import UserProfile from "./UserProfile";
import Addresses from "./Addresses";

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState("orders");


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-6xl w-full bg-white rounded-xl shadow flex">

                {/* Sidebar */}
                <DashboardSidebar 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {/*  Content Arear*/}
                <div className="flex-1 p-6">
                        {activeTab === "orders" && <MyOrders />}
                        {activeTab === "profile" && <UserProfile />}
                        {activeTab ==="addresses" && <Addresses/>}
                </div>
            </div>
        </div>
    );
}