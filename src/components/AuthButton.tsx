
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AccountDropdown from '@/components/AccountDropdown';

const AuthButton = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (user) {
    return <AccountDropdown />;
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
