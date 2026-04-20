"use client";

import { useState } from 'react';

// Generates an array of day objects for a given month/year
function getCalendarDays(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
  
  const days = [];
  // Add empty slots for days before the 1st of the month
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  // Add actual days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function CalendarMonth({ year, month, onPrev, onNext, selectedCheckIn, selectedCheckOut, onDateClick }) {
  const days = getCalendarDays(year, month);
  const monthName = MONTH_NAMES[month];

  const today = new Date();
  today.setHours(0,0,0,0);

  const isSelected = (date) => {
    if (!date) return false;
    if (selectedCheckIn && date.getTime() === selectedCheckIn.getTime()) return true;
    if (selectedCheckOut && date.getTime() === selectedCheckOut.getTime()) return true;
    return false;
  };

  const isBetween = (date) => {
    if (!date || !selectedCheckIn || !selectedCheckOut) return false;
    return date > selectedCheckIn && date < selectedCheckOut;
  };

  return (
    <div className="cal-month">
      <div className="cal-header">
        {onPrev ? (
           <button onClick={onPrev} className="cal-nav-btn">&lsaquo;</button>
        ) : <div className="cal-nav-spacer" />}
        <span className="cal-title">{monthName} {year}</span>
        {onNext ? (
           <button onClick={onNext} className="cal-nav-btn">&rsaquo;</button>
        ) : <div className="cal-nav-spacer" />}
      </div>
      <div className="cal-grid">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="cal-day-name">{d}</div>
        ))}
        {days.map((date, i) => {
          if (!date) return <div key={i} className="cal-cell empty" />;
          
          const past = date < today;
          let className = "cal-cell";
          if (past) className += " past";
          if (isSelected(date)) className += " selected";
          if (isBetween(date)) className += " in-range";

          return (
            <div 
              key={i} 
              className={className}
              onClick={() => !past && onDateClick(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingSection({ label, heading, description }) {
  // Calendar state: showing 2 consecutive months
  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date();
    d.setDate(1); // Keep it strictly on the 1st
    return d;
  });

  // Booking form state
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const m1Year = currentDate.getFullYear();
  const m1Month = currentDate.getMonth();

  const tempDate = new Date(m1Year, m1Month + 1, 1);
  const m2Year = tempDate.getFullYear();
  const m2Month = tempDate.getMonth();

  const handlePrev = () => {
    setCurrentDate(new Date(m1Year, m1Month - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(m1Year, m1Month + 1, 1));
  };

  const handleDateClick = (date) => {
    // If nothing selected or both selected, start fresh
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else {
      // Check if checkout is before checkin
      if (date < checkIn) {
        setCheckIn(date); // Override checkin
      } else {
        setCheckOut(date);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return "Add date";
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="booking-section">
      <div className="booking-inner">
        
        {/* Section Header */}
        <div className="bk-header">
          <span className="bk-label">{label || "Planning & Booking"}</span>
          <h2 className="bk-heading">{heading || "Check availability and plan your stay"}</h2>
          <p className="bk-desc">
            {description || "Choose your dates, check availability instantly, and book directly with us for the best experience and rates."}
          </p>
        </div>

        <div className="bk-content">
          
          {/* Left Side: Calendars */}
          <div className="bk-calendars-wrapper">
            <h3 className="bk-calendars-title">Select Your Check-in Dates</h3>
            <p className="bk-calendars-subtitle">Minimum stay: 4 days</p>

            <div className="bk-calendars">
              <CalendarMonth 
                year={m1Year} 
                month={m1Month} 
                onPrev={handlePrev} 
                onNext={null}
                selectedCheckIn={checkIn}
                selectedCheckOut={checkOut}
                onDateClick={handleDateClick}
              />
              <CalendarMonth 
                year={m2Year} 
                month={m2Month} 
                onPrev={null} 
                onNext={handleNext}
                selectedCheckIn={checkIn}
                selectedCheckOut={checkOut}
                onDateClick={handleDateClick}
              />
            </div>
            <button className="bk-clear-btn" onClick={() => { setCheckIn(null); setCheckOut(null); }}>
              Clear Dates
            </button>
          </div>

          {/* Right Side: Booking Card */}
          <div className="bk-card-wrapper">
            <div className="bk-card">
              <h4 className="bk-card-title">Add Dates for Prices</h4>
              
              <div className="bk-card-inputs">
                <div className="bk-date-row">
                  <div className="bk-date-input">
                    <label>Check-in</label>
                    <div>{formatDate(checkIn)}</div>
                  </div>
                  <div className="bk-date-input">
                    <label>Checkout</label>
                    <div className={checkOut ? "" : "placeholder"}>{formatDate(checkOut)}</div>
                  </div>
                </div>
                
                <div className="bk-guest-input">
                  <label>Guests</label>
                  <select defaultValue="1">
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                    <option value="5">5 guests</option>
                    <option value="6">6 guests</option>
                    <option value="7">7 guests</option>
                    <option value="8">8 guests</option>
                  </select>
                </div>
              </div>

              <p className="bk-card-fineprint">
                *Available dates are shown in real time. Peak summer weeks book early.
              </p>

              <button className="bk-submit-btn">Check availability</button>
            </div>
            
            <div className="bk-badge">
              *Summer bookings filling quickly
            </div>
          </div>

        </div>
      </div>
      {/* Decorative grey triangle top right */}
      <div className="bk-triangle" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="118" height="118" viewBox="0 0 118 118" fill="none">
          <path d="M0 0H118V118L57.9433 60.0567L0 0Z" fill="#DEE3DE"/>
        </svg>
      </div>
    </section>
  );
}
