"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Asset {
  id: string;
  name: string;
  type: string;
  ip: string;
  os: string;
  owner: string;
  status: "online" | "offline" | "warning";
  lastScan: string;
}

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [assets] = useState<Asset[]>([
    {
      id: "SRV-001",
      name: "主網站伺服器",
      type: "伺服器",
      ip: "192.168.1.10",
      os: "Ubuntu 22.04 LTS",
      owner: "IT部門",
      status: "online",
      lastScan: "2023-11-15"
    },
    {
      id: "SRV-002",
      name: "資料庫伺服器",
      type: "伺服器",
      ip: "192.168.1.11",
      os: "CentOS 8",
      owner: "IT部門",
      status: "online",
      lastScan: "2023-11-15"
    },
    {
      id: "SRV-003",
      name: "備份伺服器",
      type: "伺服器",
      ip: "192.168.1.12",
      os: "Ubuntu 20.04 LTS",
      owner: "IT部門",
      status: "offline",
      lastScan: "2023-11-10"
    },
    {
      id: "WS-001",
      name: "財務部主管工作站",
      type: "工作站",
      ip: "192.168.2.15",
      os: "Windows 11 Pro",
      owner: "財務部",
      status: "online",
      lastScan: "2023-11-14"
    },
    {
      id: "WS-002",
      name: "行銷部主管工作站",
      type: "工作站",
      ip: "192.168.2.16",
      os: "macOS Monterey",
      owner: "行銷部",
      status: "warning",
      lastScan: "2023-11-13"
    },
    {
      id: "NW-001",
      name: "主要防火牆",
      type: "網路設備",
      ip: "192.168.0.1",
      os: "FortiOS 7.0",
      owner: "網路安全部門",
      status: "online",
      lastScan: "2023-11-15"
    },
    {
      id: "NW-002",
      name: "核心交換器",
      type: "網路設備",
      ip: "192.168.0.2",
      os: "Cisco IOS",
      owner: "網路安全部門",
      status: "online",
      lastScan: "2023-11-15"
    }
  ]);

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.ip.includes(searchTerm)
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800";
      case "offline":
        return "bg-gray-100 text-gray-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "運行中";
      case "offline":
        return "離線";
      case "warning":
        return "警告";
      default:
        return status;
    }
  };

  return (
    <div className="container py-6 md:py-12">
      <Card className="mx-auto w-full">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <CardTitle className="text-2xl">資產清冊</CardTitle>
          <div className="flex w-full sm:w-auto max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="搜尋資產..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              清除
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">資產 ID</TableHead>
                  <TableHead>資產名稱</TableHead>
                  <TableHead>類型</TableHead>
                  <TableHead>IP 位址</TableHead>
                  <TableHead>作業系統</TableHead>
                  <TableHead>管理單位</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">最後掃描</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">{asset.id}</TableCell>
                      <TableCell>{asset.name}</TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell>{asset.ip}</TableCell>
                      <TableCell>{asset.os}</TableCell>
                      <TableCell>{asset.owner}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(asset.status)}`}>
                          {getStatusText(asset.status)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{asset.lastScan}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-24">
                      未找到符合條件的資產
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              共 {filteredAssets.length} 項資產
            </div>
            <Button>
              匯出清單
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 