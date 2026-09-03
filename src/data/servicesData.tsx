import React from "react";
import {
    Film,
    Image as ImageIcon,
    Video,
    Clapperboard,
    Plane,
    Layers,
    Share2,
    Radio
} from "lucide-react";

export interface ServiceDetail {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: React.ReactNode;
    tagline: string;
    deliverables: string[];
    process: { step: string; title: string; desc: string }[];
    idealFor: string[];
}

export const servicesData: ServiceDetail[] = [
    {
        id: "documentary",
        title: "Documentary Film Production",
        icon: <Film className="w-10 h-10" />,
        shortDescription: "In-depth storytelling that captures emotions and realities.",
        tagline: "In-depth storytelling that captures human truth, cultural heritage, and real-world impact.",
        fullDescription: "We craft emotionally resonant, high-impact documentary films that bring real stories to life. From humanitarian missions and environmental conservation to institutional impact stories across Rwanda and the region, our team guides every stage: deep field research, sensitive character interviews, cinematic 4K/6K production, and broadcast-grade post-production.",
        deliverables: [
            "4K / 6K Cinema Camera Multi-cam Production Setup",
            "On-Location Sound & Multilingual Field Audio Recording",
            "Deep Research, Story Arch Development & Scripting",
            "Broadcast-grade Color Grading & Sound Design Mastering",
            "Social Media Teasers, Festival Cuts & High-Resolution Master"
        ],
        process: [
            { step: "01", title: "Research & Arc", desc: "Immersion into the narrative, subjects, and emotional core." },
            { step: "02", title: "Field Filming", desc: "Cinematic on-site shooting with cinema rigs and multi-track audio." },
            { step: "03", title: "Story Editing", desc: "Structuring the narrative, pacing, and archival footage." },
            { step: "04", title: "Mastering", desc: "Color grading in DaVinci Resolve, foley sound design, and delivery." }
        ],
        idealFor: ["NGOs & International Agencies", "Cultural Foundations", "Impact Investors", "Broadcasters & Festivals"]
    },
    {
        id: "photography",
        title: "Professional Photography",
        icon: <ImageIcon className="w-10 h-10" />,
        shortDescription: "High-quality still images for events, branding, and portraits.",
        tagline: "High-resolution still imagery for corporate branding, international summits, and executive portraits.",
        fullDescription: "Every still image tells a powerful story. Our photography team captures authentic moments, architectural beauty, and executive authority. Whether documenting high-level international conferences in Kigali, crafting executive team portraits, or shooting vibrant marketing campaigns, we deliver magazine-grade imagery with rapid turnaround.",
        deliverables: [
            "High-Resolution Retouched Digital Masters & Print-Ready Files",
            "Full On-Location Lighting Setups & Studio Backdrops",
            "Executive Portraits, Team Headshots & Brand Stills",
            "Comprehensive Multi-Day Summit & Event Documentation",
            "Private Online Proofing & Instant Download Gallery"
        ],
        process: [
            { step: "01", title: "Creative Brief", desc: "Defining visual aesthetic, mood board, and shot list." },
            { step: "02", title: "On-Site Shoot", desc: "Expert lighting direction and multi-angle shooting." },
            { step: "03", title: "Rapid Selects", desc: "Curated initial photos delivered within hours for media and press." },
            { step: "04", title: "Master Retouch", desc: "Detailed color calibration and full-resolution master exports." }
        ],
        idealFor: ["Corporate Organizations", "Summit & Forum Organizers", "Magazines & Editorial", "Hospitality & Architecture"]
    },
    {
        id: "corporate-videos",
        title: "Corporate & Marketing Videos",
        icon: <Video className="w-10 h-10" />,
        shortDescription: "Professional profiles that elevate brand identity.",
        tagline: "Compelling brand profiles, investor films, and promotional videos that drive trust and prestige.",
        fullDescription: "Elevate your brand with polished corporate films that inspire confidence in investors, partners, and clients. We produce executive interviews, company overviews, annual reviews, product showcases, and culture videos designed to communicate your vision clearly, persuasively, and with cinematic prestige.",
        deliverables: [
            "Brand Anthem & Corporate Overview Showcase Films",
            "C-Suite & Key Stakeholder Interview Rigs",
            "Animated Logo Intros, Lower Thirds & Motion Graphics",
            "Licensed Cinematic Soundtracks & Multilingual Subtitles",
            "Multi-format exports (16:9 for Web/Keynotes, 9:16 for Mobile)"
        ],
        process: [
            { step: "01", title: "Brand Alignment", desc: "Clarifying key messaging, audience personas, and call-to-action." },
            { step: "02", title: "Pre-Production", desc: "Scriptwriting, shot-listing, and interview question crafting." },
            { step: "03", title: "Cinematic Shoot", desc: "Professional lighting, dual-camera setups, and clean wireless audio." },
            { step: "04", title: "Post-Production", desc: "Fine cut editing, dynamic graphics, audio mixing, and multi-format handoff." }
        ],
        idealFor: ["Enterprises & Multinationals", "Financial Institutions & Fintechs", "Tech Startups", "Government Agencies"]
    },
    {
        id: "commercials",
        title: "Commercial Advertisements",
        icon: <Clapperboard className="w-10 h-10" />,
        shortDescription: "High-energy ads designed for conversion and engagement.",
        tagline: "High-energy commercial spots engineered to hook attention, spark action, and elevate sales.",
        fullDescription: "Designed to stop thumbs and command attention in the first three seconds. We combine bold cinematography, fast-paced editing, and strategic product presentation to produce television commercials and digital ad campaigns that convert viewers into loyal customers.",
        deliverables: [
            "Creative Concept Development & High-Converting Scriptwriting",
            "Dynamic Camera Movements (Gimbals, Sliders & Specialized Rigs)",
            "Professional Voiceover Casting & Dynamic Sound FX",
            "15s, 30s, and 60s Cuts for TV & Social Ad Campaigns",
            "Formats Tailored for YouTube, Instagram, Meta Ads & TikTok"
        ],
        process: [
            { step: "01", title: "Concept & Hook", desc: "Crafting bold visual hooks aligned with campaign performance goals." },
            { step: "02", title: "Production Shoot", desc: "Stylized set lighting, talent direction, and high-speed cinema capture." },
            { step: "03", title: "Dynamic Edit", desc: "High-energy pacing, sound effects, motion graphics, and color pop." },
            { step: "04", title: "Ad Variant Export", desc: "Deliverables formatted for broadcast TV and all major digital ad platforms." }
        ],
        idealFor: ["Consumer Brands & FMCG", "Telecom & Financial Services", "Fashion & Lifestyle", "E-Commerce & Retail"]
    },
    {
        id: "drone",
        title: "Drone Videography",
        icon: <Plane className="w-10 h-10" />,
        shortDescription: "Breathtaking aerial views in 4K resolution.",
        tagline: "Breathtaking 4K aerial perspectives and sweeping vistas licensed by certified UAV operators.",
        fullDescription: "Give your audience a breathtaking bird's-eye perspective of Rwanda's Thousand Hills, architectural developments, agricultural projects, or major outdoor gatherings. Our certified drone pilots utilize advanced aerial cinema drones to capture smooth, sweeping cinematic shots in full compliance with aviation standards.",
        deliverables: [
            "4K / 5.4K Ultra HD Stabilized Aerial Video Footage",
            "Infrastructure, Real Estate & Construction Progress Mapping",
            "Expansive Landscape, Resort & Tourism Cinematography",
            "Golden Hour & Sunset Aerial Sequences with High Dynamic Range",
            "Fully Compliant with Local Rwandan Aviation Regulations & Permits"
        ],
        process: [
            { step: "01", title: "Flight Planning", desc: "Site survey, flight path mapping, and flight authorization permits." },
            { step: "02", title: "Aerial Filming", desc: "Execution of smooth tracking shots, reveals, and high-altitude panoramas." },
            { step: "03", title: "Stabilization & Grade", desc: "Horizon stabilization, lens profile correction, and cinematic grading." },
            { step: "04", title: "Delivery", desc: "Delivery of raw clips or fully graded 4K masters ready for project integration." }
        ],
        idealFor: ["Real Estate Developers", "Tourism Boards & Travel Agencies", "Civil Infrastructure & Construction", "Outdoor Festivals"]
    },
    {
        id: "motion-graphics",
        title: "Motion Graphics",
        icon: <Layers className="w-10 h-10" />,
        shortDescription: "Dynamic 2D/3D animations, title sequences, and visual effects.",
        tagline: "Dynamic 2D & 3D animations, kinetic typography, and visual branding that bring ideas to life.",
        fullDescription: "Transform complex concepts, data, and brand narratives into captivating motion experiences. Our motion graphics designers produce high-impact 2D/3D explainer videos, logo animations, kinetic typography, sleek title sequences, and broadcast packaging engineered to elevate brand prestige and retain viewer attention.",
        deliverables: [
            "2D & 3D Animated Explainer Videos & Infographics",
            "Broadcast Title Sequences, Logo Reveals & Brand Bumpers",
            "Kinetic Typography, Animated Statistics & Data Visualizations",
            "Custom Lower Thirds, Transitions & UI/App Walkthroughs",
            "Multi-Resolution Delivery (16:9 4K Web, 9:16 Social, Alpha Channels)"
        ],
        process: [
            { step: "01", title: "Concept & Style", desc: "Moodboards, styleframes, and visual art direction aligned with your brand." },
            { step: "02", title: "Storyboarding", desc: "Detailed illustrated storyboard defining scene timing, transitions, and pacing." },
            { step: "03", title: "Animation & VFX", desc: "Keyframing, 3D camera moves, physics simulations, and synchronized sound design." },
            { step: "04", title: "Master Export", desc: "Polished multi-format render in 4K ProRes and transparent alpha formats." }
        ],
        idealFor: ["Tech Companies & SaaS", "Financial Institutions & Fintechs", "Advertising Agencies", "Broadcasters & Digital Creators"]
    },
    {
        id: "social-media",
        title: "Social Media Content Production",
        icon: <Share2 className="w-10 h-10" />,
        shortDescription: "Engaging short-form content optimized for social platforms.",
        tagline: "High-retention short-form vertical videos and reels optimized for platform algorithms.",
        fullDescription: "Dominate Instagram, TikTok, LinkedIn, and YouTube Shorts with snackable, high-retention video content. We create batch-produced social video assets with compelling hooks, viral trends, kinetic captions, and sound design engineered to boost engagement and community growth.",
        deliverables: [
            "Vertical 9:16 High-Definition Videos (Reels / TikTok / Shorts)",
            "Hook & Retention Strategy (First 3-Second Retention Optimization)",
            "Animated On-Screen Captions & Trending Sound Integration",
            "Content Batching: 10 to 20 assets produced per production cycle",
            "Platform-Specific Formatting for Instant Posting"
        ],
        process: [
            { step: "01", title: "Trend Ideation", desc: "Planning high-engagement hooks, viral formats, and talking points." },
            { step: "02", title: "Batch Filming", desc: "Efficient, dynamic shoot capturing multiple pieces of content in one session." },
            { step: "03", title: "Fast Turnaround", desc: "Snappy cuts, kinetic typography, and punchy audio effects." },
            { step: "04", title: "Batch Delivery", desc: "Delivered ready for your weekly or monthly content calendar." }
        ],
        idealFor: ["Hospitality & Restaurants", "Influencers & Personal Brands", "Retail & Lifestyle Brands", "Event Promoters"]
    },
    {
        id: "live-streaming",
        title: "Live Streaming",
        icon: <Radio className="w-10 h-10" />,
        shortDescription: "Seamless multi-camera broadcast for summits, conferences, and events.",
        tagline: "High-definition, broadcast-grade live streaming for international summits, conferences, and hybrid events.",
        fullDescription: "Broadcast your event seamlessly to a global audience with zero downtime. From high-level diplomatic conferences and corporate annual meetings in Kigali to product launches and concerts, our live streaming team delivers multi-camera switching, live lower thirds, real-time audio engineering, and simultaneous multi-platform broadcasting.",
        deliverables: [
            "Multi-Camera Live Switching & Direction (Full HD / 4K Broadcast)",
            "Simultaneous Multi-Platform Streaming (YouTube, LinkedIn, Facebook, Zoom, Custom RTMP)",
            "Live Lower Thirds, Speaker Bios & Branded On-Screen Graphics",
            "Direct Soundboard Audio Feeds & Dedicated Wireless Microphones",
            "Immediate Full-Session Archival Master Recordings Provided Post-Event"
        ],
        process: [
            { step: "01", title: "Site Survey", desc: "Venue walkthrough, dedicated internet speed testing, and redundant failover planning." },
            { step: "02", title: "Rigging & Prep", desc: "Setting up multi-camera positions, video switchers, audio feeds, and custom graphic templates." },
            { step: "03", title: "Live Broadcast", desc: "Real-time camera switching, active audio monitoring, and continuous transmission oversight." },
            { step: "04", title: "Archive Handoff", desc: "Immediate handoff of full-length uncompressed recordings and streaming statistics." }
        ],
        idealFor: ["International Summits & Conferences", "Corporate Annual General Meetings", "Institutions & Universities", "Festivals & Hybrid Gatherings"]
    }
];
