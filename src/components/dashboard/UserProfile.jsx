import { useEffect, useState } from "react";
import { authAPI } from "@/services/api"; // ปรับ path ให้ตรง

const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (
    words[0][0].toUpperCase() +
    words[words.length - 1][0].toUpperCase()
  );
};

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // 👉 ดึงข้อมูลตอนเปิดหน้า
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authAPI.getMe();
        if (res.data?.success) {
          const user = res.data.data;
          setProfile({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
          });
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 👉 กด Done → save
  const handleSave = async () => {
    try {
      setSaving(true);
      await authAPI.updateProfile(profile);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Update profile failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-b-2 border-gray-400" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-bold">My Profile</h2>

      {/* Avatar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-500">
          {getInitials(profile.name)}
        </div>
        <button className="text-sm text-gray-500 underline" disabled>
          Change photo
        </button>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="text-sm text-gray-500">Name</label>
        {isEditing ? (
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="mt-1 w-full rounded border p-2"
          />
        ) : (
          <p className="mt-1">{profile.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="text-sm text-gray-500">Email</label>
        <p className="mt-1">{profile.email}</p>
        {/* email ปกติไม่ให้แก้ */}
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="text-sm text-gray-500">Phone</label>
        {isEditing ? (
          <input
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="mt-1 w-full rounded border p-2"
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
            rows={3}
            value={profile.address}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
            className="mt-1 w-full rounded border p-2"
          />
        ) : (
          <p className="mt-1">{profile.address}</p>
        )}
      </div>

      {/* Action */}
      <div className="flex justify-end gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded border px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Done"}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded border px-4 py-2 hover:bg-gray-100"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
