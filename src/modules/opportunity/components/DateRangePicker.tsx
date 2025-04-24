import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState<'start' | 'end' | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (showCalendar === 'start') {
      setStartDate(selectedDate);
      if (endDate && selectedDate > endDate) {
        setEndDate(null);
      }
      setShowCalendar('end');
    } else if (showCalendar === 'end') {
      if (startDate && selectedDate < startDate) {
        setStartDate(selectedDate);
        setEndDate(null);
      } else {
        setEndDate(selectedDate);
        setShowCalendar(null);
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isSelected =
        (startDate && date.getTime() === startDate.getTime()) ||
        (endDate && date.getTime() === endDate.getTime());
      const isInRange =
        startDate &&
        endDate &&
        date >= startDate &&
        date <= endDate;

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-8 w-8 rounded-full text-sm transition-colors ${
            isSelected
              ? 'bg-[#92E3A9] text-white'
              : isInRange
              ? 'bg-[#92E3A9]/10 text-[#92E3A9]'
              : 'hover:bg-[#92E3A9]/5'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="relative">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <div
            className="flex w-full cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
            onClick={() => setShowCalendar('start')}
          >
            <Calendar className="mr-2 h-4 w-4 text-gray-400" />
            <span className={startDate ? 'text-gray-900' : 'text-gray-400'}>
              {formatDate(startDate) || 'Start Date'}
            </span>
          </div>
        </div>
        <div className="relative flex-1">
          <div
            className="flex w-full cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
            onClick={() => setShowCalendar('end')}
          >
            <Calendar className="mr-2 h-4 w-4 text-gray-400" />
            <span className={endDate ? 'text-gray-900' : 'text-gray-400'}>
              {formatDate(endDate) || 'End Date'}
            </span>
          </div>
        </div>
      </div>

      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="p-1 text-gray-400 hover:text-[#92E3A9]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium">
              {currentMonth.toLocaleDateString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 text-gray-400 hover:text-[#92E3A9]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker; 