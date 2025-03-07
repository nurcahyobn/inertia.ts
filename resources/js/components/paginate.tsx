"use client"

import { Pagination } from "ui"

const pages = Array.from({ length: 6 }, (_, i) => ({ value: i + 1 }))
export function Paginate() {
  return (
    <Pagination className="-mt-2 items-center justify-center sm:justify-between">
      <span className="hidden text-muted-fg text-sm sm:inline">
        Showing <span className="font-bold">1</span> to <span className="font-bold">10</span> of{" "}
        <span className="font-bold">100</span> results
      </span>
      <Pagination.List>
        <Pagination.Item segment="first" href="#" />
        <Pagination.Item segment="previous" href="#" />
        <Pagination.Section aria-label="Pagination Segment" className="rounded-lg border lg:hidden">
          <Pagination.Item segment="label">1</Pagination.Item>
          <Pagination.Item segment="separator" />
          <Pagination.Item className="text-muted-fg" segment="label">
            10
          </Pagination.Item>
        </Pagination.Section>
        <Pagination.Section
          aria-label="Pagination Segment"
          className="hidden lg:flex"
          items={pages}
        >
          {(item) => (
            <Pagination.Item id={item.value.toString()} isCurrent={item.value === 4} href="#">
              {item.value}
            </Pagination.Item>
          )}
        </Pagination.Section>
        <Pagination.Item segment="next" href="#" />
        <Pagination.Item segment="last" href="#" />
      </Pagination.List>
    </Pagination>
  )
}
