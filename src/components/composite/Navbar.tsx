const Navbar = () => {
  return (
    <nav className="bg-theme-secondary-dark fixed top-0 left-0 w-full flex justify-between items-center z-[999] px-24">
      <div className="flex justify-center items-center">
        <img src="./icon.png" className="w-[5rem]" alt="Animerry logo" />
        <p className="text-light text-xl font-bold">Animerry</p>
      </div>
      <div className="flex justify-evenly items-center gap-4">
        <a className="text-light text-sm" href="#">
          Anime
        </a>
        <a className="text-light text-sm" href="#">
          Forum
        </a>
        <a className="text-light text-sm" href="#">
          News
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
