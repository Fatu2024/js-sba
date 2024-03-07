// The provided course information.
const CourseInfo = {
  id: 450,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 450,
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

// check course availability
function CourseAvailability(assignmentGroup, courseInfo) {
  if (assignmentGroup.course_id === courseInfo.id) {
    console.log('Course is available.');
    return true;
  } else {
    throw new Error('Error: Course ID does not match. Course is not available.');
  }
}

//get unique learner IDs
function unqLearnerIdArray(learnerSubmissions) {
  const uniqueLearnerIdArray = [];
  for (let i = 0; i < learnerSubmissions.length; i++) {
    const currentLearnerId = learnerSubmissions[i].learner_id;
    if (!uniqueLearnerIdArray.includes(currentLearnerId)) {
      uniqueLearnerIdArray.push(currentLearnerId);
    }
  }
  return uniqueLearnerIdArray;
}

// Function to get assignment details
function getAssignmentDetails(assignmentGroup, assignmentId) {
  for (let i = 0; i < assignmentGroup.assignments.length; i++) {
    if (assignmentGroup.assignments[i].id == assignmentId) {
      return assignmentGroup.assignments[i];
    }
  }
  return null;
}

// late submissions
function lateSubmission(dueAtDate, submitteddate, points_possible) {
  if (submitteddate > dueAtDate) {
    console.log(points_possible - (points_possible * 0.1));
    return points_possible * 0.1; 
  } else {
    return 0;
  }
}

// average 
function getAverage(score, points_possible, lateScore) {
  if (isNaN(score) || isNaN(points_possible)) {
    throw new Error('Score and points_possible must be numbers only');
  }
  if (points_possible === 0) {
    throw new Error('Points Possible cannot be 0. Please check the input data.');
  }

  const adjustedActualMarks = score - lateScore;
  const val = adjustedActualMarks / points_possible;
  return val;
}

// Function to get learner data
function getLearnerData(course, assignmentGroup, learnerSubmissions) {
  let finalResultArray = [];
  let uniqueLearnerIdArray = unqLearnerIdArray(learnerSubmissions);

  for (let i = 0; i < uniqueLearnerIdArray.length; i++) {
    let learnerID = uniqueLearnerIdArray[i];
    let myObject = { id: learnerID }; 
    let totalActualMarks = 0;
    let totalPossibleMarks = 0;

    for (let j = 0; j < assignmentGroup.assignments.length; j++) {
      let assignmentDetails = assignmentGroup.assignments[j];
      let submission = learnerSubmissions.find(sub => sub.learner_id === learnerID && sub.assignment_id === assignmentDetails.id);

      if (new Date(assignmentDetails.due_at) > new Date() || !submission) {
        continue;
      }

      let lateScore = lateSubmission(
        assignmentDetails.due_at,
        submission.submission.submitted_at,
        assignmentDetails.points_possible
      );

      let avg = getAverage(
        submission.submission.score,
        assignmentDetails.points_possible,
        lateScore
      );

      totalActualMarks += submission.submission.score;
      totalPossibleMarks += assignmentDetails.points_possible;
      myObject[' ' + assignmentDetails.id] = avg;
    }

    myObject['avg'] = totalActualMarks / totalPossibleMarks;
    finalResultArray.push(myObject);
  }

  return finalResultArray;
}

const isCourseAvailable = CourseAvailability(AssignmentGroup, CourseInfo);
if (isCourseAvailable) {
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log("Relevant Data:");
  console.log(result);
}