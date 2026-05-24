import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "HOME", href: "#" },
        { name: "ABOUT", href: "#about" },
        { name: "SERVICES", href: "#services" },
        { name: "PORTFOLIO", href: "#portfolio" },
        { name: "CONTACT", href: "#contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/70 backdrop-blur-xl border-b border-white/5 shadow-lg py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="Shutter Production"
                        className={cn(
                            "h-10 md:h-12 w-auto transition-all duration-300",
                            !scrolled && "brightness-0 invert"
                        )}
                    />
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "relative text-sm font-semibold transition-colors py-2",
                                // Animated underline effect
                                "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left transition-all after:transition-transform after:duration-300",
                                scrolled ? "text-[#0C3249] hover:text-[#0C3249]" : "text-white/90 hover:text-gold"
                            )}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <Button className="hidden lg:flex bg-[#0C3249] text-white hover:bg-[#0C3249]/90 shadow-lg shadow-[#0C3249]/20 transition-all hover:-translate-y-0.5" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Request Quote
                        </Button>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <ModeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "p-2 transition-colors",
                            scrolled ? "text-foreground" : "text-white"
                        )}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b shadow-lg animate-in slide-in-from-top-2">
                    <div className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block text-foreground hover:text-[#0C3249] hover:bg-gray-50/50 rounded-lg px-4 font-medium py-3 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <Button 
                            className="w-full bg-[#0C3249] text-white hover:bg-[#0C3249]/90 h-12 text-base mt-2"
                            onClick={() => {
                                setIsOpen(false);
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                            Request a Quote
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
