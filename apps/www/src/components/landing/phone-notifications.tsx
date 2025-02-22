import { motion as m } from "framer-motion";

// Animation variants for container
const containerVariants = {
  initial: {
    opacity: 0,
    y: 40,
    left: "50%",
    translateX: "-50%",
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 10,
    left: "50%",
    translateX: "-50%",
    filter: "blur(0px)",
  },
};

// Animation variants for notification items
const notificationVariants = {
  initial: {
    opacity: 0,
    translateY: 160,
    filter: "blur(4px)",
  },
  animate: (custom: number) => ({
    opacity: 1,
    translateY: custom,
    filter: "blur(0px)",
  }),
};

// Common transition settings
const containerTransition = {
  duration: 0.7,
  delay: 0.4,
  ease: "easeOut",
};

const notificationTransition = {
  duration: 0.8,
  ease: [0.785, 0.135, 0.15, 0.86],
};

// Notification data
const notifications = [
  {
    translateY: 24,
    delay: 0.6,
    bgColor: "bg-primary/20 border border-dashed border-primary/50",
    className: "right-3.5 w-[calc(100%-56px)]",
  },
  {
    translateY: 48,
    delay: 0.8,
    bgColor: "bg-white/10 border border-dashed border-white/20",
    className: "left-3.5 w-[calc(100%-56px)]",
  },
  {
    translateY: 72,
    delay: 1,
    bgColor: "bg-primary/20 border border-dashed border-primary/50",
    className: "right-3.5 w-[calc(100%-56px)] h-10",
  },
  {
    translateY: 124,
    delay: 1.2,
    bgColor: "bg-[#34DA52]/20 border border-dashed border-[#34DA52]/50",
    className: "right-3.5 w-[calc(100%-82px)]",
  },
];

export const PhoneNotifications = () => {
  return (
    <m.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      transition={containerTransition}
      className="w-[9rem] h-44 overflow-hidden rounded-t-3xl absolute left-1/2 p-1.5 pb-0 -translate-x-1/2 top-12 bg-gradient-to-b from-zinc-800/80 to-zinc-900/80"
    >
      {/* Dark element overlay */}
      <div className="inset-0 absolute element-dark !rounded-3xl">
        <div className="inset-0 absolute element opacity-30 !rounded-[23px]" />
      </div>

      {/* Phone screen */}
      <div className="overflow-hidden w-full h-full rounded-t-[18px] bg-gradient-to-b from-zinc-950/60 to-zinc-950/90">
        {/* Notch */}
        <div className="w-10 h-2 top-1 absolute left-1/2 -translate-x-1/2 bg-[#212123] rounded-b-lg" />

        {/* Notifications */}
        {notifications.map((notification, index) => (
          <m.div
            key={index}
            variants={notificationVariants}
            initial="initial"
            animate="animate"
            custom={notification.translateY}
            transition={{
              ...notificationTransition,
              delay: notification.delay,
            }}
            className={`absolute top-0 flex gap-x-2 p-1.5 z-10 ${notification.bgColor} rounded-lg items-center px-2 ${notification.className}`}
          >
            <div className="flex flex-col justify-center items-start gap-y-0.5" />
          </m.div>
        ))}
      </div>
    </m.div>
  );
};
