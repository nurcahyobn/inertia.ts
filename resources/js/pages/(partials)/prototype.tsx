
// export const Table = ({ columns, rows }: any) => { return <div>Table Component</div> };
export const { Button, Modal, Heading, Table, Pagination, Link, FilterBar }: any = null;
const isSelected = true;
<>
   {/* Template Table List */}
   <Heading>Products</Heading>
   <div className="flex items-center justify-between mb-6">
      {isSelected
         ? (
            <>
               <Modal>
                  <Button intent="danger">Delete</Button>
                  <Modal.Content></Modal.Content>
               </Modal>
            </>
         )
         : (
            <>
               <FilterBar />
               <Link>Create</Link>
            </>
         )};
   </div>
   <Table columns={0} rows={1} />
   <Pagination links={0} />

</>