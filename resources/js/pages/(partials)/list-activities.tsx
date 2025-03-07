"use client"

import activities from "@/data/activities.json"
import customers from "@/data/customers.json"
import { get } from "@/utils/eloquent"
import { dateFormat } from "@/utils/helpers"
import { Card, Description, Table } from "ui"

export function ListActivities() {
  return (
    <>
      <Card.Header className="max-w-xl p-0">
        <Card.Title level={1}>Recent Activities</Card.Title>
        <Card.Description>
          You can easily view details about each activity and navigate to the relevant pages for
          further information.
        </Card.Description>
      </Card.Header>
      <Table className="border-t" aria-label="List activities">
        <Table.Header>
          <Table.Column isRowHeader>Type</Table.Column>
          <Table.Column>Customer</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Category</Table.Column>
          <Table.Column>Action Taken</Table.Column>
          <Table.Column>Created</Table.Column>
        </Table.Header>
        <Table.Body items={activities}>
          {(item) => (
            <Table.Row>
              <Table.Cell>
                <h4 className="font-medium">{item?.type}</h4>
                <Description>{item?.message}</Description>
              </Table.Cell>
              <Table.Cell>
                {item?.customer_id ? get(customers, item?.customer_id)?.name : "-"}
              </Table.Cell>
              <Table.Cell>{item?.status ?? "-"}</Table.Cell>
              <Table.Cell>{item?.category}</Table.Cell>
              <Table.Cell>{item?.action_taken}</Table.Cell>
              <Table.Cell>{dateFormat(item?.timestamp)}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  )
}
