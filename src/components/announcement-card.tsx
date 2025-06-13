import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { MasjidAnnouncement } from "@/types";
import { formatAnnouncementDate } from "@/lib/date-utils";
import { CalendarDays } from "lucide-react";

interface AnnouncementCardProps {
  announcement: MasjidAnnouncement;
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  // Truncate content for snippet
  const snippet = announcement.content.length > 150 
    ? announcement.content.substring(0, 150) + "..." 
    : announcement.content;

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">{announcement.title}</CardTitle>
        <CardDescription className="flex items-center text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          {formatAnnouncementDate(announcement.created_at)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90 leading-relaxed">{snippet}</p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
