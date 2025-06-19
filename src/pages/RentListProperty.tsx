import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Home, X } from 'lucide-react';
import AuthButton from '@/components/AuthButton';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const RentListProperty = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
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
    amenities: [] as string[],
    images: [] as string[]
  });

  const amenitiesList = [
    'WiFi', 'AC', 'Gym', 'Swimming Pool', 'Security', 'Parking', 
    'Elevator', 'Garden', 'Balcony', 'Furnished', 'Power Backup'
  ];

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const imageUrls: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          imageUrls.push(event.target.result as string);
          if (imageUrls.length === files.length) {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, ...imageUrls]
            }));
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUploading(true);
    try {
      const { error } = await supabase
        .from('rental_properties')
        .insert([{
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          monthly_rent: parseFloat(formData.monthlyRent),
          security_deposit: formData.securityDeposit ? parseFloat(formData.securityDeposit) : null,
          property_type: formData.propertyType,
          bedrooms: parseInt(formData.bedrooms) || null,
          bathrooms: parseInt(formData.bathrooms) || null,
          parking: parseInt(formData.parking) || null,
          area: parseInt(formData.area) || null,
          furnished: formData.furnished,
          location: formData.location,
          address: formData.address,
          available_from: formData.availableFrom || null,
          lease_duration: formData.leaseDuration,
          contact_name: formData.contactName,
          contact_phone: formData.contactPhone,
          contact_email: formData.contactEmail,
          amenities: formData.amenities,
          images: formData.images
        }]);

      if (error) {
        console.error('Error creating rental property:', error);
        toast({
          title: "Error",
          description: "Failed to list property for rent",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Property listed for rent successfully!"
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
        amenities: [],
        images: []
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to list property for rent",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
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
              <a href="/rent" className="text-blue-600 font-medium">Rent</a>
            </nav>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">List Your Property for Rent</h2>
          <p className="mt-2 text-gray-600">Fill in the details to list your property for rent</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rental Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Spacious 2BHK apartment for rent..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyRent">Monthly Rent (₹) *</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
                    placeholder="25000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                  <Input
                    id="securityDeposit"
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) => setFormData({...formData, securityDeposit: e.target.value})}
                    placeholder="50000"
                  />
                </div>
                <div>
                  <Label htmlFor="availableFrom">Available From</Label>
                  <Input
                    id="availableFrom"
                    type="date"
                    value={formData.availableFrom}
                    onChange={(e) => setFormData({...formData, availableFrom: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your rental property..."
                  rows={3}
                />
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="property_type">Property Type *</Label>
                  <Select name="property_type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
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
                </div>
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                    placeholder="2"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                    placeholder="1"
                  />
                </div>
                <div>
                  <Label htmlFor="parking">Parking</Label>
                  <Input
                    id="parking"
                    type="number"
                    value={formData.parking}
                    onChange={(e) => setFormData({...formData, parking: e.target.value})}
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    placeholder="800"
                  />
                </div>
                <div>
                  <Label htmlFor="furnished">Furnished</Label>
                  <Select value={formData.furnished} onValueChange={(value) => setFormData({...formData, furnished: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fully">Fully Furnished</SelectItem>
                      <SelectItem value="semi">Semi Furnished</SelectItem>
                      <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="leaseDuration">Lease Duration</Label>
                  <Select value={formData.leaseDuration} onValueChange={(value) => setFormData({...formData, leaseDuration: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6 months">6 Months</SelectItem>
                      <SelectItem value="1 year">1 Year</SelectItem>
                      <SelectItem value="2 years">2 Years</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Civil Lines, Jabalpur"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Complete address with landmarks..."
                    rows={2}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                      />
                      <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <Label htmlFor="images">Property Images</Label>
                <div className="mt-2">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="mb-4"
                  />
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Property ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? 'Listing Property...' : 'List Property for Rent'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RentListProperty;
