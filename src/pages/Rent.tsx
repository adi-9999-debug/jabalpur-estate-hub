import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Home, Bath, Car, Heart, Calendar, Shield, Users } from 'lucide-react';
import AuthButton from '@/components/AuthButton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface RentalProperty {
  id: string;
  title: string;
  description: string | null;
  monthly_rent: number;
  security_deposit: number | null;
  property_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  area: number | null;
  furnished: string | null;
  location: string | null;
  address: string | null;
  available_from: string | null;
  lease_duration: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  amenities: string[] | null;
  images: string[] | null;
  created_at: string;
}

const Rent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [properties, setProperties] = useState<RentalProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('rental_properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching rental properties:', error);
        toast({
          title: "Error",
          description: "Failed to fetch rental properties",
          variant: "destructive"
        });
        return;
      }

      setProperties(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch rental properties",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (property.location && property.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = !propertyType || property.property_type === propertyType;
    const matchesLocation = !location || (property.location && property.location.toLowerCase().includes(location.toLowerCase()));
    
    const matchesPrice = !priceRange || (() => {
      const rent = property.monthly_rent;
      switch (priceRange) {
        case '0-15':
          return rent <= 15000;
        case '15-25':
          return rent > 15000 && rent <= 25000;
        case '25-40':
          return rent > 25000 && rent <= 40000;
        case '40+':
          return rent > 40000;
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  const formatRent = (rent: number) => {
    return `₹${rent.toLocaleString()}/month`;
  };

  const formatDeposit = (deposit: number | null) => {
    if (!deposit) return 'Not specified';
    return `₹${deposit.toLocaleString()}`;
  };

  const handleContactAgent = () => {
    window.location.href = 'tel:7509999470';
  };

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
              <a href="/rent" className="text-blue-600 font-medium">Rent</a>
            </nav>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Rental Home</h1>
          <p className="text-xl mb-8">Discover comfortable and affordable rental properties in Jabalpur</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search rental properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Monthly Rent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-15">₹0 - ₹15,000</SelectItem>
                  <SelectItem value="15-25">₹15,000 - ₹25,000</SelectItem>
                  <SelectItem value="25-40">₹25,000 - ₹40,000</SelectItem>
                  <SelectItem value="40+">₹40,000+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="duplex">Duplex</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plots">Plots</SelectItem>
                  <SelectItem value="farm lands">Farm lands</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Benefits */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Why Rent with The Silver Estates?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Verified Properties</h3>
              <p className="text-gray-600">All properties are verified and legally compliant</p>
            </div>
            <div className="text-center p-6">
              <Users className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Trusted Landlords</h3>
              <p className="text-gray-600">Connect with verified and reliable property owners</p>
            </div>
            <div className="text-center p-6">
              <Calendar className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Flexible Terms</h3>
              <p className="text-gray-600">Find rentals with flexible lease terms that suit you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {loading ? 'Loading...' : `${filteredProperties.length} Rental Properties Available`}
            </h3>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Rent: Low to High</SelectItem>
                <SelectItem value="price-high">Rent: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="area">Area</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={property.images && property.images.length > 0 ? property.images[0] : "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {property.furnished && (
                      <div className="absolute top-2 left-2 bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {property.furnished.charAt(0).toUpperCase() + property.furnished.slice(1)} Furnished
                      </div>
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
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-emerald-600">{formatRent(property.monthly_rent)}</span>
                      {property.area && <span className="text-sm text-gray-500">{property.area} sq ft</span>}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-4">
                      <span>Security Deposit: {formatDeposit(property.security_deposit)}</span>
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
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => navigate(`/property/${property.id}/rental`)}
                      >
                        View Details
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={handleContactAgent}>
                        Contact Agent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No rental properties found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Property to Rent Out?</h2>
          <p className="text-xl mb-8">List your property and find reliable tenants quickly</p>
          <Button 
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={() => window.location.href = '/rent/list'}
          >
            List Your Property
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Rent;
