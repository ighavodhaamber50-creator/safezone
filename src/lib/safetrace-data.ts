// Shared mock data for SafeTrace UI prototype.
// Replace with real API calls when the backend is ready.

export type Child = {
  id: string;
  name: string;
  avatarColor: string;
  initials: string;
  deviceId: string;
  battery: number;
  signal: "strong" | "weak" | "lost";
  lastSeen: string;
  location: { lat: number; lng: number; label: string };
  status: "safe" | "alert" | "offline";
  // x/y in percent for the mock map view
  pin: { x: number; y: number };
};

export const children: Child[] = [
  {
    id: "ava",
    name: "Ava Carter",
    avatarColor: "oklch(0.75 0.13 25)",
    initials: "AC",
    deviceId: "ST-9821-AV",
    battery: 78,
    signal: "strong",
    lastSeen: "Just now",
    location: { lat: 40.7411, lng: -73.9897, label: "Lincoln Elementary School" },
    status: "safe",
    pin: { x: 38, y: 42 },
  },
  {
    id: "liam",
    name: "Liam Carter",
    avatarColor: "oklch(0.7 0.13 240)",
    initials: "LC",
    deviceId: "ST-9822-LM",
    battery: 24,
    signal: "weak",
    lastSeen: "2 min ago",
    location: { lat: 40.7488, lng: -73.9857, label: "Riverside Park" },
    status: "alert",
    pin: { x: 62, y: 58 },
  },
  {
    id: "mia",
    name: "Mia Carter",
    avatarColor: "oklch(0.72 0.14 320)",
    initials: "MC",
    deviceId: "ST-9823-MI",
    battery: 91,
    signal: "strong",
    lastSeen: "1 min ago",
    location: { lat: 40.7300, lng: -73.9950, label: "Home" },
    status: "safe",
    pin: { x: 25, y: 70 },
  },
];

export type Alert = {
  id: string;
  childId: string;
  type: "sos" | "geofence_exit" | "geofence_enter" | "low_battery" | "tamper" | "safe_arrival";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export const alerts: Alert[] = [
  { id: "a1", childId: "liam", type: "low_battery", title: "Low battery", message: "Liam's tracker is at 24%. Time to recharge.", time: "5 min ago", read: false },
  { id: "a2", childId: "ava", type: "safe_arrival", title: "Safe arrival", message: "Ava arrived at Lincoln Elementary School.", time: "1 h ago", read: false },
  { id: "a3", childId: "liam", type: "geofence_exit", title: "Left safe zone", message: "Liam left the 'Home' geofence at 3:14 PM.", time: "3 h ago", read: true },
  { id: "a4", childId: "mia", type: "geofence_enter", title: "Entered safe zone", message: "Mia entered 'Home'.", time: "4 h ago", read: true },
  { id: "a5", childId: "ava", type: "tamper", title: "Tamper detected", message: "Device strap on Ava's tracker was opened.", time: "Yesterday", read: true },
  { id: "a6", childId: "liam", type: "sos", title: "SOS triggered", message: "Liam pressed the SOS button near Riverside Park.", time: "Yesterday", read: true },
];

export type Geofence = {
  id: string;
  name: string;
  radius: number;
  address: string;
  color: string;
  active: boolean;
  assigned: string[];
};

export const geofences: Geofence[] = [
  { id: "g1", name: "Home", radius: 150, address: "412 Maple Street", color: "oklch(0.65 0.14 175)", active: true, assigned: ["ava", "liam", "mia"] },
  { id: "g2", name: "Lincoln Elementary", radius: 220, address: "88 School Lane", color: "oklch(0.7 0.13 240)", active: true, assigned: ["ava", "mia"] },
  { id: "g3", name: "Grandma's House", radius: 100, address: "27 Oak Ridge", color: "oklch(0.72 0.14 320)", active: true, assigned: ["ava", "liam", "mia"] },
  { id: "g4", name: "Soccer Practice", radius: 180, address: "Greenfield Park", color: "oklch(0.78 0.16 75)", active: false, assigned: ["liam"] },
];

export type HistoryPoint = { time: string; place: string; duration: string; type: "stop" | "move" };

export const historyByChild: Record<string, HistoryPoint[]> = {
  ava: [
    { time: "07:42 AM", place: "Home", duration: "Departed", type: "move" },
    { time: "08:05 AM", place: "Lincoln Elementary School", duration: "Arrived", type: "stop" },
    { time: "12:15 PM", place: "School Cafeteria", duration: "45 min", type: "stop" },
    { time: "03:10 PM", place: "Lincoln Elementary School", duration: "Departed", type: "move" },
    { time: "03:28 PM", place: "Home", duration: "Arrived", type: "stop" },
  ],
  liam: [
    { time: "08:10 AM", place: "Home", duration: "Departed", type: "move" },
    { time: "08:35 AM", place: "Riverside Park", duration: "1 h 20 min", type: "stop" },
    { time: "10:05 AM", place: "Library", duration: "55 min", type: "stop" },
    { time: "02:45 PM", place: "Soccer Practice", duration: "Arrived", type: "stop" },
  ],
  mia: [
    { time: "09:00 AM", place: "Home", duration: "All morning", type: "stop" },
    { time: "01:15 PM", place: "Grandma's House", duration: "2 h 10 min", type: "stop" },
    { time: "03:45 PM", place: "Home", duration: "Arrived", type: "stop" },
  ],
};

export type FamilyMember = {
  id: string;
  name: string;
  role: "Parent" | "Guardian" | "Caregiver";
  email: string;
  initials: string;
  color: string;
  status: "active" | "invited";
};

export const family: FamilyMember[] = [
  { id: "f1", name: "Sarah Carter", role: "Parent", email: "sarah@safetrace.app", initials: "SC", color: "oklch(0.65 0.14 175)", status: "active" },
  { id: "f2", name: "James Carter", role: "Parent", email: "james@safetrace.app", initials: "JC", color: "oklch(0.7 0.13 240)", status: "active" },
  { id: "f3", name: "Emma Wilson", role: "Guardian", email: "emma.w@gmail.com", initials: "EW", color: "oklch(0.72 0.14 320)", status: "active" },
  { id: "f4", name: "Mr. Davis (Nanny)", role: "Caregiver", email: "davis@nanny.co", initials: "MD", color: "oklch(0.78 0.16 75)", status: "invited" },
];
