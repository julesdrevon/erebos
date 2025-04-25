import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function Game() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar/>
      <main className="flex-1 overflow-hidden p-10">
        <iframe
          src="/engine/index.html"
          title="Erebos Game"
          className="w-full h-full border-3 border-gray-700 rounded-lg"
          frameBorder="0"
          allowFullScreen
          scrolling="no"
        />
      </main>
      <Footer/>
    </div>
  );
}

