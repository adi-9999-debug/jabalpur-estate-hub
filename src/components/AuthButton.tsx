
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Welcome!</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={signOut}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <Link to="/auth">
      <Button variant="outline" className="flex items-center gap-2">
        <User className="w-4 h-4" />
        Login
      </Button>
    </Link>
  );
};

export default AuthButton;
