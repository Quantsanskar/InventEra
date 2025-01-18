import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 400,
    },
  },
  tap: { scale: 0.95 },
};

function CTA() {
  return (
    <motion.div
      className="w-full py-10 lg:pb-20 bg-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto">
        <motion.div
          className="flex flex-col text-center bg-zinc-900 rounded-3xl p-4 lg:p-14 gap-8 items-center border border-zinc-800"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
              <Badge className="bg-zinc-800 text-white text-md hover:bg-zinc-700">Please</Badge>
            </motion.div>
          </motion.div>

          <motion.div className="flex flex-col gap-2" variants={itemVariants}>
            <motion.h3
              className="text-3xl md:text-5xl font-bold pb-4 tracking-wide max-w-xl font-regular text-white"
              whileHover={{ scale: 1.02 }}
            >
             Can I Join ? to...
            </motion.h3>
            <motion.p className="text-lg leading-relaxed tracking-wide text-zinc-400 max-w-xl">
             <span className="text-white"> Yes, you can!</span> • Don’t know how to build? We’ll teach you. • Already a pro? Come show
              off your skills. If you’ve got ideas and a desire to create, you’re in—whether you’re
              a beginner or an expert.
            </motion.p>
          </motion.div>

          <motion.div className="flex flex-row gap-4" variants={itemVariants}>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button className="gap-4" variant="ghost">
                Jump on a call <PhoneCall className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button className="gap-4" variant="default">
                Sign up here <MoveRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CTA;
