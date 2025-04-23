import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

interface ChooseUserTypeDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelectType: (type: 'Student' | 'Company') => Promise<void>;
}

export const ChooseUserTypeDialog: React.FC<ChooseUserTypeDialogProps> = ({
  isOpen,
  onOpenChange,
  onSelectType,
}) => {
  const [selectedType, setSelectedType] = useState<
    'Student' | 'Company' | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    { id: 'Student', label: 'Student' },
    { id: 'Company', label: 'Company' },
  ];

  const handleSelect = (type: 'Student' | 'Company') => {
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
      console.error('Failed to update user type:', error);
      toast.error(
        (error as Error)?.message || 'Failed to update account type.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInteractOutside = (event: Event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { }}>
      <DialogContent
        className="!bg-white sm:max-w-md [&>button]:hidden"
        onInteractOutside={handleInteractOutside}
        onEscapeKeyDown={handleInteractOutside}
      >
        <DialogHeader>
          <DialogTitle>Choose Your Account Type</DialogTitle>
          <DialogDescription className="text-gray-500">
            Please select the type that best describes you to personalize your
            experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2">
          {userTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? 'default' : 'outline'}
              onClick={() =>
                handleSelect(type.id as 'Student' | 'Company')
              }
              className={`h-12 rounded-full text-lg ${selectedType === type.id ? '!bg-primary !text-white' : '!text-primary !border-none !bg-gray-100/30'}`}
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
            className="!bg-primary hover:!bg-primary/90 w-full !text-white"
          >
            {isLoading ? 'Saving...' : 'Confirm Account Type'}
          </Button>
          <Link
            to="/auth/signin"
            className="hover:text-primary text-center text-sm text-gray-500 transition-colors"
          >
            Sign in
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
