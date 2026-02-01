import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";
import { TIER_OPTIONS, STATUS_OPTIONS } from "../../lib/apiEnums";

const MySubscription = () => {
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formTier, setFormTier] = useState("1");
  const [formStatus, setFormStatus] = useState("1");

  const fetchSubscription = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch("/api/subscription/me");
      if (res.status === 404) {
        setIsCreateMode(true);
        setIsEditing(true);
        setFormTier("1");
        setFormStatus("1");
        setSub(null);
      } else if (res.ok) {
        const data = await res.json();
        setIsCreateMode(false);
        setSub(data);
        setFormTier(String(data.tier ?? 1));
        setFormStatus(String(data.status ?? 1));
      } else if (res.status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        setError("Failed to load subscription.");
      }
    } catch (err) {
      setError(err.message || "Failed to load subscription. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await apiFetch("/api/subscription", {
        method: "POST",
        body: JSON.stringify({ tier: parseInt(formTier, 10) || 1 }),
      });
      if (!res.ok) {
        const text = await res.text();
        // Check if subscription already exists (duplicate)
        if (res.status === 400 && text.toLowerCase().includes("already exists")) {
          // Switch to edit mode - fetch existing subscription
          setIsCreateMode(false);
          setIsEditing(true);
          await fetchSubscription();
          setError("Subscription already exists. You can now edit it.");
        } else {
          throw new Error(text || "Failed to create subscription.");
        }
      } else {
        await fetchSubscription();
      }
    } catch (err) {
      setError(err.message || "Failed to create subscription.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await apiFetch("/api/subscription/me", {
        method: "PUT",
        body: JSON.stringify({
          tier: parseInt(formTier, 10) || 1,
          status: parseInt(formStatus, 10) || 1,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update subscription.");
      }
      setIsEditing(false);
      await fetchSubscription();
    } catch (err) {
      setError(err.message || "Failed to update subscription.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-rose-700">My Subscription</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-rose-700">My Subscription</h3>
        {!isCreateMode && sub && (
          <button
            type="button"
            onClick={() => {
              setIsEditing((prev) => !prev);
              setFormTier(String(sub.tier ?? 1));
              setFormStatus(String(sub.status ?? 1));
            }}
            className="px-4 py-2 text-sm rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {isCreateMode ? (
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Choose plan</label>
            <select
              value={formTier}
              onChange={(e) => setFormTier(e.target.value)}
              className="w-full p-2 border border-rose-200 rounded-md"
            >
              {TIER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>
      ) : isEditing && sub ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Plan</label>
            <select
              value={formTier}
              onChange={(e) => setFormTier(e.target.value)}
              className="w-full p-2 border border-rose-200 rounded-md"
            >
              {TIER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value)}
              className="w-full p-2 border border-rose-200 rounded-md"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
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
        sub && (
          <div className="space-y-4 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="font-medium">{sub.tierName ?? TIER_OPTIONS.find((o) => o.value === sub.tier)?.label ?? sub.tier}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{sub.statusName ?? STATUS_OPTIONS.find((o) => o.value === sub.status)?.label ?? sub.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Start date</p>
              <p className="font-medium">
                {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "Not set"}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MySubscription;
