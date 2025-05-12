import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Boxes } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Determine if current page is the landing page
  const isLandingPage = location.pathname === "/";

  // Navigation items
  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Boxes className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SaaSApp</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {isLandingPage && (
            <>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Auth actions */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <div className="relative">
                <Avatar 
                  src={user.avatar_url} 
                  alt={user.email || "User"}
                  size="sm"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="gradient" size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            className="flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={toggleMenu}
            aria-expanded={isOpen}
          >
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden"
        >
          <div className="container mx-auto space-y-4 px-4 pb-4">
            {isLandingPage && (
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium text-foreground"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
            
            <div className="flex flex-col space-y-4 pt-4 border-t border-border/40">
              {user ? (
                <>
                  <div className="flex items-center gap-4">
                    <Avatar 
                      src={user.avatar_url} 
                      alt={user.email || "User"}
                      size="sm"
                    />
                    <span className="text-sm truncate">
                      {user.email}
                    </span>
                  </div>
                  <Link to="/dashboard" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={closeMenu}>
                    <Button variant="gradient" className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}