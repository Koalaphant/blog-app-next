import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions)

  if(session?.user){
    return <h1>Welcome back {session?.user.username}</h1>
  }
  return (
    <div>
      <h2>Please login to see the dashboard</h2>
    </div>
  )
}

export default page;