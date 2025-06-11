"use client";

import { useEffect, useState } from "react";
import { getUser, setAuth } from "lib/auth";
import { toast } from "sonner";

const UserPage = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = getUser();
      setUser(data);
      setFormData({
        givenName: data.givenName || "",
        familyName: data.familyName || "",
        email: data.email || "",
        phone: data.phone || "",
        dateOfBirth: data.dateOfBirth?.substring(0, 10) || "",
        address: data.address?.length ? data.address : [],
      });
    }
  }, []);

  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: [] as any[],
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAddressField = (index: number, field: string, value: string) => {
    const newAddresses = [...formData.address];
    newAddresses[index] = {
      ...newAddresses[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      address: newAddresses,
    }));
  };

  const addNewAddress = () => {
    setFormData((prev) => ({
      ...prev,
      address: [
        ...prev.address,
        { street: "", ward: "", district: "", city: "", country: "Vietnam" },
      ],
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_BASE + "/user/editProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setAuth(data.user);
        toast.success("Update profile successfully!");
        // Optionally reset form or redirect
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while update profile.");
    }
  };

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-[#1E1E1E]">
      <section className="max-w-4xl mx-auto py-12 px-4 relative">
        <h1 className="text-3xl font-semibold mb-6">User Profile</h1>

        <button
          onClick={() => {
            if (isEditing) {
              handleUpdateUser(); // gọi hàm khi đang ở chế độ chỉnh sửa và muốn lưu
            }
            setIsEditing(!isEditing); // chuyển đổi giữa hai trạng thái
          }}
          className="absolute top-12 right-4 px-4 py-2 rounded bg-[#3E5C50] text-white hover:bg-[#32483F] transition"
        >
          {isEditing ? "Lưu" : "Chỉnh sửa"}
        </button>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#3E5C50]"
            />
            <div>
              <h2 className="text-xl font-medium">
                {formData.familyName} {formData.givenName}
              </h2>
              <p className="text-gray-500">{formData.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm">First name</label>
              <input
                type="text"
                className="mt-1 w-full border rounded px-3 py-2"
                value={formData.givenName}
                readOnly={!isEditing}
                onChange={(e) => handleChange("givenName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm">Last name</label>
              <input
                type="text"
                className="mt-1 w-full border rounded px-3 py-2"
                value={formData.familyName}
                readOnly={!isEditing}
                onChange={(e) => handleChange("familyName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm">Phone</label>
              <input
                type="text"
                className="mt-1 w-full border rounded px-3 py-2"
                value={formData.phone}
                readOnly={!isEditing}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm">
                Date of Birth
              </label>
              <input
                type="date"
                className="mt-1 w-full border rounded px-3 py-2"
                value={formData.dateOfBirth}
                readOnly={!isEditing}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section className="max-w-4xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Addresses</h2>
          {isEditing && (
            <button
              onClick={addNewAddress}
              className="text-sm px-3 py-1 bg-[#3E5C50] text-white rounded hover:bg-[#32483F]"
            >
              + Thêm địa chỉ
            </button>
          )}
        </div>

        <div className="space-y-4">
          {formData.address.map((address, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded shadow border space-y-2"
            >
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Street"
                    className="border rounded px-3 py-2"
                    value={address.street}
                    onChange={(e) =>
                      updateAddressField(idx, "street", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Ward"
                    className="border rounded px-3 py-2"
                    value={address.ward || ""}
                    onChange={(e) =>
                      updateAddressField(idx, "ward", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="District"
                    className="border rounded px-3 py-2"
                    value={address.district || ""}
                    onChange={(e) =>
                      updateAddressField(idx, "district", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="border rounded px-3 py-2"
                    value={address.city}
                    onChange={(e) =>
                      updateAddressField(idx, "city", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    className="border rounded px-3 py-2"
                    value={address.country}
                    onChange={(e) =>
                      updateAddressField(idx, "country", e.target.value)
                    }
                  />
                </div>
              ) : (
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p>
                    <strong>Street:</strong> {address.street}
                  </p>
                  {address.ward && (
                    <p>
                      <strong>Ward:</strong> {address.ward}
                    </p>
                  )}
                  {address.district && (
                    <p>
                      <strong>District:</strong> {address.district}
                    </p>
                  )}
                  <p>
                    <strong>City:</strong> {address.city}
                  </p>
                  <p>
                    <strong>Country:</strong> {address.country}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserPage;
