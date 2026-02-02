export default function Terms() {
    return (
      <div className="min-h-screen bg-rose-50 pt-24">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-white border border-rose-100 rounded-2xl shadow-sm p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-700">
              Terms &amp; Policies
            </h1>
            <p className="mt-3 text-gray-700">
              Welcome to GymBae! By using our platform, you agree to the following
              terms and conditions:
            </p>
  
            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
                <h2 className="font-semibold text-rose-700">1) Using GymBae</h2>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  GymBae helps users manage fitness goals and subscriptions. You
                  agree to use the platform responsibly and not attempt to misuse
                  or break the service.
                </p>
              </div>
  
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
                <h2 className="font-semibold text-rose-700">2) Accounts</h2>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  You are responsible for your account activity and for keeping
                  your credentials safe.
                </p>
              </div>
  
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
                <h2 className="font-semibold text-rose-700">
                  3) Plans &amp; Subscriptions
                </h2>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  Plans and subscriptions are part of the project functionality
                  and may change during development.
                </p>
              </div>
  
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
                <h2 className="font-semibold text-rose-700">4) Privacy</h2>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  We store profile, plan, and subscription information to provide
                  the service. Don’t submit sensitive data you wouldn’t want
                  stored.
                </p>
              </div>
            </div>
  
            <p className="mt-8 text-xs text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    );
  }