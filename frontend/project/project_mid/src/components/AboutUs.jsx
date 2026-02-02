import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-rose-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border border-rose-100 rounded-2xl shadow-sm p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-700">
            About GymBae
          </h1>
          <p className="mt-4 text-gray-700 leading-relaxed">
            GymBae is a fitness companion built to help you stay consistent,
            track your progress, and choose a plan that fits your goals. Our
            mission is simple: make healthy habits easier to start — and easier
            to maintain.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
              <h3 className="font-semibold text-rose-700">Personalized</h3>
              <p className="mt-2 text-sm text-gray-700">
                Your profile + goals help shape your plan experience.
              </p>
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
              <h3 className="font-semibold text-rose-700">Simple</h3>
              <p className="mt-2 text-sm text-gray-700">
                Clean UI, clear steps, and fast setup.
              </p>
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
              <h3 className="font-semibold text-rose-700">Motivating</h3>
              <p className="mt-2 text-sm text-gray-700">
                Built to support consistent training habits.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-rose-100 bg-white p-5">
            <p className="text-sm text-gray-700">
              Want to know more or report an issue? Visit{" "}
              <Link
                className="text-rose-700 font-semibold hover:text-rose-600"
                to="/support"
              >
                Support
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}