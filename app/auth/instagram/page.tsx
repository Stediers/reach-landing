"use client";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function InstagramAuthPage() {
  const params = useSearchParams();

  const code = params.get("code");
  console.log("code", code);
  const state = params.get("state");
  console.log("state", state);

  useEffect(() => {
    if (code) {
      redirect("reachgig-partner://auth/instagram?code=" + code);
    }
  }, []);

  return (
    <div>
      <h1>Instagram Auth Page</h1>
    </div>
  );
}
