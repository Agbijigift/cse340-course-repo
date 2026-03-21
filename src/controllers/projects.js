import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProject } from '../models/categories.js';

// Constant for number of upcoming projects
const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = 'Upcoming Service Projects';

  res.render('projects', { title, projects });
};

// Updated project details page to include categories
const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;

  const project = await getProjectDetails(projectId);
  const categories = await getCategoriesByProject(projectId);

  res.render('project', {
    title: project.title,
    project,
    categories
  });
};

export { showProjectsPage, showProjectDetailsPage };