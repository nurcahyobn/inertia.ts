"use client"

import affiliates from "@/data/affiliates.json"
import customers from "@/data/customers.json"
import { get } from "@/utils/eloquent"
import { dateFormat } from "@/utils/helpers"
import {
  IconDotsHorizontal,
  IconDuplicate,
  IconHighlight,
  IconTrash,
  IconWindowVisit,
} from "justd-icons"
import { Button, Card, Menu, SearchField, Table } from "ui"
import { CreateAffiliate } from "./create-affiliate"

export function ListAffiliates() {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Card.Header className="max-w-xl p-0">
          <Card.Title level={1}>Affiliates</Card.Title>
          <Card.Description>
            Manage your affiliate partners and track their performance on the platform. This page
            allows you to view all affiliates, their referral activity, earnings, and payout
            details.
          </Card.Description>
        </Card.Header>
        <div className="flex justify-end gap-x-2">
          <SearchField placeholder="Search..." />
          <CreateAffiliate />
        </div>
      </div>
      <Table className="border-t" aria-label="List affiliates">
        <Table.Header>
          <Table.Column isRowHeader>Customer</Table.Column>
          <Table.Column>Referral Link</Table.Column>
          <Table.Column>Sales / Commission</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Payout Method</Table.Column>
          <Table.Column>Payout Status</Table.Column>
          <Table.Column>Date Joined</Table.Column>
          <Table.Column />
        </Table.Header>
        <Table.Body items={affiliates}>
          {(item) => (
            <Table.Row>
              <Table.Cell>
                {item?.customer_id ? get(customers, item?.customer_id)?.name : "-"}
              </Table.Cell>
              <Table.Cell>{item.referral_link}</Table.Cell>
              <Table.Cell>
                {item.total_sales} / {item.total_commission}
              </Table.Cell>
              <Table.Cell>{item.status}</Table.Cell>
              <Table.Cell>{item.payout_method}</Table.Cell>
              <Table.Cell>{item.payout_status}</Table.Cell>
              <Table.Cell>{dateFormat(item.date_joined)}</Table.Cell>
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
