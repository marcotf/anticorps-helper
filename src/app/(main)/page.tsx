import { db } from "@/server/db";
import { AntibodiesTable } from "./antibodies-table";

export default async function Home() {
  const antibodies = await db.query.antibodies.findMany();

  return (
    <div className="flex">
      <div className="w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">Anticorps</h1>
        <AntibodiesTable data={antibodies} />
      </div>
    </div>
  );
}
