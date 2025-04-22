import React, { useState } from 'react';
import {
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

interface ChooseUserTypeDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelectType: (type: 'Student' | 'Professional') => Promise<void>; 
}

export const ChooseUserTypeDialog: React.FC<ChooseUserTypeDialogProps> = ({ 
  isOpen,
  onOpenChange,
  onSelectType
}) => {
  const [selectedType, setSelectedType] = useState<'Student' | 'Professional' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    { id: 'Student', label: 'Student' },
    { id: 'Professional', label: 'Company' }
  ];

  const handleSelect = (type: 'Student' | 'Professional') => {
    setSelectedType(type);
  };

  const handleSubmit = async () => {
    if (!selectedType) {
      toast.error('Please select an account type.');
      return;
    }
    setIsLoading(true);
    try {
      await onSelectType(selectedType);
      toast.success('Account type updated successfully!');
      onOpenChange(false); 
    } catch (error) {
      console.error("Failed to update user type:", error);
      toast.error((error as Error)?.message || 'Failed to update account type.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInteractOutside = (event: Event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}} >
      <DialogContent  
        className="sm:max-w-md !bg-white [&>button]:hidden"
        onInteractOutside={handleInteractOutside}
        onEscapeKeyDown={handleInteractOutside}
      >
        <DialogHeader>
          <DialogTitle>Choose Your Account Type</DialogTitle>
          <DialogDescription className="text-gray-500">
            Please select the type that best describes you to personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
          {userTypes.map((type) => (
            <Button 
              key={type.id}
              variant={selectedType === type.id ? 'default' : 'outline'}
              onClick={() => handleSelect(type.id as 'Student' | 'Professional')}
              className={`h-12 rounded-full text-lg   ${selectedType === type.id ? '!bg-primary !text-white' : '!bg-gray-100/30 !text-primary !border-none'}`}
            >
              {type.label}
            </Button>
          ))}
        </div>
        <DialogFooter className="flex !flex-col gap-2">
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={!selectedType || isLoading}
            className="w-full !bg-primary hover:!bg-primary/90 !text-white"
          >
            {isLoading ? 'Saving...' : 'Confirm Account Type'}
          </Button>
          <Link 
            to="/auth/signin" 
            className="text-center text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Sign in
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};