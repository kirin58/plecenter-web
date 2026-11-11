import type { ReactNode } from "react";
import Breadcrumbs, { type BreadcrumbItem } from "./Breadcrumbs";

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  eyebrow?: string;
  actions?: ReactNode;
  meta?: ReactNode;
};

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  eyebrow,
  actions,
  meta,
}: PageHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <div className="container-page py-7 sm:py-9">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            {eyebrow && (
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                {eyebrow}
              </p>
            )}
            <h1 className="page-title">{title}</h1>
            {description && <p className="page-description">{description}</p>}
            {meta && <div className="mt-3">{meta}</div>}
          </div>
          {actions && (
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
