import ModalDelete from "@/components/modal-delete"
import { Paginate } from "@/components/paginate-org"
import brands from "@/data/brands.json"
import categories from "@/data/categories.json"
import products from "@/data/products.json"
import { get } from "@/utils/eloquent"
import { formatMoney } from "@/utils/helpers"
import {
  IconDotsHorizontal,
  IconDuplicate,
  IconFilter,
  IconHighlight,
  IconLayoutColumnHalf,
  IconPlus,
  IconTrash,
  IconWindowVisit,
  IconX,
} from "justd-icons"
import { toast } from 'sonner';
import type { Selection } from "react-aria-components"
import { Form } from "react-aria-components"
import {
  Button,
  Description,
  Heading,
  Menu,
  Modal,
  SearchField,
  Separator,
  Table,
  TextField,
  Textarea,
} from "ui"

// Tambahan
import { usePrevious } from 'react-use';
import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import pickBy from 'lodash/pickBy';
import Form_Organizations from "@/pages/(partials)/forms/form-organizations"




interface Organization {
  id: number;
  name: string;
  phone: string;
  city: string;
  region: string;
  deleted_at: string | null;
}

interface ListOrganizationProps {
  organizations: {
    data: Organization[];
    links: {
      label: string;
      url: string | null;
      active: boolean;
    }[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
  };
  filters: {
    search?: string;
    trashed?: string;
  };
}

export default function FilterBar() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());



  const isSelected = Array.from(selectedKeys).length > 0;
  const handleDelete = () => {
    // console.log("Deleted items:", Array.from(selectedKeys));
    toast.success(`Organization created successfully!<p>Test </p>}`);

    setSelectedKeys(new Set());
  };

  function onDelete(id: string) {
    toast.success(`Delete <p>${id}</p>`);
  }


  const { filters } = usePage<{
    filters: { role?: string; search?: string; trashed?: string };
  }>().props;

  const [opened, setOpened] = useState(false);

  const [values, setValues] = useState({
    role: filters.role || '', // role is used only on users page
    search: filters.search || '',
    trashed: filters.trashed || ''
  });

  const prevValues = usePrevious(values);

  function reset() {
    setValues({
      role: '',
      search: '',
      trashed: ''
    });
  }

  useEffect(() => {
    // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
    if (prevValues) {
      const query = Object.keys(pickBy(values)).length ? pickBy(values) : {};

      router.get(route(route().current() as string), query, {
        replace: true,
        preserveState: true
      });
    }
  }, [values]);

  //  function handleChange(
  //    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  //  ) {
  //    const name = e.target.name;
  //    const value = e.target.value;

  //    setValues(values => ({
  //      ...values,
  //      [name]: value
  //    }));

  //    if (opened) setOpened(false);
  //  }

  function handleChange(value: string) {
    setValues((prevValues) => ({
      ...prevValues,
      search: value, // 'value' langsung dari SearchField
    }));

    if (opened) setOpened(false);
  }

  return (
    <div className="flex w-full flex-col justify-end gap-2 sm:flex-row sm:items-center">
      {/* value={value} onChange={setValue} */}
      <SearchField
        name="search"
        placeholder="Search…"
        // autoComplete="off"
        // value={values.search}
        onChange={handleChange}
      />

      <div className="grid grid-cols-3 gap-2">
        <Menu>
          <Button intent="outline">
            <IconFilter />
            Filter
          </Button>
          <Menu.Content placement="bottom end">
            <Menu.Section selectionMode="multiple" title="Categories" items={categories}>
              {(item) => (
                <Menu.Item id={item.slug}>
                  <Menu.Label>{item.title}</Menu.Label>
                </Menu.Item>
              )}
            </Menu.Section>
            <Menu.Section selectionMode="multiple" title="Brands" items={brands}>
              {(item) => (
                <Menu.Item id={item.slug}>
                  <Menu.Label>{item.title}</Menu.Label>
                </Menu.Item>
              )}
            </Menu.Section>
          </Menu.Content>
        </Menu>
        <Menu>
          <Button intent="outline">
            <IconLayoutColumnHalf />
            Column
          </Button>
          <Menu.Content selectionMode="multiple" placement="bottom end">
            <Menu.Item>
              <Menu.Label>Name</Menu.Label>
            </Menu.Item>
            <Menu.Item>
              <Menu.Label>Stock</Menu.Label>
            </Menu.Item>
            <Menu.Item>
              <Menu.Label>Sku</Menu.Label>
            </Menu.Item>
            <Menu.Item>
              <Menu.Label>Category</Menu.Label>
            </Menu.Item>
            <Menu.Item>
              <Menu.Label>Brand</Menu.Label>
            </Menu.Item>
            <Menu.Item>
              <Menu.Label>Price</Menu.Label>
            </Menu.Item>
          </Menu.Content>
        </Menu>
            <Form_Organizations />
       
      </div>
    </div>
  );
}
