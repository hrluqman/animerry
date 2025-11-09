import IconLogo from "/icon.png";

function App() {

  return (
    <main className="bg-white/90 min-w-screen min-h-screen flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <a href="https://vite.dev" target="_blank">
          <img src={IconLogo} className="w-[5rem]" alt="Animerry logo" />
        </a>
        <h1 className="text-3xl text-theme font-semibold">Animerry</h1>
      </div>
    </main>
  );
}

export default App;
