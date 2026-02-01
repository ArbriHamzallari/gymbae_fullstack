import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import {
  GOAL_OPTIONS,
  EXPERIENCE_OPTIONS,
  GENDER_OPTIONS,
} from "../../lib/apiEnums";

const emptyProfile = () => ({
  fullName: "",
  age: "",
  gender: "1",
  height: "",
  weight: "",
  goal: "1",
  experienceLevel: "1",
});

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(emptyProfile());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiFetch("/api/profile/me");
        if (cancelled) return;
        if (res.status === 404) {
          setIsCreateMode(true);
          setIsEditing(true);
          setProfile(emptyProfile());
          setLoading(false);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setIsCreateMode(false);
          setProfile({
            fullName: data.fullName ?? "",
            age: data.age != null ? String(data.age) : "",
            gender: data.gender != null ? String(data.gender) : "",
            height: data.heightCm != null ? String(data.heightCm) : "",
            weight: data.weightKg != null ? String(data.weightKg) : "",
            goal: data.goal != null ? String(data.goal) : "",
            experienceLevel: data.experienceLevel != null ? String(data.experienceLevel) : "",
          });
        } else if (res.status === 401) {
          // Token expired - will be handled by AuthContext
          if (!cancelled) setError("Session expired. Please log in again.");
        } else {
          if (!cancelled) setError("Failed to load profile.");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load profile. Please check your connection.");
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (!profile.fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!profile.age || parseInt(profile.age, 10) < 1) {
      setError("Valid age is required.");
      return;
    }
    if (!profile.height || parseFloat(profile.height) <= 0) {
      setError("Valid height is required.");
      return;
    }
    if (!profile.weight || parseFloat(profile.weight) <= 0) {
      setError("Valid weight is required.");
      return;
    }

    setSaving(true);
    const payload = {
      fullName: profile.fullName.trim(),
      age: parseInt(profile.age, 10) || 0,
      gender: parseInt(profile.gender, 10) || 1,
      heightCm: parseFloat(profile.height) || 0,
      weightKg: parseFloat(profile.weight) || 0,
      goal: parseInt(profile.goal, 10) || 1,
      experienceLevel: parseInt(profile.experienceLevel, 10) || 1,
    };
    if (isCreateMode) {
      try {
        const res = await apiFetch("/api/profile/create", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const text = await res.text();
          // Check if profile already exists (duplicate)
          if (res.status === 400 && text.toLowerCase().includes("already exists")) {
            // Switch to edit mode - fetch existing profile
            setIsCreateMode(false);
            setIsEditing(true);
            const meRes = await apiFetch("/api/profile/me");
            if (meRes.ok) {
              const data = await meRes.json();
              setProfile({
                fullName: data.fullName ?? "",
                age: data.age != null ? String(data.age) : "",
                gender: data.gender != null ? String(data.gender) : "",
                height: data.heightCm != null ? String(data.heightCm) : "",
                weight: data.weightKg != null ? String(data.weightKg) : "",
                goal: data.goal != null ? String(data.goal) : "",
                experienceLevel: data.experienceLevel != null ? String(data.experienceLevel) : "",
              });
              setError("Profile already exists. You can now edit it.");
            } else {
              throw new Error(text || "Failed to create profile.");
            }
          } else {
            throw new Error(text || "Failed to create profile.");
          }
        } else {
          setIsCreateMode(false);
          setIsEditing(false);
          const data = await res.json();
          setProfile({
            fullName: data.fullName ?? "",
            age: data.age != null ? String(data.age) : "",
            gender: data.gender != null ? String(data.gender) : "",
            height: data.heightCm != null ? String(data.heightCm) : "",
            weight: data.weightKg != null ? String(data.weightKg) : "",
            goal: data.goal != null ? String(data.goal) : "",
            experienceLevel: data.experienceLevel != null ? String(data.experienceLevel) : "",
          });
        }
      } catch (err) {
        setError(err.message || "Failed to create profile.");
      } finally {
        setSaving(false);
      }
      return;
    }
    try {
      const res = await apiFetch("/api/profile/update", {
        method: "PUT",
        body: JSON.stringify({ ...payload, completedOnboarding: true }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update profile.");
      }
      setIsEditing(false);
      const data = await res.json();
      setProfile({
        fullName: data.fullName ?? "",
        age: data.age != null ? String(data.age) : "",
        gender: data.gender != null ? String(data.gender) : "",
        height: data.heightCm != null ? String(data.heightCm) : "",
        weight: data.weightKg != null ? String(data.weightKg) : "",
        goal: data.goal != null ? String(data.goal) : "",
        experienceLevel: data.experienceLevel != null ? String(data.experienceLevel) : "",
      });
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-rose-700">Profile</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const email = user?.email ?? "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-rose-700">Profile</h3>
        {!isCreateMode && (
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="px-4 py-2 text-sm rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full p-2 border border-rose-200 rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded-md"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded-md"
              required
            >
              {GENDER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={profile.height}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded-md"
              required
              min="1"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={profile.weight}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded-md"
              required
              min="0.1"
              step="0.01"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Goal</label>
            <select
              name="goal"
              value={profile.goal}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded-md"
              required
            >
              {GOAL_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">
              Previous experience in the gym
            </label>
            <select
              name="experienceLevel"
              value={profile.experienceLevel}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded-md"
              required
            >
              {EXPERIENCE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{profile.fullName || "Not set"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{email || "Not set"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-medium">{profile.age || "Not set"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium">
              {(GENDER_OPTIONS.find((o) => String(o.value) === profile.gender)?.label ?? profile.gender) || "Not set"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Height</p>
            <p className="font-medium">
              {profile.height ? `${profile.height} cm` : "Not set"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Weight</p>
            <p className="font-medium">
              {profile.weight ? `${profile.weight} kg` : "Not set"}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500">Goal</p>
            <p className="font-medium">
              {(GOAL_OPTIONS.find((o) => String(o.value) === profile.goal)?.label ?? profile.goal) || "Not set"}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500">Previous experience in the gym</p>
            <p className="font-medium">
              {(EXPERIENCE_OPTIONS.find((o) => String(o.value) === profile.experienceLevel)?.label ?? profile.experienceLevel) || "Not set"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
