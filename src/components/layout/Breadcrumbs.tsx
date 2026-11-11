import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="เส้นทางนำทาง" className="breadcrumb">
      <Link href="/" className="flex items-center gap-1">
        <Home className="h-3.5 w-3.5" />
        หน้าแรก
      </Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span className="font-medium text-gray-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
