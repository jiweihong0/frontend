"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Threat {
  id: string;
  threat: string;
  date: string;
  solution: string;
  severity: "low" | "medium" | "high";
}

export default function ThreatDetailPage() {
  const router = useRouter();
  const params = useParams();
  const threatId = params?.id as string;
  
  const [threat, setThreat] = useState<Threat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!threatId) return;
    
    // In a real app, fetch this from an API
    // For now, we'll mock the data
    const mockThreats: Record<string, Threat> = {
      "20462": {
        id: "#20462",
        threat: "System Information Discovery",
        date: "13/01/2022",
        solution: "限制未授權使用系統執行 systeminfo、hostname 等命令",
        severity: "low"
      },
      "18933": {
        id: "#18933",
        threat: "Query Registry",
        date: "22/03/2022",
        solution: "使用 SIEM 系統監控對註冊表的存取行為",
        severity: "low"
      },
      "45169": {
        id: "#45169",
        threat: "Phishing",
        date: "15/04/2022",
        solution: "實施 Email Gateway 過濾機制 (如 SPF/DKIM/DMARC)",
        severity: "medium"
      },
      "34304": {
        id: "#34304",
        threat: "Spearphishing Attachment",
        date: "06/01/2025",
        solution: "限制高風險附件格式 (如 .exe, .vbs, .bat)",
        severity: "medium"
      },
      "17188": {
        id: "#17188",
        threat: "OS Credential Dumping",
        date: "25/02/2025",
        solution: "啟用 LSASS 保護",
        severity: "high"
      },
      "73003": {
        id: "#73003",
        threat: "Remote System Discovery",
        date: "04/10/2022",
        solution: "限制 ICMP (ping) 與 NetBIOS 廣播流量",
        severity: "low"
      },
    };

    if (mockThreats[threatId]) {
      setThreat(mockThreats[threatId]);
    }
    setLoading(false);
  }, [threatId]);

  if (loading) {
    return (
      <div className="container py-6 md:py-12">
        <div className="flex justify-center items-center h-64">
          <p>加載中...</p>
        </div>
      </div>
    );
  }

  if (!threat) {
    return (
      <div className="container py-6 md:py-12">
        <div className="flex flex-col justify-center items-center h-64">
          <p className="text-lg text-gray-600 mb-4">找不到此威脅資訊</p>
          <Button onClick={() => router.back()}>返回</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 md:py-12">
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={() => router.back()}
      >
        ← 返回
      </Button>

      <h1 className="text-2xl font-bold mb-6">{threat.threat} 詳細資訊</h1>

      {/* 三個上方區塊 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">已發現威脅</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{threat.threat}</p>
            <p className="text-sm text-gray-500 mt-1">追蹤 ID: {threat.id}</p>
            <p className="text-sm text-gray-500">偵測日期: {threat.date}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">威脅等級</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                threat.severity === "low" 
                  ? "bg-green-100 text-green-800" 
                  : threat.severity === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}>
                {threat.severity === "low" ? "低風險" : 
                 threat.severity === "medium" ? "中風險" : "高風險"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              {threat.severity === "low" 
                ? "此威脅較不緊急，但仍應注意。" 
                : threat.severity === "medium"
                  ? "此威脅需優先處理，以避免潛在損害。"
                  : "此威脅極為嚴重，請立即採取行動。"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">對應防護</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{threat.solution}</p>
          </CardContent>
        </Card>
      </div>

      {/* 資安建議區塊 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>資安建議</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">威脅描述</h3>
              <p className="text-gray-700">
                {threat.threat === "System Information Discovery" && (
                  "攻擊者正嘗試收集系統資訊，包括作業系統版本、網路配置和已安裝的應用程式等。這些資訊可能被用於發現漏洞和規劃後續攻擊。"
                )}
                {threat.threat === "Query Registry" && (
                  "攻擊者正在查詢系統註冊表，以尋找敏感資訊、已安裝的軟體，或是可能的弱點。註冊表常包含系統配置和密碼等資訊。"
                )}
                {threat.threat === "Phishing" && (
                  "攻擊者透過詐騙郵件、訊息或網站，試圖誘使使用者提供敏感資訊或安裝惡意軟體。這種攻擊通常利用社交工程手法。"
                )}
                {threat.threat === "Spearphishing Attachment" && (
                  "攻擊者發送針對特定個人或組織的釣魚郵件，其中包含惡意附件。這種攻擊比一般釣魚更具針對性和欺騙性。"
                )}
                {threat.threat === "OS Credential Dumping" && (
                  "攻擊者嘗試從作業系統中提取憑證和密碼資訊，通常透過存取記憶體、特定檔案或安全機制。這可能導致帳戶被盜用。"
                )}
                {threat.threat === "Remote System Discovery" && (
                  "攻擊者嘗試發現網路中的其他系統和裝置，用以擴大攻擊範圍或尋找其他目標。這通常是橫向移動的前兆。"
                )}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">緩解措施</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>{threat.solution}</li>
                {threat.severity === "high" && (
                  <>
                    <li>立即隔離受影響的系統</li>
                    <li>執行完整的系統掃描</li>
                    <li>檢查是否有未授權的帳戶活動</li>
                  </>
                )}
                {threat.severity === "medium" && (
                  <>
                    <li>更新防毒軟體並進行掃描</li>
                    <li>檢查可疑的系統活動</li>
                  </>
                )}
                <li>檢視相關日誌以識別可能的入侵跡象</li>
                <li>強化使用者認證機制</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">長期建議</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>定期更新所有系統和應用程式</li>
                <li>實施最小權限原則</li>
                <li>定期備份重要資料</li>
                <li>建立安全意識培訓計畫</li>
                <li>實施多因素驗證</li>
                <li>定期執行安全評估和滲透測試</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 