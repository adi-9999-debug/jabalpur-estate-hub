
-- Create a table for sale properties
CREATE TABLE public.sale_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  property_type TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area INTEGER,
  location TEXT,
  address TEXT,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  images TEXT[], -- Array to store image URLs
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for rental properties
CREATE TABLE public.rental_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  monthly_rent NUMERIC NOT NULL,
  security_deposit NUMERIC,
  property_type TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  parking INTEGER,
  area INTEGER,
  furnished TEXT,
  location TEXT,
  address TEXT,
  available_from DATE,
  lease_duration TEXT,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  amenities TEXT[], -- Array to store amenities
  images TEXT[], -- Array to store image URLs
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) for sale properties
ALTER TABLE public.sale_properties ENABLE ROW LEVEL SECURITY;

-- Create policies for sale properties
CREATE POLICY "Anyone can view sale properties" 
  ON public.sale_properties 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create their own sale properties" 
  ON public.sale_properties 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sale properties" 
  ON public.sale_properties 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sale properties" 
  ON public.sale_properties 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add Row Level Security (RLS) for rental properties
ALTER TABLE public.rental_properties ENABLE ROW LEVEL SECURITY;

-- Create policies for rental properties
CREATE POLICY "Anyone can view rental properties" 
  ON public.rental_properties 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create their own rental properties" 
  ON public.rental_properties 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rental properties" 
  ON public.rental_properties 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own rental properties" 
  ON public.rental_properties 
  FOR DELETE 
  USING (auth.uid() = user_id);
