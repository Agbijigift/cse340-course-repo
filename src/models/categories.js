import db from './db.js';

// Existing function
const getAllCategories = async () => {
  const query = `
    SELECT category_id, name FROM categories ORDER BY name
  `;
  const result = await db.query(query);
  return result.rows;
};

// Retrieve a single category by ID
const getCategoryById = async (id) => {
  const query = `
    SELECT category_id, name
    FROM categories
    WHERE category_id = $1
  `;
  const result = await db.query(query, [id]);
  return result.rows[0]; // single category object
};

const createCategory = async (name) => {
  const query = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING category_id, name
  `;
  const result = await db.query(query, [name]);
  return result.rows[0];
};

const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE categories
    SET name = $2
    WHERE category_id = $1
    RETURNING category_id, name
  `;
  const result = await db.query(query, [categoryId, name]);
  return result.rows[0];
};

const deleteCategory = async (categoryId) => {
  const query = `
    DELETE FROM categories
    WHERE category_id = $1
  `;
  await db.query(query, [categoryId]);
};

// Retrieve all categories for a given service project
const getCategoriesByProject = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM categories c
    JOIN project_categories pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name
  `;
  const result = await db.query(query, [projectId]);
  return result.rows; // array of categories
};

// Retrieve all service projects for a given category
const getProjectsByCategory = async (categoryId) => {
  const query = `
    SELECT p.project_id, p.title, p.description, p.event_date, p.location, p.organization_id, o.name AS organization_name
    FROM projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    JOIN organization o ON p.organization_id = o.organization_id
    WHERE pc.category_id = $1
    ORDER BY p.event_date ASC
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows; // array of projects
};

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesByProject,
  getProjectsByCategory,
  updateCategoryAssignments,
  assignCategoryToProject
};




