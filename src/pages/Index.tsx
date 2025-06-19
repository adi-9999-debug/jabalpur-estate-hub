
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home, Building, TreePine, Calendar, Star, Phone, Mail, ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import AuthButton from '@/components/AuthButton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: string;
  title: string;
  price?: number;
  monthly_rent?: number;
  location: string | null;
  bedrooms: number | null;
  area: number | null;
  images: string[] | null;
  property_type: string;
  type: 'sale' | 'rental';
}

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      // Fetch 2 sale properties
      const { data: saleProperties, error: saleError } = await supabase
        .from('sale_properties')
        .select('*')
        .limit(2);

      // Fetch 1 rental property
      const { data: rentalProperties, error: rentalError } = await supabase
        .from('rental_properties')
        .select('*')
        .limit(1);

      if (saleError || rentalError) {
        console.error('Error fetching properties:', saleError || rentalError);
        return;
      }

      const allProperties: Property[] = [
        ...(saleProperties || []).map(p => ({ ...p, type: 'sale' as const })),
        ...(rentalProperties || []).map(p => ({ ...p, type: 'rental' as const }))
      ];

      setFeaturedProperties(allProperties);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (property: Property) => {
    if (property.type === 'sale' && property.price) {
      if (property.price >= 10000000) {
        return `₹${(property.price / 10000000).toFixed(1)} Cr`;
      } else if (property.price >= 100000) {
        return `₹${(property.price / 100000).toFixed(1)} Lakh`;
      } else {
        return `₹${property.price.toLocaleString()}`;
      }
    } else if (property.type === 'rental' && property.monthly_rent) {
      return `₹${property.monthly_rent.toLocaleString()}/month`;
    }
    return 'Price on request';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">The Silver Estates</h1>
                <p className="text-xs text-gray-600">Jabalpur Real Estate</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-blue-600 font-medium">Home</Link>
              <Link to="/buy" className="text-gray-500 hover:text-gray-900">Buy</Link>
              <Link to="/sell" className="text-gray-500 hover:text-gray-900">Sell</Link>
              <Link to="/rent" className="text-gray-500 hover:text-gray-900">Rent</Link>
            </nav>
            
            {/* Desktop Auth Button */}
            <div className="hidden md:block">
              <AuthButton />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4 pt-4">
                <Link 
                  to="/" 
                  className="text-blue-600 font-medium px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/buy" 
                  className="text-gray-500 hover:text-gray-900 px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Buy
                </Link>
                <Link 
                  to="/sell" 
                  className="text-gray-500 hover:text-gray-900 px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sell
                </Link>
                <Link 
                  to="/rent" 
                  className="text-gray-500 hover:text-gray-900 px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Rent
                </Link>
                <div className="pt-2 border-t border-gray-200">
                  <AuthButton />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Find Your Perfect 
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"> Home</span>
              <br />in Jabalpur
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 leading-relaxed px-4">
              Discover the finest properties in Jabalpur's most sought-after locations. 
              From luxury villas to commercial spaces, find your ideal property with The Silver Estates.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 mb-12 md:mb-16 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input 
                    placeholder="Location in Jabalpur" 
                    className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                <div className="relative">
                  <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select className="w-full h-12 pl-10 pr-4 border-0 bg-gray-50 focus:bg-white rounded-md transition-colors appearance-none">
                    <option>Property Type</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Duplex</option>
                    <option>Commercial</option>
                    <option>Plots</option>
                    <option>Farm lands</option>
                  </select>
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select className="w-full h-12 pl-10 pr-4 border-0 bg-gray-50 focus:bg-white rounded-md transition-colors appearance-none">
                    <option>Buy/Rent</option>
                    <option>Buy</option>
                    <option>Rent</option>
                  </select>
                </div>
                <Button className="h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-12 md:py-16 px-4 bg-white/60">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">Property Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Home, title: "Residential", desc: "Apartments, Houses, Villas", color: "from-blue-500 to-blue-600" },
              { icon: Building, title: "Commercial", desc: "Shops, Offices, Warehouses", color: "from-emerald-500 to-emerald-600" },
              { icon: TreePine, title: "Agricultural", desc: "Farm lands, Plots", color: "from-green-500 to-green-600" },
              { icon: Calendar, title: "Rental", desc: "All types for rent", color: "from-purple-500 to-purple-600" }
            ].map((category, index) => (
              <div key={index} className="group bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Properties</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <div key={property.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="relative overflow-hidden">
                    <img 
                      src={property.images && property.images.length > 0 ? property.images[0] : "/placeholder.svg"} 
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">{property.title}</h3>
                    <p className="text-2xl font-bold text-blue-700 mb-3">{formatPrice(property)}</p>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{property.location || 'Jabalpur'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <span>{property.bedrooms || 0} BHK</span>
                      <span>{property.area || 0} sq ft</span>
                    </div>
                    <Link to={`/property/${property.id}/${property.type}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl transition-all duration-300">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties available</h3>
              <p className="text-gray-600 mb-4">Be the first to list your property!</p>
              <div className="flex gap-4 justify-center">
                <Link to="/sell">
                  <Button>List for Sale</Button>
                </Link>
                <Link to="/rent/list">
                  <Button variant="outline">List for Rent</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Jabalpur Areas */}
      <section className="py-12 md:py-16 px-4 bg-white/60">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">Popular Areas in Jabalpur</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              "Napier Town", "Civil Lines", "Gokalpur", "Adhartal", "Vijay Nagar"
            ].map((area, index) => (
              <div key={index} className="bg-white rounded-xl p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100 text-center">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{area}</h3>
                <p className="text-xs md:text-sm text-gray-600">Premium Location</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-blue-700 to-emerald-700">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 px-4">Get in touch with our expert team for personalized assistance</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="bg-white text-blue-700 hover:bg-blue-50 rounded-xl px-6 md:px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              onClick={() => window.location.href = 'tel:7509999470'}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us: +91 7509999470
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 rounded-xl px-6 md:px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <Building className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">The Silver Estates</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">Your trusted partner for real estate in Jabalpur. Find your perfect property with us.</p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/buy" className="hover:text-white transition-colors">Buy Properties</Link></li>
                <li><Link to="/rent" className="hover:text-white transition-colors">Rent Properties</Link></li>
                <li><Link to="/sell" className="hover:text-white transition-colors">Sell Property</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Property Types</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Residential</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Commercial</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agricultural</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Plots</a></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li>📍 Napier Town, Jabalpur</li>
                <li>📞 +91 98765 43210</li>
                <li>✉️ info@silverestates.com</li>
                <li>🕒 Mon-Sat: 9AM-7PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2024 The Silver Estates. All rights reserved. Crafted for Jabalpur's finest properties.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
