import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    
    image: user2,
    text: "GymBae made working out actually enjoyable! The daily reminders and progress tracking keep me consistent. I’ve never stuck to a routine this long before!",
  },
  {
    user: "David Johnson",
    
    image: user3,
    text: "Between work and family, I did not have time to plan meals or workouts. GymBae recommendations made everything effortless — I just follow the plan and feel amazing.",
  },
  {
    user: "Ronee Brown",
    
    image: user4,
    text: "I love how GymBae adapts to my progress. Every few weeks it tweaks my workouts automatically — it’s like having a personal trainer in my pocket.",
  },
  {
    user: "Michael Wilson",
    
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",

    image: user6,
    text: "I’ve tried every fitness app, but GymBae is on another level. The AI workouts and nutrition plans actually make sense — my followers even started using it too!",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Smart Workout Tracking",
    description:
      "Log every set, rep, and workout automatically — GymBae analyzes your training data to track progress and help you level up efficiently.",
  },
  {
    icon: <Fingerprint />,
    text: "Personalized Meal Plans",
    description:
      "Get meal suggestions and nutrition guidance based on your fitness goals, dietary preferences, and daily activity level.",
  },
  {
    icon: <ShieldHalf />,
    text: "Progress & Analytics",
    description:
      "Visualize your growth with detailed stats, charts, and trends across strength, endurance, and body metrics.",
  },
  {
    icon: <BatteryCharging />,
    text: "Motivation & Community",
    description:
      "Stay inspired with daily reminders, streak tracking, and a supportive fitness community that celebrates your milestones.",
  },
  {
    icon: <PlugZap />,
    text: "Goal-Based Projects",
    description:
      "Choose from curated fitness programs — whether you want to bulk, cut, or tone — each plan adjusts to your level and schedule.",
  },
  {
    icon: <GlobeLock />,
    text: "Recovery",
    description:
      "Monitor your sleep, hydration, and rest days to ensure your body recovers properly — because real progress happens when you balance effort with recovery.",
  },
];

export const checklistItems = [
  {
    title: "Daily Fitness Routine Checklist",
    description:
      "Stay consistent and accountable with a simple routine that keeps your workouts, meals, and recovery in check — every single day.",
  },
  {
    title: "Nutrition & Meal Prep Checklist",
    description:
      "Fuel your body right with balanced meals and smart planning designed to support your fitness goals and boost performance.",
  },
  {
    title: "Goal Progress Checklist",
    description:
      "Track, adjust, and celebrate your progress — GymBae helps you stay focused and motivated on your journey to better results.",
  },
  {
    title: "Wellness & Recovery Checklist",
    description:
      "Because recovery is just as important as training — take care of your body, rest well, and come back stronger every time.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Basic workout tracking",
      "Daily progress log",
      "Access to limited workout routines",
      "Sync with mobile and smartwatch",
    ],
  },
  {
    title: "Pro",
    price: "$9.99",
    features: [
      "Everything in Free, plus:",
      "AI-powered workout & meal recommendations",
      "Custom goal-based programs",
      "Priority support",
      "Unlock all workout libraries",
    ],
  },
  {
    title: "Elite",
    price: "$19.99",
    features: [
      "Everything in Pro, plus:",
      "1-on-1 coaching feedback",
      "Full nutrition planning with macros",
      "Early access to new features",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Marathons" },
  { href: "#", text: "Gyms" },
];
