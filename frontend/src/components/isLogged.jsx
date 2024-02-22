import { useState, useEffect } from "react";

export default function IsLoggedIn() {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("ITEMS");
    if (localUser == null) return null;

    return JSON.parse(localUser);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(user));
  }, [user]);

  if (user === null) {
    return false;
  }

  return true;
}
