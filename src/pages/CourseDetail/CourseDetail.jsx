import styles from "./CourseDetail.module.scss";
import CourseCard from "../../components/CourseCard/CourseCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseImg from "../../assets/CourseDetail/image 4.png";
import greystar from "../../assets/CourseDetail/Star 3 (1).png";
import yellowstar from "../../assets/CourseDetail/Star 3.png";
import smolAva from "../../assets/CourseDetail/Ellipse 5.png";
import bigava from "../../assets/CourseDetail/Ellipse 4 (1).png";
import starRating from "../../assets/CourseDetail/Rating.png";
import globe from "../../assets/CourseDetail/Icon (1).png";
import sideArrow from "../../assets/CourseDetail/Vector.png";
import medal from "../../assets/CourseDetail/Icon (2).png";
import play from "../../assets/CourseDetail/play.png";
import graduation from "../../assets/CourseDetail/graduation-hat-02.png";
import facebook from "../../assets/facebook.png";
import github from "../../assets/github.png";
import google from "../../assets/google.jpg";
import microsoft from "../../assets/microsoft.png";
import twitter from "../../assets/twitter.png";

const ChevronIcon = ({ open }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5.5 4.8l4 2.2-4 2.2V4.8z" fill="currentColor" />
  </svg>
);

const SyllabusItem = ({ item, index, isOpen, onToggle }) => (
  <div className={`${styles.tocCard} ${isOpen ? styles.tocCardOpen : ""}`}>
    <button className={styles.tocHeader} onClick={() => onToggle(index)}>
      <div className={styles.tocLeft}>
        <span className={styles.tocIndex}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={styles.tocTitle}>{item.title}</span>
      </div>
      <div className={styles.tocRight}>
        <span className={styles.tocMeta}>{item.lessons} Lessons</span>
        <span className={styles.tocDot} />
        <span className={styles.tocMeta}>{item.duration}</span>
        <ChevronIcon open={isOpen} />
      </div>
    </button>

    <div className={`${styles.tocBody} ${isOpen ? styles.tocBodyOpen : ""}`}>
      <ul className={styles.lessonList}>
        {item.items.map((lesson, i) => (
          <li key={i} className={styles.lessonItem}>
            <span className={styles.lessonIcon}>
              <PlayIcon />
            </span>
            <span>{lesson}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const SyllabusSection = ({ course }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const totalLessons = course.details.syllabus.reduce(
    (acc, s) => acc + s.lessons,
    0,
  );
  const totalSections = course.details.syllabus.length;

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  const totalHour = (data) => {
    let sum = 0;
    for (let i of data.details.syllabus.map((s) => s.duration)) {
      sum += parseInt(i);
    }
    return sum;
  };
  return (
    <div className={styles.syllabusDetails}>
      <div className={styles.syllabusHeader}>
        <p className={styles.syllabusTitle}>Syllabus</p>
        <p className={styles.syllabusSummary}>
          {totalSections} sections &nbsp;·&nbsp; {totalLessons} lessons
          &nbsp;·&nbsp; {totalHour(course)} hours total
        </p>
      </div>

      <div className={styles.tableOfContent}>
        {course.details.syllabus.map((item, index) => (
          <SyllabusItem
            key={index}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

const sameCourse = ({data,course}) => {
  let fil1 = data.filter(element => element.category === course.category)
  let fil2 = fil1.filter(e => e.level === course.level)
  return fil2
}

const saleCount = (promotionalPrice,originalPrice) => {
  return Math.round((1 - promotionalPrice / originalPrice) * 100)
}
const CourseDetail = () => {
  const { id } = useParams(); 
  const [allCourse, setAllCourse] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3001/courses/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);
  useEffect(() => {
    fetch('http://localhost:3001/courses')
      .then(res => res.json())
      .then(data => setAllCourse(data))  // ← đổi setCourses → setAllCourse
      .catch(err => console.error(err))
  }, [])

  if (loading) return <p>Đang tải...</p>;
  if (!course) return <p>Không tìm thấy khóa học</p>;
  
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.background2}></div>

      <div className={styles.mainPage}>
        <div className={styles.course}>
          <div className={styles.link}>
            <p>Home</p>
            <img src={sideArrow} alt="arrow" />
            <p>Categories</p>
            <img src={sideArrow} alt="arrow" />
            <p>{course.title}</p>
          </div>

          <div className={styles.mainTitle}>
            <p>{course.title}</p>
            <p>
              {course.details.shortDescription}
            </p>
            <div className={styles.ratingNDetails}>
              <p style={{ color: "#fcad03" }}>4.6</p>
              <img src={yellowstar} alt="rating" />
              <p>({course.reviews} reviews)</p>
              <div></div>
              <p>{course.hours} Total Hours. {course.lectures} Lectures. All levels</p>
            </div>
            <div className={styles.teacherDetails}>
              <img src={smolAva} alt="avatar" />
              <p>Created by</p>
              <p>{course.author}</p>
            </div>
            <div className={styles.availLanguage}>
              <img src={globe} alt="language" />
              {<p>{course.details.languages.join(', ')}</p>}
            </div>
          </div>

          <div className={styles.teacherNBuy}>
            <div className={styles.teacherInfo}>
              <img src={CourseImg} alt="course thumbnail" />
              <div className={styles.price}>
                <p>${course.details.promotionalPrice}</p>
                <p
                  style={{ textDecoration: "line-through", color: "lightgrey" }}
                >
                  ${course.details.originalPrice}
                </p>
                <p style={{ color: "#16A34A" }}>{saleCount(course.details.promotionalPrice,course.details.originalPrice)}% OFF!</p>
              </div>
              <button className={styles.addToCartButton}>Add To Cart</button>
              <button className={styles.buyNowButton}>Buy Now</button>
              <div className={styles.tnbSl}></div>
              <div className={styles.shareInfo}>
                <p>Share</p>
                <div className={styles.shareGroup}>
                  <a href="#" className={styles.sharedButton1}>
                    <img src={facebook} alt="Facebook" />
                  </a>
                  <a href="#" className={styles.sharedButton2}>
                    <img src={github} alt="GitHub" />
                  </a>
                  <a href="#" className={styles.sharedButton3}>
                    <img src={google} alt="Google" />
                  </a>
                  <a href="#" className={styles.sharedButton4}>
                    <img src={twitter} alt="X" />
                  </a>
                  <a href="#" className={styles.sharedButton5}>
                    <img src={microsoft} alt="Windows" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.courseNavbar}>
            <div className={styles.navBarButton1}>
              <label htmlFor="btn1" className={styles.navBtn}>
                Instructor
              </label>
            </div>
            <div className={styles.navBarButton2}>
              <label htmlFor="btn2" className={styles.navBtn}>
                Description
              </label>
            </div>
            <div className={styles.navBarButton3}>
              <label htmlFor="btn3" className={styles.navBtn}>
                Reviews
              </label>
            </div>
            <div className={styles.navBarButton4}>
              <label htmlFor="btn4" className={styles.navBtn}>
                FAQ
              </label>
            </div>
          </div>

          <div className={styles.sepLine1}></div>

          <div className={styles.courseDes}>
            <p>Course Description</p>
            <p>
              {course.details.courseDescription}
            </p>
            <p>Certification</p>
            <p>
              {course.details.certification}
            </p>
          </div>

          <div className={styles.sepLine2}></div>

          <div className={styles.instructorDetails}>
            <p>Instructor</p>
            <p>{course.author}</p>
            <p>UI/UX Designer</p>
            <div className={styles.instructorProfile}>
              <img src={bigava} alt="instructor" />
              <p>{course.details.instructor.totalReviews} Reviews</p>
              <img id="medal" src={medal} alt="medal" />
              <img src={play} alt="play" />
              <img src={graduation} alt="grad" />
              <p>{course.details.instructor.totalStudents} Students</p>
              <p>{course.details.instructor.totalCourses} Courses</p>
            </div>
            <p>
              {course.details.instructor.bio}
            </p>
          </div>

          <div className={styles.sepLine3}></div>

          <SyllabusSection course={course}></SyllabusSection>
        </div>

        {/* Reviews section */}
        <div className={styles.reviews}>
          <p>Learner Reviews</p>
          <div className={styles.stars}>
            <div className={styles.starReview}>
              <img src={yellowstar} alt="star" />
              <p>{course.details.learnerReviews.averageRating}</p>
              <p>{course.details.learnerReviews.totalReviews.toLocaleString('vi-VN')} reviews</p>
            </div>
            <div className={styles.star5}>
              <img src={yellowstar} alt="star" />
              <img src={yellowstar} alt="star" />
              <img src={yellowstar} alt="star" />
              <img src={yellowstar} alt="star" />
              <img src={yellowstar} alt="star" />
              <p>{course.details.learnerReviews.ratingBreakdown["5_star"]}</p>
            </div>
            <div className={styles.star4}>
              <img src={yellowstar} alt="star" />
              <img src={yellowstar} alt="star" />
              <img src={yellowstar} alt="star" />
              <img src={yellowstar} alt="star" />
              <img src={greystar} alt="star" />
              <p>{course.details.learnerReviews.ratingBreakdown["4_star"]}</p>
            </div>
            <div className={styles.star3}>
              <img src={yellowstar} alt="star" />
              <img src={yellowstar} alt="star" />
              <img src={yellowstar} alt="star" />
              <img src={greystar} alt="star" />
              <img src={greystar} alt="star" />
              <p>{course.details.learnerReviews.ratingBreakdown["3_star"]}</p>
            </div>
            <div className={styles.star2}>
              <img src={yellowstar} alt="star" />
              <img src={yellowstar} alt="star" />
              <img src={greystar} alt="star" />
              <img src={greystar} alt="star" />
              <img src={greystar} alt="star" />
              <p>{course.details.learnerReviews.ratingBreakdown["2_star"]}</p>
            </div>
            <div className={styles.star1}>
              <img src={yellowstar} alt="star" />
              <img src={greystar} alt="star" />
              <img src={greystar} alt="star" />
              <img src={greystar} alt="star" />
              <img src={greystar} alt="star" />
              <p>{course.details.learnerReviews.ratingBreakdown["1_star"]}</p>
            </div>
          </div>

          <div className={styles.review}>
            {course.details.learnerReviews.reviews.map((i) => (
              <div key={i} className={styles.reviewCard}>
                <div className={styles.ava}>
                  <img src={bigava} alt="avatar" />
                  <p>{i.name}</p>
                </div>
                <div className={styles.starRating}>
                  <img src={yellowstar} alt="star" />
                  <p>{i.rating}</p>
                </div>
                <p>Reviewed on {i.date}</p>
                <p>
                  {i.comment}
                </p>
              </div>
            ))}
          </div>

          <button id="more-reviews">View more Reviews</button>
        </div>

        <div className={styles.courses}>
          <h2 className={styles.divTitle}>More Courses Like This</h2>
          <div className={styles.courseList}>
            {sameCourse({ data: allCourse, course: course }).map((data) => 
            <CourseCard
            key={data.id}
            id={data.id}
            title={data.title}
            instructor={data.author}
            rating={data.rating}
            ratingCount={data.reviews}
            duration={`${data.hours} Total Hours. ${data.lectures} Lectures. ${data.level}`}
            category={data.category}
            price={`$${data.price}`}
            >

            </CourseCard>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
