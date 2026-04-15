import { useState } from "react";
import styles from "./CourseLearning.module.scss";

// ==================== DATA ====================
const sections = [
  {
    id: 1,
    title: "Introduction to UX Design",
    defaultExpanded: true,
    lessons: [
      { id: 1, title: "What is User Experience (UX) Design?", duration: "4min", completed: true, current: false },
      { id: 2, title: "Historical Overview of UX Design", duration: "4min", completed: true, current: false },
      { id: 3, title: "Understanding User-Centered Design", duration: "4min", completed: false, current: true },
      { id: 4, title: "The Role of UX Design in Digital Products", duration: "4min", completed: false, current: false },
      { id: 5, title: "Introduction to UX Design Tools and Techniques", duration: "4min", completed: false, current: false },
    ],
  },
  { id: 2, title: "Basics of User-Centered Design", defaultExpanded: false, lessons: [] },
  { id: 3, title: "Elements of User Experience", defaultExpanded: false, lessons: [] },
  { id: 4, title: "Visual Design Principles", defaultExpanded: false, lessons: [] },
];

const navButtons = ["Details", "Instructor", "Courses", "Reviews"];

const reviews = [
  { id: 1, name: "Mark Doe", date: "22nd March, 2024", rating: 5, comment: "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding." },
  { id: 2, name: "Mark Doe", date: "22nd March, 2024", rating: 5, comment: "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding." },
  { id: 3, name: "Mark Doe", date: "22nd March, 2024", rating: 5, comment: "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding." },
];

const moreCourses = [
  { id: 1, title: "Beginner's Guide to Design", author: "Ronald Richards", ratings: "1200", hours: 22, lectures: 155, level: "Beginner", price: "$149.9" },
  { id: 2, title: "Beginner's Guide to Design", author: "Ronald Richards", ratings: "1200", hours: 22, lectures: 155, level: "Beginner", price: "$149.9" },
  { id: 3, title: "Beginner's Guide to Design", author: "Ronald Richards", ratings: "1200", hours: 22, lectures: 155, level: "Beginner", price: "$149.9" },
  { id: 4, title: "Beginner's Guide to Design", author: "Ronald Richards", ratings: "1200", hours: 22, lectures: 155, level: "Beginner", price: "$149.9" },
];

const starRatings = [
  { stars: 5, percent: "80%" },
  { stars: 4, percent: "80%" },
  { stars: 3, percent: "10%" },
  { stars: 2, percent: "5%" },
  { stars: 1, percent: "5%" },
];

// ==================== SUB-COMPONENTS ====================



function CourseSection({ section }) {
  const [expanded, setExpanded] = useState(section.defaultExpanded);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className={styles.courseCompletionSection}>
      <div className={styles.courseCompletionSectionHeader} onClick={toggleExpanded}>
        <div
          className={`${styles.courseCompletionSectionToggle} ${expanded ? styles.courseCompletionSectionToggleExpanded : ""}`}
        >
          <div className={styles.courseCompletionArrow}></div>
        </div>
        <div className={styles.courseCompletionSectionTitle}>{section.title}</div>
      </div>

      <div className={`${styles.courseCompletionLessons} ${expanded ? styles.courseCompletionLessonsExpanded : ""}`}>
        {section.lessons.map((lesson) => (
          <Lesson key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}

function Lesson({ lesson }) {
  const [completed, setCompleted] = useState(lesson.completed);

  const toggleCompleted = () => setCompleted((prev) => !prev);

  const lessonClass = [
    styles.courseCompletionLesson,
    completed ? styles.courseCompletionLessonCompleted : "",
    lesson.current && !completed ? styles.courseCompletionLessonCurrent : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={lessonClass} onClick={toggleCompleted}>
      <div className={styles.courseCompletionLessonLeft}>
        <div className={styles.courseCompletionCheckbox}>
          <span className={styles.courseCompletionCheckmark} style={{ display: completed ? "block" : "none" }}>✓</span>
        </div>
        <div className={styles.courseCompletionLessonInfo}>
          <span className={styles.courseCompletionLessonNumber}>{lesson.id}.</span>
          <span className={styles.courseCompletionLessonTitle}>{lesson.title}</span>
        </div>
      </div>
      <div className={styles.courseCompletionLessonDuration}>
        <img src="./video-recorder.png" alt="video" className={styles.courseCompletionPlayIcon} />
        <span>{lesson.duration}</span>
      </div>
    </div>
  );
}

function CourseCompletion() {
  return (
    <div className={styles.courseCompletion}>
      <div className={styles.courseCompletionHeader}>
        <h1 className={styles.courseCompletionTitle}>Course Completion</h1>
      </div>
      {sections.map((section) => (
        <CourseSection key={section.id} section={section} />
      ))}
    </div>
  );
}

function CourseNavbar({ activeNav, setActiveNav }) {
  return (
    <div className={styles.courseNavbar}>
      {navButtons.map((label) => (
        <div key={label} className={styles.navBarButton}>
          <button
            className={`${styles.navBtn} ${activeNav === label ? styles.navBtnActive : ""}`}
            onClick={() => setActiveNav(label)}
          >
            {label}
          </button>
        </div>
      ))}
    </div>
  );
}

function StarDisplay({ count }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <img
          key={i}
          src={i < count ? "./Star 3.png" : "./Star 3 (1).png"}
          alt={i < count ? "filled star" : "empty star"}
        />
      ))}
    </>
  );
}

function ReviewCard({ review }) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.ava}>
        <img src="./Ellipse 19.png" alt={review.name} />
        <p>{review.name}</p>
      </div>
      <div className={styles.starRating}>
        <img src="./Star 3.png" alt="star" />
        <p>{review.rating}</p>
      </div>
      <p>Reviewed on {review.date}</p>
      <p>{review.comment}</p>
    </div>
  );
}

