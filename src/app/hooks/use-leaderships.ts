"use client";

import { useCallback, useEffect, useState } from "react";

import { Leadership } from "@/app/interfaces/leadership.interface";

export const UseLeaderships = () => {
  const [leaderships, setLeaderships] = useState<Leadership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLeaderships = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/leaderships");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Não foi possível carregar as lideranças."
        );
      }

      setLeaderships(data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as lideranças."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeaderships();
  }, [loadLeaderships]);

  return {
    leaderships,
    loading,
    error,
    loadLeaderships,
  };
}