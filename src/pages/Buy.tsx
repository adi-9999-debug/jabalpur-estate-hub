
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Home, Bath, Car, Heart } from 'lucide-react';
import AuthButton from '@/components/AuthButton';

const Buy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');

  // Mock property data - in a real app, this would come from your database
  const properties = [
    {
      id: 1,
      title: "Modern 3BHK Villa",
      price: "₹85,00,000",
      location: "Napier Town, Jabalpur",
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "1,800 sq ft",
      image: "/placeholder.svg",
      type: "Villa"
    },
    {
      id: 2,
      title: "Luxury Apartment",
      price: "₹65,00,000",
      location: "Wright Town, Jabalpur",
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      area: "1,200 sq ft",
      image: "/placeholder.svg",
      type: "Apartment"
    },
    {
      id: 3,
      title: "Spacious 4BHK House",
      price: "₹1,20,00,000",
      location: "Civil Lines, Jabalpur",
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      area: "2,500 sq ft",
      image: "/placeholder.svg",
      type: "House"
    },
    {
      id: 4,
      title: "Cozy 2BHK Flat",
      price: "₹45,00,000",
      location: "Adhartal, Jabalpur",
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      area: "900 sq ft",
      image: "/placeholder.svg",
      type: "Apartment"
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
              <a href="/buy" className="text-blue-600 font-medium">Buy</a>
              <a href="/sell" className="text-gray-500 hover:text-gray-900">Sell</a>
              <a href="/rent" className="text-gray-500 hover:text-gray-900">Rent</a>
            </nav>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Find Your Dream Home</h2>
            <p className="mt-2 text-gray-600">Discover the perfect property in Jabalpur</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50">₹0 - ₹50 Lakh</SelectItem>
                  <SelectItem value="50-100">₹50 Lakh - ₹1 Crore</SelectItem>
                  <SelectItem value="100+">₹1 Crore+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Plot">Plot</SelectItem>
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

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {filteredProperties.length} Properties Found
            </h3>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
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
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                    <span className="text-sm text-gray-500">{property.area}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
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
                    <Button className="flex-1">View Details</Button>
                    <Button variant="outline" className="flex-1">Contact Agent</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Buy;
