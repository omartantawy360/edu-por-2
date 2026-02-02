import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
  // Mock Data
  // Mock Data
  const generateMockStudents = () => {
    const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Evan", "Fiona", "George", "Hannah", "Ian", "Jack", "Karen", "Leo", "Mona", "Nathan", "Olivia", "Peter", "Quinn", "Rachel", "Steve", "Tony", "Ursula", "Victor", "Wanda", "Xander", "Yara", "Zack", "Liam", "Noah", "Oliver", "Elijah", "James", "William", "Benjamin", "Lucas", "Henry", "Alexander", "Mason", "Michael", "Ethan", "Daniel", "Jacob", "Logan", "Jackson", "Levi", "Sebastian", "Mateo", "Jack", "Owen", "Theodore", "Aiden"];
    const lastNames = ["Johnson", "Smith", "Brown", "Prince", "Wright", "Gallagher", "Miller", "Montana", "Somerhalder", "Daniels", "Page", "Messi", "Lisa", "Drake", "Wilde", "Parker", "Fabray", "Green", "Rogers", "Stark", "Le Guin", "Hugo", "Maximoff", "Cage", "Greyjoy", "Snyder", "Wilson", "Thompson", "Evans", "Walker", "White", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera"];
    
    const schools = ["Lincoln High", "Washington Academy", "Roosevelt Prep", "Jefferson High", "Kennedy International"];
    const projectTitles = [
        "Eco-Friendly Water Purification System", "AI-Driven Crop Disease Detection", "Renewable Energy from Algae", 
        "Blockchain for Supply Chain Transparency", "Smart Traffic Management System", "Biodegradable Plastic from Corn Starch",
        "Autonomous Drone for Search and Rescue", "Mental Health Analysis using NLP", "Vertical Farming Automation",
        "Low-Cost Prosthetic Global Arm", "Solar-Powered Water Desalination", "Machine Learning for Early Wildfire Detection"
    ];
    const mentors = ["Dr. Alan Grant", "Prof. Minerva McGonagall", "Dr. Emmett Brown", "Mr. Miyagi", "Ms. Frizzle"];
    
    const competitionsList = ['Math Olympiad', 'Science Fair', 'Coding Cup', 'Debate Championship', 'ISEF'];
    const statuses = ['Approved', 'Pending', 'Rejected'];
    const results = ['Passed', 'Failed', '-'];
    
    return Array.from({ length: 50 }, (_, i) => {
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
      const fullName = `${firstName} ${lastName}`;
      
      const comp = competitionsList[Math.floor(Math.random() * competitionsList.length)];
      const stat = statuses[Math.floor(Math.random() * statuses.length)];
      let res = '-';
      if (stat === 'Approved') {
        res = results[Math.floor(Math.random() * results.length)];
      }

      // Consistent randomization based on index to ensure "random" data looks stable if regenerated (though here it's on mount)
      const school = schools[i % schools.length];
      const project = projectTitles[i % projectTitles.length];
      const mentor = mentors[i % mentors.length];

      const isTeam = i % 5 === 0; // Every 5th student is a team
      const type = isTeam ? 'Team' : 'Individual';
      const members = isTeam ? [`${firstNames[(i + 1) % firstNames.length]}`, `${firstNames[(i + 2) % firstNames.length]}`].join(', ') : null;

      return {
        id: `ST-${(i + 1).toString().padStart(3, '0')}`,
        name: fullName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${school.replace(/\s+/g, '').toLowerCase()}.edu`,
        grade: (9 + (i % 4)).toString(),
        clazz: ['A', 'B', 'C'][i % 3],
        school: school,
        competition: comp,
        type: type,
        members: members,
        stage: 'Registration',
        status: stat,
        result: res,
        projectTitle: comp === 'Science Fair' || comp === 'ISEF' ? project : null,
        mentor: comp === 'Science Fair' || comp === 'ISEF' ? mentor : null,
        abstract: "This project aims to explore the viability of using advanced algorithms to solve daily problems efficiently.",
        feedback: res === 'Failed' ? "Great effort, but the methodology lacks control variables." : res === 'Passed' ? "Excellent work! The presentation was very persuasive." : null
      };
    });
  };

  const [students, setStudents] = useState(generateMockStudents());
  const [notifications, setNotifications] = useState([
      { id: 1, text: "New registration guidelines for ISEF 2024 available.", type: "info", date: "2024-02-01" },
      { id: 2, text: "System maintenance scheduled for this weekend.", type: "warning", date: "2024-01-28" }
  ]);

  const addNotification = (text, type = "info") => {
      setNotifications(prev => [{ id: Date.now(), text, type, date: new Date().toISOString().split('T')[0] }, ...prev]);
  };

  const [competitions, setCompetitions] = useState([
    { 
        id: 'c1', 
        name: 'Math Olympiad', 
        stages: ['Stage 1', 'Stage 2', 'Final'],
        description: 'Annual mathematics competition for high school students.',
        type: 'Internal',
        startDate: '2023-09-01',
        endDate: '2023-12-15',
        maxParticipants: 100
    },
    { 
        id: 'c2', 
        name: 'Science Fair', 
        stages: ['Submission', 'Final'],
        description: 'Showcase of innovative science projects.',
        type: 'Internal',
        startDate: '2023-10-01',
        endDate: '2024-02-20',
        maxParticipants: 50
    },
    { 
        id: 'c3', 
        name: 'Coding Cup', 
        stages: ['Qualifiers', 'Final'],
        description: 'Competitive programming contest.',
        type: 'Internal',
        startDate: '2023-11-15',
        endDate: '2024-01-30',
        maxParticipants: 200
    },
    { 
        id: 'c4', 
        name: 'Debate Championship', 
        stages: ['Round 1', 'Round 2', 'Final'],
        description: 'Inter-school debate tournament.',
        type: 'Internal',
        startDate: '2024-01-10',
        endDate: '2024-03-15',
        maxParticipants: 32
    },
    { 
        id: 'c5', 
        name: 'ISEF', 
        stages: ['Local Qualifier', 'Regional', 'International Final'], 
        description: 'International Science and Engineering Fair - The world’s largest international pre-college science competition.', 
        type: 'Outer',
        startDate: '2024-05-11',
        endDate: '2024-05-17',
        maxParticipants: 1000
    },
  ]);

  const addCompetition = (data) => {
      const newCompetition = {
          id: Math.random().toString(36).substr(2, 9),
          description: '',
          type: 'Internal',
          startDate: '',
          endDate: '',
          maxParticipants: 0,
          ...data
      };
      setCompetitions(prev => [...prev, newCompetition]);
      addNotification(`New competition added: ${data.name}`, "success");
  };

  const registerStudent = (data) => {
    const newStudent = {
      id: `ST-${(students.length + 1).toString().padStart(3, '0')}`,
      ...data,
      stage: 'Registration',
      status: 'Pending',
      result: '-',
      projectTitle: null,
      school: 'Lincoln High', // Default
      email: `${data.name.split(' ')[0].toLowerCase()}@school.edu`
    };
    setStudents((prev) => [...prev, newStudent]);
    addNotification(`New student registration: ${data.name}`, "info");
    return newStudent;
  };

  const updateStudentStatus = (id, status) => {
    setStudents((prev) => prev.map(s => {
        if (s.id === id) {
             // Mock notification to student (conceptual)
             return { ...s, status };
        }
        return s;
    }));
  };

  const updateStudentStage = (id, stage) => {
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, stage } : s));
  };

  const setStudentResult = (id, result) => {
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, result } : s));
  };

  const setStudentFeedback = (id, feedback) => {
      setStudents((prev) => prev.map(s => s.id === id ? { ...s, feedback } : s));
      addNotification(`Feedback sent to student ${id}`, "success");
  };

  return (
    <AppContext.Provider value={{
      students,
      competitions,
      notifications,
      addCompetition,
      registerStudent,
      updateStudentStatus,
      updateStudentStage,
      setStudentResult,
      addNotification,
      setStudentFeedback
    }}>
      {children}
    </AppContext.Provider>
  );
};
