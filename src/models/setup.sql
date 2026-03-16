CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization;



-- ========================================
-- Create Categories Table
-- ========================================
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Insert Categories
-- ========================================
INSERT INTO categories (name)
VALUES
('Environmental'),
('Educational'),
('Community Service');




CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);


INSERT INTO projects (organization_id, title, description, location, event_date)
VALUES
(1, 'Park Cleanup', 'Cleaning local parks with volunteers.', 'Abuja', '2026-04-10'),
(1, 'Bridge Repair', 'Repairing community foot bridges.', 'Lagos', '2026-05-05'),
(1, 'School Painting', 'Painting classrooms in rural schools.', 'Ibadan', '2026-05-20'),
(1, 'Community Playground', 'Building a playground for children.', 'Enugu', '2026-06-15'),
(1, 'Public Library Renovation', 'Improving the local library.', 'Kano', '2026-07-01');


INSERT INTO projects (organization_id, title, description, location, event_date)
VALUES
(2, 'Urban Garden Setup', 'Creating community vegetable gardens.', 'Lagos', '2026-04-15'),
(2, 'Farm Training Workshop', 'Teaching sustainable farming.', 'Abuja', '2026-05-10'),
(2, 'School Garden Program', 'Helping schools grow their own food.', 'Enugu', '2026-06-05'),
(2, 'Composting Awareness', 'Teaching composting to communities.', 'Ibadan', '2026-07-12'),
(2, 'Harvest Festival', 'Community harvest celebration.', 'Kaduna', '2026-08-02');



INSERT INTO projects (organization_id, title, description, location, event_date)
VALUES
(3, 'Food Drive', 'Collecting food donations for families.', 'Abuja', '2026-04-20'),
(3, 'Beach Cleanup', 'Volunteers cleaning coastal areas.', 'Lagos', '2026-05-18'),
(3, 'Senior Home Visit', 'Helping elderly people with daily needs.', 'Port Harcourt', '2026-06-22'),
(3, 'Community Tutoring', 'Volunteers tutoring students.', 'Enugu', '2026-07-15'),
(3, 'Park Restoration', 'Improving local parks.', 'Kano', '2026-08-25');


SELECT * FROM projects;

-- ========================================
-- Create Project-Categories Join Table
-- This handles the many-to-many relationship
-- ========================================
CREATE TABLE project_categories (
    project_id INTEGER NOT NULL REFERENCES projects(project_id),
    category_id INTEGER NOT NULL REFERENCES categories(category_id),
    PRIMARY KEY (project_id, category_id)
);



-- ========================================
-- Associate Projects with Categories
-- (Example associations for your 15 projects)
-- ========================================

INSERT INTO project_categories (project_id, category_id) VALUES
(1,1),
(2,2),
(3,1),
(4,3),
(5,3),
(6,1),
(7,1),
(8,2),
(9,2),
(10,3),
(11,1),
(12,3),
(13,3),
(14,2),
(15,1);