import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PrayerTime } from "@/types";
import { Clock } from "lucide-react";

interface PrayerTimesTableProps {
  prayerTimes: PrayerTime[];
  masehiDate: string;
  hijriDate: string;
}

const PrayerTimesTable = ({ prayerTimes, masehiDate, hijriDate }: PrayerTimesTableProps) => {
  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl md:text-3xl text-primary">Jadwal Sholat Hari Ini</CardTitle>
        <p className="text-muted-foreground">{masehiDate}</p>
        <p className="text-muted-foreground">{hijriDate}</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] font-semibold text-foreground">Sholat</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Waktu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prayerTimes.map((prayer) => (
              <TableRow key={prayer.name}>
                <TableCell className="font-medium text-foreground/90 flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-primary" />
                  {prayer.name}
                </TableCell>
                <TableCell className="text-right text-foreground/90">{prayer.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PrayerTimesTable;
