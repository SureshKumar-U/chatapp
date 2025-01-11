import Chat from "@/components/chat";

export default function ChatPage() {
  return (
    <div className="bg-gray-50 ">
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-bold">Chat with Us</h1>
        </div>
      </header>

      <main className="flex justify-center min-h-[82vh] items-center py-10">
        <div className="w-full max-w-lg px-4">
          <Chat />
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 Your Company. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
