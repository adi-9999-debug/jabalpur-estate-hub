
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Home, Bath, Car, Heart, Calendar, Shield, Users } from 'lucide-react';
import AuthButton from '@/components/AuthButton';

const Rent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');

  // Mock rental property data
  const properties = [
    {
      id: 1,
      title: "Furnished 2BHK Apartment",
      price: "₹18,000/month",
      location: "Napier Town, Jabalpur",
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      area: "1,200 sq ft",
      image: "/api/placeholder/400/250",
      type: "Apartment",
      furnished: "Fully Furnished",
      deposit: "₹36,000"
    },
    {
      id: 2,
      title: "Spacious 3BHK House",
      price: "₹25,000/month",
      location: "Civil Lines, Jabalpur",
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "1,800 sq ft",
      image: "/api/placeholder/400/250",
      type: "House",
      furnished: "Semi Furnished",
      deposit: "₹50,000"
    },
    {
      id: 3,
      title: "Modern Studio Apartment",
      price: "₹12,000/month",
      location: "Vijay Nagar, Jabalpur",
      bedrooms: 1,
      bathrooms: 1,
      parking: 1,
      area: "600 sq ft",
      image: "/api/placeholder/400/250",
      type: "Apartment",
      furnished: "Fully Furnished",
      deposit: "₹24,000"
    },
    {
      id: 4,
      title: "Commercial Office Space",
      price: "₹35,000/month",
      location: "Wright Town, Jabalpur",
      bedrooms: 0,
      bathrooms: 2,
      parking: 3,
      area: "1,500 sq ft",
      image: "/api/placeholder/400/250",
      type: "Commercial",
      furnished: "Unfurnished",
      deposit: "₹70,000"
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !propertyType || property.type === propertyType;
    const matchesLocation = !location || property.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

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
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
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
              {filteredProperties.length} Rental Properties Available
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.image}
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
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {property.furnished}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-emerald-600">{property.price}</span>
                    <span className="text-sm text-gray-500">{property.area}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <span>Security Deposit: {property.deposit}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    {property.bedrooms > 0 ? (
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
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Car className="h-4 w-4 mr-1" />
                      <span>{property.parking} Parking</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">View Details</Button>
                    <Button variant="outline" className="flex-1">Contact Owner</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
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
