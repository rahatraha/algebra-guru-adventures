
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    {
      title: t('home'),
      path: "/"
    }, 
    {
      title: t('mathematics'),
      path: "/mathematics"
    }, 
    {
      title: t('russian'),
      path: "/russian"
    }, 
    {
      title: t('calculator'),
      path: "/calculator"
    }, 
    {
      title: t('achievements'),
      path: "/achievements"
    }, 
    {
      title: t('forum'),
      path: "/forum"
    }
  ];
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-edu-primary text-3xl font-bold text-cyan-500">МИР Знаний</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-edu-primary transition-colors duration-200"
              >
                {item.title}
              </Link>
            ))}

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2 hover:bg-gray-100">
                  <User className="h-5 w-5 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t('profile')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    {t('profile')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <LanguageSwitcher />
            <button onClick={toggleMenu} className="p-2 rounded-md text-gray-700 hover:text-edu-primary focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-primary hover:bg-gray-50" 
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Link 
              to="/profile" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-edu-primary hover:bg-gray-50" 
              onClick={() => setIsMenuOpen(false)}
            >
              {t('profile')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
