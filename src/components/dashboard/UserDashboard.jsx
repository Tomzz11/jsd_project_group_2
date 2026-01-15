import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import MyOrders from "./MyOrders";
import UserProfile from "./UserProfile";
import Addresses from "./Addresses";

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState("orders");


    return (
        <div className="min-h-screen pt-20 pb-20 bg-gray-100 flex justify-center ">
            <div className="w-full max-w-6xl bg-white rounded-xl shadow flex">

                {/* Sidebar */}
                <div className="w-64 border-r pt-8 px-6">
                    <DashboardSidebar 
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>

                {/*  Content Arear*/}
                <div className="flex-1 pt-8 px-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 min-h-130">
                        {activeTab === "orders" && <MyOrders />}
                        {activeTab === "profile" && <UserProfile />}
                        {activeTab ==="addresses" && <Addresses/>}
                    </div>
                </div>
            </div>
        </div>
    );
}