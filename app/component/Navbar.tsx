import Link from "next/link";

export const Navbar = () => {
  return (
    <nav aria-label="主選單">
      <ul className="flex gap-2 sm:gap-10">
        <li>
          <Link href="/" className="underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="underline">
            About
          </Link>
        </li>
        <li>
          <Link href="/products" className="underline">
            Products
          </Link>
        </li>
        <li>
          <Link href="/contact" className="underline">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};
