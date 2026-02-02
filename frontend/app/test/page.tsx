"use client";

import { useEffect, useState } from "react";
import { getProjects } from "../../lib/api/projects/get-all-projects";

export default function TestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await getProjects();
        console.log("Projects API response:", response);
        setData(response);
      } catch (err: any) {
        console.error("API error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Projects API Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
