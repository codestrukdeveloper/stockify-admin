
export function getDaysAgo(dateString: string): string {
    console.log("dateString",dateString);
    const currentDate = new Date();
    const providedDate = new Date(dateString);
    
    const timeDifference = currentDate.getTime() - providedDate.getTime();

    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
    
    return `${daysAgo} day(s) ago`;
}
