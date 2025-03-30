
import { LineChart, BarChart3, Lock } from 'lucide-react';
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

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="container px-4 md:px-6"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div variants={fadeIn} className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything you need to manage your investments</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Our platform provides powerful tools for tracking, analyzing, and optimizing your stock portfolio.
            </p>
          </motion.div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 pt-12">
          <FeatureCard 
            icon={<LineChart className="h-6 w-6" />}
            title="Real-time Tracking"
            description="Monitor your investments with real-time price updates and performance metrics."
          />
          <FeatureCard 
            icon={<BarChart3 className="h-6 w-6" />}
            title="Advanced Analytics"
            description="Powerful charts and analysis tools to understand your portfolio performance over time."
          />
          <FeatureCard 
            icon={<Lock className="h-6 w-6" />}
            title="Secure & Private"
            description="Your financial data is encrypted and securely stored to ensure your privacy."
          />
        </div>
      </motion.div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div variants={fadeIn} className="group flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:border-primary hover:shadow-md">
      <div className="rounded-full border p-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-center text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
};

export default FeaturesSection;
