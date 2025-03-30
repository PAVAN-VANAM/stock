
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-50"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 relative z-10"
      >
        <div className="space-y-4 max-w-3xl">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Version 2.0 Release
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Manage your investments like a pro
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Track stocks, analyze performance, and make smarter investment decisions with our powerful portfolio management platform.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/signup">
            <Button size="lg" className="gap-1 rounded-full px-8">
              Get started for free <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Log in to your account
            </Button>
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-5xl mx-auto overflow-hidden rounded-xl border shadow-2xl"
        >
          <img
            src="E:\pavan\Stock\stocktastic-portfolio-guide-main\public\gradient-stock-market-concept_23-2149166910.avif"
            alt="Stocktastic dashboard"
            className="w-full object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
