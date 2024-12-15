import { format } from 'date-fns';
//Date formating
export const formatDate = (date : string) => {
    return format(new Date(date),'hh:mm a | MMMM d, yyyy.');
}