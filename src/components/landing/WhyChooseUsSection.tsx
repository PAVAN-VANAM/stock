
import { TrendingUp, Eye, Wallet, BarChart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const WhyChooseUsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="container px-4 md:px-6"
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div variants={fadeIn} className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Why Choose Us</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">The smartest way to manage your portfolio</h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Join thousands of investors who trust Stocktastic to help them make better investment decisions.
            </p>
            <ul className="space-y-2">
              <FeatureListItem icon={<TrendingUp />} text="Track performance against major indexes" />
              <FeatureListItem icon={<Eye />} text="Monitor your watchlist in real-time" />
              <FeatureListItem icon={<Wallet />} text="Record and analyze all your transactions" />
              <FeatureListItem icon={<BarChart />} text="Advanced data visualization tools" />
            </ul>
            <div className="pt-4">
              <Link to="/signup">
                <Button className="gap-1">
                  Start your free trial <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div variants={fadeIn} className="relative lg:pl-12">
            <div className="relative overflow-hidden rounded-xl border shadow-xl">
              <img 
                src="https://i.imgur.com/EE2IbE5.jpg" 
                alt="Stocktastic portfolio dashboard" 
                className="w-full object-cover aspect-video"
              />
              <div className="absolute inset-0 border-4 border-primary/20 rounded-xl pointer-events-none"></div>
            </div>
            <div className="hidden lg:block absolute -bottom-6 -left-6 w-40 h-40 bg-accent/20 rounded-full blur-2xl opacity-70 z-0"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

interface FeatureListItemProps {
  icon: React.ReactNode;
  text: string;
}

const FeatureListItem = ({ icon, text }: FeatureListItemProps) => {
  return (
    <li className="flex items-center gap-2">
      <span className="h-5 w-5 text-primary">{icon}</span>
      <span>{text}</span>
    </li>
  );
};

export default WhyChooseUsSection;
