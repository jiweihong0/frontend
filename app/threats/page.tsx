"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface Threat {
  id: string;
  threat: string;
  date: string;
  solution: string;
  severity: "low" | "medium" | "high";
}

export default function ThreatsPage() {
  const router = useRouter();
  const [threats] = useState<Threat[]>([
    {
      id: "#20462",
      threat: "System Information Discovery",
      date: "13/01/2022",
      solution: "限制未授權使用系統執行 systeminfo、hostname 等命令",
      severity: "low"
    },
    {
      id: "#18933",
      threat: "Query Registry",
      date: "22/03/2022",
      solution: "使用 SIEM 系統監控對註冊表的存取行為",
      severity: "low"
    },
    {
      id: "#45169",
      threat: "Phishing",
      date: "15/04/2022",
      solution: "實施 Email Gateway 過濾機制 (如 SPF/DKIM/DMARC)",
      severity: "medium"
    },
    {
      id: "#34304",
      threat: "Spearphishing Attachment",
      date: "06/01/2025",
      solution: "限制高風險附件格式 (如 .exe, .vbs, .bat)",
      severity: "medium"
    },
    {
      id: "#17188",
      threat: "OS Credential Dumping",
      date: "25/02/2025",
      solution: "啟用 LSASS 保護",
      severity: "high"
    },
    {
      id: "#73003",
      threat: "Remote System Discovery",
      date: "04/10/2022",
      solution: "限制 ICMP (ping) 與 NetBIOS 廣播流量",
      severity: "low"
    },
  ]);

  const handleThreatClick = (threatId: string) => {
    router.push(`/threats/${threatId.replace('#', '')}`);
  };

  return (
    <div className="container py-6 md:py-12">
      <Card className="mx-auto w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-2xl">威脅偵測</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>追蹤 ID</TableHead>
                <TableHead>威脅</TableHead>
                <TableHead>日期</TableHead>
                <TableHead>解決方案</TableHead>
                <TableHead>嚴重性</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {threats.map((threat) => (
                <TableRow 
                  key={threat.id} 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleThreatClick(threat.id)}
                >
                  <TableCell>{threat.id}</TableCell>
                  <TableCell>{threat.threat}</TableCell>
                  <TableCell>{threat.date}</TableCell>
                  <TableCell>{threat.solution}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      threat.severity === "low" 
                        ? "bg-green-100 text-green-800" 
                        : threat.severity === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}>
                      {threat.severity === "low" ? "低" : 
                       threat.severity === "medium" ? "中" : "高"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 