import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT 
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.event_date,
            o.name AS organization_name
        FROM public.projects p
        JOIN public.organization o
        ON p.organization_id = o.organization_id
        ORDER BY p.event_date;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          event_date
        FROM projects
        WHERE organization_id = $1
        ORDER BY event_date;
      `;
      
      const query_params = [organizationId];
      const result = await db.query(query, query_params);

      return result.rows;
};



// Get upcoming projects
async function getUpcomingProjects(number_of_projects) {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.event_date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM projects p
    JOIN organization o 
      ON p.organization_id = o.organization_id
    WHERE p.event_date >= CURRENT_DATE
    ORDER BY p.event_date ASC
    LIMIT $1
  `;

  const result = await db.query(query, [number_of_projects]);

  return result.rows; // returns an array of project objects
}

async function getProjectDetails(id) {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.event_date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM projects p
    JOIN organization o 
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0]; // return a single project object
}



// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };