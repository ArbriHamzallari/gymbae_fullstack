import React, { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";
import { Goal, ExperienceLevel, Gender, GOAL_OPTIONS, EXPERIENCE_OPTIONS, GENDER_OPTIONS } from "../../lib/apiEnums";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    fullName: "",
    age: "",
    gender: "",
    heightCm: "",
    weightKg: "",
    goal: "",
    experienceLevel: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const res = await apiFetch("/api/profile/me");
        
        if (!res.ok) {
          if (res.status === 404) {
            setHasProfile(false);
            setLoading(false);
            return;
          }
          throw new Error(`Failed to load profile: ${res.status}`);
        }

        const data = await res.json();
        
        setProfile({
          fullName: data?.FullName ?? "",
          age: data?.Age ?? "",
          gender: data?.Gender ?? "",
          heightCm: data?.HeightCm ?? "",
          weightKg: data?.WeightKg ?? "",
          goal: data?.Goal ?? "",
          experienceLevel: data?.ExperienceLevel ?? "",
        });

        setHasProfile(true);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setError("");
      const endpoint = hasProfile ? "/api/profile/update" : "/api/profile/create";
      const method = hasProfile ? "PUT" : "POST";

      const requestBody = {
        FullName: profile.fullName,
        Age: profile.age === "" ? 0 : Number(profile.age),
        Gender: profile.gender === "" ? 0 : Number(profile.gender),
        HeightCm: profile.heightCm === "" ? 0 : Number(profile.heightCm),
        WeightKg: profile.weightKg === "" ? 0 : Number(profile.weightKg),
        Goal: profile.goal === "" ? 0 : Number(profile.goal),
        ExperienceLevel: profile.experienceLevel === "" ? 0 : Number(profile.experienceLevel),
      };

      const res = await apiFetch(endpoint, {
        method,
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save profile");
      }

      setHasProfile(true);
      setIsEditing(false);
      const updatedRes = await apiFetch("/api/profile/me");
      if (updatedRes.ok) {
        const updatedData = await updatedRes.json();
        setProfile({
          fullName: updatedData?.FullName ?? "",
          age: updatedData?.Age ?? "",
          gender: updatedData?.Gender ?? "",
          heightCm: updatedData?.HeightCm ?? "",
          weightKg: updatedData?.WeightKg ?? "",
          goal: updatedData?.Goal ?? "",
          experienceLevel: updatedData?.ExperienceLevel ?? "",
        });
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError(err.message || "Could not save profile. Please check all fields are filled.");
    }
  };

  const getGoalLabel = (value) => {
    const option = GOAL_OPTIONS.find((opt) => opt.value === Number(value));
    return option?.label || "Not set";
  };

  const getExperienceLabel = (value) => {
    const option = EXPERIENCE_OPTIONS.find((opt) => opt.value === Number(value));
    return option?.label || "Not set";
  };

  const getGenderLabel = (value) => {
    const option = GENDER_OPTIONS.find((opt) => opt.value === Number(value));
    return option?.label || "Not set";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 border border-rose-100 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-rose-700 mb-6">Profile Details</h3>

      {loading && (
        <p className="text-sm text-gray-500 mb-4">Loading profile...</p>
      )}

      {error && (
        <p className="text-sm text-red-600 mb-4 bg-red-50 p-3 rounded-md">{error}</p>
      )}

      {/* View mode */}
      {!isEditing && (
        <div>
          <h4 className="text-lg font-semibold text-rose-700 mb-4">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{profile.fullName || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{profile.age || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{getGenderLabel(profile.gender)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Experience Level</p>
              <p className="font-medium">{getExperienceLabel(profile.experienceLevel)}</p>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-rose-700 mb-4">
            Fitness Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Height</p>
              <p className="font-medium">
                {profile.heightCm ? `${profile.heightCm} cm` : "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-medium">
                {profile.weightKg ? `${profile.weightKg} kg` : "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Goal</p>
              <p className="font-medium">{getGoalLabel(profile.goal)}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}

      {/* Edit mode */}
      {isEditing && (
        <div>
          <h4 className="text-lg font-semibold text-rose-700 mb-4">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-rose-300 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                min="1"
                max="120"
                className="w-full p-2 border rounded-md border-rose-300 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-rose-300 bg-white"
                required
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Experience Level</label>
              <select
                name="experienceLevel"
                value={profile.experienceLevel}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-rose-300 bg-white"
                required
              >
                <option value="">Select experience level</option>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-rose-700 mb-4">
            Fitness Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Height (cm)</label>
              <input
                type="number"
                name="heightCm"
                value={profile.heightCm}
                onChange={handleChange}
                min="1"
                step="0.1"
                className="w-full p-2 border rounded-md border-rose-300 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weightKg"
                value={profile.weightKg}
                onChange={handleChange}
                min="1"
                step="0.1"
                className="w-full p-2 border rounded-md border-rose-300 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Goal</label>
              <select
                name="goal"
                value={profile.goal}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-rose-300 bg-white"
                required
              >
                <option value="">Select goal</option>
                {GOAL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsEditing(false);
                setError("");
              }}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
