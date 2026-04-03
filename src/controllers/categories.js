import { body, validationResult } from 'express-validator';
import { 
  getAllCategories, 
  getCategoryById, 
  getProjectsByCategory,
  getCategoriesByProject,
  updateCategoryAssignments,
  createCategory,
  updateCategory,
  deleteCategory
} from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Category name must be between 2 and 100 characters')
];

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProject(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = (req, res) => {
    const title = 'Add New Category';
    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect('/new-category');
    }

    const { name } = req.body;

    try {
        await createCategory(name);
        req.flash('success', 'Category created successfully.');
        res.redirect('/categories');
    } catch (error) {
        console.error('Error creating category:', error);
        req.flash('error', 'There was an error creating the category.');
        res.redirect('/new-category');
    }
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await getCategoryById(categoryId);
        if (!category) {
            req.flash('error', 'Category not found.');
            return res.redirect('/categories');
        }

        const title = 'Edit Category';
        res.render('edit-category', { title, category });
    } catch (error) {
        console.error('Error loading edit category form:', error);
        req.flash('error', 'Unable to load edit category form.');
        res.redirect('/categories');
    }
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => req.flash('error', error.msg));
        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;
    try {
        await updateCategory(categoryId, name);
        req.flash('success', 'Category updated successfully.');
        res.redirect('/categories');
    } catch (error) {
        console.error('Error updating category:', error);
        req.flash('error', 'Error updating category.');
        res.redirect(`/edit-category/${categoryId}`);
    }
};

const processDeleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        await deleteCategory(categoryId);
        req.flash('success', 'Category deleted.');
    } catch (error) {
        console.error('Error deleting category:', error);
        req.flash('error', 'Error deleting category.');
    }
    res.redirect('/categories');
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, processDeleteCategory, categoryValidation };