import { useState } from "react";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    MessageCircle,
    Send
} from "lucide-react";
import { servicesData, ServiceDetail } from "@/data/servicesData";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "./ui/dialog";
import { Button } from "./ui/button";

const ServicesSection = () => {
    const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

    const handleRequestQuote = (serviceTitle: string) => {
        setSelectedService(null);
        setTimeout(() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
                const projectInput = document.getElementById("project-type") as HTMLInputElement | null;
                if (projectInput) {
                    projectInput.value = serviceTitle;
                    projectInput.dispatchEvent(new Event("input", { bubbles: true }));
                    projectInput.focus();
                }
            }
        }, 200);
    };

    return (
        <section id="services" className="py-24 bg-gray-50/50 dark:bg-background relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[#0C3249] dark:text-foreground tracking-tight">
                        Our Expertise
                    </h2>
                    <div className="w-24 h-1.5 bg-gold mx-auto rounded-full mb-4" />
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                        Click on any service to explore detailed capabilities, deliverables, and our production process.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                            onClick={() => setSelectedService(service)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedService(service);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            className="bg-white dark:bg-card p-10 rounded-2xl shadow-sm border border-gray-100 hover:border-[#0C3249]/20 dark:hover:border-gold/30 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50"
                        >
                            {/* Decorative hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0C3249]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="text-[#0C3249] dark:text-white group-hover:text-gold transition-colors duration-300 mb-6 transform group-hover:scale-110 origin-left inline-block">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-[#0C3249] dark:group-hover:text-gold transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-[#64748b] dark:text-muted-foreground leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                                {service.shortDescription}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Service Detail Modal */}
                <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border bg-background shadow-2xl">
                        {selectedService && (
                            <>
                                <DialogHeader className="text-left space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-[#0C3249]/10 dark:bg-gold/15 text-[#0C3249] dark:text-gold rounded-xl inline-flex items-center justify-center">
                                            {selectedService.icon}
                                        </div>
                                        <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/20">
                                            Service Overview
                                        </span>
                                    </div>
                                    <div>
                                        <DialogTitle className="text-2xl md:text-3xl font-extrabold text-[#0C3249] dark:text-white tracking-tight">
                                            {selectedService.title}
                                        </DialogTitle>
                                        <p className="text-sm md:text-base font-medium text-gold mt-1">
                                            {selectedService.tagline}
                                        </p>
                                    </div>
                                    <DialogDescription className="text-sm md:text-base text-muted-foreground leading-relaxed pt-2">
                                        {selectedService.fullDescription}
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Deliverables & What's Included */}
                                <div className="mt-6">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-gold" />
                                        Key Deliverables & Capabilities
                                    </h4>
                                    <div className="space-y-2 bg-gray-50/70 dark:bg-card/60 p-4 rounded-xl border border-border">
                                        {selectedService.deliverables.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Our Process */}
                                <div className="mt-6">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                                        Production Process
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {selectedService.process.map((step) => (
                                            <div
                                                key={step.step}
                                                className="p-3.5 rounded-xl border border-border bg-background/50 flex flex-col justify-between"
                                            >
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-xs font-mono font-bold text-gold">
                                                        {step.step}
                                                    </span>
                                                    <span className="text-xs font-semibold text-foreground">
                                                        {step.title}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Ideal For */}
                                <div className="mt-6">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                                        Best Suited For
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedService.idealFor.map((audience, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-foreground border border-border"
                                            >
                                                {audience}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
                                    <Button
                                        onClick={() => handleRequestQuote(selectedService.title)}
                                        className="flex-1 bg-[#0C3249] text-white hover:bg-[#0C3249]/90 shadow-md font-semibold h-11 text-sm flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Send className="w-4 h-4" />
                                        Request Quote for This Service
                                    </Button>

                                    <a
                                        href={`https://wa.me/250789271885?text=${encodeURIComponent(
                                            `Hello Shutter Production, I would like to inquire about your ${selectedService.title} services.`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#25D366] hover:bg-[#25D366]/90 text-white font-semibold text-sm transition-all shadow-sm"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        WhatsApp Chat
                                    </a>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
};

export default ServicesSection;
