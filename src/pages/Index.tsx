
import { useState } from "react";
import { Search, MapPin, Home, Building2, TreePine, Key, Phone, Mail, Star, Bed, Bath, Square, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProperties = [
    {
      id: 1,
      title: "Luxury Villa in Civil Lines",
      price: "₹2.5 Cr",
      type: "Villa",
      area: "3500 sq ft",
      bedrooms: 4,
      bathrooms: 3,
      location: "Civil Lines, Jabalpur",
      image: "/placeholder.svg",
      featured: true,
      rating: 4.8
    },
    {
      id: 2,
      title: "Modern Apartment in Napier Town",
      price: "₹75 Lakh",
      type: "Apartment",
      area: "1200 sq ft",
      bedrooms: 2,
      bathrooms: 2,
      location: "Napier Town, Jabalpur",
      image: "/placeholder.svg",
      featured: true,
      rating: 4.6
    },
    {
      id: 3,
      title: "Commercial Space in Gokalpur",
      price: "₹1.2 Cr",
      type: "Commercial",
      area: "2000 sq ft",
      bedrooms: 0,
      bathrooms: 2,
      location: "Gokalpur, Jabalpur",
      image: "/placeholder.svg",
      featured: true,
      rating: 4.7
    }
  ];

  const areas = [
    { name: "Napier Town", properties: 45, image: "/placeholder.svg" },
    { name: "Civil Lines", properties: 32, image: "/placeholder.svg" },
    { name: "Gokalpur", properties: 28, image: "/placeholder.svg" },
    { name: "Adhartal", properties: 36, image: "/placeholder.svg" },
    { name: "Vijay Nagar", properties: 41, image: "/placeholder.svg" },
    { name: "Madan Mahal", properties: 22, image: "/placeholder.svg" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProperties.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  The Silver Estates
                </h1>
                <p className="text-xs text-gray-500">Jabalpur's Premium Real Estate</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Buy</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Rent</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Sell</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                List Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white mb-12">
            <h2 className="text-5xl font-bold mb-4 leading-tight">
              Find Your Dream Home in <span className="text-yellow-400">Jabalpur</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover premium properties in Jabalpur's most sought-after locations. 
              Your perfect home awaits in the heart of Madhya Pradesh.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input 
                      placeholder="Search by location, property type..."
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20-50">₹20L - ₹50L</SelectItem>
                    <SelectItem value="50-100">₹50L - ₹1Cr</SelectItem>
                    <SelectItem value="100-200">₹1Cr - ₹2Cr</SelectItem>
                    <SelectItem value="200+">₹2Cr+</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Property Categories</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of properties across Jabalpur
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Home, title: "Residential", subtitle: "Houses, Apartments, Villas", count: "150+ Properties", color: "from-blue-500 to-cyan-500" },
              { icon: Building2, title: "Commercial", subtitle: "Shops, Offices, Warehouses", count: "75+ Properties", color: "from-purple-500 to-pink-500" },
              { icon: TreePine, title: "Agricultural", subtitle: "Farm Lands, Plots", count: "45+ Properties", color: "from-green-500 to-emerald-500" },
              { icon: Key, title: "Rental", subtitle: "All Types Available", count: "200+ Properties", color: "from-orange-500 to-red-500" }
            ].map((category, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h4>
                  <p className="text-gray-600 mb-3">{category.subtitle}</p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked premium properties in Jabalpur's prime locations
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredProperties.map((property) => (
                  <div key={property.id} className="w-full flex-shrink-0">
                    <Card className="mx-4 shadow-2xl border-0 overflow-hidden bg-white">
                      <div className="md:flex">
                        <div className="md:w-1/2">
                          <div className="relative h-80 md:h-full">
                            <img 
                              src={property.image} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                Featured
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium ml-1">{property.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-1/2 p-8">
                          <div className="mb-4">
                            <Badge variant="outline" className="mb-2">{property.type}</Badge>
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h4>
                            <div className="flex items-center text-gray-600 mb-4">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{property.location}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center">
                              <Square className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                              <span className="text-sm text-gray-600">{property.area}</span>
                            </div>
                            {property.bedrooms > 0 && (
                              <div className="text-center">
                                <Bed className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                                <span className="text-sm text-gray-600">{property.bedrooms} Beds</span>
                              </div>
                            )}
                            <div className="text-center">
                              <Bath className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                              <span className="text-sm text-gray-600">{property.bathrooms} Baths</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-3xl font-bold text-blue-600">{property.price}</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Phone className="w-4 h-4 mr-1" />
                                Call
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
              onClick={nextSlide}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Popular Areas in Jabalpur</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore properties in Jabalpur's most desirable neighborhoods
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={area.image} 
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-bold">{area.name}</h4>
                    <p className="text-blue-200">{area.properties} Properties</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4">Ready to Find Your Dream Property?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect home with The Silver Estates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              <Search className="w-5 h-5 mr-2" />
              Browse Properties
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
              <Home className="w-5 h-5 mr-2" />
              List Your Property
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">The Silver Estates</span>
              </div>
              <p className="text-gray-400 mb-4">
                Jabalpur's premier real estate platform connecting buyers, sellers, and renters.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="border-gray-600 text-gray-400 hover:text-white">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-600 text-gray-400 hover:text-white">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Buy Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rent Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Property Valuation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Popular Areas</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Napier Town</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Civil Lines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gokalpur</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vijay Nagar</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📍 Napier Town, Jabalpur</li>
                <li>📞 +91 98765 43210</li>
                <li>✉️ info@silverestates.com</li>
                <li>🕒 Mon-Sat: 9 AM - 7 PM</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 The Silver Estates. All rights reserved. | Proudly serving Jabalpur real estate market.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
