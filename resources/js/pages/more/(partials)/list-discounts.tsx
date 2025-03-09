"use client"

import discounts from "@/data/discounts.json"
import { dateFormat } from "@/utils/helpers"
import {
  IconDotsHorizontal,
  IconDuplicate,
  IconHighlight,
  IconTrash,
  IconWindowVisit,
} from "justd-icons"
import { toast } from "sonner"
import { Badge, Button, Card, Menu, SearchField, Table } from "ui"
import { CreateDiscount } from "./create-discount"

export function ListDiscounts() {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Card.Header className="max-w-lg p-0">
          <Card.Title level={1}>Discounts</Card.Title>
          <Card.Description>
            Ensure your codes are active and set to expire at the right time for maximum
            effectiveness.
          </Card.Description>
        </Card.Header>
        <div className="flex justify-end gap-x-2">
          <SearchField placeholder="Search..." />
          <CreateDiscount />
        </div>
      </div>
      <Table className="border-t" aria-label="List activities">
        <Table.Header>
          <Table.Column isRowHeader>Code</Table.Column>
          <Table.Column>Description</Table.Column>
          <Table.Column>Started / Expired</Table.Column>
          <Table.Column>Limit</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Created At</Table.Column>
          <Table.Column />
        </Table.Header>
        <Table.Body items={discounts}>
          {(item) => (
            <Table.Row>
              <Table.Cell>
                <div className="flex items-center gap-x-1">
                  <Button
                    aria-label={`Copy ${item.code} to clipboard`}
                    size="sq-2xs"
                    intent="plain"
                    onPress={() => {
                      window.navigator.clipboard.writeText(item.code)
                      toast.success("Code copied to clipboard")
                    }}
                  >
                    <IconDuplicate />
                  </Button>
                  <span className="font-mono">{item.code}</span>
                </div>
              </Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>
                {dateFormat(item.start_date)} - {dateFormat(item.expiry_date)}
              </Table.Cell>
              <Table.Cell>{item.usage_limit}</Table.Cell>
              <Table.Cell>
                <Badge intent={item.status === "active" ? "success" : "danger"}>
                  {item.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>{dateFormat(item.created_at)}</Table.Cell>
              <Table.Cell className="text-right">
                <Menu>
                  <Button
                    size="sq-sm"
                    intent="plain"
                    className="h-6 data-hovered:bg-fg/10 data-pressed:bg-fg/10"
                  >
                    <IconDotsHorizontal />
                  </Button>
                  <Menu.Content className="sm:min-w-44" placement="left top">
                    <Menu.Item href="#">
                      <IconHighlight /> <Menu.Label>Edit</Menu.Label>
                    </Menu.Item>
                    <Menu.Item href="#">
                      <IconWindowVisit /> <Menu.Label>View</Menu.Label>
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item href="#">
                      <IconDuplicate /> <Menu.Label>Duplicate</Menu.Label>
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item href="#" isDanger>
                      <IconTrash /> <Menu.Label>Delete</Menu.Label>
                    </Menu.Item>
                  </Menu.Content>
                </Menu>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  )
}
