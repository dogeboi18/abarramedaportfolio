import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useInView } from 'motion/react';
import { Mail, Instagram, Linkedin, Github, ArrowUpRight, Play, Pause, ChevronDown } from 'lucide-react';

// --- Components ---

interface PortfolioVideoProps {
  src: string;
  title: string;
  description: string;
}

const PortfolioVideo: React.FC<PortfolioVideoProps> = ({ src, title, description }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { amount: 0.6 });

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isInView) {
      videoRef.current.play().catch(e => console.log("Play interrupted", e));
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Play interrupted", e));
    }
  };

  const handleMouseLeave = () => {
    // Only pause on leave if we're not using scroll-play logic,
    // but the prompt says: "They should pause when hovered off or scrolled out of view."
    if (videoRef.current && !isInView) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden bg-zinc-900 aspect-video mb-8 border border-white/10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1">Project Discovery</span>
        <h3 className="text-white text-lg font-medium tracking-widest uppercase flex items-center gap-2">
          {title} <ArrowUpRight size={14} />
        </h3>
        <p className="text-white/50 text-[10px] font-sans tracking-[0.1em] uppercase mt-1">
          {description}
        </p>
      </div>
      <div className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
         <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 border-b border-white/10 pb-6">
    <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter lowercase">{title}</h2>
    {subtitle && <p className="text-white/30 font-sans mt-3 uppercase tracking-[0.3em] text-[10px] font-bold">{subtitle}</p>}
  </div>
);

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 border-b ${isScrolled ? 'bg-black/40 backdrop-blur-xl py-4 border-white/10' : 'bg-transparent py-8 border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-baseline">
        <a href="#hero" className="text-xs tracking-[0.4em] font-bold uppercase text-white/90 hover:opacity-70 transition-opacity">
          Aron Barrameda
        </a>
        <div className="hidden md:flex gap-10 items-center">
          {['Video Editing', 'AI Apps', 'Website UX Designs'].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(/ /g, '-')}`}
              className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
          <a href="#about" className="text-[10px] uppercase tracking-[0.2em] font-medium text-white border-b border-white pb-1">About</a>
        </div>
        <button className="md:hidden text-white/60">
          <ChevronDown size={20} />
        </button>
      </div>
    </nav>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const videoProjects = [
    {
      category: "Long/Short Form Videos",
      title: "Cinematic Rhythm",
      description: "Music Video • Direction & Pacing",
      src: "/assets/CarEdit.mp4"
    },
    {
      category: "Long/Short Form Videos",
      title: "Brand Narrative",
      description: "Commercial • Visual Storytelling",
      src: "/assets/Otyep.mp4"
    },
    {
      category: "Long/Short Form Videos",
      title: "Documentary Soul",
      description: "Short Film • Character Development",
      src: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-small-cup-of-hot-coffee-4100-large.mp4"
    },
    {
      category: "Long/Short Form Videos",
      title: "Dynamic Motion",
      description: "Sport • High Intensity Pacing",
      src: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-at-sunset-1218-large.mp4"
    },
    {
      category: "Long/Short Form Videos",
      title: "Visual Journey",
      description: "Travel • Narrative Flow",
      src: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-shining-4467-large.mp4"
    },
    {
      category: "Long/Short Form Videos",
      title: "Visual Journey",
      description: "Travel • Narrative Flow",
      src: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-shining-4467-large.mp4"
    },
    {
      category: "Corporate Videos",
      title: "Visual Journey",
      description: "Travel • Narrative Flow",
      src: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-shining-4467-large.mp4"
    },
    {
      category: "Corporate Videos",
      title: "Visual Journey",
      description: "Travel • Narrative Flow",
      src: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-shining-4467-large.mp4"
    },
    {
      category: "Corporate Videos",
      title: "Visual Journey",
      description: "Travel • Narrative Flow",
      src: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-shining-4467-large.mp4"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[60] origin-left"
        style={{ scaleX }}
      />

      <Nav />

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 mb-8 block">7 Years of Visual Vision.</span>
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-light leading-[0.85] tracking-tighter mb-16 text-white">
              SEVEN <br />
              <span className="italic font-serif opacity-60 text-5xl md:text-8xl lg:text-[8rem] pl-12 md:pl-24">YEARS.</span>
            </h1>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light italic font-serif">
               "Visual storytelling is more than just assembly—it's the rhythmic heartbeat of human experience."
              </p>
              <div className="flex flex-col items-start gap-6">
                <p className="text-white/40 text-xs uppercase tracking-widest leading-loose">
                  Based in Manila / Available Globally.<br />
                  Specializing in the synthesis of dynamic pacing<br />
                  and cinematic narrative structure.
                </p>
                <div className="w-16 h-px bg-white/10" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* WORK SECTION: VIDEO EDITING */}
        <section id="video-editing" className="py-32 px-6 max-w-7xl mx-auto">
          <SectionHeader title="Video Editing" subtitle="01 / Case Studies & Commercials" />
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {videoProjects.map((project, index) => (
              <PortfolioVideo 
                key={index} 
                src={project.src}
                title={project.title}
                description={project.description}
              />
            ))}
          </div>
        </section>

        {/* WORK SECTION: AI APPS (TEMPLATE) */}
        <section id="ai-apps" className="py-32 px-6 max-w-7xl mx-auto">
          <SectionHeader title="AI Apps" subtitle="02 / Future Tech Explorations" />
          <div className="h-[450px] bg-[#121212] border border-dashed border-white/10 flex items-center justify-center group hover:border-white/30 transition-all duration-700">
            <div className="text-center group-hover:scale-105 transition-transform duration-700">
               <div className="text-[10px] uppercase tracking-[0.5em] text-white/20">Future Content / AI Apps</div>
               <div className="mt-4 h-[1px] w-12 bg-white/10 mx-auto transition-all group-hover:w-24 group-hover:bg-white/40"></div>
            </div>
          </div>
        </section>

        {/* WORK SECTION: UX DESIGNS (TEMPLATE) */}
        <section id="website-ux-designs" className="py-32 px-6 max-w-7xl mx-auto">
          <SectionHeader title="Website UX Designs" subtitle="03 / Interface Architecture" />
          <div className="h-[450px] bg-[#121212] border border-dashed border-white/10 flex items-center justify-center group hover:border-white/30 transition-all duration-700">
            <div className="text-center group-hover:scale-105 transition-transform duration-700">
               <div className="text-[10px] uppercase tracking-[0.5em] text-white/20">Future Content / UX Design</div>
               <div className="mt-4 h-[1px] w-12 bg-white/10 mx-auto transition-all group-hover:w-24 group-hover:bg-white/40"></div>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="py-40 bg-black border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16">
            <div className="md:col-span-12 lg:col-span-4">
              <h2 className="text-6xl md:text-7xl font-light mb-12 italic tracking-tighter text-white">Vision.</h2>
              <div className="aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/10 grayscale">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" 
                  alt="Aron Barrameda" 
                  className="w-full h-full object-cover opacity-50 contrast-125"
                />
              </div>
            </div>
            <div className="md:col-span-12 lg:col-span-7 lg:col-start-6 flex flex-col justify-center space-y-16">
              <div className="space-y-10">
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/30">The Narrative Strategy</div>
                <p className="text-3xl md:text-4xl leading-[1.2] font-serif text-white/80 font-light italic">
                  With 7 years of professional experience, I help scale visual emotions through dynamic sequences and meticulous pacing.
                </p>
                <div className="h-[1px] w-full bg-white/5" />
                <p className="text-white/40 font-sans leading-loose tracking-wider text-sm max-w-xl">
                  My journey is defined by a precision-first approach to digital landscapes. Every commercial narrative I build is 
                  a result of years perfecting the rhythmic heartbeat of visual experience. Currently focusing on the synergy 
                  between AI workflows and cinematic aesthetics.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-12 text-[10px] uppercase tracking-[0.3em] font-bold">
                <div className="space-y-6">
                  <p className="text-white/20">Studio Core</p>
                  <ul className="text-white/60 space-y-4">
                    <li>Narrative Pacing</li>
                    <li>Kinetic Typography</li>
                    <li>Technical Mastery</li>
                    <li>Dynamic Grading</li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <p className="text-white/20">Experience</p>
                  <ul className="text-white/60 space-y-4">
                    <li>Video Expert</li>
                    <li>Visual Strategist</li>
                    <li>UX Architect</li>
                    <li>Storyteller</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
            <div className="space-y-8">
              <h3 className="text-5xl md:text-6xl font-light lowercase text-white tracking-tighter">Inquire.</h3>
              <a 
                href="mailto:aronjohnbarrameda18@gmail.com" 
                className="text-lg md:text-xl text-white/30 hover:text-white transition-all duration-500 uppercase tracking-widest border-b border-white/10 hover:border-white pb-2"
              >
                aronjohnbarrameda18@gmail.com
              </a>
            </div>
            
            <div className="flex gap-12">
              {[
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aron-barrameda-0231b51a5/' },
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Github, label: 'GitHub', href: '#' }
              ].map((social) => (
                <a 
                  key={social.label} 
                  href={social.href}
                  className="group flex flex-col items-center gap-3"
                >
                  <social.icon size={18} className="text-white/30 group-hover:text-white transition-all duration-500" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 group-hover:text-white/40">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">
            <p>© 2026 Aron Barrameda Portfolio</p>
            <p className="opacity-50">Frosted Glass • Minimalist Narrative</p>
            <a href="#hero" className="hover:text-white transition-colors">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
