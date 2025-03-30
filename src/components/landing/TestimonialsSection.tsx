
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

interface TestimonialCardProps {
  initials: string;
  name: string;
  role: string;
  text: string;
}

const TestimonialCard = ({ initials, name, role, text }: TestimonialCardProps) => {
  return (
    <motion.div variants={fadeIn} className="flex flex-col space-y-4 rounded-xl border p-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="font-semibold text-primary">{initials}</span>
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="text-muted-foreground">{text}</p>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="container px-4 md:px-6"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div variants={fadeIn} className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by investors worldwide</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              See what our users have to say about their experience with Stocktastic.
            </p>
          </motion.div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 pt-12">
          <TestimonialCard 
            initials="JD"
            name="John Doe"
            role="Individual Investor"
            text="Stocktastic has completely transformed how I manage my investments. The real-time tracking and analytics give me the confidence to make better decisions."
          />
          <TestimonialCard 
            initials="JS"
            name="Jane Smith"
            role="Financial Advisor"
            text="As a financial advisor, I need tools that help me serve my clients better. Stocktastic provides detailed analysis and visualization that impresses my clients and helps me do my job better."
          />
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
