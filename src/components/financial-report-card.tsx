import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Printer, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface FinancialReportCardProps {
  report: {
    id: string;
    name: string;
    description: string;
    period: string;
    createdAt: string;
    type?: string;
    format?: string;
    includeCharts?: boolean;
    includeNotes?: boolean;
  };
  onDownload: (reportId: string) => void;
  onDelete?: (reportId: string) => void;
}

export default function FinancialReportCard({
  report,
  onDownload,
  onDelete,
}: FinancialReportCardProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePrint = () => {
    toast({
      title: "Print Requested",
      description:
        "Print functionality would be implemented in a production environment",
    });
  };

  const handleDelete = async () => {
    if (onDelete) {
      setIsDeleting(true);
      try {
        await onDelete(report.id);
      } finally {
        setIsDeleting(false);
      }
    }
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
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Report</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{report.name}"? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
