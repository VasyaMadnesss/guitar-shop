import { useParams } from 'react-router-dom';
import { CreateEditProductPage } from './product-add-edit-page.js';
import { NotFoundPage } from './not-found-page.js';

export function EditProductPage() {
  const params = useParams();
  return params.id ? (
    <main className="page-content">
      <CreateEditProductPage mode="edit" />
    </main>
  ) : (
    <NotFoundPage />
  );
}
