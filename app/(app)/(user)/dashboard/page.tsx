import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();
  return (
    <>
      <h1>Bem-vindo {user?.firstName}!</h1>
      <h2 className="mt-4">Qual leitura busca hoje?</h2>
    </>
  );
}
