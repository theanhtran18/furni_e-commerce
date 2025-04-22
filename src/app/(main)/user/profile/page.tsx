import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const HomePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (typeof decoded === "object" && "email" in decoded) {
      }
      console.log("cookie:");
    } catch (err) {
      console.error("Invalid token:", err);
    }
  } else {
    console.log("no token");
  }

  return <div>Welcome {"Guest"}!</div>;
};

export default HomePage;
