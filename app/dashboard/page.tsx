import PostItem from "@/components/PostsDashboard/PostItem";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  async function getData() {
    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        next: { revalidate: 5 },
      });

      if (!response.ok) {
        throw new Error("Response is not ok");
      }

      const json = await response.json();
      return json; // Returning the fetched data
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const data = await getData(); // Fetching the data

  if (session?.user) {
    return (
      <div className="flex-col justify-center">
        <div className="m-5">
          <h1 className="text-red-800">
            Welcome back,{" "}
            {session.user.username[0].toUpperCase() +
              session.user.username.slice(1)}
          </h1>
        </div>

        <div className="">
          {data.length > 0 ? (
            <PostItem />
          ) : (
            <p className="m-5">No posts available</p>
          )}
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
