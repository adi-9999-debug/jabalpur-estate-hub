
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Home, MapPin, Camera, Upload, X, CheckCircle, Shield, Users, Calendar } from 'lucide-react';
import AuthButton from '@/components/AuthButton';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const RentListProperty = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    monthlyRent: '',
    securityDeposit: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    area: '',
    furnished: '',
    location: '',
    address: '',
    availableFrom: '',
    leaseDuration: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    amenities: [] as string[]
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const amenitiesList = [
    'Air Conditioning', 'Parking', 'Swimming Pool', 'Gym', 'Lift', 
    'Security', 'Power Backup', 'Garden', 'Balcony', 'Furnished Kitchen'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to list your rental property",
        variant: "destructive"
      });
      window.location.href = '/auth';
      return;
    }
    
    if (!formData.title || !formData.monthlyRent || !formData.propertyType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Convert numeric fields
      const monthlyRent = parseFloat(formData.monthlyRent.replace(/,/g, ''));
      const securityDeposit = formData.securityDeposit ? parseFloat(formData.securityDeposit.replace(/,/g, '')) : null;
      
      if (isNaN(monthlyRent)) {
        throw new Error('Invalid monthly rent format');
      }

      // Prepare the property data
      const propertyData = {
        user_id: user.id,
        title: formData.title,
        description: formData.description || null,
        monthly_rent: monthlyRent,
        security_deposit: securityDeposit,
        property_type: formData.propertyType,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        parking: formData.parking ? parseInt(formData.parking) : null,
        area: formData.area ? parseInt(formData.area) : null,
        furnished: formData.furnished || null,
        location: formData.location || null,
        address: formData.address || null,
        available_from: formData.availableFrom || null,
        lease_duration: formData.leaseDuration || null,
        contact_name: formData.contactName || null,
        contact_phone: formData.contactPhone || null,
        contact_email: formData.contactEmail || null,
        amenities: formData.amenities.length > 0 ? formData.amenities : null,
        images: [] // For now, we'll store empty array. File upload can be added later
      };

      console.log('Inserting rental property:', propertyData);

      // Insert into database
      const { data, error } = await supabase
        .from('rental_properties')
        .insert([propertyData])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Rental property inserted successfully:', data);
      
      toast({
        title: "Success!",
        description: "Your rental property has been listed successfully.",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        monthlyRent: '',
        securityDeposit: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
        parking: '',
        area: '',
        furnished: '',
        location: '',
        address: '',
        availableFrom: '',
        leaseDuration: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        amenities: []
      });
      setSelectedFiles([]);
      
    } catch (error: any) {
      console.error('Error listing rental property:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to list rental property. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show login prompt if user is not authenticated
  if (!user) {
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
                <a href="/rent" className="text-emerald-600 font-medium">Rent</a>
              </nav>
              <AuthButton />
            </div>
          </div>
        </header>

        {/* Login Required Message */}
        <section className="py-20">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Authentication Required</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">You need to be logged in to list your property for rent.</p>
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => window.location.href = '/auth'}
                >
                  Login / Sign Up
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
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
              <a href="/rent" className="text-emerald-600 font-medium">Rent</a>
            </nav>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">List Your Rental Property</h1>
          <p className="text-xl mb-8">Find reliable tenants for your property on Jabalpur's trusted platform</p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <Shield className="h-8 w-8 mx-auto mb-2" />
              <p>Verified Tenants</p>
            </div>
            <div>
              <Users className="h-8 w-8 mx-auto mb-2" />
              <p>Wide Reach</p>
            </div>
            <div>
              <Calendar className="h-8 w-8 mx-auto mb-2" />
              <p>Quick Listing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Listing Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">List Your Rental Property</CardTitle>
              <p className="text-gray-600">Fill in the details below to list your property for rent</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Property Title *</label>
                      <Input
                        placeholder="e.g., Furnished 2BHK Apartment"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Property Type *</label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      placeholder="Describe your rental property in detail..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>
                </div>

                {/* Rental Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Rental Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Monthly Rent (₹) *</label>
                      <Input
                        placeholder="18,000"
                        value={formData.monthlyRent}
                        onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Security Deposit (₹)</label>
                      <Input
                        placeholder="36,000"
                        value={formData.securityDeposit}
                        onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Available From</label>
                      <Input
                        type="date"
                        value={formData.availableFrom}
                        onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Lease Duration</label>
                      <Select value={formData.leaseDuration} onValueChange={(value) => handleInputChange('leaseDuration', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="11months">11 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="2years">2 Years</SelectItem>
                          <SelectItem value="3years">3 Years</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Bedrooms</label>
                      <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 BHK</SelectItem>
                          <SelectItem value="2">2 BHK</SelectItem>
                          <SelectItem value="3">3 BHK</SelectItem>
                          <SelectItem value="4">4 BHK</SelectItem>
                          <SelectItem value="5">5+ BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bathrooms</label>
                      <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange('bathrooms', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Parking</label>
                      <Select value={formData.parking} onValueChange={(value) => handleInputChange('parking', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No Parking</SelectItem>
                          <SelectItem value="1">1 Car</SelectItem>
                          <SelectItem value="2">2 Cars</SelectItem>
                          <SelectItem value="3">3+ Cars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Area (sq ft)</label>
                      <Input
                        placeholder="1200"
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Furnishing Status</label>
                    <Select value={formData.furnished} onValueChange={(value) => handleInputChange('furnished', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select furnishing status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fully">Fully Furnished</SelectItem>
                        <SelectItem value="semi">Semi Furnished</SelectItem>
                        <SelectItem value="unfurnished">Unfurnished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenitiesList.map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Area/Locality</label>
                      <Input
                        placeholder="e.g., Napier Town"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Address</label>
                      <Input
                        placeholder="Complete address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Name</label>
                      <Input
                        placeholder="Your name"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input
                        placeholder="+91 9876543210"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        placeholder="your.email@example.com"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Property Photos</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload property photos</p>
                    <p className="text-sm text-gray-500 mb-4">Drag and drop or click to select files</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                  
                  {selectedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Selected Files:</h4>
                      <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Listing Property...' : 'List My Rental Property'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default RentListProperty;
