import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API call
  const handleApply = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success toast
      toast.success("Your application has been successfully submitted!");
    } catch (error) {
      // Error toast
      toast.error("There was an error submitting your application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="mt-6 h-fit space-y-6 !border-none !bg-white p-6 !text-black shadow"
      id="apply"
    >
      <h3 className="text-xl font-semibold">Contact the Organisers</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground text-base">
            Interested in this opportunity? Click the button below to apply directly.
          </p>
          <div className="flex flex-col items-center justify-center py-8 sm:flex-row sm:justify-start sm:py-4">
            <Button
              onClick={handleApply}
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 flex w-full items-center gap-3 rounded-md px-6 py-3 text-white sm:w-auto"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Applying...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Apply Now
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Contact;
