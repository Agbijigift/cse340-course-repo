import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, processDeleteCategory, categoryValidation } from './categories.js';
import { testErrorPage } from './errors.js';
import {showNewOrganizationForm} from './organizations.js';
import { processNewOrganizationForm } from './organizations.js';
import {organizationValidation} from './organizations.js';
import { showEditOrganizationForm } from './organizations.js';
import { processEditOrganizationForm } from './organizations.js';
import { showNewProjectForm } from './projects.js';
import { processNewProjectForm } from './projects.js';
import { projectValidation } from './projects.js';
import { 
  showEditProjectForm, 
  processEditProjectForm
} from './projects.js';
import { volunteerForProject, unvolunteerForProject } from './projects.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showUsersPage } from './users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Volunteer routes (protected by requireLogin)
router.post('/project/:id/volunteer', requireLogin, volunteerForProject);
router.post('/project/:id/unvolunteer', requireLogin, unvolunteerForProject);

router.get('/categories', showCategoriesPage);

// New route for single category details page
router.get('/category/:id', showCategoryDetailsPage);

// Category CRUD routes
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
router.post('/delete-category/:id', processDeleteCategory);

router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);


// Show edit form
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

// Process form submission
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);


// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
// error-handling routes

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);

router.get('/users', requireRole('admin'), showUsersPage);

router.get('/test-error', testErrorPage);


export default router;