function ReviewsSection() {
  return (
    <div className={styles.reviews}>
      <p>Learner Reviews</p>
      <div className={styles.stars}>
        <div className={styles.starReview}>
          <img src="./Star 3.png" alt="star" />
          <p>4.6</p>
          <p>146,951 reviews</p>
        </div>
        {starRatings.map(({ stars, percent }) => (
          <div key={stars} className={styles[`star${stars}`]}>
            <StarDisplay count={stars} />
            <p>{percent}</p>
          </div>
        ))}
      </div>
      <div className={styles.review}>
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
      <button id="more-reviews" className={styles.moreReviews}>View more Reviews</button>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div className={styles.courseCard}>
      <img className={styles.bkCard} src="./Rectangle 1080.png" alt="course thumbnail" />
      <div className={styles.courseBody}>
        <h3>{course.title}</h3>
        <p className={styles.author}>By {course.author}</p>
        <div className={styles.rating}>
          <img src="./Rating.png" alt="stars" className={styles.courseStar} />
          <p>({course.ratings} Ratings)</p>
        </div>
        <p className={styles.meta}>{course.hours} Total Hours. {course.lectures} Lectures. {course.level}</p>
        <p className={styles.price}>{course.price}</p>
      </div>
    </div>
  );
}

function MoreCourses() {
  return (
    <div className={styles.courses}>
      <h2 className={styles.divTitle}>More Courses Like This</h2>
      <div className={styles.courseList}>
        {moreCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfo}>
        <div className={styles.footerIntro}>
          <div className={styles.footerLogo}>
            <img src="./logo (1).png" alt="Byway Logo" style={{ width: "31px", height: "40px" }} />
            <span>Byway</span>
          </div>
          <p>Empowering learners through accessible and engaging online education.</p>
          <p>Byway is a leading online learning platform dedicated to providing high-quality, flexible, and affordable educational experiences.</p>
        </div>

        <div className={styles.getHelp}>
          <p className={styles.upperP}>Get Help</p>
          <p>Contact Us</p>
          <p>Latest Articles</p>
          <p>FAQ</p>
        </div>

        <div className={styles.programs}>
          <p className={styles.upperP}>Programs</p>
          <p>Art &amp; Design</p>
          <p>Business</p>
          <p>IT &amp; Software</p>
          <p>Languages</p>
          <p>Programming</p>
        </div>

        <div className={styles.contact}>
          <div className={styles.contactUs}>
            <p className={styles.upperP}>Contact Us</p>
            <p>Address: 123 Main Street, Anytown, CA 12345</p>
            <p>Tel: +(123) 456-7890</p>
            <p>Mail: info@byway.com</p>
          </div>
          <div className={styles.partnerButton}>
            {["facebook", "twitter", "google", "github", "microsoft"].map((platform) => (
              <a key={platform} href="#" className={styles.iconBtn}>
                <img
                  src={`./${platform}${platform === "google" ? ".jpg" : ".png"}`}
                  alt={platform}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN PAGE ====================
export default function CoursePage() {
  const [activeNav, setActiveNav] = useState("Details");

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.background2}></div>

      <div className={styles.mainPage}>
        <div className={styles.course}>
          {/* Title */}
          <div className={styles.title}>
            <p>Introduction to User Experience Design</p>
          </div>

          {/* Sidebar: Course Completion */}
          <div className={styles.courseCom}>
            <CourseCompletion />
          </div>

          {/* Video */}
          <div className={styles.cVid}>
            <img src="./Frame 427318906.png" alt="course video" />
          </div>

          {/* Nav */}
          <CourseNavbar activeNav={activeNav} setActiveNav={setActiveNav} />

          {/* Separator 1 */}
          <div className={styles.sepLine1}></div>

          {/* Course Description */}
          <div className={styles.courseDes}>
            <p>Course Overview</p>
            <p>
              Embark on a transformative journey into the dynamic world of User Experience (UX) Design with our
              comprehensive course, "Introduction to User Experience Design." This course is meticulously crafted to
              provide you with a foundational understanding of the principles, methodologies, and tools that drive
              exceptional user experiences in the digital landscape.
            </p>
            <p>Key Learning Objectives</p>
            <ul>
              <li>Gain a clear understanding of what User Experience (UX) Design entails and its importance in today's digital world.</li>
              <li>Explore the fundamental principles of user-centered design and how to apply them to create intuitive and user-friendly interfaces.</li>
              <li>Learn about the various elements that contribute to a positive user experience, including information architecture, interaction design, and visual design.</li>
            </ul>
          </div>

          {/* Separator 2 */}
          <div className={styles.sepLine2}></div>

          {/* Instructor */}
          <div className={styles.instructorDetails}>
            <p>Instructor</p>
            <p>Ronald Richards</p>
            <p>UI/UX Designer</p>
            <div className={styles.instructorProfile}>
              <img src="Ellipse 4 (1).png" alt="instructor" />
              <p>40,445 Reviews</p>
              <img id="medal" src="./Icon (2).png" alt="medal" />
              <img src="./play.png" alt="play" />
              <img src="./graduation-hat-02.png" alt="graduation" />
              <p>500 Students</p>
              <p>15 Courses</p>
            </div>
            <p>
              With over a decade of industry experience, Ronald brings a wealth of practical knowledge to the classroom.
              He has played a pivotal role in designing user-centric interfaces for renowned tech companies, ensuring
              seamless and engaging user experiences.
            </p>
          </div>

          {/* Separator 3 */}
          <div className={styles.sepLine3}></div>
        </div>

        {/* Reviews */}
        <ReviewsSection />

        {/* More Courses */}
        <MoreCourses />
      </div>

      <Footer />
    </>
  );
}