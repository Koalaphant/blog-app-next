import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className="flex justify-center">
        <div className="m-5 bg-red-800 px-5 py-4">
          <h1 className="text-white">
            Welcome back{" "}
            {session.user.username[0].toUpperCase() +
              session.user.username.slice(1)}
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2>Please login to see the dashboard</h2>
    </div>
  );
};

export default page;
