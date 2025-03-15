import React from 'react';

export interface infoCardProps {
  icon: string;
  name: string;
  isAddeable: boolean;
  children: string | JSX.Element | JSX.Element[];
}
function InfoCard({ icon, name, isAddeable, children }: infoCardProps) {
  return (
    <div className="m-20 flex flex-col rounded-4xl bg-white p-5 shadow-lg">
      <div>
        <div className="flex justify-between p-4">
          <div className="flex items-center">
            <img src={icon} alt="icon" className="h-12 w-12" />
            <h1 className="ml-2 text-2xl font-bold">{name}</h1>
          </div>
          {isAddeable && (
            <div className="flex items-center">
              <button className="rounded-full bg-[#92E3A940] p-2 text-sm font-semibold">
                <img src="assets/add.svg" alt="edit" className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-2 mb-10 h-[0.5px] w-full bg-[#DEE1E7]"></div>

      {children}
    </div>
  );
}

export default InfoCard;
