import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default page;