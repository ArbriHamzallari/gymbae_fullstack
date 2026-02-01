import { useState, useEffect } from "react";
import { apiFetch } from "../../lib/api";

const emptyPlan = () => ({
  name: "",
  workoutSchedule: "",
  calorieGoal: "",
});

const MyPlan = () => {
  const [plan, setPlan] = useState(emptyPlan());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const fetchPlan = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch("/api/plan/me");
      if (res.status === 404) {
        setIsCreateMode(true);
        setIsEditing(true);
        setPlan(emptyPlan());
      } else if (res.ok) {
        const data = await res.json();
        setIsCreateMode(false);
        setPlan({
          name: data.name ?? "",
          workoutSchedule: data.workoutSchedule ?? "",
          calorieGoal: data.calorieGoal != null ? String(data.calorieGoal) : "",
        });
      } else if (res.status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        setError("Failed to load plan.");
      }
    } catch (err) {
      setError(err.message || "Failed to load plan. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation - at least one field should be filled
    const payload = {
      name: plan.name.trim() || null,
      workoutSchedule: plan.workoutSchedule.trim() || null,
      calorieGoal: plan.calorieGoal ? Math.min(10000, Math.max(1, parseInt(plan.calorieGoal, 10) || 0)) : null,
    };
    if (!payload.calorieGoal) delete payload.calorieGoal;
    
    if (!payload.name && !payload.workoutSchedule && !payload.calorieGoal) {
      setError("Please fill in at least one field.");
      return;
    }

    setSaving(true);
    if (isCreateMode) {
      try {
        const res = await apiFetch("/api/plan", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const text = await res.text();
          // Check if plan already exists (duplicate)
          if (res.status === 400 && text.toLowerCase().includes("already exists")) {
            // Switch to edit mode - fetch existing plan
            setIsCreateMode(false);
            setIsEditing(true);
            const meRes = await apiFetch("/api/plan/me");
            if (meRes.ok) {
              const data = await meRes.json();
              setPlan({
                name: data.name ?? "",
                workoutSchedule: data.workoutSchedule ?? "",
                calorieGoal: data.calorieGoal != null ? String(data.calorieGoal) : "",
              });
              setError("Plan already exists. You can now edit it.");
            } else {
              throw new Error(text || "Failed to create plan.");
            }
          } else {
            throw new Error(text || "Failed to create plan.");
          }
        } else {
          setIsCreateMode(false);
          setIsEditing(false);
          const data = await res.json();
          setPlan({
            name: data.name ?? "",
            workoutSchedule: data.workoutSchedule ?? "",
            calorieGoal: data.calorieGoal != null ? String(data.calorieGoal) : "",
          });
        }
      } catch (err) {
        setError(err.message || "Failed to create plan.");
      } finally {
        setSaving(false);
      }
      return;
    }

    try {
      const res = await apiFetch("/api/plan/me", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update plan.");
      }
      setIsEditing(false);
      const data = await res.json();
      setPlan({
        name: data.name ?? "",
        workoutSchedule: data.workoutSchedule ?? "",
        calorieGoal: data.calorieGoal != null ? String(data.calorieGoal) : "",
      });
    } catch (err) {
      setError(err.message || "Failed to update plan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-rose-700">My Plan</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-rose-700">My Plan</h3>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={plan.name}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded-md"
              placeholder="e.g. My fitness plan"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Workout schedule</label>
            <textarea
              name="workoutSchedule"
              value={plan.workoutSchedule}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded-md"
              rows={4}
              placeholder="e.g. Mon: Upper, Wed: Lower, Fri: Full body"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Daily calorie goal</label>
            <input
              type="number"
              name="calorieGoal"
              value={plan.calorieGoal}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded-md"
              min="1"
              max="10000"
              placeholder="e.g. 2000"
            />
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
        <div className="space-y-4 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{plan.name || "Not set"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Workout schedule</p>
            <p className="font-medium whitespace-pre-wrap">{plan.workoutSchedule || "Not set"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Daily calorie goal</p>
            <p className="font-medium">{plan.calorieGoal ? `${plan.calorieGoal} kcal` : "Not set"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlan;
