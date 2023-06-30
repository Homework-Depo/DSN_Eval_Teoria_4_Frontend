import { redirect } from "react-router-dom";

const action = async () => {
  const response = await fetch("http://3.94.173.130:3000/api/v1/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

  const data = await response.json();

  if (data.success) {
    throw redirect("/");
  }

  return null;
}

export default action;