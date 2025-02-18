import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";

const events = [
  {
    title: "Code-Roid",
    description: "An Online Coding Competition",
    date: "April 22, 2022",
    time: "10:00AM - 12:00PM",
    location: "Online",
    image: "/images/code-roid.png",
  },
  {
    title: "Android Masterclass",
    description: "A Hands-on App Development session with Rachit Goyal",
    date: "April 15, 2022",
    time: "5PM - 8:30PM",
    location: "Online",
    image: "/images/android-masterclass.png",
  },
  {
    title: "V-Code",
    description: "Android App Developing Competition",
    date: "March 29, 2019",
    time: "11:00AM - 2:00PM",
    location: "Coding Studio 2",
    image: "/images/v-code.png",
  },
];

export default function EventsSection() {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll(); // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  return (
    <section id= "events"className="py-20 px-4 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-5xl font-bold text-gray-300">Events</h2>
      </div>

      <div className="relative flex items-center justify-center">
        {showLeftButton && (
          <button
            className="absolute left-2 z-10 p-3 bg-gray-800/50 rounded-full hover:bg-gray-800/70 transition-colors"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft size={40} />
          </button>
        )}

        <div
          className="flex overflow-x-auto space-x-8 scrollbar-hide snap-x scroll-smooth px-12 no-scrollbar"
          ref={scrollRef}
          onScroll={checkScroll}
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="relative min-w-[400px] h-[500px] rounded-lg overflow-hidden border border-gray-700 shadow-lg hover:shadow-green-400/50 transition-transform hover:scale-105 bg-gray-900 p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar size={20} /> <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={20} /> <span>{event.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showRightButton && (
          <button
            className="absolute right-2 z-10 p-3 bg-gray-800/50 rounded-full hover:bg-gray-800/70 transition-colors"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight size={40} />
          </button>
        )}
      </div>
    </section>
  );
}
