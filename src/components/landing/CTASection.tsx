
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const CTASection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-700 opacity-100"></div>
      <div className="absolute inset-0 bg-[url('https://i.imgur.com/waxVImv.jpg')] bg-cover opacity-10 mix-blend-overlay"></div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container px-4 md:px-6 relative z-10"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">Ready to take control of your investments?</h2>
            <p className="text-xl text-primary-foreground/90 md:text-2xl/relaxed">
              Join thousands of investors who trust Stocktastic to manage their portfolios.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2 pt-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="w-full rounded-full">
                Create your free account <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-primary-foreground/80 pt-2">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
