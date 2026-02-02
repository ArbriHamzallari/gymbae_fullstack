import { useState } from "react";

const LANGS = [
  { code: "en", label: "English" },
  { code: "sq", label: "Shqip" },
];

export default function Language() {
  const [lang, setLang] = useState("en");

  return (
    <div className="min-h-screen bg-rose-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white border border-rose-100 rounded-2xl shadow-sm p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-700">
            Language
          </h1>
          <p className="mt-3 text-gray-700">
            Choose the language you want GymBae to display.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {LANGS.map((l) => {
              const active = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`text-left rounded-xl border p-5 transition shadow-sm
                    ${
                      active
                        ? "border-rose-300 bg-rose-50"
                        : "border-rose-100 bg-white hover:bg-rose-50"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-gray-800">
                        {l.label}
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        Code: {l.code}
                      </div>
                    </div>

                    {active && (
                      <span className="text-xs font-semibold text-rose-700 bg-rose-100 border border-rose-200 px-3 py-1 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl border border-rose-100 bg-rose-50 p-5">
            <p className="text-sm text-gray-700">
              This page currently changes the UI selection only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}