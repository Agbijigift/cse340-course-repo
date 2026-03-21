import { getAllCategories, getCategoryById, getProjectsByCategory } from '../models/categories.js';

// Existing main categories page (no changes needed)
const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Service Categories';

  res.render('categories', { title, categories });
};

// New controller for single category details page
const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;

  const category = await getCategoryById(categoryId);
  const projects = await getProjectsByCategory(categoryId);

  res.render('category', {
    title: category.name,
    category,
    projects
  });
};

export { showCategoriesPage, showCategoryDetailsPage };