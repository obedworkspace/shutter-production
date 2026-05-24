import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { optimizeImage } from "@/lib/image-optimizer";

const AboutSection = () => {
    return (
        <section id="about" className="py-24 md:py-32 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-[#0C3249] dark:text-foreground tracking-tight leading-tight">
                                We craft powerful <span className="text-gold relative inline-block">
                                    visual stories.
                                    <span className="absolute bottom-1 left-0 w-full h-3 bg-gold/20 -z-10 rounded-sm" />
                                </span>
                            </h2>
                            <p className="text-[#64748b] text-lg md:text-xl leading-relaxed mb-6 font-medium">
                                Shutter Production is a creative film and media studio delivering high-quality visual storytelling for NGOs, brands, and organizations.
                            </p>
                            <p className="text-[#64748b] text-lg md:text-xl leading-relaxed mb-10">
                                With professional cinema equipment and a strong production workflow, we transform ideas into compelling visual content that connects audiences and drives impact. Whether you need a cinematic documentary that moves hearts or a sharp corporate video that builds trust, our team is dedicated to excellence in every frame.
                            </p>
                            <Button size="lg" className="group bg-[#0C3249] text-white hover:bg-[#0C3249]/90 font-semibold h-14 px-8 rounded-full shadow-lg shadow-[#0C3249]/20 transition-all hover:shadow-[#0C3249]/40 hover:-translate-y-0.5" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                Let's Create Your Story
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Image Content */}
                    <div className="order-1 lg:order-2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* Decorative element */}
                            <div className="absolute -inset-4 md:-inset-6 bg-gold/10 rounded-[2rem] -z-10 rotate-3 transition-transform duration-700 hover:rotate-6" />
                            <div className="absolute -inset-4 md:-inset-6 bg-[#0C3249]/5 rounded-[2rem] -z-20 -rotate-2 transition-transform duration-700 hover:-rotate-4" />
                            
                            <img
                                src={optimizeImage("https://i.ibb.co/wFjhtjdX/866.jpg", { width: 1000, quality: 80 })}
                                alt="Filmmaking in action"
                                className="w-full h-auto object-cover aspect-[4/3] rounded-2xl shadow-2xl relative z-10"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
