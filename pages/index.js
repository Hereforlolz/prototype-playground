export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-gray-100">
      <h1 className="text-5xl font-bold mb-4">Prototype Playground 🚀</h1>
      <p className="text-xl max-w-xl text-center mb-6">
        Welcome to my lab of experiments, bugs, and breakthroughs. I break things so you don’t have to — or maybe so you do.
      </p>
      <a href="/projects" className="px-6 py-3 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition">
        Peek Into My Experiments →
      </a>
    </main>
  );
}
