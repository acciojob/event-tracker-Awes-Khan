import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PopupForm from "./PopupForm";
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    
    let allEvents = [
        {
            title: "Meeting with Team",
            location: "online",
            start: new Date(2025, 1, 5, 10, 0),
            end: new Date(2025, 1, 5, 11, 30),
        },
        {
            title: "Project Deadline",
            location: "online",
            start: new Date(2025, 1, 1),
            end: new Date(2025, 1, 1),
        },
    ];
    const [events, setEvents] = useState(allEvents);
    let [filter, setFilter] = useState("All");
    const [selectedDate, setSelectedDate] = useState(null); // Track clicked date
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup visibility
    const [isEditConfirmation, setIsEditConfirmation] = useState(false); // Popup visibility
    const [editData, setEditData] = useState(null);


  useEffect(() => {
    const now = moment();
    const filteredEvents = allEvents.filter((event) => {
      if (filter === "Past") return moment(event.start).isBefore(now);
      if (filter === "Upcoming") return moment(event.start).isAfter(now);
      return true; // Show all events
    });

    setEvents(filteredEvents);
  }, [filter]);

    const handleSelectSlot = ({ start }) => {
        setSelectedDate(start);
        setIsPopupOpen(true);
        const existingEvent = allEvents.filter(event => moment(event.start).format("YYYY-MM-DD") === moment(start).format("YYYY-MM-DD")); 
        if (existingEvent.length) {
            setIsEditConfirmation(true);
            setEditData(existingEvent[0]);
        }
    }

    const handleFormSubmit = (data) => {
        const newEvent = {
        title: data.title,
        location: data.location,
        start: selectedDate,
        end: selectedDate,
        };
        allEvents.push(newEvent);
        setEvents(allEvents); // Update events
        setIsPopupOpen(false); // Close popup
        setIsEditConfirmation(false); // closing popip even if it is for editing
    };
    const handleDeleteEvent = (event) => {
        allEvents = allEvents.filter(event => moment(event.start).format("YYYY-MM-DD") !== moment(selectedDate).format("YYYY-MM-DD")); 
        setEvents(allEvents);
        console.log("Event Deleted");
        console.log(allEvents);
        setIsPopupOpen(false); // Close popup
        setIsEditConfirmation(false);
        setEditData(null);
    }
    const handleEditEvent = (data) => { 
        allEvents = allEvents.map(event =>
            moment(event.start).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD")
            ? { ...event, title: data.title || event.title, location: data.location || event.location }
            : event
        );
        setEvents(allEvents);
        setIsPopupOpen(false);
        setIsEditConfirmation(false);
        setEditData(null);
    }

    const CustomToolbar = (props) => {
    const { label, onNavigate } = props;
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
        {/* Navigation Buttons */}
        <div>
            <button onClick={() => onNavigate("PREV")} className="px-3 mx-2 py-2 text-white bg-blue-700 rounded-l">
            ⬅ Prev
            </button>
            <button onClick={() => onNavigate("NEXT")} className="px-3 mx-2 py-2 text-white bg-blue-700 rounded-r">
            Next ➡
            </button>
        </div>

        {/* Current Date */}
        <span className="text-lg font-bold">{label}</span>

        {/* Custom Filter Buttons */}
        <div className="flex gap-2">
            <button
            onClick={() => props.setFilter("All")}
            className={`px-4 py-2 rounded text-white bg-blue-700`}
            >
            All
            </button>
            <button
            onClick={() => props.setFilter("Past")}
            className={`px-4 py-2 rounded bg-red-400 text-white`}
            >
            Past
            </button>
            <button
            onClick={() => props.setFilter("Upcoming")}
            className={`px-4 py-2 rounded bg-green-400 text-white`}
            >
            Upcoming
            </button>
        </div>
        </div>
    );
    };

    const eventPropGetter = (event) => {
        const eventDate = moment(event.start);
        const today = moment().startOf("day");

        if (eventDate.isBefore(today)) {
        return { style: { backgroundColor: "#EF5350", color: "white" } }; // Past events in Maroon
        } else {
        return { style: { backgroundColor:"#66BB6A",color: "white" } }; // Future events in Blue
        }
    };

  return (
    <div className="h-screen p-4">
    {/* <h2 className="text-2xl font-bold mb-4">My Calendar</h2> */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable      
        onSelectSlot={handleSelectSlot}
        style={{ height: 500 }}
        eventPropGetter={eventPropGetter}      
        components={{
            toolbar: (props) => <CustomToolbar {...props} filter={filter} setFilter={setFilter} events={events} setEvents={setEvents} />,
        }}
        />
          <PopupForm
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              onSubmit={handleFormSubmit}
              isEditConfirmation={isEditConfirmation}
              editData={editData}
              onDelete={handleDeleteEvent}
              onEdit = {handleEditEvent}
          />

    </div>
  );
}

export default MyCalendar;
