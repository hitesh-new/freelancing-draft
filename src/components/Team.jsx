import { motion } from "framer-motion";
import { memo } from "react";

const faculty = [
  {
    name: "Dr. John Doe",
    role: "Faculty Coordinator",
    image: "/images/Fac-coordinator.jpg",
  },
  {
    name: "Dr. Jane Smith",
    role: "Faculty Co-coordinator",
    image: "/images/Co-coordinator.jpg",
  },
];

const teammembers = [
  {
    name: "Alice Johnson",
    role: "Lead Developer",
    image: "/images/A.jpg",
  },
  {
    name: "Michael Lee",
    role: "Project Manager",
    image: "/images/C.jpg",
  },
];

// Memoized TeamCard for performance optimization
const TeamCard = memo(({ member, color }) => (
  <motion.div
    className="bg-card p-6 rounded-xl border border-border/50 shadow-lg hover:shadow-xl transition-shadow"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05, boxShadow: `0px 5px 15px ${color}` }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <motion.div
      className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-4 border-primary"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <img
        src={member.image}
        alt={`${member.name} - ${member.role}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
    <p className="text-muted-foreground">{member.role}</p>
  </motion.div>
));

export default function TeamSection() {
  return (
    <section id="team" className="py-20 px-4 bg-background text-foreground">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title with Hover Animation */}
        <motion.h2
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          Meet Our Team 🤝
        </motion.h2>

        {/* Section Description */}
        <motion.p
          className="text-xl text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Here is our great team that makes everything related to the Freelancing Club possible.
        </motion.p>

        {/* Faculty Coordinators */}
        <motion.h3
          className="text-3xl font-bold mb-6 text-blue-500"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Faculty Coordinators
        </motion.h3>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {faculty.map((member, index) => (
            <TeamCard key={index} member={member} color="rgba(0, 0, 255, 0.2)" />
          ))}
        </div>

        {/* Leads */}
        <motion.h3
          className="text-3xl font-bold mb-6 text-blue-500"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Leads
        </motion.h3>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teammembers.map((member, index) => (
            <TeamCard key={index} member={member} color="rgba(255, 165, 0, 0.2)" />
          ))}
        </div>
      </div>
    </section>
  );
}
