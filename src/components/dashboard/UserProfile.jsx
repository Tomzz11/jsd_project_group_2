import { useState } from "react";

const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) {
        return words[0][0].toUpperCase()
    };
    
    return (
        words[0][0].toUpperCase() +
        words[words.length - 1][0].toUpperCase()
    );
};

export default function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);

    const [ profile, setProfile] = useState({
        name: "Mike Biru",
        email: "mike@example.com",
        address: "Bangkok, Thailand",
        phone: "081-234-5678",
    });

    return (
        <div  className="w-full">
            <h2 className="text-xl font-bold mb-4">
                My Profile
            </h2>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {getInitials(profile.name)}
                </div>
                <button
                    className="text-sm underline text-gray-500"
                    disabled
                >
                    Change photo
                </button>
            </div>

            {/* Name */}
            <div className="mb-4">
                <label className="text-sm text-gray-500">
                    Name
                </label>
                {isEditing ? (
                <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full border rounded p-2 mt-1"
                />
                ) : (
                    <p className="mt-1">{profile.name}</p>
                )}
            </div>

            {/* Email */}
            <div className="mb-4">
                <label className="text-sm text-gray-500">Email</label>
                {isEditing ? (
                    <input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                            setProfile({...profile, email: e.target.value})
                        }
                        className="w-full border rounded p-2 mt-1"
                    />
                ) : (
                    <p className="mt-1">{profile.email}</p>
                )}
            </div>

            {/* Phone */}
            <div>
                <label className="text-sm text-gray-500">Phone</label>
                {isEditing ? (
                    <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                            setProfile({...profile, phone: e.target.value})
                        }
                        className="w-full border rounded p-2 mt-1"
                        placeholder="Phone number"
                    />
                ) : (
                    <p className="mt-1">{profile.phone}</p>
                )}
            </div>

            {/* Address */}
            <div className="mb-6">
                <label className="text-sm text-gray-500">Address</label>
                {isEditing ? (
                    <textarea
                        value={profile.address}
                        onChange={(e) =>
                            setProfile({...profile, address: e.target.value})
                        }
                        className="w-full border rounded p-2 mt-1"
                        rows={3}
                    />
                ) : (
                    <p className="mt-1">{profile.address}</p>
                )}
            </div>

            {/* Action */}
            <div className="flex justify-end">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 border rounded  hover:bg-gray-100"
                >
                    {isEditing ? "Done" : "Edit Profile"}
                </button>
            </div>
        </div>
    );
}