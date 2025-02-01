"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface NavItem {
  href: string;
  label: string;
}

interface AnimatedNavbarProps {
  items: NavItem[];
  className?: string;
}

export default function AnimatedNavbar({
  items,
  className = "",
}: AnimatedNavbarProps) {
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Transform values for width and position
  const width = useTransform(scrollY, [0, 100], ["100%", "70%"]);
  const top = useTransform(scrollY, [0, 100], ["0%", "5%"]);
  const padding = useTransform(scrollY, [0, 100], ["1.5rem", "1.5rem"]);
  const borderRadius = useTransform(scrollY, [0, 100], ["0rem", "1rem"]);
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0)", "blur(8px)"]
  );

  return (
    <motion.header
      style={{
        width,
        top,
        padding,
        borderRadius,
        backdropFilter: backdropBlur,
      }}
      className={`fixed left-1/2 -translate-x-1/2 z-50 bg-white/80 border border-black/5 shadow-lg ${className}`}
    >
      <nav className="container mx-auto">
        <div className="flex items-center justify-between  ">
          <Link href="/">
            <h1 className="heading text-yellow-500">Company</h1>{" "}
          </Link>
          <ul className="flex items-center justify-center gap-8">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative py-4 px-2 text-base font-medium transition-colors hover:text-yellow-500
                  ${pathname === item.href ? "text-yellow-500" : "text-black"}
                `}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-px left-0 right-0 h-1 bg-yellow-500"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
            <Select >
              <SelectTrigger>
                <SelectValue placeholder="Select Login Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User Login</SelectItem>
                <SelectItem value="ngo">NGO Login</SelectItem>
              </SelectContent>
            </Select>
          </ul>
        </div>
      </nav>
    </motion.header>
  );
}
