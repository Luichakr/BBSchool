"use client";

import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_USER } from "@/data/mock";

export default function ManagerUsers() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <Card>
        <CardBody className="!p-0">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Package</th>
                <th className="p-3">Purchases</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">{MOCK_USER.name}</td>
                <td className="p-3">{MOCK_USER.email}</td>
                <td className="p-3"><Badge>{MOCK_USER.packageId}</Badge></td>
                <td className="p-3">{MOCK_USER.successfulPurchases}</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
