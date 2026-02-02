export const Goal = {
  LoseWeight: 1,
  GainMuscle: 2,
  Maintain: 3,
  ImproveEndurance: 4,
  GeneralFitness: 5,
};

export const ExperienceLevel = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export const Gender = {
  Male: 1,
  Female: 2,
  Other: 3,
};

export const SubscriptionTier = {
  Free: 1,
  Pro: 2,
  Elite: 3,
};

export const SubscriptionStatus = {
  Active: 1,
  Cancelled: 2,
};

export const GOAL_OPTIONS = [
  { value: Goal.LoseWeight, label: "Lose weight" },
  { value: Goal.GainMuscle, label: "Gain muscle" },
  { value: Goal.Maintain, label: "Maintain" },
  { value: Goal.ImproveEndurance, label: "Improve endurance" },
  { value: Goal.GeneralFitness, label: "General fitness" },
];

export const EXPERIENCE_OPTIONS = [
  { value: ExperienceLevel.Beginner, label: "Beginner" },
  { value: ExperienceLevel.Intermediate, label: "Intermediate" },
  { value: ExperienceLevel.Advanced, label: "Advanced" },
];

export const GENDER_OPTIONS = [
  { value: Gender.Male, label: "Male" },
  { value: Gender.Female, label: "Female" },
  { value: Gender.Other, label: "Other" },
];

export const TIER_OPTIONS = [
  { value: SubscriptionTier.Free, label: "Free" },
  { value: SubscriptionTier.Pro, label: "Pro" },
  { value: SubscriptionTier.Elite, label: "Elite" },
];

export const STATUS_OPTIONS = [
  { value: SubscriptionStatus.Active, label: "Active" },
  { value: SubscriptionStatus.Cancelled, label: "Cancelled" },
];
