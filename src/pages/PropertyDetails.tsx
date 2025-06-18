
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Bath, Car, Calendar, Shield, Phone, Mail, User, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AuthButton from '@/components/AuthButton';

interface PropertyDetails {
  id: string;
  title: string;
  description: string | null;
  price?: number;
  monthly_rent?: number;
  security_deposit?: number | null;
  property_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  parking?: number | null;
  area: number | null;
  furnished?: string | null;
  location: string | null;
  address: string | null;
  available_from?: string | null;
  lease_duration?: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  amenities?: string[] | null;
  images: string[] | null;
  created_at: string;
  type: 'sale' | 'rental';
}

const PropertyDetails = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id && type) {
      fetchProperty();
    }
  }, [id, type]);

  const fetchProperty = async () => {
    try {
      const tableName = type === 'sale' ? 'sale_properties' : 'rental_properties';
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        toast({
          title: "Error",
          description: "Failed to fetch property details",
          variant: "destructive"
        });
        return;
      }

      setProperty({ ...data, type: type as 'sale' | 'rental' });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch property details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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

  const formatDeposit = (deposit: number | null) => {
    if (!deposit) return 'Not specified';
    return `₹${deposit.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Home className="h-8 w-8 text-blue-600" />
                <h1 className="ml-2 text-xl font-bold text-gray-900">The Silver Estates</h1>
              </div>
              <AuthButton />
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Home className="h-8 w-8 text-blue-600" />
                <h1 className="ml-2 text-xl font-bold text-gray-900">The Silver Estates</h1>
              </div>
              <AuthButton />
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Property not found</h3>
            <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      </div>
    );
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
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={property.images && property.images.length > 0 ? property.images[currentImageIndex] : "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                {property.images && property.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Property Description */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>About this property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {property.description || 'No description available for this property.'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Property Details */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="capitalize">
                    {property.property_type}
                  </Badge>
                  {property.type === 'rental' && property.furnished && (
                    <Badge variant="outline" className="capitalize">
                      {property.furnished} Furnished
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{property.title}</CardTitle>
                {property.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Price */}
                <div>
                  {property.type === 'sale' && property.price && (
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPrice(property.price)}
                    </div>
                  )}
                  {property.type === 'rental' && property.monthly_rent && (
                    <div>
                      <div className="text-3xl font-bold text-emerald-600">
                        {formatRent(property.monthly_rent)}
                      </div>
                      {property.security_deposit && (
                        <div className="text-sm text-gray-600 mt-1">
                          Security Deposit: {formatDeposit(property.security_deposit)}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-2 gap-4">
                  {property.bedrooms && property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <Home className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{property.bedrooms} Bedrooms</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{property.bathrooms} Bathrooms</span>
                    </div>
                  )}
                  {property.parking && (
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{property.parking} Parking</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{property.area} sq ft</span>
                    </div>
                  )}
                </div>

                {/* Rental Specific Info */}
                {property.type === 'rental' && (
                  <div className="space-y-2">
                    {property.available_from && (
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Available from: {new Date(property.available_from).toLocaleDateString()}</span>
                      </div>
                    )}
                    {property.lease_duration && (
                      <div className="text-sm text-gray-600">
                        Lease Duration: {property.lease_duration}
                      </div>
                    )}
                  </div>
                )}

                {/* Amenities */}
                {property.amenities && property.amenities.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">{amenity}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    {property.contact_name && (
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-3" />
                        <span>{property.contact_name}</span>
                      </div>
                    )}
                    {property.contact_phone && (
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <a href={`tel:${property.contact_phone}`} className="text-blue-600 hover:underline">
                          {property.contact_phone}
                        </a>
                      </div>
                    )}
                    {property.contact_email && (
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <a href={`mailto:${property.contact_email}`} className="text-blue-600 hover:underline">
                          {property.contact_email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1">
                    Contact {property.type === 'sale' ? 'Agent' : 'Owner'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Schedule Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
