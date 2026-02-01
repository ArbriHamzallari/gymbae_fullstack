import { Link, Routes, Route } from 'react-router-dom'
import { UserCircleIcon, CreditCardIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'
import Profile from './Profile'
import MyPlan from './MyPlan'
import MySubscription from './MySubscription'

const MyAccount = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-rose-50 py-10">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-8 border border-rose-100">
        <h2 className="text-3xl font-extrabold text-rose-700 mb-4 text-center">My Account</h2>

        <p className="text-gray-600 mb-8 text-center">
          Manage your profile, fitness plan and subscription details.
        </p>

        {/* Quick navigation buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="profile"
            className="flex items-center gap-2 px-4 py-3 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 text-rose-700 transition"
          >
            <UserCircleIcon className="w-5 h-5 text-rose-700" />
            <span>Profile</span>
          </Link>

          <Link
            to="plan"
            className="flex items-center gap-2 px-4 py-3 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 text-rose-700 transition"
          >
            <DocumentCheckIcon className="w-5 h-5 text-rose-700" />
            <span>My Plan</span>
          </Link>

          <Link
            to="subscription"
            className="flex items-center gap-2 px-4 py-3 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 text-rose-700 transition"
          >
            <CreditCardIcon className="w-5 h-5 text-rose-700" />
            <span>My Subscription</span>
          </Link>
        </div>

        {/* Content area */}
        <div className="border-t border-rose-100 pt-6">
          <Routes>
            <Route
              index
              element={
                <div className="text-center text-gray-600">
                  <h3 className="text-2xl font-semibold text-rose-700 mb-3">
                    Welcome to your GymBae account 💪
                  </h3>
                  <p>Select one of the options above to view or edit your details.</p>
                </div>
              }
            />
            <Route path="profile" element={<Profile />} />
            <Route path="plan" element={<MyPlan />} />
            <Route path="subscription" element={<MySubscription />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
