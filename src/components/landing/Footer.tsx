
import { BarChart3 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-muted mt-auto">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Press</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Help Center</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookies</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold">Stocktastic</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Stocktastic. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
