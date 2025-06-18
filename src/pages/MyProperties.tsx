
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MapPin, Home, Bath, Car, Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AccountDropdown from '@/components/AccountDropdown';

interface SaleProperty {
  id: string;
  title: string;
  description: string | null;
  price: number;
  property_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  location: string | null;
  images: string[] | null;
  created_at: string;
}

interface RentalProperty {
  id: string;
  title: string;
  description: string | null;
  monthly_rent: number;
  property_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  area: number | null;
  furnished: string | null;
  location: string | null;
  images: string[] | null;
  created_at: string;
}

const MyProperties = () => {
  const [saleProperties, setSaleProperties] = useState<SaleProperty[]>([]);
  const [rentalProperties, setRentalProperties] = useState<RentalProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchProperties();
  }, [user, navigate]);

  const fetchProperties = async () => {
    try {
      // Fetch sale properties
      const { data: saleData, error: saleError } = await supabase
        .from('sale_properties')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (saleError) {
        console.error('Error fetching sale properties:', saleError);
      } else {
        setSaleProperties(saleData || []);
      }

      // Fetch rental properties
      const { data: rentalData, error: rentalError } = await supabase
        .from('rental_properties')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (rentalError) {
        console.error('Error fetching rental properties:', rentalError);
      } else {
        setRentalProperties(rentalData || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your properties",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSaleProperty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sale_properties')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setSaleProperties(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Property deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive"
      });
    }
  };

  const deleteRentalProperty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('rental_properties')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setRentalProperties(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Property deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Crore`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const formatRent = (rent: number) => {
    return `₹${rent.toLocaleString()}/month`;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">The Silver Estates</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-500 hover:text-gray-900">Home</a>
              <a href="/buy" className="text-gray-500 hover:text-gray-900">Buy</a>
              <a href="/sell" className="text-gray-500 hover:text-gray-900">Sell</a>
              <a href="/rent" className="text-gray-500 hover:text-gray-900">Rent</a>
            </nav>
            <AccountDropdown />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">My Properties</h2>
          <p className="text-gray-600 mt-2">Manage your listed properties</p>
        </div>

        <Tabs defaultValue="sale" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sale">For Sale ({saleProperties.length})</TabsTrigger>
            <TabsTrigger value="rental">For Rent ({rentalProperties.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sale" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : saleProperties.length === 0 ? (
              <div className="text-center py-12">
                <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties for sale</h3>
                <p className="text-gray-600 mb-4">You haven't listed any properties for sale yet.</p>
                <Button onClick={() => navigate('/sell')}>List a Property</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {saleProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={property.images && property.images.length > 0 ? property.images[0] : "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <Badge variant="secondary" className="absolute top-2 left-2 capitalize">
                        {property.property_type}
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                      {property.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-blue-600">{formatPrice(property.price)}</span>
                        {property.area && <span className="text-sm text-gray-500">{property.area} sq ft</span>}
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-1" />
                          <span>{property.bedrooms || 0} Beds</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          <span>{property.bathrooms || 0} Baths</span>
                        </div>
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-1" />
                          <span>Parking</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => navigate(`/property/${property.id}/sale`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Property</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this property? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteSaleProperty(property.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="rental" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : rentalProperties.length === 0 ? (
              <div className="text-center py-12">
                <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No rental properties</h3>
                <p className="text-gray-600 mb-4">You haven't listed any properties for rent yet.</p>
                <Button onClick={() => navigate('/rent/list')}>List a Property</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rentalProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={property.images && property.images.length > 0 ? property.images[0] : "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <Badge variant="secondary" className="absolute top-2 left-2 capitalize">
                        {property.property_type}
                      </Badge>
                      {property.furnished && (
                        <Badge variant="outline" className="absolute top-2 right-2 bg-white/80 capitalize">
                          {property.furnished} Furnished
                        </Badge>
                      )}
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                      {property.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-emerald-600">{formatRent(property.monthly_rent)}</span>
                        {property.area && <span className="text-sm text-gray-500">{property.area} sq ft</span>}
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        {property.bedrooms && property.bedrooms > 0 ? (
                          <div className="flex items-center">
                            <Home className="h-4 w-4 mr-1" />
                            <span>{property.bedrooms} Beds</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Home className="h-4 w-4 mr-1" />
                            <span>Office</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          <span>{property.bathrooms || 0} Baths</span>
                        </div>
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-1" />
                          <span>{property.parking || 0} Parking</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => navigate(`/property/${property.id}/rental`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Property</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this property? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteRentalProperty(property.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyProperties;
