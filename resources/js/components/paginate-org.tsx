"use client"

import { Pagination } from "ui"

type PaginationData = {
   first_page_url: string;
   last_page_url: string;
   current_page: number;
   last_page: number;
   total: number;
   per_page: number;
   from: number;
   to: number;
   next_page_url: string | null;
   prev_page_url: string | null;
   path: string;
   links: { url: string | null; label: string; active: boolean }[];
};

interface PaginationProps {
   data_pages: PaginationData;
}

const pages = Array.from({ length: 6 }, (_, i) => ({ value: i + 1 }))

export function Paginate({ data_pages }: PaginationProps) {
   return (

      <Pagination className="-mt-2 items-center justify-center sm:justify-between">
         {/* <pre className="text-xs">{JSON.stringify(pages, null, 2)}</pre> */}
         <span className="hidden text-muted-fg text-sm sm:inline">
            Showing <span className="font-bold">{data_pages.from}</span> to <span className="font-bold">{data_pages.to}</span> of{" "}
            <span className="font-bold">{data_pages.total}</span> results
         </span>
         <Pagination.List>
            <Pagination.Item segment="first" href={data_pages.first_page_url} />
            <Pagination.Item segment="previous" href="#" />
            <Pagination.Section aria-label="Pagination Segment" className="rounded-lg border lg:hidden">
               <Pagination.Item segment="label">#1</Pagination.Item>
               <Pagination.Item segment="separator" />
               <Pagination.Item className="text-muted-fg" segment="label">
                  #10
               </Pagination.Item>
            </Pagination.Section>
            <Pagination.Section
               aria-label="Pagination Segment"
               className="hidden lg:flex"
               items={data_pages.links}
            >
               {(item) => (
                  <Pagination.Item
                     isDisabled={!item.url}
                     id={item.label}
                     isCurrent={item.active}
                     href={item.url || '#'} >
                     {item.label}
                  </Pagination.Item>
               )}
            </Pagination.Section>
            <Pagination.Item segment="next" href="#" />
            <Pagination.Item segment="last" href={data_pages.first_page_url} />
         </Pagination.List>
      </Pagination>
   )
}
