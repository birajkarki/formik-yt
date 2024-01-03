import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-purple-400 p-5">
      <div className="container mx-auto">
        <ul className="flex items-center justify-between text-white">
          <li>
            <Link href="/">
              <div className="cursor-pointer hover:text-gray-300">Home</div>
            </Link>
          </li>
          <li>
            <Link href="/subscribe">
              <div className="cursor-pointer hover:text-gray-300 text-lg ">
                Subscribe
              </div>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <div className="cursor-pointer hover:text-gray-300">About</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
