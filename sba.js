// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
}
// check course availability 
function CourseAvailability(assignmentGroup, courseInfo) {
  if (assignmentGroup.course_id === courseInfo.id) {
      console.log('Course is available.');
      return true;
  } else {
      throw new Error('Error: Course ID does not match. Course is not available.');
      return false;
  }
}

const isCourseAvailable = CourseAvailability(AssignmentGroup, CourseInfo);
if (isCourseAvailable) {
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);
}

//unique learner id array
function unqLearnerIdArray(learnerSubmissions) {
  const getunqLearnerId = [];
  for (let i = 0; i < learnerSubmissions.length; i++) {
      const currentLearnerId = learnerSubmissions[i].learner_id;
      // Check if the current learner ID is not already in the array
      if (!getunqLearnerId.includes(currentLearnerId)) {
          getunqLearnerId.push(currentLearnerId);
      }
  }
  return getunqLearnerId;
}
const uniqueLearnerIds = unqLearnerIdArray(LearnerSubmissions);
console.log(uniqueLearnerIds);


//get assignment details
function assignmentDetails(assignmentGroup, assignmentId){
  for (let i = 0; i < assignmentGroup.assignments.length; i++) {
    if (assignmentGroup.assignments[i].id == assignmentId) {
    return assignmentGroup.assignments[i];
    }
    }
    }

//

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);