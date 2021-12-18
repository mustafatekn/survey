import React from "react";
import { useAuthState } from "../../context/auth";

export default function AdminWelcome() {
  const { user } = useAuthState();
  return (
    <div>
      <h3>Hello, dear {user.username}</h3>
    </div>
  );
}
