"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
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
import { MY_PROPERTIES_QUERY, CREATE_PROPERTY_MUTATION } from "@/lib/graphql/queries/properties.queries";
import { clearAuthTokens } from "@/lib/auth";

interface Property {
  id: string;
  propertyName: string;
  propertyType: "HOUSE" | "APARTMENT";
  createdAt: string;
  updatedAt: string;
}

export default function Properties() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("properties");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [roomDialogOpen, setRoomDialogOpen] = useState(false);
  const [newPropertyDialogOpen, setNewPropertyDialogOpen] = useState(false);
  
  // Fetch properties from GraphQL
  const { data, loading, error, refetch } = useQuery(MY_PROPERTIES_QUERY, {
    errorPolicy: "all",
  });
  
  const [createProperty, { loading: creating }] = useMutation(CREATE_PROPERTY_MUTATION, {
    refetchQueries: [{ query: MY_PROPERTIES_QUERY }],
  });

  const properties: Property[] = data?.myProperties || [];

  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/dashboard" },
    { id: "properties", label: "Properties", icon: Building, path: "/properties" },
    { id: "analysis", label: "Analysis", icon: BarChart3, path: "/analysis" },
    { id: "help", label: "Help", icon: HelpCircle, path: "/help" },
  ];

  const filteredProperties = properties.filter((p) =>
    p.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCreateProperty = async (type: "HOUSE" | "APARTMENT") => {
    try {
      const propertyName = type === "HOUSE" ? "My House" : "My Apartment";
      await createProperty({
        variables: {
          input: {
            propertyName,
            propertyType: type,
          },
        },
      });
      toast.success("Property created successfully!");
      setNewPropertyDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to create property");
    }
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setRoomDialogOpen(true);
  };

  const handleRoomAction = () => {
    setRoomDialogOpen(false);
    if (selectedProperty) {
      router.push(`/simulator?propertyId=${selectedProperty.id}&type=room`);
    }
  };

  const handleLogout = () => {
    clearAuthTokens();
    router.push("/");
  };

  const handleMenuClick = (item: typeof menuItems[0]) => {
    setActiveMenu(item.id);
    router.push(item.path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
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
            <Button onClick={() => setNewPropertyDialogOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-6">
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

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Loading properties...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12 text-destructive">
              <p>Error loading properties: {error.message}</p>
            </div>
          )}

          {/* Property List */}
          <div className="space-y-4">
            {!loading && !error && filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => handlePropertyClick(property)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      property.propertyType === "HOUSE" 
                        ? "bg-primary/10" 
                        : "bg-accent/10"
                    }`}>
                      {property.propertyType === "HOUSE" ? (
                        <House className="w-7 h-7 text-primary" />
                      ) : (
                        <Building2 className="w-7 h-7 text-accent" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{property.propertyName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {property.propertyType} · Created {new Date(property.createdAt).toLocaleDateString()}
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
              {selectedProperty?.propertyType === "HOUSE" ? (
                <House className="w-6 h-6 text-primary" />
              ) : (
                <Building2 className="w-6 h-6 text-accent" />
              )}
              {selectedProperty?.propertyName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {selectedProperty?.propertyType}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setRoomDialogOpen(false);
                  router.push(`/simulator?propertyId=${selectedProperty?.id}&type=room`);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </div>

            <div className="text-center py-8 text-muted-foreground">
              <p>Rooms feature coming soon!</p>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-4"
                onClick={() => {
                  setRoomDialogOpen(false);
                  router.push(`/simulator?propertyId=${selectedProperty?.id}&type=room`);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Property Type Selection Dialog */}
      <Dialog open={newPropertyDialogOpen} onOpenChange={setNewPropertyDialogOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Create New Property</DialogTitle>
          </DialogHeader>
          
          <p className="text-center text-muted-foreground text-sm mb-6">
            Choose the type of property you want to create
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* House Option */}
            <div
              onClick={() => {
                handleCreateProperty("HOUSE");
              }}
              className="cursor-pointer bg-secondary/30 rounded-xl border border-border p-6 hover:border-primary/50 hover:bg-primary/5 transition-all group text-center"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all">
                <House className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">House</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Multi-room layout
              </p>
            </div>

            {/* Apartment Option */}
            <div
              onClick={() => {
                handleCreateProperty("APARTMENT");
              }}
              className="cursor-pointer bg-secondary/30 rounded-xl border border-border p-6 hover:border-accent/50 hover:bg-accent/5 transition-all group text-center"
            >
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-all">
                <Building2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Apartment</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Flat / Studio layout
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
