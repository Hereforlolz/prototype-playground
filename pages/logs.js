export default function Logs() {
  return (
    <main className="p-8 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">🐞 Known Mistakes Log</h1>
      <p className="mb-4">
        A living record of bugs, misfires, and the occasional meltdown — because transparency is my brand.
      </p>
      <ul className="list-disc pl-8 space-y-2">
        <li>2025-06-23: Broke the build by adding AI inside AI. Oops.</li>
        <li>2025-06-24: Accidentally deployed test secrets. Fun times.</li>
        <li>2025-06-25: Gemini 1.5 Flash misinterpreted user crisis responses; patched prompt logic.</li>
        <li>2025-06-26: Firestore logging delayed under heavy intake; optimized batch writes.</li>
      </ul>
    </main>
  );
}
