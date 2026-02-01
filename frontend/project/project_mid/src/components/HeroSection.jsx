import { useState } from "react";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    goal: "",
    experience: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Age options: 16–80
  const ages = Array.from({ length: 65 }, (_, i) => i + 16);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartClick = (e) => {
    e.preventDefault();
    setShowForm(true);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      fullName: formData.fullName,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      height: formData.height,
      weight: formData.weight,
      goal: formData.goal,
      experience: formData.experience,
    };

    localStorage.setItem("profileData", JSON.stringify(profileData));
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Your Fitness Partner, Every
        <span className="bg-gradient-to-r from-rose-500 to-rose-800 text-transparent bg-clip-text">
          {" "}
          Rep of the Way
        </span>
      </h1>

      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Meet your new fitness partner. GymBae doesn’t just count reps — it understands your
        progress, adapts your workouts, and fuels you with meal plans designed for real
        results. Your journey to a stronger, healthier you starts here.
      </p>

      {/* CTA button */}
      <div className="flex justify-center my-10">
        <button
          onClick={handleStartClick}
          className="inline-flex items-center justify-center px-8 py-3 mx-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 text-white font-semibold shadow-md shadow-rose-300 hover:shadow-lg hover:shadow-rose-400 hover:scale-[1.02] transition-transform transition-shadow duration-200"
        >
          Get started now
        </button>
      </div>

      {/* FORM SECTION */}
      {showForm && (
        <div className="w-full max-w-3xl bg-white border border-rose-100 rounded-xl shadow-md px-6 py-8 mb-10">
          <h2 className="text-2xl font-bold text-rose-700 mb-4 text-center">
            Tell us about you
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Fill in your details and we&apos;ll craft the perfect GymBae plan for you.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-rose-200 rounded-md"
              />
            </div>

            {/* Goal - SELECT */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Goal</label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                required
                className="w-full p-2 border border-rose-200 rounded-md bg-white"
              >
                <option value="">Select your goal</option>
                <option value="Lose weight">Lose weight</option>
                <option value="Gain weight">Gain weight</option>
                <option value="Tonify">Tonify</option>
              </select>
            </div>

            {/* Previous experience - SELECT */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">
                Previous experience in the gym
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full p-2 border border-rose-200 rounded-md bg-white"
              >
                <option value="">Select your experience level</option>
                <option value="Beginner (0–6 months)">Beginner (0–6 months)</option>
                <option value="Intermediate (6–24 months)">
                  Intermediate (6–24 months)
                </option>
                <option value="Advanced (2+ years)">Advanced (2+ years)</option>
              </select>
            </div>

            {/* Age - SELECT */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Age</label>
              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2 border border-rose-200 rounded-md bg-white"
              >
                <option value="">Select age</option>
                {ages.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender - SELECT */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2 border border-rose-200 rounded-md bg-white"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
                className="w-full p-2 border border-rose-200 rounded-md"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                className="w-full p-2 border border-rose-200 rounded-md"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-rose-200 rounded-md"
              />
            </div>

            {/* Submit button */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition"
              >
                Done
              </button>
            </div>
          </form>

          {/* Success message */}
          {submitted && (
            <p className="mt-4 text-center text-rose-700 font-semibold">
              One of our experts will generate your perfect plan immediately!
            </p>
          )}
        </div>
      )}

      {/* Videos */}
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 h-80 object-cover border border-rose-700 shadow-sm shadow-rose-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 h-80 object-cover border border-rose-700 shadow-sm shadow-rose-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
