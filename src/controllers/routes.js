import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './categories.js';
import { testErrorPage } from './errors.js';
import {showNewOrganizationForm} from './organizations.js';
import { processNewOrganizationForm } from './organizations.js';
import {organizationValidation} from './organizations.js';
import { showEditOrganizationForm } from './organizations.js';
import { processEditOrganizationForm } from './organizations.js';
import { showNewProjectForm } from './projects.js';
import { processNewProjectForm } from './projects.js';
import { projectValidation } from './projects.js';
import {showAssignCategoriesForm } from './categories.js';
import { processAssignCategoriesForm } from './categories.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);

// New route for single category details page
router.get('/category/:id', showCategoryDetailsPage);


router.get('/new-organization', showNewOrganizationForm);



// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);


// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', processNewProjectForm, projectValidation);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
// error-handling routes
router.get('/test-error', testErrorPage);


export default router;