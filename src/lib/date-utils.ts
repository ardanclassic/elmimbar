import moment from 'moment';
import 'moment/locale/id'; // Import Indonesian locale for Moment
import 'moment-hijri'; // Import moment-hijri

moment.locale('id'); // Set Moment locale to Indonesian

export const getCurrentMasehiDate = (): string => {
  return moment().format('dddd, D MMMM YYYY');
};

export const getCurrentHijriDate = (): string => {
  // Format: DayName, DD MonthName YYYY H
  return moment().format('iD iMMMM iYYYY') + ' H';
};

export const formatAnnouncementDate = (dateString: string): string => {
  return moment(dateString).format('D MMMM YYYY, HH:mm');
};
