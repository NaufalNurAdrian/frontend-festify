"use client";

import { useEffect, useRef, useState } from "react";
import { formatDate } from "@/helpers/formatDate";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "@/components/context/useSession";
import UserCoupon from "@/components/userCopuon";
import authGuard from "@/hoc/authGuard";
import Image from "next/image";

function AdminProfile() {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
  const { user, checkSession, logout } = useSession();
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        router.push("/login");
      }
    });
  };

  // Handle avatar change
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Error", "Please log in to update your profile.", "error");
        return;
      }

      const response = await fetch(`${base_url}/users/avatar`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Swal.fire(
          "Success!",
          "Your profile picture has been updated successfully!",
          "success"
        ).then(() => window.location.reload());
      } else {
        Swal.fire(
          "Error!",
          "Failed to update your profile picture. Please try again later.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      Swal.fire(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  // Fetch session and last login data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkSession();
        const now = new Date();
        const formattedNow = now.toISOString();
        localStorage.setItem("lastLogin", formattedNow);
        setLastLogin(formatDate(formattedNow));
      } catch (err) {
        console.error("Failed to fetch session or last login:", err);
      }
    };

    fetchData();
  }, [checkSession]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-3xl font-bold">No Promoter Data Found</h1>
      </div>
    );
  }

  const { username, email, avatar, points, referralCode } = user;

  // Modal handlers
  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 p-5">
        <div className="flex-1 px-6 py-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
              Profile
            </h1>
            <div className="flex flex-col items-center lg:gap-8">
              {/* Profile Avatar */}
              <div className="relative">
                <Image
                  src={avatar || "/festifylogo.png"}
                  alt="Avatar"
                  height={40}
                  width={40}
                  className="w-40 h-40 rounded-full border-4 border-red shadow-lg cursor-pointer hover:opacity-90"
                  onClick={() => openModal(avatar || "/festifylogo.png")}
                />
              </div>

              {/* File Input (Hidden) */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Profile Info */}
              <div className="mt-6 text-center">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Username
                  </h2>
                  <p className="text-gray-600">{username || "Not Available"}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Email</h2>
                  <p className="text-gray-600">{email || "Not Available"}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Points
                  </h2>
                  <p className="text-gray-600">{points || "Not Available"}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Referral Code
                  </h2>
                  <p className="text-gray-600">
                    {referralCode || "Not Available"}
                  </p>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Last Login
                  </h2>
                  <p className="text-gray-600">
                    {lastLogin || "Not Available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={triggerFileInput}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-red hover:bg-rose-500"
                }`}
                aria-label="Edit Photos"
              >
                {isLoading ? "Uploading..." : "Edit Photos"}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-red font-semibold transition-colors duration-300"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Coupon Section */}
        <div className="mt-6 px-6">
          <UserCoupon />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <Image
              src={selectedImage!}
              alt="Full View"
              className="max-w-full max-h-screen rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default authGuard(AdminProfile);
