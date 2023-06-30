import verifyAccessToken from "../../utils/verifyAccessToken"

const loader = async () => {
  await verifyAccessToken();

  const response = await fetch("http://44.201.110.2:3000/api/v1/", {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log(data.data);
  return data.data;
}

export default loader;