const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 w-full sticky bottom-0">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} ProjectParabola. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
