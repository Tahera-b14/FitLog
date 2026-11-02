"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "fitlog-state";
export const PLAN_CAP = 5;

const PlanContext = createContext(null);

// Keep only the fields the plan cards need.
function toEntry(workout) {
  const { id, name, image, equipment, duration, caloriesBurned, rating, muscleGroups } = workout;
  return { id, name, image, equipment, duration, caloriesBurned, rating, muscleGroups, done: false };
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      setPlan(stored.plan || []);
      setSaved(stored.saved || []);
    } catch {
      // Ignore unreadable storage and start empty.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
    } catch {
      // Storage may be unavailable (private mode); state still works in memory.
    }
  }, [plan, saved, ready]);

  const inPlan = (id) => plan.some((w) => w.id === id);
  const inSaved = (id) => saved.some((w) => w.id === id);

  const addToPlan = (workout) => {
    if (inPlan(workout.id)) return "exists";
    if (plan.length >= PLAN_CAP) return "full";
    setPlan((prev) => [...prev, toEntry(workout)]);
    return "added";
  };

  const saveForLater = (workout) => {
    if (inSaved(workout.id)) return "exists";
    setSaved((prev) => [...prev, toEntry(workout)]);
    return "added";
  };

  const remove = (list, id) => {
    const setter = list === "saved" ? setSaved : setPlan;
    setter((prev) => prev.filter((w) => w.id !== id));
  };

  const markDone = (list, id) => {
    const setter = list === "saved" ? setSaved : setPlan;
    setter((prev) => prev.map((w) => (w.id === id ? { ...w, done: true } : w)));
  };

  return (
    <PlanContext.Provider
      value={{ plan, saved, ready, inPlan, inSaved, addToPlan, saveForLater, remove, markDone }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}
