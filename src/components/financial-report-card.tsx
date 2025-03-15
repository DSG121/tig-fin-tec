import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Printer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FinancialReportCardProps {
  report: {
    id: string;
    name: string;
    description: string;
    period: string;
    createdAt: string;
  };
  onDownload: (reportId: string) => void;
}

export default function FinancialReportCard({
  report,
  onDownload,
}: FinancialReportCardProps) {
  const { toast } = useToast();

  const handlePrint = () => {
    toast({
      title: "Print Requested",
      description:
        "Print functionality would be implemented in a production environment",
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-orange-50 p-4 flex items-center gap-4">
        <div className="bg-orange-100 p-3 rounded-full">
          <FileText className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h3 className="font-medium">{report.name}</h3>
          <p className="text-sm text-gray-500">{report.period}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 mb-4">{report.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Created: {report.createdAt}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-3 w-3 mr-1" /> Print
            </Button>
            <Button
              size="sm"
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => onDownload(report.id)}
            >
              <Download className="h-3 w-3 mr-1" /> Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
