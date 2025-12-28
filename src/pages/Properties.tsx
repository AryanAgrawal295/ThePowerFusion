import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home,
  Building,
  BarChart3,
  HelpCircle,
  LogOut,
  Plus,
  Zap,
  DoorOpen,
  Building2,
  House,
  User,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  ChevronRight,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Room {
  id: string;
  name: string;
  deviceCount: number;
  lastModified: string;
}

interface Property {
  id: string;
  name: string;
  type: "house" | "apartment";
  rooms: Room[];
  createdAt: string;
}

const mockProperties: Property[] = [
  {
    id: "1",
    name: "2BHK Apartment - Block A",
    type: "apartment",
    rooms: [
      { id: "1-1", name: "Master Bedroom", deviceCount: 5, lastModified: "2 hours ago" },
      { id: "1-2", name: "Living Room", deviceCount: 8, lastModified: "Yesterday" },
      { id: "1-3", name: "Kitchen", deviceCount: 6, lastModified: "3 days ago" },
    ],
    createdAt: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "My Villa",
    type: "house",
    rooms: [
      { id: "2-1", name: "Hall", deviceCount: 10, lastModified: "1 week ago" },
      { id: "2-2", name: "Bedroom 1", deviceCount: 4, lastModified: "1 week ago" },
      { id: "2-3", name: "Bedroom 2", deviceCount: 4, lastModified: "1 week ago" },
      { id: "2-4", name: "Kitchen", deviceCount: 7, lastModified: "2 weeks ago" },
    ],
    createdAt: "Dec 20, 2023",
  },
  {
    id: "3",
    name: "Studio Apartment",
    type: "apartment",
    rooms: [
      { id: "3-1", name: "Main Room", deviceCount: 12, lastModified: "3 days ago" },
    ],
    createdAt: "Feb 1, 2024",
  },
];

const Properties = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("properties");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/dashboard" },
    { id: "properties", label: "Properties", icon: Building, path: "/properties" },
    { id: "analysis", label: "Analysis", icon: BarChart3, path: "/analysis" },
    { id: "help", label: "Help", icon: HelpCircle, path: "/help" },
  ];

  const filteredProperties = mockProperties.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setRoomDialogOpen(true);
  };

  const handleRoomAction = (room: Room) => {
    setRoomDialogOpen(false);
    navigate(`/simulator?propertyId=${selectedProperty?.id}&roomId=${room.id}&roomName=${encodeURIComponent(room.name)}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleMenuClick = (item: typeof menuItems[0]) => {
    setActiveMenu(item.id);
    navigate(item.path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Power Fusion</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-border flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-3">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">John Doe</h3>
          <p className="text-sm text-muted-foreground">john@example.com</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-foreground">Properties</h1>

          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/simulator?type=house")} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-6">
              <Plus className="w-5 h-5" />
              New Property
            </Button>
          </div>
        </header>

        {/* Properties Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Search Bar */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Property List */}
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => handlePropertyClick(property)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      property.type === "house" 
                        ? "bg-primary/10" 
                        : "bg-accent/10"
                    }`}>
                      {property.type === "house" ? (
                        <House className="w-7 h-7 text-primary" />
                      ) : (
                        <Building2 className="w-7 h-7 text-accent" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{property.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {property.rooms.length} rooms · Created {property.createdAt}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem 
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info("Edit property coming soon");
                          }}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center gap-2 cursor-pointer text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.info("Delete property coming soon");
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            ))}

            {filteredProperties.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Building className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No properties found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Room List Dialog */}
      <Dialog open={roomDialogOpen} onOpenChange={setRoomDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedProperty?.type === "house" ? (
                <House className="w-6 h-6 text-primary" />
              ) : (
                <Building2 className="w-6 h-6 text-accent" />
              )}
              {selectedProperty?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {selectedProperty?.rooms.length} rooms
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setRoomDialogOpen(false);
                  navigate(`/simulator?propertyId=${selectedProperty?.id}&type=room`);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </div>

            {selectedProperty?.rooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
                onClick={() => handleRoomAction(room)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DoorOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{room.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {room.deviceCount} devices · {room.lastModified}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRoomAction(room);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Properties;
