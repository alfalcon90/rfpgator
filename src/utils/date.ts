const DAY_MS = 86400000;

// Returns the number of days between the current date and the due date.
export function getDueDaysLabel(dueDate: Date): string {
    const days = Math.ceil((dueDate.getTime() - Date.now()) / DAY_MS);
    if (days > 99) return ">99d";
    return `${days}d`;
}
