import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../lib/api";
import { TIER_OPTIONS, STATUS_OPTIONS } from "../../lib/apiEnums";
import { pricingOptions } from "../../constants";

const TIER_VALUE_TO_NAME = Object.fromEntries(
  TIER_OPTIONS.map((o) => [String(o.value), o.label])
);

const MySubscription = () => {
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateMode, setIsCreateMode] = useState(false);

  const fetchSubscription = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch("/api/subscription/me");
      if (res.status === 404) {
        setIsCreateMode(true);
        setSub(null);
      } else if (res.ok) {
        const data = await res.json();
        setIsCreateMode(false);
        setSub(data);
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

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-rose-700">My Subscription</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const currentTierName = sub ? (TIER_VALUE_TO_NAME[String(sub.tier)] ?? sub.tierName ?? "Free") : null;
  const statusLabel = sub ? (STATUS_OPTIONS.find((o) => o.value === sub.status)?.label ?? sub.statusName ?? "Active") : null;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-rose-700">My Subscription</h3>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {isCreateMode ? (
        <>
          <p className="text-gray-600">
            You haven&apos;t chosen a subscription yet. Default is <strong>Free</strong>. Choose a plan below to see details and complete checkout.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {pricingOptions.map((option) => (
              <div
                key={option.title}
                className="p-4 border border-rose-200 rounded-xl bg-white hover:border-rose-400 transition"
              >
                <p className="text-lg font-semibold text-rose-800">{option.title}</p>
                <p className="text-2xl font-medium text-gray-800 mt-1">
                  {option.price}
                  <span className="text-sm font-normal text-gray-500">/Month</span>
                </p>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  {option.features.slice(0, 2).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <Link
                  to={`/checkout/${option.title}`}
                  className="mt-4 inline-block w-full text-center py-2 px-4 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 transition"
                >
                  Choose plan
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : sub ? (
        <>
          <div className="p-4 border border-rose-200 rounded-xl bg-rose-50/50 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="font-medium text-gray-800">{currentTierName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-gray-800">{statusLabel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Start date</p>
              <p className="font-medium text-gray-800">
                {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "Not set"}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Want to change your plan?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            {pricingOptions.map((option) => {
              const isCurrent = option.title === currentTierName;
              return (
                <div
                  key={option.title}
                  className={`p-4 border rounded-xl transition ${
                    isCurrent
                      ? "border-rose-500 bg-rose-50"
                      : "border-rose-200 bg-white hover:border-rose-400"
                  }`}
                >
                  <p className="text-lg font-semibold text-rose-800">
                    {option.title}
                    {isCurrent && (
                      <span className="ml-2 text-xs font-normal text-rose-600">(current)</span>
                    )}
                  </p>
                  <p className="text-xl font-medium text-gray-800 mt-1">
                    {option.price}
                    <span className="text-sm font-normal text-gray-500">/Month</span>
                  </p>
                  {!isCurrent && (
                    <Link
                      to={`/checkout/${option.title}`}
                      className="mt-3 inline-block w-full text-center py-2 px-4 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 transition"
                    >
                      Switch to this plan
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MySubscription;
