import { useState, useEffect } from "react";

export const useDuckAvatar = () => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchDuck = async () => {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();
        setAvatar(data.message);
      } catch (error) {
        console.error("Duck API error:", error);
      }
    };

    fetchDuck();
  }, []);

  return avatar;
};
