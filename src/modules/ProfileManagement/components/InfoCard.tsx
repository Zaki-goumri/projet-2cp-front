import { infoCardProps } from '../types/profile.types';

function InfoCard({ icon, name, isAddeable, onAdd, children }: infoCardProps) {
  return (
    <div className="flex flex-col rounded-xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div>
        <div className="flex items-center justify-between p-3 md:p-4">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img src={icon} alt="icon" className="h-8 w-8 md:h-10 md:w-10" />
            <h1 className="text-lg font-semibold text-gray-900 md:text-xl">
              {name}
            </h1>
          </div>
          {isAddeable && (
            <button
              onClick={onAdd}
              className="rounded-full bg-[#92E3A940] p-2 transition-colors duration-200 hover:bg-[#92E3A960]"
              title="Add new item"
            >
              <img src="/assets/add.svg" alt="add" className="h-5 w-5" />
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
