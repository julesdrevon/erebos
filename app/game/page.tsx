import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function Game() {
  return (
    <div className="bg-gray-900 flex flex-col h-dvh">
      <Navbar />
      <main className="h-dvh w-full p-10">
        <iframe
          src="/engine/index.html"
          title="Godot Game"
          className="border-3 border-gray-700 w-full h-full rounded-lg"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </main>
      <Footer />
    </div>
  );
}