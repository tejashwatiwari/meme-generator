import React, { useState, useEffect } from 'react';
import './WorkshopCourses.css';

const WorkshopCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const clientId = 'LbqvwbQAqJV4nnfsF3OqBUySL519txM7gGcYZ61d';
    const clientSecret = 'X6RP9VAVUZzbmWfzsTXyWmNwVm6PgOozBZiqgb9gWY6bW1lJpE2yLtQfvLTerRBoZ2tGo70NVyJCeeY1ZhEMDaQm7jYYRjBqlb0Q4OrHn4aJSkouDVtI0aXl5UaBCUp0';
  
    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`);

    try {
      const response = await fetch(
        'https://www.udemy.com/api-2.0/courses/?search=meme+and+comedy',
        {
          method: 'GET',
          headers: headers
        }
      );
      const data = await response.json();
      setCourses(data.results);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div className="workshop-courses">
      <h1>Workshop Courses 🙇🏼‍♂️</h1>
      <div className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image_480x270} alt={course.title} />
            <div className="course-details">
              <h3>{course.title}</h3>
              <p>{course.headline}</p>
              <a href={course.url} target="_blank" rel="noopener noreferrer">
                View Course
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopCourses;
