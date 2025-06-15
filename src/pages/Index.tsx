
import React from 'react';
import { Search, MapPin, Home, Building, TreePine, Calendar, Star, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthButton from '@/components/AuthButton';

const Index = () => {
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
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">Buy</a>
              <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">Rent</a>
              <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">Sell</a>
              <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">Contact</a>
            </nav>
            
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Find Your Perfect 
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"> Home</span>
              <br />in Jabalpur
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Discover the finest properties in Jabalpur's most sought-after locations. 
              From luxury villas to commercial spaces, find your ideal property with The Silver Estates.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 mb-16 max-w-4xl mx-auto">
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
                    <option>Commercial</option>
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
      <section className="py-16 px-4 bg-white/60">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Property Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Home, title: "Residential", desc: "Apartments, Houses, Villas", color: "from-blue-500 to-blue-600" },
              { icon: Building, title: "Commercial", desc: "Shops, Offices, Warehouses", color: "from-emerald-500 to-emerald-600" },
              { icon: TreePine, title: "Agricultural", desc: "Farm lands, Plots", color: "from-green-500 to-green-600" },
              { icon: Calendar, title: "Rental", desc: "All types for rent", color: "from-purple-500 to-purple-600" }
            ].map((category, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.svg",
                title: "Luxury Villa in Napier Town",
                price: "₹2.5 Cr",
                location: "Napier Town, Jabalpur",
                beds: "4 BHK",
                area: "3,200 sq ft",
                rating: 4.8
              },
              {
                image: "/placeholder.svg",
                title: "Modern Apartment in Civil Lines",
                price: "₹85 Lakh",
                location: "Civil Lines, Jabalpur",
                beds: "3 BHK",
                area: "1,800 sq ft",
                rating: 4.6
              },
              {
                image: "/placeholder.svg",
                title: "Commercial Space in Vijay Nagar",
                price: "₹1.2 Cr",
                location: "Vijay Nagar, Jabalpur",
                beds: "Office",
                area: "2,500 sq ft",
                rating: 4.7
              }
            ].map((property, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">{property.title}</h3>
                  <p className="text-2xl font-bold text-blue-700 mb-3">{property.price}</p>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>{property.beds}</span>
                    <span>{property.area}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl transition-all duration-300">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jabalpur Areas */}
      <section className="py-16 px-4 bg-white/60">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Popular Areas in Jabalpur</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              "Napier Town", "Civil Lines", "Gokalpur", "Adhartal", "Vijay Nagar"
            ].map((area, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100 text-center">
                <h3 className="font-semibold text-gray-800 mb-1">{area}</h3>
                <p className="text-sm text-gray-600">Premium Location</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-700 to-emerald-700">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-xl text-blue-100 mb-8">Get in touch with our expert team for personalized assistance</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-blue-700 hover:bg-blue-50 rounded-xl px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105">
              <Phone className="w-5 h-5 mr-2" />
              Call Us: +91 98765 43210
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 rounded-xl px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105">
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">The Silver Estates</span>
              </div>
              <p className="text-gray-400">Your trusted partner for real estate in Jabalpur. Find your perfect property with us.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Buy Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rent Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Property Types</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Residential</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Commercial</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agricultural</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Plots</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📍 Napier Town, Jabalpur</li>
                <li>📞 +91 98765 43210</li>
                <li>✉️ info@silverestates.com</li>
                <li>🕒 Mon-Sat: 9AM-7PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 The Silver Estates. All rights reserved. Crafted for Jabalpur's finest properties.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
