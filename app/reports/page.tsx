"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ThreatSummary {
  severity: string;
  count: number;
  change: number;
  description: string;
}

export default function ReportsPage() {
  const [summaries] = useState<ThreatSummary[]>([
    {
      severity: "critical",
      count: 3,
      change: 1,
      description: "發現 3 個關鍵級別威脅，比上週增加 1 個"
    },
    {
      severity: "high",
      count: 12,
      change: -2,
      description: "發現 12 個高風險威脅，比上週減少 2 個"
    },
    {
      severity: "medium",
      count: 27,
      change: 5,
      description: "發現 27 個中風險威脅，比上週增加 5 個"
    },
    {
      severity: "low",
      count: 54,
      change: -8,
      description: "發現 54 個低風險威脅，比上週減少 8 個"
    }
  ]);

  const reports = [
    {
      title: "日報告",
      description: "包含過去 24 小時內檢測到的所有威脅和安全事件的詳細資訊。",
      files: [
        { name: "安全日報-2023-12-01", format: "PDF" },
        { name: "安全日報-2023-11-30", format: "PDF" },
        { name: "安全日報-2023-11-29", format: "PDF" }
      ]
    },
    {
      title: "週報告",
      description: "提供過去 7 天的安全趨勢分析、威脅統計和重要事件摘要。",
      files: [
        { name: "安全週報-2023-W48", format: "PDF" },
        { name: "安全週報-2023-W47", format: "PDF" },
        { name: "安全週報-2023-W46", format: "PDF" }
      ]
    },
    {
      title: "月報告",
      description: "全面分析過去一個月的安全態勢、趨勢變化和長期建議。",
      files: [
        { name: "安全月報-2023-11", format: "PDF" },
        { name: "安全月報-2023-10", format: "PDF" },
        { name: "安全月報-2023-09", format: "PDF" }
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container py-6 md:py-12">
      <h1 className="text-2xl font-bold mb-6">安全報告</h1>
      
      {/* 重大威脅概述 */}
      <div className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">重大威脅概述</CardTitle>
            <CardDescription>最近 7 天內的威脅監測統計</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {summaries.map((summary, index) => (
                <div key={index} className="border rounded-lg p-4 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${getSeverityColor(summary.severity)}`}></div>
                  <div className="pl-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium capitalize">{summary.severity} 威脅</h3>
                      <div className={`flex items-center ${summary.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {summary.change > 0 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1v-5a1 1 0 112 0v2.586l4.293-4.293a1 1 0 011.414 0L16 9.586V7a1 1 0 112 0v5a1 1 0 01-1 1h-5z" clipRule="evenodd" />
                          </svg>
                        )}
                        {Math.abs(summary.change)}
                      </div>
                    </div>
                    <p className="text-3xl font-bold mb-2">{summary.count}</p>
                    <p className="text-sm text-gray-500">{summary.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 報告下載區塊 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.files.map((file, fileIndex) => (
                  <div key={fileIndex} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span>{file.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      下載
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 