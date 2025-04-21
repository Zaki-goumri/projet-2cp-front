import React from 'react';
import { Plus } from 'lucide-react';

export interface InfoCardProps {
  icon: string;
  name: string;
  isAddeable: boolean;
  onAdd?: () => void;
  children: React.ReactNode;
}

function InfoCard({ icon, name, isAddeable, onAdd, children }: InfoCardProps) {
  return (
    <div className="flex flex-col rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div>
        <div className="flex justify-between items-center p-3 md:p-4">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img src={icon} alt="icon" className="h-8 w-8 md:h-10 md:w-10" />
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">{name}</h1>
          </div>
          {isAddeable && onAdd && (
            <button 
              onClick={onAdd}
              className="p-2 rounded-full bg-[#92E3A940] hover:bg-[#92E3A960] transition-colors duration-200"
              title={`Add new ${name.toLowerCase()}`}
            >
              <Plus className="h-5 w-5 text-[#2E7B32]" />
            </button>
          )}
        </div>
      </div>

      <div className="mx-3 h-[0.5px] bg-gray-200"></div>

      {children}
    </div>
  );
}

export default InfoCard; 