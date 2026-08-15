"use client";

import { useCallback, useEffect, useState } from "react";
import Visit from "../interfaces/visit.interface";

export const UseVisits = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVisits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/visits");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Não foi possível carregar as visitas."
        );
      }

      setVisits(data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as visitas."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVisits();
  }, [loadVisits]);

  return {
    visits,
    loading,
    error,
    loadVisits,
  };
};