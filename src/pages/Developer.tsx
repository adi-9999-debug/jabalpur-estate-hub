
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Phone, Mail, Instagram, Linkedin, Code, Database, Globe, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthButton from '@/components/AuthButton';

const Developer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">The Silver Estates</h1>
                <p className="text-xs text-gray-600">Jabalpur Real Estate</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link to="/buy" className="text-gray-500 hover:text-gray-900">Buy</Link>
              <Link to="/sell" className="text-gray-500 hover:text-gray-900">Sell</Link>
              <Link to="/rent" className="text-gray-500 hover:text-gray-900">Rent</Link>
              <Link to="/developer" className="text-blue-600 font-medium">Developer</Link>
            </nav>
            
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Meet the <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Team</span>
            </h1>
            <p className="text-lg text-gray-600">The creative minds behind The Silver Estates platform</p>
          </div>

          {/* Owner Profile Card */}
          <Card className="mb-12 overflow-hidden shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-blue-600">Owner Details</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Owner Image */}
                <div className="relative">
                  <img 
                    src="/lovable-uploads/4af28cad-b87b-4d5c-b3c6-4a97c56a117a.png" 
                    alt="Pranjal Thakur - Owner"
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Owner Info */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Pranjal Thakur</h2>
                  <p className="text-lg text-blue-600 mb-6">Business Owner</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <a href="tel:7509999470" className="text-gray-700 hover:text-blue-600 transition-colors">
                        +91 7509999470
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <a href="mailto:pranjal7509999470@gmail.com" className="text-gray-700 hover:text-blue-600 transition-colors">
                        pranjal7509999470@gmail.com
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Instagram className="w-5 h-5 text-gray-600" />
                      <a href="https://instagram.com/pranjal_th999" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                        @pranjal_th999
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                      onClick={() => window.location.href = 'tel:7509999470'}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="https://instagram.com/pranjal_th999" target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-4 h-4 mr-2" />
                        Follow
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Developer Profile Card */}
          <Card className="mb-12 overflow-hidden shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-emerald-600">Developer Details</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Developer Image */}
                <div className="relative">
                  <img 
                    src="/lovable-uploads/6956fb27-052c-4629-bcea-8061dd175aa3.png" 
                    alt="Aditya Tiwari - Developer"
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Developer Info */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Aditya Tiwari</h2>
                  <p className="text-lg text-emerald-600 mb-6">Full Stack Developer & AI/ML Engineer</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <a href="tel:6262069047" className="text-gray-700 hover:text-emerald-600 transition-colors">
                        +91 6262069047
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <a href="mailto:adityatiwari.aiml@gmail.com" className="text-gray-700 hover:text-emerald-600 transition-colors">
                        adityatiwari.aiml@gmail.com
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Instagram className="w-5 h-5 text-gray-600" />
                      <a href="https://instagram.com/stopitadityahhh" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-emerald-600 transition-colors">
                        @stopitadityahhh
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-gray-600" />
                      <a href="https://www.linkedin.com/in/aditya-tiwari-aiml/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-emerald-600 transition-colors">
                        linkedin.com/in/aditya-tiwari-aiml
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                      onClick={() => window.location.href = 'tel:6262069047'}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="https://www.linkedin.com/in/aditya-tiwari-aiml/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        Connect
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend Technologies */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-blue-600" />
                  Frontend Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">React 18</h4>
                      <p className="text-sm text-gray-600">Modern UI library with hooks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-semibold">TypeScript</h4>
                      <p className="text-sm text-gray-600">Type-safe JavaScript</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="w-5 h-5 text-cyan-600" />
                    <div>
                      <h4 className="font-semibold">Tailwind CSS</h4>
                      <p className="text-sm text-gray-600">Utility-first CSS framework</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="w-5 h-5 text-gray-600" />
                    <div>
                      <h4 className="font-semibold">Shadcn/UI</h4>
                      <p className="text-sm text-gray-600">Beautiful component library</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="w-5 h-5 text-orange-600" />
                    <div>
                      <h4 className="font-semibold">Vite</h4>
                      <p className="text-sm text-gray-600">Fast build tool</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="w-5 h-5 text-red-600" />
                    <div>
                      <h4 className="font-semibold">React Router</h4>
                      <p className="text-sm text-gray-600">Client-side routing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backend Technologies */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-emerald-600" />
                  Backend Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Database className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="font-semibold">Supabase</h4>
                      <p className="text-sm text-gray-600">Backend as a service platform</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Database className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">PostgreSQL</h4>
                      <p className="text-sm text-gray-600">Powerful relational database</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Supabase Auth</h4>
                      <p className="text-sm text-gray-600">User authentication system</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Database className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-semibold">Real-time Database</h4>
                      <p className="text-sm text-gray-600">Live data synchronization</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="w-5 h-5 text-orange-600" />
                    <div>
                      <h4 className="font-semibold">TanStack Query</h4>
                      <p className="text-sm text-gray-600">Data fetching & caching</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Smartphone className="w-5 h-5 text-pink-600" />
                    <div>
                      <h4 className="font-semibold">Progressive Web App</h4>
                      <p className="text-sm text-gray-600">Mobile-responsive design</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* About the Project */}
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle>About The Silver Estates Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Silver Estates is a modern real estate platform designed specifically for Jabalpur's property market. 
                Built with cutting-edge technologies, it provides a seamless experience for buying, selling, and renting properties.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The platform features a responsive design, real-time property listings, user authentication, 
                and an intuitive interface that works perfectly on both desktop and mobile devices. 
                Every aspect has been carefully crafted to deliver the best user experience in real estate browsing.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Developer;
