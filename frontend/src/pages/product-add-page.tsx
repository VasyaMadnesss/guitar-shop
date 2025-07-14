import { CreateEditProductPage } from './product-add-edit-page.js';

export function AddProductPage() {
  return (
    <div className="wrapper">
      <main className="page-content">
        <CreateEditProductPage mode="create" />
      </main>
    </div>
  );
}
