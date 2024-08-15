import { currentUser } from "@clerk/nextjs/server";

import Search from "@/components/dashboard/search";

export default async function Dashboard() {
  const user = await currentUser();
  return (
    <div className="pt-10">
      <h1>Olá {user?.firstName}!</h1>
      <h2 className="mt-4">Qual nova experiência procura hoje?</h2>
      <section className="mt-6">
        <Search />
      </section>
    </div>
  );
}
