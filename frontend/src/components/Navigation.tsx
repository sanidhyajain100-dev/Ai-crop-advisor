import { useState } from "react";
import { 
  Home, 
  Cloud, 
  Database, 
  Scan, 
  MessageCircle, 
  Calendar,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  BarChart3,
  Building
} from "lucide-react";
import { Button } from "@/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/sheet";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "weather", label: "Weather", icon: Cloud },
    { id: "crops", label: "Crops", icon: Database },
    { id: "detection", label: "Disease Detection", icon: Scan },
    { id: "chat", label: "AI Assistant", icon: MessageCircle },
    { id: "calendar", label: "Crop Calendar", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "business", label: "Business Model", icon: Building },
    { id: "community", label: "Community", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleNavClick = (section: string) => {
    onSectionChange(section);
    setIsOpen(false);
  };

  const NavContent = () => (
    <div className="space-y-2 p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground bg-gradient-primary bg-clip-text text-transparent">
          CropAI Assistant
        </h2>
        <p className="text-sm text-muted-foreground">Smart farming solutions</p>
      </div>
      
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start h-12 ${
              isActive 
                ? "bg-gradient-primary text-primary-foreground shadow-soft" 
                : "hover:bg-muted text-foreground"
            }`}
            onClick={() => handleNavClick(item.id)}
          >
            <Icon className="h-5 w-5 mr-3" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block w-72 h-screen bg-background border-r border-border fixed left-0 top-0 overflow-y-auto">
        <NavContent />
      </div>
    </>
  );
};

export default Navigation;