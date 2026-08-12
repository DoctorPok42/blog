import React, { useEffect, useState } from "react";

interface BreadCrumbProps {
  items: {
    label: string;
    href?: string;
    isCurrent?: boolean;
  }[];
}

const BreadCrumb = ({ items }: BreadCrumbProps) => {
  const [itemsState, setItemsState] = useState(items);

  useEffect(() => {
    setItemsState([{ label: "Home", href: "/" }, ...items]);
  }, [items]);

  return (
    <div className="flex items-center gap-1.5 text-neutral-500 mb-6">
      {itemsState.map((item, index) => (
        <React.Fragment key={index + "-breadcrumb"}>
          {item.href ? (
            <a href={item.href} className="text-accent hover:text-accent-2">
              {item.label}
            </a>
          ) : (
            <span className={`${index === itemsState.length - 1 && "text-text"}`}>{item.label}</span>
          )}
          {index < itemsState.length - 1 && <span>
            <svg data-dc-tpl="218" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path data-dc-tpl="219" d="M9 6l6 6-6 6"></path></svg>
          </span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;
