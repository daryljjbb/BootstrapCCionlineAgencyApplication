function getDueStatus(dueDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize

  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0); // normalize

  const isToday = due.getTime() === today.getTime();
  const isPast = due.getTime() < today.getTime();

  if (isPast && !isToday) return "Past Due";
  if (isToday) return "Due Today";
  return null;
}

