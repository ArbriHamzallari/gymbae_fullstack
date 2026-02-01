import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import { apiFetch } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { pricingOptions } from "../constants";

const TIER_MAP = { Free: 1, Pro: 2, Elite: 3 };

function planFromConstants(tierName) {
  const option = pricingOptions.find((o) => o.title === tierName);
  if (!option) return null;
  return {
    name: option.title,
    price: option.price,
    billingInterval: "Month",
    features: option.features || [],
    tier: TIER_MAP[option.title] ?? 1,
  };
}

export default function Checkout() {
  const { tier: tierParam } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("summary");
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const tierName = tierParam ? tierParam.charAt(0).toUpperCase() + tierParam.slice(1).toLowerCase() : null;
  const validTiers = ["Free", "Pro", "Elite"];
  const isInvalidTier = !tierName || !validTiers.includes(tierName);

  useEffect(() => {
    if (isInvalidTier) {
      setLoading(false);
      return;
    }
    const fallback = planFromConstants(tierName);
    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch(`/api/checkout/plans/${encodeURIComponent(tierName)}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setPlan(data);
        } else {
          if (!cancelled) setPlan(fallback);
        }
      } catch {
        if (!cancelled) setPlan(fallback);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [tierName, isInvalidTier]);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      const v = value.replace(/\D/g, "").slice(0, 16);
      setPayment((p) => ({ ...p, cardNumber: v }));
      return;
    }
    if (name === "expiry") {
      const v = value.replace(/\D/g, "").slice(0, 4);
      setPayment((p) => ({ ...p, expiry: v }));
      return;
    }
    if (name === "cvc") {
      const v = value.replace(/\D/g, "").slice(0, 4);
      setPayment((p) => ({ ...p, cvc: v }));
      return;
    }
    setPayment((p) => ({ ...p, [name]: value }));
  };

  const formatCardNumber = (s) => {
    const g = s.match(/.{1,4}/g) || [];
    return g.join(" ").slice(0, 19);
  };
  const formatExpiry = (s) => {
    if (s.length <= 2) return s;
    return s.slice(0, 2) + "/" + s.slice(2, 4);
  };

  const isFreePlan = tierName === "Free";

  const activateSubscription = async () => {
    if (!plan) return;
    if (!isLoggedIn) {
      navigate(`/login?redirect=${encodeURIComponent(`/checkout/${tierName}`)}`);
      return;
    }
    setPaying(true);
    setError("");
    try {
      const tierValue = TIER_MAP[plan.name] ?? plan.tier ?? 1;
      const res = await apiFetch("/api/subscription", {
        method: "POST",
        body: JSON.stringify({ tier: tierValue }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Subscription failed.");
      }
      if (isFreePlan) {
        setStep("success");
      } else {
        navigate("/account", { state: { message: "Subscription activated. Thank you!" } });
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setError("");
    await activateSubscription();
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (isInvalidTier || !plan) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <p className="text-gray-600 mb-4">Plan not found.</p>
        <Link to="/" className="text-rose-600 hover:underline">Back to home</Link>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-rose-100 text-rose-600 mb-6">
          <CheckCircle2 className="w-14 h-14" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-semibold text-rose-800 mb-2">You&apos;re on the Free plan</h2>
        <p className="text-gray-600 mb-6">No payment required. Your free plan is active.</p>
        <Link
          to="/account"
          className="inline-block py-3 px-6 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition"
        >
          Go to My Account
        </Link>
        <p className="mt-6">
          <Link to="/" className="text-rose-600 hover:underline">Back to home</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-semibold text-rose-800 mb-8">Checkout</h1>

      {step === "summary" && (
        <div className="border border-rose-200 rounded-xl p-6 bg-white/60">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Order summary</h2>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-2xl font-semibold text-rose-800">{plan.name}</p>
              <p className="text-gray-600">
                <span className="text-lg font-medium text-gray-800">{plan.price}</span>
                <span className="text-gray-500">/{plan.billingInterval}</span>
              </p>
            </div>
          </div>
          <ul className="space-y-2 mb-6">
            {plan.features?.map((feature, i) => (
              <li key={i} className="flex items-center text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {!isFreePlan && (
            <p className="text-sm text-gray-500 mb-6 flex items-center">
              <Lock className="w-4 h-4 mr-1" /> Demo checkout — no real payment will be charged.
            </p>
          )}
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          {isFreePlan ? (
            <button
              type="button"
              onClick={activateSubscription}
              disabled={paying}
              className="w-full py-3 px-4 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {paying ? "Activating..." : "Get Free plan"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep("payment")}
              className="w-full py-3 px-4 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition"
            >
              Continue to payment
            </button>
          )}
        </div>
      )}

      {step === "payment" && !isFreePlan && (
        <div className="border border-rose-200 rounded-xl p-6 bg-white/60">
          <h2 className="text-xl font-medium text-gray-800 mb-2 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-rose-600" />
            Payment details
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            You are subscribing to <strong>{plan.name}</strong> — {plan.price}/{plan.billingInterval}.
          </p>
          {!isLoggedIn && (
            <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
              You will be asked to sign in before completing the subscription.
            </p>
          )}
          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmitPayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
              <input
                type="text"
                name="cardNumber"
                value={formatCardNumber(payment.cardNumber)}
                onChange={handlePaymentChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                <input
                  type="text"
                  name="expiry"
                  value={formatExpiry(payment.expiry)}
                  onChange={handlePaymentChange}
                  placeholder="MM/YY"
                  className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={payment.cvc}
                  onChange={handlePaymentChange}
                  placeholder="123"
                  className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name on card</label>
              <input
                type="text"
                name="name"
                value={payment.name}
                onChange={handlePaymentChange}
                placeholder="John Doe"
                className="w-full p-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
              />
            </div>
            <p className="text-xs text-gray-500">
              This is a demo. No real payment is processed. Any details are for display only.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("summary")}
                className="py-3 px-4 border border-rose-300 text-rose-700 font-medium rounded-lg hover:bg-rose-50 transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={paying}
                className="flex-1 py-3 px-4 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paying ? "Processing..." : "Complete subscription"}
              </button>
            </div>
          </form>
        </div>
      )}

      <p className="mt-6 text-center">
        <Link to="/" className="text-rose-600 hover:underline">Back to home</Link>
      </p>
    </div>
  );
}
