export default function Support() {
    return (
      <div className="min-h-screen bg-rose-50 pt-24">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="bg-white border border-rose-100 rounded-2xl shadow-sm p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-700">
              Support
            </h1>
            <p className="mt-3 text-gray-700">
              Need help? Send us a message and we’ll get back to you.
            </p>
  
            <form className="mt-8 grid gap-4 max-w-xl">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-lg border border-rose-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200"
                  placeholder="you@example.com"
                />
              </div>
  
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-rose-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200"
                  placeholder="Write your message..."
                />
              </div>
  
              <button
                type="button"
                className="mt-2 px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
              >
                Send
              </button>
  
              <p className="text-xs text-gray-500">
                (For now this is UI only — we can connect it to backend later.)
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }