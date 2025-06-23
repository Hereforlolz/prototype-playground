// 📁 /pages/index.js
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-gray-100">
      <h1 className="text-6xl font-extrabold mb-6">
        Zerogravity Thinker & AI Tinkerer 🚀
      </h1>

      <p className="text-xl max-w-xl text-center mb-8">
        Breaking AI, bending code, and sprinkling memes — all in the name of progress (and chaos).
      </p>

      <div className="mb-10">
        <img
          src="https://i.imgflip.com/5n7xsh.jpg" // Example meme URL; swap with your favorite!
          alt="AI Meme"
          className="rounded-lg shadow-lg max-w-full"
        />
      </div>

      <nav className="flex gap-8">
        <a
          href="/projects"
          className="px-6 py-3 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition"
        >
          🧪 Explore My Experiments
        </a>
        <a
          href="/logs"
          className="px-6 py-3 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition"
        >
          🐞 Known Bug Log
        </a>
        <a
          href="/ai-playground"
          className="px-6 py-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition"
        >
          🤖 AI Playground
        </a>
      </nav>
    </main>
  );
}
