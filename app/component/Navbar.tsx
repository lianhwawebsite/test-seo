import Link from "next/link";

export const Navbar = () => {
  return (
    <nav aria-label="主選單">
      <ul className="flex gap-2 sm:gap-10">
        <li>
          <Link href="/tw/" className="underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/tw/about" className="underline">
            About
          </Link>
        </li>
        <li>
          <Link href="/tw/products" className="underline">
            Products
          </Link>
        </li>
        <li>
          <Link href="/tw/contact" className="underline">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};
