import Link from "next/link";

interface NavbarProps {
  selectedTab: string;
}

const Navbar: React.FC<NavbarProps> = ({ selectedTab }) => {
  return (
    <nav className="bg-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </div>
            </Link>
            <Link href="/about">
              <div className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About
              </div>
            </Link>
            <Link href="/contact">
              <div className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
