import { redirect } from "react-router-dom";

const verifyAccessToken = async () => {
  const response = await fetch("http://44.201.110.2:3000/api/v1/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

  const data = await response.json();

  console.log(data)

  if (data.success === false) {
    throw redirect("/login");
  }

  return null;
}

export default verifyAccessToken;