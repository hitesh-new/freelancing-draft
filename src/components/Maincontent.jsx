import { motion, useTransform, useScroll, useAnimation } from "framer-motion";

const ParticleBackground = () => {
  const particles = Array(30).fill(null);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-primary/20 rounded-full"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const FloatingCard = ({ title, description, index }) => {
  const controls = useAnimation();
  return (
    <motion.div
      className="bg-card p-8 rounded-2xl border border-border/50 relative overflow-hidden"
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => controls.start({ scale: 1 })}
      onHoverEnd={() => controls.start({ scale: 0 })}
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0"
        animate={controls}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">
        <div className="text-primary mb-4 text-4xl">0{index + 1}</div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export default function MainContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main className="w-full min-h-screen bg-background text-foreground">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-50"
        style={{ scaleX }}
      />

      {/* Main Section */}
      <section
        id="home"
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        <ParticleBackground />

        <div className="text-center max-w-4xl px-4 z-10">
          <motion.h1
            className="text-7xl font-bold mb-6"
            initial={{ opacity: 0.8, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{
                y: -10,
                scale: 1.02,
                opacity: 1,
                filter: "blur(0.5px)",
                background: "bg-gradient-to-r from-blue-400 to-purple-400",
              }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Freelancing Club
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Where Code Meets Creativity and Ambition Fuels Innovation
          </motion.p>
        </div>

        {/* Floating Arrow */}
        <motion.div
          className="absolute bottom-12"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => {
            document
              .getElementById("features")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="animate-bounce bg-gradient-to-r from-blue-500 to-purple-300 text-foreground p-4 rounded-full shadow-lg border border-border">
            ↓
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl font-bold text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Elite Network",
                description:
                  "Connect with top-tier professionals and industry leaders",
              },
              {
                title: "Real Projects",
                description: "Work on paid client projects from day one",
              },
              {
                title: "Skill Mastery",
                description: "Cutting-edge workshops led by experts",
              },
              {
                title: "Tech Stack",
                description: "Access to premium tools and resources",
              },
              {
                title: "Career Launchpad",
                description: "Direct pipeline to freelance opportunities",
              },
              {
                title: "Community",
                description: "Collaborative environment for growth",
              },
            ].map((item, index) => (
              <FloatingCard key={index} index={index} {...item} />
            ))}
          </div>
        </div>

        {/* Animated Divider */}
        <motion.div
          className="my-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </section>
    </main>
  );
}
