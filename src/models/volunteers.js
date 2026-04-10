import db from './db.js'

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteers (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING
        RETURNING user_id, project_id;
    `;

    const query_params = [userId, projectId];
    const result = await db.query(query, query_params);

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Added volunteer:', result.rows[0]);
    }

    return result.rows.length > 0;
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteers
        WHERE user_id = $1 AND project_id = $2
        RETURNING user_id, project_id;
    `;

    const query_params = [userId, projectId];
    const result = await db.query(query, query_params);

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Removed volunteer:', result.rows[0]);
    }

    return result.rows.length > 0;
};

const getUserVolunteeredProjects = async (userId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.event_date,
            o.name AS organization_name
        FROM volunteers v
        JOIN projects p ON v.project_id = p.project_id
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE v.user_id = $1
        ORDER BY p.event_date;
    `;

    const query_params = [userId];
    const result = await db.query(query, query_params);

    return result.rows;
};

const isUserVolunteering = async (userId, projectId) => {
    const query = `
        SELECT 1
        FROM volunteers
        WHERE user_id = $1 AND project_id = $2;
    `;

    const query_params = [userId, projectId];
    const result = await db.query(query, query_params);

    return result.rows.length > 0;
};

export { addVolunteer, removeVolunteer, getUserVolunteeredProjects, isUserVolunteering };