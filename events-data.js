/*
  EVENTS DATA — IITB Physics Fresher Guide

  Add a new event by copying one object inside window.EVENTS_DATA.

  Required:
  id, title, category, date, start, end

  Date format: YYYY-MM-DD
  Time format: HH:MM using 24-hour IST time

  Categories supported:
  Meeting, Webinar, Deadline, Orientation, Workshop, Social

  Set draft: false when the event is ready to publish.
*/
window.EVENTS_DATA = [
  {
    "id": "example-department-meeting",
    "title": "Example — Department Welcome Meeting",
    "category": "Meeting",
    "date": "2027-01-12",
    "start": "17:30",
    "end": "18:15",
    "timezone": "Asia/Kolkata",
    "location": "Physics Department Seminar Room",
    "mode": "In person",
    "description": "Replace this demonstration entry with the actual meeting title, timing and details before publishing.",
    "organizer": "Department Coordinator",
    "registrationUrl": "",
    "featured": true,
    "draft": true
  },
  {
    "id": "example-research-webinar",
    "title": "Example — Research Opportunities Webinar",
    "category": "Webinar",
    "date": "2027-01-18",
    "start": "18:00",
    "end": "19:00",
    "timezone": "Asia/Kolkata",
    "location": "Online",
    "mode": "Online",
    "description": "A sample webinar card showing how online events, registration links and reminders will appear.",
    "organizer": "Physics Student Council",
    "registrationUrl": "https://example.com/replace-this-link",
    "featured": false,
    "draft": true
  }
];
